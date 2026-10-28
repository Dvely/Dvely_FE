import {
  dispatchGitHubAppInstallRequired,
  dispatchGitHubAppReauthorizationRequired,
} from '@/constants/authEvents';
import { ACTIVE_RUN_LIMIT_EXCEEDED_CODE, PREVIEW_LIMIT_EXCEEDED_CODE } from '@/lib/runLimit';
import { extractApiErrorCode, extractApiErrorMessage } from '@/utils/response';

/**
 * 오류 코드를 다음 행동으로 옮긴다.
 *
 * 서버 문장은 이미 완결적이다("GitHub App이 이 저장소에 접근할 권한이 없습니다.
 * GitHub App 설정에서 이 저장소 접근을 허용한 뒤 다시 시도해주세요"). 그래서 여기서
 * 문장을 다시 쓰지 않는다 — 두 벌로 적으면 서버가 문구를 고칠 때 화면만 옛말을 한다.
 *
 * 화면이 보탤 수 있는 건 **행동**이다. 읽고 나서 어디로 가야 하는지, 지금 눌러도 되는
 * 건지. 그래서 이 모듈은 짧은 힌트와 이동 위치만 돌려준다.
 */

/** 화면이 붙일 수 있는 후속 행동 */
type ApiErrorAction =
  /** GitHub App 재인증·권한 부여 진입점을 띄운다 */
  | { kind: 'github-app'; label: string }
  /** 앱 안의 다른 화면으로 보낸다. search 는 그 화면이 어느 절을 열지 같은 것 */
  | { kind: 'navigate'; to: string; label: string; search?: Record<string, string> }
  /** 같은 요청을 다시 시도하게 한다 */
  | { kind: 'retry'; label: string };

type ApiErrorGuide = {
  /** 서버 문구 뒤에 덧붙일 한 줄. 서버 문장을 되풀이하지 않는다 */
  hint: string;
  /** 사용자가 지금 할 수 있는 일. 없으면 undefined */
  action?: ApiErrorAction;
};

/**
 * 권한은 그대로인데 GitHub 인증만 끊겼을 때 서버가 보내는 코드.
 *
 * Http 인터셉터도 같은 문자열을 보고 재인증 진입점을 띄운다. 양쪽에 문자열을 따로
 * 적어 두면 한쪽만 고쳐질 때 조용히 어긋나므로 여기 한 번만 적고 가져다 쓴다.
 */
const GITHUB_APP_REAUTHORIZATION_REQUIRED_CODE = 'GITHUB_APP_REAUTHORIZATION_REQUIRED';

/**
 * 코드별 안내.
 *
 * 모르는 코드는 여기 없다 — 그때는 서버 문구만 보여주고 끝낸다. 아는 코드만 손대는
 * 이유는, 서버가 코드를 늘릴 때마다 화면이 엉뚱한 안내를 붙이는 게 아무 안내도 없는
 * 것보다 나쁘기 때문이다.
 */
const API_ERROR_GUIDE: Record<string, ApiErrorGuide> = {
  AI_CREDENTIAL_NOT_REGISTERED: {
    // 코딩 에이전트는 사용자 본인 키로만 돈다. 서버가 운영자 키로 대신 채워 주는
    // 경로가 없으므로(제공사 약관상 대리 결제·중개 금지) 재시도는 의미가 없다 —
    // 키를 넣는 화면으로 보내는 것만이 다음 행동이다
    hint: '설정 > AI API 키에서 본인 키를 등록하면 바로 쓸 수 있습니다. 사용량은 등록한 본인 계정으로 청구됩니다.',
    action: {
      kind: 'navigate',
      to: '/settings',
      search: { section: 'ai-credentials' },
      label: 'AI API 키 등록하러 가기',
    },
  },
  AI_PROVIDER_UNAVAILABLE: {
    // 크레딧 소진·키 누락·인증 실패가 여기로 온다. 셋 다 기다린다고 풀리지 않는다 —
    // 재시도를 권하면 사용자가 같은 벽에 계속 부딪힌다
    hint: '기다려도 풀리지 않습니다. 다른 AI 제공자를 골라 다시 보내보세요.',
  },
  AI_PROVIDER_RATE_LIMITED: {
    // 이건 반대로 시간이 풀어준다
    hint: '잠시 뒤에 다시 보내면 됩니다.',
    action: { kind: 'retry', label: '다시 보내기' },
  },
  AI_PROVIDER_ERROR: {
    hint: '제공자 쪽 일시적인 문제일 수 있습니다. 다시 보내거나 다른 제공자를 골라보세요.',
    action: { kind: 'retry', label: '다시 보내기' },
  },
  GITHUB_APP_NOT_INSTALLED: {
    hint: 'GitHub App을 설치해야 저장소를 다룰 수 있습니다.',
    action: { kind: 'github-app', label: 'GitHub App 설치하기' },
  },
  GITHUB_APP_REPOSITORY_ACCESS_DENIED: {
    // App 은 설치돼 있는데 이 저장소가 허용 목록에 없는 경우다. 설치가 아니라
    // 권한 범위를 넓히는 일이라 들어가는 화면이 다르다
    hint: 'App은 설치돼 있지만 이 저장소가 허용 목록에 없습니다.',
    action: { kind: 'github-app', label: 'GitHub App 권한 다시 설정' },
  },
  [GITHUB_APP_REAUTHORIZATION_REQUIRED_CODE]: {
    // 설치도 돼 있고 저장소도 허용돼 있다. 끊긴 건 User Token 뿐이라 권한을 다시
    // 고르는 게 아니라 인증만 다시 받으면 된다 — 위 두 코드와 가야 할 화면이 다르다.
    // 이 코드가 없던 동안 같은 403 이 범용 FORBIDDEN 으로 와서, 화면은 "App을
    // 설치해야 합니다" 라는 틀린 안내를 붙이거나 아무 행동도 주지 못했다
    hint: '권한은 그대로입니다. GitHub 인증만 다시 받으면 이어서 쓸 수 있습니다.',
    action: { kind: 'github-app', label: 'GitHub 다시 인증' },
  },
  RESULT_REVERT_UNAVAILABLE: {
    // 서버 git 이 꺼진 환경이다. 기다려도 켜지지 않으므로 다른 선택지로 보낸다
    hint: '이 환경에서는 되돌리기를 쓸 수 없습니다. "preview 에 남기기"로 거절해 주세요.',
  },
  RESULT_REVERT_FAILED: {
    // 되돌리기가 실패하면 서버가 승인을 PENDING 으로 되돌려 둔다. 다시 눌러도 된다
    hint: '승인은 그대로 남아 있습니다. 다시 시도하거나 "preview 에 남기기"로 거절해 주세요.',
    action: { kind: 'retry', label: '다시 시도' },
  },
  [ACTIVE_RUN_LIMIT_EXCEEDED_CODE]: {
    /*
      서버 문장에 지금 수·상한·다음 행동이 들어 있어서(예: "동시에 2개까지 실행할 수
      있습니다") 그걸 되풀이하지 않는다. 화면이 보탤 것은 **이 요청이 어떻게 됐는지** 다.

      `AI_PROVIDER_RATE_LIMITED` 와 달리 재시도 버튼을 주지 않는다. 시간이 풀어주는 게
      아니라 진행 중인 것이 끝나야 풀리므로, 지금 다시 누르면 같은 벽에 또 부딪힌다.

      어느 자리에서 와도 참인 문장만 적는다 — 메시지 전송·되묻기 답뿐 아니라 재시도·
      계획 승인·도메인 연결에서도 온다. "적어둔 말을 돌려놨습니다" 처럼 한쪽에서만
      참인 말을 쓰면 다른 자리에서 없는 일을 가리키게 된다.
    */
    hint: '이 요청은 서버에 반영되지 않았습니다. 진행 중인 작업이 끝나면 다시 시도할 수 있습니다.',
  },
  [PREVIEW_LIMIT_EXCEEDED_CODE]: {
    // 자리를 비우는 것이 유일한 다음 행동이라 그것만 적는다. 프리뷰를 닫는 버튼은
    // 각 프로젝트의 프리뷰 자리에 있으므로, 여기서 한 곳으로 보낼 수가 없다
    hint: '쓰지 않는 프리뷰를 닫으면 자리가 생깁니다. 다른 프로젝트의 프리뷰도 함께 셉니다.',
  },
  PREVIEW_ENVIRONMENT_UNAVAILABLE: {
    // 서버 쪽 Docker 문제라 사용자가 고칠 수 있는 게 없다. 재시도 외에는
    // 문의밖에 없다는 걸 솔직히 적는다
    hint: '서버 쪽 실행 환경 문제라 잠시 뒤 다시 시도해야 합니다. 계속되면 운영자에게 알려주세요.',
    action: { kind: 'retry', label: '다시 시도' },
  },
};

/** 오류에서 안내를 찾는다. 모르는 코드거나 코드가 없으면 null */
function findApiErrorGuide(error: unknown): ApiErrorGuide | null {
  const code = extractApiErrorCode(error);
  if (!code) return null;
  return API_ERROR_GUIDE[code] ?? null;
}

/**
 * 사용자에게 보여줄 문구. 서버 문장 아래에 힌트를 한 줄 덧붙인다.
 * 아는 코드가 아니면 서버 문장만 그대로 나간다 — 지금까지와 같다.
 */
function composeApiErrorMessage(error: unknown, fallback = '요청 처리 중 오류가 발생했습니다.') {
  const message = extractApiErrorMessage(error) ?? fallback;
  const guide = findApiErrorGuide(error);
  return guide ? `${message}\n\n${guide.hint}` : message;
}

/**
 * 오류가 진입점을 요구하면 띄운다.
 *
 * GitHub App 계열만 해당한다 — 재시도는 사용자가 같은 버튼을 다시 누르면 되고,
 * 제공자 전환은 이미 화면에 셀렉트가 있다. 반면 App 권한은 **여기서 길을 열어주지
 * 않으면 사용자가 GitHub 설정까지 스스로 찾아가야 한다.**
 *
 * 이미 있는 다이얼로그를 재사용한다. 설치 안 됨과 저장소 권한 부족은 둘 다 App
 * 설정 화면으로 가야 하므로 같은 진입점을 쓴다.
 */
function dispatchApiErrorAction(error: unknown): boolean {
  const guide = findApiErrorGuide(error);
  if (guide?.action?.kind !== 'github-app') return false;

  const code = extractApiErrorCode(error);
  if (code === 'GITHUB_APP_NOT_INSTALLED' || code === 'GITHUB_APP_REPOSITORY_ACCESS_DENIED') {
    dispatchGitHubAppInstallRequired();
    return true;
  }

  dispatchGitHubAppReauthorizationRequired();
  return true;
}

export {
  API_ERROR_GUIDE,
  GITHUB_APP_REAUTHORIZATION_REQUIRED_CODE,
  composeApiErrorMessage,
  dispatchApiErrorAction,
  findApiErrorGuide,
  type ApiErrorAction,
  type ApiErrorGuide,
};
