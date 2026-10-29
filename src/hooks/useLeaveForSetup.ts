import { useCallback } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { SETUP_DRAFT_TTL_MS, stashComposerDraftFromDom } from '@/lib/composerDraft';

/**
 * 프로젝트 밖에서 마쳐야 하는 준비가 있는 곳. 키·연결은 설정(`/settings`)에, 처음 쓰는
 * 사람용 안내는 `/onboarding/cloud` 에 있다. 오류 안내가 고르는 곳도 여기로 온다
 * (apiErrorGuide 의 navigate).
 */
type SetupDestination = { to: string; search?: Record<string, string> };

/**
 * 하던 자리를 들고 준비하러 나간다.
 *
 * 두 가지를 챙긴다. 돌아올 자리(`returnTo`)와 **적던 말**이다. 화면을 옮기면 입력창이
 * 통째로 사라지므로, 새로고침 때 쓰던 맡김 저장소에 맡겨 두고 돌아오면 그 자리에서
 * 되찾는다. 설정 왕복은 새로고침보다 오래 걸려서 오래 맡긴다.
 *
 * 입력창이 없는 화면(인프라 탭 등)에서 불러도 된다 — 맡길 것이 없으면 그냥 지나간다.
 */
function useLeaveForSetup(returnPath: string) {
  const navigate = useNavigate();

  return useCallback(
    ({ to, search }: SetupDestination) => {
      stashComposerDraftFromDom(SETUP_DRAFT_TTL_MS);
      void navigate({ to, search: { ...search, returnTo: returnPath } });
    },
    [navigate, returnPath],
  );
}

/**
 * 지금 화면을 돌아올 자리로 쓴다. 인프라·배포 탭처럼 대화가 없는 화면은 주소가 곧 자리다.
 * 에이전트 화면은 보던 대화가 주소에 없으므로 이걸 쓰지 않고 agentReturnPath 를 쓴다.
 */
function useCurrentPath(): string {
  return useRouterState({ select: (state) => state.location.href });
}

export { useCurrentPath, useLeaveForSetup, type SetupDestination };
