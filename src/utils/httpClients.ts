import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import {
  dispatchAuthRedirectHome,
  dispatchGitHubAppReauthorizationRequired,
} from '@/constants/authEvents';
import { GITHUB_APP_REAUTHORIZATION_REQUIRED_CODE } from '@/lib/apiErrorGuide';
import { canReuseStoredToken, readBearerToken } from '@/lib/authTokenReuse';
import { clearAppLocalStorage } from '@/lib/clearAppStorage';
import { extractApiErrorCode } from '@/utils/response';

type TokenPair = {
  value: string;
  expiredAt: string;
};

type AuthRefreshResponse = {
  status?: number;
  code?: string;
  message?: string;
  data?: {
    accessToken?: string | TokenPair;
    refreshToken?: string | TokenPair;
  };
  result?: {
    accessToken?: TokenPair;
  };
};

/*
  호출부가 요청마다 켤 수 있는 표시. axios 설정에 얹어야 인터셉터까지 따라온다.
  `declare module` 없이 config 에 넣으면 타입이 거절한다.
*/
declare module 'axios' {
  interface AxiosRequestConfig {
    /** 이 요청의 403 재인증은 전역 모달로 보내지 않는다. 아래 신호 함수 주석 참고 */
    skipReauthPrompt?: boolean;
  }
}

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

/** 오리진 안의 모든 탭이 같은 이름을 봐야 줄이 하나가 된다 */
const REFRESH_LOCK_NAME = 'qeploy.auth.refresh';

class Http {
  public readonly instance: AxiosInstance;
  private readonly baseUrl = import.meta.env.VITE_API_URL;

  private isRefreshing = false;
  private refreshSubscribers: Array<(accessToken: string | null) => void> = [];

  // refresh 요청은 인터셉터 영향 없이 별도 client 사용
  private readonly refreshClient = axios.create({
    baseURL: this.baseUrl,
    withCredentials: true,
  });

  constructor() {
    this.instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    });

    this.attachInterceptors();
  }

  // =========================
  // storage helpers
  // =========================
  private getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  private getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  private setAccessTokenValue(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  private normalizeStoredToken(token: unknown): string | null {
    if (typeof token === 'string' && token.length > 0) return token;
    if (token && typeof token === 'object' && 'value' in token) {
      const value = (token as TokenPair).value;
      return typeof value === 'string' && value.length > 0 ? value : null;
    }
    return null;
  }

  private clearTokens() {
    clearAppLocalStorage();
  }

  /**
   * 예전에는 여기서 `console.log('[AUTH_FLOW] goLogin:', reason)` 를 찍었다. 디버깅용으로
   * 넣은 줄이 배포까지 따라와, 운영 콘솔에 로그아웃 사유가 그대로 남았다. 사유는 호출부
   * 주석으로 옮기고 인자는 없앴다.
   */
  private goLogin() {
    this.clearTokens();
    dispatchAuthRedirectHome();
  }

  // =========================
  // interceptors
  // =========================
  private attachInterceptors() {
    this.instance.interceptors.request.use((config) => {
      const token = this.getAccessToken();
      if (!token) return config;

      const headers = new AxiosHeaders(config.headers);
      headers.set('Authorization', `Bearer ${token}`);
      config.headers = headers;
      return config;
    });

    this.instance.interceptors.response.use(
      (res) => res,
      (err: AxiosError) => this.handleAuthError(err),
    );
  }

  // =========================
  // queue helpers
  // =========================
  private subscribeTokenRefresh(cb: (accessToken: string | null) => void) {
    this.refreshSubscribers.push(cb);
  }

  private flushQueue(accessToken: string | null) {
    const subs = this.refreshSubscribers;
    this.refreshSubscribers = [];
    subs.forEach((cb) => cb(accessToken));
  }

  // =========================
  // endpoint guards
  // =========================
  private isAccessByRefreshRequest(config: RetriableRequestConfig) {
    const url = config.url ?? '';
    return url.includes('/auth/refresh') || url.includes('/user/access-by-refresh');
  }

  private withAuthHeader(config: RetriableRequestConfig, token: string) {
    const headers = new AxiosHeaders(config.headers);
    headers.set('Authorization', `Bearer ${token}`);
    return { ...config, headers };
  }

  /** 이 요청이 **실제로 써서 401 을 받은** 토큰. 저장소의 현재 값과 다를 수 있다. */
  private readAuthHeaderToken(config: RetriableRequestConfig): string | null {
    return readBearerToken(new AxiosHeaders(config.headers).get('Authorization'));
  }

  // =========================
  // refresh flow (ONLY 1-step)
  // =========================
  /**
   * 탭이 여럿이어도 **refresh 는 한 번만** 돈다.
   *
   * 서버는 refresh 할 때마다 토큰을 회전시킨다. 두 탭이 동시에 401 을 받으면 둘 다 같은
   * refresh 토큰으로 `/auth/refresh` 를 부르고, 먼저 닿은 쪽만 성공한다. 진 쪽은 401 을
   * 받아 로그인으로 가면서 저장소를 지우고 — **방금 이긴 탭이 저장한 새 토큰까지 지운다.**
   * `isRefreshing` 은 인스턴스 필드라 한 탭 안에서만 막아 준다.
   *
   * `navigator.locks` 로 오리진 전체에서 줄을 세운다. 그런데 줄만 세우면 모자라다 —
   * 기다리던 탭이 제 차례에 그대로 refresh 를 부르면, 이미 회전돼 무효가 된 토큰으로
   * 부르는 꼴이라 결국 같은 401 이다. 그래서 **자물쇠를 잡은 뒤 저장소를 다시 읽는다.**
   * 내가 쓰다 실패한 토큰과 지금 저장소의 값이 다르면, 다른 탭이 이미 갱신해 둔 것이므로
   * 그 값을 그대로 쓰고 서버를 부르지 않는다.
   *
   * `navigator.locks` 가 없는 환경(구형 브라우저·비보안 컨텍스트)에서는 자물쇠 없이
   * 같은 절차를 돈다. 예전 동작으로 돌아갈 뿐 더 나빠지지는 않는다.
   */
  private async refreshAccessToken(staleToken: string | null): Promise<string> {
    const run = async () => {
      const current = this.getAccessToken();
      if (canReuseStoredToken(current, staleToken)) return current as string;
      return this.accessByRefresh();
    };

    if (typeof navigator !== 'undefined' && navigator.locks) {
      return navigator.locks.request(REFRESH_LOCK_NAME, run);
    }
    return run();
  }

  /**
   * refreshToken으로 accessToken만 재발급
   * refreshToken이 만료/무효(401/403)면 재발급 시도하지 않고 즉시 로그인 이동 + 로컬스토리지 clear
   */
  private async accessByRefresh(): Promise<string> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      // refresh 토큰이 아예 없다
      this.goLogin();
      throw new Error('No refresh token available');
    }

    try {
      const res = await this.refreshClient.post<AuthRefreshResponse>('/auth/refresh', {
        refreshToken,
      });

      const payload = res.data?.data ?? res.data?.result;
      const accessToken = this.normalizeStoredToken(payload?.accessToken);
      const nextRefreshToken = this.normalizeStoredToken(
        payload && 'refreshToken' in payload ? payload.refreshToken : undefined,
      );

      if (!accessToken) {
        throw new Error('auth refresh response missing accessToken');
      }

      this.setAccessTokenValue(accessToken);
      if (nextRefreshToken) {
        localStorage.setItem('refreshToken', nextRefreshToken);
      }
      return accessToken;
    } catch (e) {
      const err = e as AxiosError;
      const status = err?.response?.status;

      // refreshToken 만료/무효 => 재발급 X, 로그인 이동
      if (status === 401 || status === 403) {
        this.goLogin();
      }

      throw e;
    }
  }

  // =========================
  // 403 재인증 신호
  // =========================
  /**
   * GitHub 재인증이 필요하다는 403 이면 진입점만 띄운다.
   *
   * 이 신호를 듣는 다이얼로그는 `__root.tsx` 에 걸려 있어 어느 화면에서든 살아 있다.
   * 그래서 화면마다 `dispatchApiErrorAction` 을 심는 대신 여기서 한 번만 쏜다 —
   * 지금까지 진입점이 있던 곳은 에이전트 화면 둘뿐이라, 도메인 연결이나 저장소
   * 생성에서 같은 403 을 받은 사용자는 "다시 인증" 버튼을 볼 길이 아예 없었다.
   *
   * **오류 자체는 건드리지 않는다.** 신호만 쏘고 그대로 흘려보내므로, 각 화면이
   * 지금까지 하던 처리(인라인 문구, 재시도 버튼)는 하나도 달라지지 않는다. 이미
   * `dispatchApiErrorAction` 을 부르던 화면은 같은 이벤트를 한 번 더 쏘게 되는데,
   * 다이얼로그를 여는 일은 여러 번 해도 결과가 같다.
   *
   * 설치 계열(GITHUB_APP_NOT_INSTALLED, …REPOSITORY_ACCESS_DENIED)은 일부러 뺐다.
   * 그쪽은 화면마다 이미 인라인으로 다루고 있어, 여기서 모달까지 띄우면 지금 동작이
   * 바뀐다. 이 PR 이 메우려는 구멍은 재인증 진입점 하나다.
   */
  private signalGitHubReauthorizationIfNeeded(error: AxiosError) {
    if (error.response?.status !== 403) return;
    if (extractApiErrorCode(error) !== GITHUB_APP_REAUTHORIZATION_REQUIRED_CODE) return;

    /*
      부르는 쪽이 직접 다루겠다고 하면 비켜 준다.

      이 모달에는 **닫기가 없다**. 로그인 직후나 저장소를 다루려는 순간에 뜰 때는 그게
      말이 됐다 — 재인증 말고는 할 일이 없는 자리였으니까. 그런데 화면을 열기만 해도
      뜨는 조회(결과 승인의 반영 범위 같은)에까지 붙으면, 사용자가 거절조차 못 하고
      갇힌다. 그런 호출은 제 화면 안에서 안내하는 편이 낫다.
    */
    const config = error.config as RetriableRequestConfig | undefined;
    if (config?.skipReauthPrompt) return;

    dispatchGitHubAppReauthorizationRequired();
  }

  // =========================
  // 401 handler
  // =========================
  private async handleAuthError(error: AxiosError) {
    const config = error.config as RetriableRequestConfig | undefined;

    if (!error.response || !config) return Promise.reject(error);

    // 403 신호는 아래 401 흐름과 무관하다. 먼저 쏘고 원래 가던 길로 간다
    this.signalGitHubReauthorizationIfNeeded(error);

    if (error.response.status !== 401) return Promise.reject(error);

    // refresh endpoint 자체가 401이면 이미 accessByRefresh()에서 goLogin 처리됨
    if (this.isAccessByRefreshRequest(config)) {
      return Promise.reject(error);
    }

    // 무한 루프 방지
    if (config._retry) return Promise.reject(error);
    config._retry = true;

    // 헤더를 갈아끼우기 전에 읽어 둔다
    const staleToken = this.readAuthHeaderToken(config);

    // 이미 refresh 중이면 큐에 등록 후 토큰 받으면 재시도
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.subscribeTokenRefresh((accessToken) => {
          if (!accessToken) return reject(error);
          resolve(this.instance.request(this.withAuthHeader(config, accessToken)));
        });
      });
    }

    this.isRefreshing = true;

    try {
      const newAccessToken = await this.refreshAccessToken(staleToken);

      // 대기 요청들 처리
      this.flushQueue(newAccessToken);

      // 원 요청 재시도
      return this.instance.request(this.withAuthHeader(config, newAccessToken));
    } catch (e) {
      // refresh 자체 실패 → 큐 실패 처리
      this.flushQueue(null);
      return Promise.reject(e);
    } finally {
      this.isRefreshing = false;
    }
  }
}

export default new Http();
