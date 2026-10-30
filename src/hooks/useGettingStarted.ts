import { useMemo, useSyncExternalStore } from 'react';
import { useAiCredentialListQuery } from '@/api/aiCredentials';
import { useProjectConversationListQuery } from '@/api/chat';
import { useCloudConnectionListQuery } from '@/api/cloudConnections';
import { useProjectListQuery, useProjectRepositorySettingsQuery } from '@/api/projects';
import { useUserInfoQuery } from '@/api/user';
import {
  computeGettingStarted,
  isGettingStartedHidden,
  setGettingStartedHidden,
  subscribeGettingStartedHidden,
} from '@/lib/gettingStarted';

const QUERY_KEY = 'getting-started';

/**
 * 시작하기 단계와 진행 상태. 서버 데이터에서 계산한다(lib/gettingStarted 참고).
 *
 * 다른 화면이 이미 쓰는 쿼리를 같은 키 앞부분으로 다시 쓴다 — 키를 등록하거나 프로젝트를
 * 만들면 그 화면이 무효화하는 키가 여기에도 걸려서, 진행 상태가 따로 놀지 않는다.
 */
function useGettingStarted() {
  const { data: userResponse } = useUserInfoQuery(QUERY_KEY);
  const { data: credentials } = useAiCredentialListQuery(QUERY_KEY);
  const { data: projects } = useProjectListQuery(QUERY_KEY);
  const { data: connections } = useCloudConnectionListQuery(QUERY_KEY);

  // 가장 최근에 손댄 프로젝트. 프로젝트에 매인 단계는 이 프로젝트를 본다
  const latestProject = useMemo(
    () =>
      [...(projects ?? [])].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )[0] ?? null,
    [projects],
  );
  const latestProjectId = latestProject?.projectId ?? Number.NaN;
  const { data: conversations } = useProjectConversationListQuery(QUERY_KEY, latestProjectId);
  const { data: repository } = useProjectRepositorySettingsQuery(QUERY_KEY, latestProjectId);

  const progress = useMemo(
    () =>
      computeGettingStarted({
        githubAppInstalled: userResponse?.data?.githubAppInstalled,
        aiCredentialCount: credentials?.length,
        projectCount: projects?.length,
        latestProjectConversationCount: conversations?.filter((item) => !item.deleted).length,
        latestProjectRepositoryConnected: repository?.connected,
        verifiedCloudConnectionCount: connections?.filter((item) => item.status === 'CONNECTED')
          .length,
        deployedProjectCount: projects?.filter((item) => Boolean(item.currentUrl)).length,
      }),
    [userResponse, credentials, projects, conversations, repository, connections],
  );

  return { ...progress, latestProjectId: latestProject?.projectId ?? null };
}

/** 시작하기를 숨겼는지. 홈 카드와 사이드바가 같은 값을 본다 */
function useGettingStartedHidden() {
  const hidden = useSyncExternalStore(
    subscribeGettingStartedHidden,
    isGettingStartedHidden,
    () => false,
  );
  return [hidden, setGettingStartedHidden] as const;
}

export { useGettingStarted, useGettingStartedHidden };
