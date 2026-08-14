import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCloudConnectionListQuery } from '@/api/cloudConnections';
import {
  deleteProjectCostBudget,
  deleteProjectInfrastructureSettings,
  getProjectChatSettings,
  getProjectCostBudget,
  getProjectInfrastructureConfiguration,
  getProjectInfrastructureSettings,
  patchProjectChatSettings,
  putProjectCostBudget,
  putProjectInfrastructureConfiguration,
  putProjectInfrastructureSettings,
} from '@/api/projects';
import type {
  ComputeTier,
  DeploymentArchitecture,
  NetworkAccess,
  StorageType,
} from '@/types/common.enum';

type ProjectInfraPageProps = {
  projectId: number;
};

function ProjectInfraPage({ projectId }: ProjectInfraPageProps) {
  const [budgetAmount, setBudgetAmount] = useState('');
  const [architecture, setArchitecture] = useState<DeploymentArchitecture>('SERVERLESS');
  const [computeTier, setComputeTier] = useState<ComputeTier>('SMALL');
  const [storageType, setStorageType] = useState<StorageType>('NONE');
  const [networkAccess, setNetworkAccess] = useState<NetworkAccess>('PUBLIC');
  const [formError, setFormError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: connections = [], isLoading: isConnectionsLoading } =
    useCloudConnectionListQuery('project-infra-page');
  const { data: infraSettings, isLoading: isInfraLoading } = useQuery({
    queryKey: ['project-infra-settings', projectId],
    queryFn: () => getProjectInfrastructureSettings(projectId),
    enabled: !!projectId,
    gcTime: 0,
  });
  const { data: configuration } = useQuery({
    queryKey: ['project-infra-configuration', projectId],
    queryFn: () => getProjectInfrastructureConfiguration(projectId),
    enabled: !!projectId,
    gcTime: 0,
  });
  const { data: chatSettings } = useQuery({
    queryKey: ['project-chat-settings', projectId],
    queryFn: () => getProjectChatSettings(projectId),
    enabled: !!projectId,
    gcTime: 0,
  });
  const { data: budget } = useQuery({
    queryKey: ['project-cost-budget', projectId],
    queryFn: () => getProjectCostBudget(projectId),
    enabled: !!projectId,
    gcTime: 0,
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ['project-infra-settings', projectId] });
    void queryClient.invalidateQueries({ queryKey: ['project-infra-configuration', projectId] });
    void queryClient.invalidateQueries({ queryKey: ['project-chat-settings', projectId] });
    void queryClient.invalidateQueries({ queryKey: ['project-cost-budget', projectId] });
  };

  const selectConnectionMutation = useMutation({
    mutationFn: (cloudConnectionId: number) =>
      putProjectInfrastructureSettings(projectId, { cloudConnectionId }),
    onSuccess: invalidate,
  });
  const saveConfigMutation = useMutation({
    mutationFn: () =>
      putProjectInfrastructureConfiguration(projectId, {
        deploymentArchitecture: architecture,
        computeTier,
        storageType,
        networkAccess,
      }),
    onSuccess: invalidate,
  });
  const saveBudgetMutation = useMutation({
    mutationFn: () =>
      putProjectCostBudget(projectId, {
        monthlyBudgetAmount: Number(budgetAmount),
        currency: budget?.currency || 'USD',
      }),
    onSuccess: invalidate,
  });

  const handleToggleChat = async (
    field: 'changeApprovalRequired' | 'deploymentApprovalRequired',
  ) => {
    if (!chatSettings) return;
    try {
      await patchProjectChatSettings(projectId, {
        ...chatSettings,
        [field]: !chatSettings[field],
      });
      invalidate();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : '승인 정책을 저장하지 못했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {formError ? <p className="text-[12px] text-[#dc2626]">{formError}</p> : null}

      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">클라우드 연결 선택</h2>
        <p className="mt-1 text-[13px] text-[#64748b]">
          계정에 등록된 BYOC 연결을 이 프로젝트에 사용합니다.
        </p>
        {isInfraLoading || isConnectionsLoading ? (
          <div className="mt-4 h-16 animate-pulse rounded-xl bg-[#f8fafc]" />
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {connections.map((connection) => {
              const selected = infraSettings?.cloudConnectionId === connection.cloudConnectionId;

              return (
                <li
                  key={connection.cloudConnectionId}
                  className="flex items-center justify-between rounded-xl border border-[#f1f5f9] px-4 py-3"
                >
                  <div>
                    <p className="text-[13px] font-semibold text-[#0f172a]">
                      {connection.displayName}
                    </p>
                    <p className="text-[11px] text-[#94a3b8]">
                      {connection.provider} · {connection.region} · {connection.status}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={selected || selectConnectionMutation.isPending}
                    onClick={() => selectConnectionMutation.mutate(connection.cloudConnectionId)}
                    className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold disabled:opacity-50"
                  >
                    {selected ? '선택됨' : '선택'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {infraSettings?.cloudConnectionId ? (
          <button
            type="button"
            onClick={() => {
              void deleteProjectInfrastructureSettings(projectId).then(invalidate);
            }}
            className="mt-3 text-[12px] font-semibold text-[#dc2626]"
          >
            프로젝트 클라우드 연결 해제
          </button>
        ) : null}
      </section>

      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">인프라 구성</h2>
        <p className="mt-1 text-[13px] text-[#64748b]">
          현재 구성: {configuration?.settings?.deploymentArchitecture ?? '미설정'}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <select
            value={architecture}
            onChange={(event) => setArchitecture(event.target.value as DeploymentArchitecture)}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          >
            <option value="SERVER">SERVER</option>
            <option value="CONTAINER">CONTAINER</option>
            <option value="SERVERLESS">SERVERLESS</option>
          </select>
          <select
            value={computeTier}
            onChange={(event) => setComputeTier(event.target.value as ComputeTier)}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          >
            <option value="MICRO">MICRO</option>
            <option value="SMALL">SMALL</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LARGE">LARGE</option>
          </select>
          <select
            value={storageType}
            onChange={(event) => setStorageType(event.target.value as StorageType)}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          >
            <option value="NONE">NONE</option>
            <option value="OBJECT_STORAGE">OBJECT_STORAGE</option>
          </select>
          <select
            value={networkAccess}
            onChange={(event) => setNetworkAccess(event.target.value as NetworkAccess)}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          >
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>
        </div>
        <button
          type="button"
          disabled={saveConfigMutation.isPending}
          onClick={() => saveConfigMutation.mutate()}
          className="mt-3 h-9 rounded-lg bg-[#0f172a] px-4 text-[13px] font-semibold text-white disabled:opacity-50"
        >
          구성 저장
        </button>
      </section>

      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">Chat 승인 정책</h2>
        {chatSettings ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void handleToggleChat('changeApprovalRequired')}
              className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
            >
              코드 변경 승인 {chatSettings.changeApprovalRequired ? 'ON' : 'OFF'}
            </button>
            <button
              type="button"
              onClick={() => void handleToggleChat('deploymentApprovalRequired')}
              className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
            >
              배포 승인 {chatSettings.deploymentApprovalRequired ? 'ON' : 'OFF'}
            </button>
          </div>
        ) : (
          <div className="mt-3 h-8 w-48 animate-pulse rounded bg-[#f8fafc]" />
        )}
      </section>

      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">월 예산</h2>
        <p className="mt-1 text-[13px] text-[#64748b]">
          상태 {budget?.budgetStatus ?? '-'} · 예상 비용 {budget?.estimatedMonthlyCost ?? '-'}
        </p>
        <div className="mt-3 flex gap-2">
          <input
            value={budgetAmount}
            onChange={(event) => setBudgetAmount(event.target.value)}
            placeholder="금액"
            className="h-9 w-40 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
          <button
            type="button"
            onClick={() => saveBudgetMutation.mutate()}
            className="h-9 rounded-lg bg-[#0f172a] px-4 text-[13px] font-semibold text-white"
          >
            예산 저장
          </button>
          <button
            type="button"
            onClick={() => {
              void deleteProjectCostBudget(projectId).then(invalidate);
            }}
            className="h-9 rounded-lg border border-[#e2e8f0] px-4 text-[13px] font-semibold"
          >
            예산 삭제
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProjectInfraPage;
