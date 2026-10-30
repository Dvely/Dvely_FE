import { useCallback, useEffect, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { GitBranch } from 'lucide-react';
import { refreshUserInfoInBackground } from '@/api/user';
import {
  completeGitHubAppCallback,
  fetchGitHubAppInstallUrl,
  fetchGitHubAppReauthorizeUrl,
} from '@/api/auth';
import { closeAfterRefresh } from '@/lib/closeAfterRefresh';
import {
  GITHUB_APP_INSTALL_REQUIRED_EVENT,
  GITHUB_APP_REAUTHORIZATION_REQUIRED_EVENT,
} from '@/constants/authEvents';
import {
  GITHUB_APP_INSTALL_POPUP_NAME,
  GITHUB_APP_INSTALL_SUCCESS_MESSAGE,
  GITHUB_OAUTH_POPUP_FEATURES,
} from '@/constants/githubOAuth';
import { IS_DEMO } from '@/demo/config';
import { runDemoGitHubWindow } from '@/demo/githubWindow';

/**
 * 두 모드는 사용자가 처한 상황이 다르다.
 * install은 아직 권한을 준 적이 없는 경우, reauthorize는 이미 준 권한의 인증이 만료된 경우다.
 * 같은 문구를 쓰면 이미 권한을 준 사용자가 "왜 또 권한을 달라고 하지?" 하고 당황한다.
 */
const PROMPT_COPY = {
  install: {
    title: 'GitHub 접근 권한 설정 필요',
    description: (
      <>
        저장소를 불러오려면 GitHub에 대한 접근 권한 허용이 필요합니다.
        <br />
        아래 버튼을 눌러 권한을 설정해 주세요.
      </>
    ),
    confirmLabel: '권한 허용하기',
  },
  reauthorize: {
    title: 'GitHub 연결이 만료되었습니다',
    description: (
      <>
        권한은 그대로 있지만 GitHub 인증이 만료되어 저장소에 접근할 수 없습니다.
        <br />
        아래 버튼을 눌러 다시 인증해 주세요.
      </>
    ),
    confirmLabel: '다시 인증하기',
  },
} as const;

function GitHubAppInstallPromptDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [promptMode, setPromptMode] = useState<'install' | 'reauthorize'>('install');

  // 앱 마운트 시 체크 — 이미 로그인된 상태(새로고침 등)에서도 감지
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) return;

    void refreshUserInfoInBackground().then((response) => {
      if (!response?.data) return;
      if (!response.data.githubAppInstalled) {
        setPromptMode('install');
        setOpen(true);
        return;
      }
      // githubAppTokenExpired가 아니다 — 그 값은 액세스 토큰의 신선도만 나타내고,
      // 서버가 GitHub을 호출하는 경로마다 리프레시 토큰으로 자동 재발급한다.
      // 그걸로 판단하면 멀쩡히 권한 있는 사용자에게 8시간마다 모달이 떴다.
      if (response.data.githubAppReauthorizationRequired) {
        setPromptMode('reauthorize');
        setOpen(true);
      }
    });
  }, []);

  // OAuth 로그인 직후 이벤트 수신
  useEffect(() => {
    const handleRequired = () => {
      setPromptMode('install');
      setOpen(true);
    };
    window.addEventListener(GITHUB_APP_INSTALL_REQUIRED_EVENT, handleRequired);
    return () => window.removeEventListener(GITHUB_APP_INSTALL_REQUIRED_EVENT, handleRequired);
  }, []);

  // 마운트 시 한 번만 보면 세션 중간에 토큰이 끊긴 경우를 놓친다.
  // 사용자 정보를 다시 읽는 곳이면 어디든 이 이벤트로 진입점을 띄운다
  useEffect(() => {
    const handleReauthorize = () => {
      setPromptMode('reauthorize');
      setOpen(true);
    };
    window.addEventListener(GITHUB_APP_REAUTHORIZATION_REQUIRED_EVENT, handleReauthorize);
    return () =>
      window.removeEventListener(GITHUB_APP_REAUTHORIZATION_REQUIRED_EVENT, handleReauthorize);
  }, []);

  /** 팝업이 끝난 뒤 사용자 정보를 다시 읽는 중. 그동안 안내는 열어 둔 채 기다린다고 알린다 */
  const [isConfirming, setIsConfirming] = useState(false);

  /*
    사용자 정보를 다시 읽고 그것이 화면에 반영된 뒤에 닫는다(closeAfterRefresh).

    예전에는 닫고 나서 읽어서, 안내가 걷힌 화면이 잠깐 옛 정보(미설치)로 그려졌다. 다시
    읽는 이유는 둘이다 — 설치 여부를 화면에 맞추고, 저장된 정보에 옛 만료 플래그가 남지
    않게 한다. 서버가 늦거나 실패해도 정해 둔 시간이 지나면 닫는다.
  */
  const finishInstall = useCallback(async () => {
    setIsConfirming(true);
    try {
      await closeAfterRefresh({
        refresh: refreshUserInfoInBackground,
        close: () => setOpen(false),
      });
    } finally {
      setIsConfirming(false);
    }
  }, []);

  const handleInstallSuccess = useCallback(
    (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== GITHUB_APP_INSTALL_SUCCESS_MESSAGE) return;
      void finishInstall();
    },
    [finishInstall],
  );

  useEffect(() => {
    window.addEventListener('message', handleInstallSuccess);
    return () => window.removeEventListener('message', handleInstallSuccess);
  }, [handleInstallSuccess]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result =
        promptMode === 'reauthorize'
          ? await fetchGitHubAppReauthorizeUrl()
          : await fetchGitHubAppInstallUrl();
      if (!result?.data?.url) return;

      /*
        시연에서는 브라우저 팝업 대신 시연 빌드 안의 재현 화면을 띄운다(demo/githubWindow).
        설치를 누르면 실제 팝업의 `/auth/app-callback` 이 하던 일(설치 콜백)을 이 창에서
        하고, 그 뒤는 실제 팝업이 성공을 알렸을 때와 같은 길(finishInstall)로 간다 — 사용자
        정보를 다시 읽고 화면에 반영된 뒤에 닫는다.

        재현 화면이 떠 있는 동안 이 안내는 뒤에 그대로 남는다. 실제 팝업도 그렇다.
        재인증 화면은 재현하지 않는다 — 시연 사용자는 만료되지 않는다.
      */
      if (IS_DEMO) {
        setIsLoading(false);
        if (promptMode === 'install') {
          if (!(await runDemoGitHubWindow('install'))) return;
          await completeGitHubAppCallback({ installation_id: 'demo', setup_action: 'install' });
        }
        await finishInstall();
        return;
      }

      window.open(result.data.url, GITHUB_APP_INSTALL_POPUP_NAME, GITHUB_OAUTH_POPUP_FEATURES);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open || pathname === '/') return null;

  const copy = PROMPT_COPY[promptMode];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-[2px]" />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-[400px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.12)]"
      >
        <div className="border-b border-[#f1f5f9] bg-[#fafafa] px-6 pb-5 pt-8 text-center">
          <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] ring-1 ring-[#e5e7eb]">
            <GitBranch className="size-5 text-[#0f172a]" strokeWidth={1.75} aria-hidden />
          </span>
          <h2 className="mt-4 text-[20px] font-semibold tracking-tight text-[#0f172a]">
            {copy.title}
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#64748b]">{copy.description}</p>
        </div>

        <div className="px-6 py-5">
          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={isLoading || isConfirming}
            data-demo="github-app-confirm"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f172a] py-3 text-[14px] font-semibold text-white transition hover:bg-[#1e293b] disabled:opacity-50"
          >
            <GitBranch className="size-4" strokeWidth={1.75} aria-hidden />
            {isConfirming ? '확인하는 중...' : isLoading ? '로딩 중...' : copy.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GitHubAppInstallPromptDialog;
