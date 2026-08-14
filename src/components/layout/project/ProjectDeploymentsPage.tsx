import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getDeploymentFailureAnalysis,
  getDeploymentLogs,
  getProjectDeploymentCandidateList,
  postDeploymentFailureAnalysis,
  postDeploymentRetry,
  postProjectDeploymentCreate,
  useProjectDeploymentListQuery,
} from '@/api/deployments';

type ProjectDeploymentsPageProps = {
  projectId: number;
};

const skeletonItems = Array.from({ length: 4 }, (_, index) => `deploy-skeleton-${index}`);

function ProjectDeploymentsPage({ projectId }: ProjectDeploymentsPageProps) {
  const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(null);
  const [versionName, setVersionName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: deployments = [], isLoading } = useProjectDeploymentListQuery(
    'project-deployments-page',
    projectId,
  );
  const { data: candidates = [] } = useQuery({
    queryKey: ['project-deployment-candidates', projectId],
    queryFn: () => getProjectDeploymentCandidateList(projectId),
    enabled: !!projectId,
    gcTime: 0,
  });
  const { data: logs, isLoading: isLogsLoading } = useQuery({
    queryKey: ['deployment-logs', selectedHistoryId],
    queryFn: () => getDeploymentLogs(selectedHistoryId as number),
    enabled: selectedHistoryId != null,
    gcTime: 0,
  });
  const { data: analysis } = useQuery({
    queryKey: ['deployment-failure-analysis', selectedHistoryId],
    queryFn: () => getDeploymentFailureAnalysis(selectedHistoryId as number),
    enabled: selectedHistoryId != null,
    gcTime: 0,
    retry: false,
  });

  const invalidateDeployments = () => {
    void queryClient.invalidateQueries({ queryKey: ['project-deployment-list'] });
  };

  const deployMutation = useMutation({
    mutationFn: () =>
      postProjectDeploymentCreate(projectId, {
        deployTargetType: versionName ? 'VERSION' : 'LATEST',
        versionName: versionName || '',
      }),
    onSuccess: invalidateDeployments,
  });
  const retryMutation = useMutation({
    mutationFn: postDeploymentRetry,
    onSuccess: invalidateDeployments,
  });
  const analyzeMutation = useMutation({
    mutationFn: postDeploymentFailureAnalysis,
    onSuccess: (_, deploymentId) => {
      void queryClient.invalidateQueries({
        queryKey: ['deployment-failure-analysis', deploymentId],
      });
    },
  });

  const handleDeploy = async () => {
    setFormError(null);
    try {
      await deployMutation.mutateAsync();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : '배포 요청에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">배포 요청</h2>
        <p className="mt-1 text-[13px] text-[#64748b]">
          최신 커밋 또는 선택한 버전으로 배포합니다.
        </p>
        {formError ? <p className="mt-3 text-[12px] text-[#dc2626]">{formError}</p> : null}
        <div className="mt-4 flex flex-wrap items-end gap-2">
          <label className="flex min-w-[220px] flex-1 flex-col gap-1 text-[12px] font-medium text-[#475569]">
            배포 버전
            <select
              value={versionName}
              onChange={(event) => setVersionName(event.target.value)}
              className="h-9 rounded-lg border border-[#e5e7eb] bg-white px-3 text-[13px] text-[#334155]"
            >
              <option value="">최신 (LATEST)</option>
              {candidates.map((candidate) => (
                <option key={candidate.versionId} value={candidate.versionName}>
                  {candidate.versionName} · {candidate.title || candidate.commitSha}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            disabled={deployMutation.isPending}
            onClick={() => void handleDeploy()}
            className="h-9 rounded-lg bg-[#0f172a] px-4 text-[13px] font-semibold text-white disabled:opacity-50"
          >
            {deployMutation.isPending ? '요청 중' : '배포'}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">배포 이력</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {isLoading ? (
            skeletonItems.map((key) => (
              <li key={key} className="h-16 animate-pulse rounded-xl bg-[#f8fafc]" />
            ))
          ) : deployments.length === 0 ? (
            <li className="rounded-xl border border-dashed border-[#e2e8f0] px-4 py-8 text-center text-[13px] text-[#94a3b8]">
              배포 이력이 없습니다.
            </li>
          ) : (
            deployments.map((item) => {
              const isSelected = selectedHistoryId === item.historyId;

              return (
                <li key={item.historyId} className="rounded-xl border border-[#f1f5f9]">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedHistoryId((current) =>
                        current === item.historyId ? null : item.historyId,
                      )
                    }
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <div>
                      <p className="text-[13px] font-semibold text-[#0f172a]">
                        {item.versionLabel || item.deployTargetType}
                      </p>
                      <p className="mt-1 text-[11px] text-[#94a3b8]">
                        {item.status} · {item.triggeredAt}
                      </p>
                    </div>
                    <span className="text-[12px] text-[#64748b]">
                      {item.deployedUrl || 'URL 없음'}
                    </span>
                  </button>
                  {isSelected ? (
                    <div className="border-t border-[#f1f5f9] px-4 py-3">
                      <div className="mb-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => retryMutation.mutate(item.historyId)}
                          className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
                        >
                          재시도
                        </button>
                        <button
                          type="button"
                          onClick={() => analyzeMutation.mutate(item.historyId)}
                          className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
                        >
                          실패 분석
                        </button>
                      </div>
                      {analysis?.summary ? (
                        <p className="mb-2 text-[12px] text-[#7c3aed]">{analysis.summary}</p>
                      ) : null}
                      {isLogsLoading ? (
                        <div className="h-24 animate-pulse rounded bg-[#f8fafc]" />
                      ) : (
                        <pre className="max-h-56 overflow-auto rounded-lg bg-[#0f172a] p-3 text-[11px] text-[#e2e8f0]">
                          {logs?.logText || '로그가 없습니다.'}
                        </pre>
                      )}
                    </div>
                  ) : null}
                </li>
              );
            })
          )}
        </ul>
      </section>
    </div>
  );
}

export default ProjectDeploymentsPage;
