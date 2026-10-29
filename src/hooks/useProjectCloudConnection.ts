import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjectInfrastructureSettings, putProjectInfrastructureSettings } from '@/api/projects';

/**
 * 이 프로젝트가 쓰는 클라우드 연결과, 그것을 고르는 일.
 *
 * 인프라 탭·연결 안내·연결 시트가 같은 키를 쓴다 — 한 곳에서 고르면 나머지도 같이 바뀐다.
 */
function useProjectCloudConnection(projectId: number) {
  const queryClient = useQueryClient();
  const { data: infraSettings, isLoading } = useQuery({
    queryKey: ['project-infra-settings', projectId],
    queryFn: () => getProjectInfrastructureSettings(projectId),
    enabled: !!projectId,
    gcTime: 0,
  });
  const select = useMutation({
    mutationFn: (cloudConnectionId: number) =>
      putProjectInfrastructureSettings(projectId, { cloudConnectionId }),
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: ['project-infra-settings', projectId] }),
  });

  return {
    selectedConnectionId: infraSettings?.cloudConnectionId ?? null,
    isLoading,
    select,
  };
}

export { useProjectCloudConnection };
