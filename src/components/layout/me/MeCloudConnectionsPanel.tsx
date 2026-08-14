import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteCloudConnection,
  getCloudConnectionHealth,
  postCloudConnectionCreate,
  postCloudConnectionVerificationJob,
  useCloudConnectionListQuery,
} from '@/api/cloudConnections';
import type { CloudProvider } from '@/types/common.enum';

const skeletonItems = Array.from({ length: 3 }, (_, index) => `cloud-skeleton-${index}`);

function MeCloudConnectionsPanel() {
  const [provider, setProvider] = useState<CloudProvider>('AWS');
  const [displayName, setDisplayName] = useState('');
  const [region, setRegion] = useState('');
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: connections = [], isLoading } = useCloudConnectionListQuery('me-cloud-connections');

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ['cloud-connection-list'] });
  };

  const createMutation = useMutation({
    mutationFn: () =>
      postCloudConnectionCreate({
        provider,
        displayName,
        region,
        accountId: '',
        roleArn: '',
        awsCredentialType: provider === 'AWS' ? 'ACCESS_KEY' : null,
        accessKeyId,
        secretAccessKey,
        sessionToken: '',
        gcpCredentialType: provider === 'GCP' ? 'SERVICE_ACCOUNT_KEY' : null,
        serviceAccountKeyJson: provider === 'GCP' ? secretAccessKey : '',
        projectId: '',
        serviceAccountEmail: '',
      }),
    onSuccess: () => {
      setDisplayName('');
      setRegion('');
      setAccessKeyId('');
      setSecretAccessKey('');
      invalidate();
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteCloudConnection,
    onSuccess: invalidate,
  });

  const handleCreate = async () => {
    setFormError(null);
    try {
      await createMutation.mutateAsync();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : '클라우드 연결에 실패했습니다.');
    }
  };

  const handleHealth = async (cloudConnectionId: number) => {
    try {
      const health = await getCloudConnectionHealth(cloudConnectionId);
      setFormError(`health: ${health.status}${health.message ? ` · ${health.message}` : ''}`);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'health 조회에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <p className="text-[13px] leading-relaxed text-[#64748b]">
          AWS/GCP 계정을 연결하면 프로젝트 인프라 설정에서 선택할 수 있습니다.
        </p>
        {formError ? <p className="mt-3 text-[12px] text-[#7c3aed]">{formError}</p> : null}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <select
            value={provider}
            onChange={(event) => setProvider(event.target.value as CloudProvider)}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          >
            <option value="AWS">AWS</option>
            <option value="GCP">GCP</option>
          </select>
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="표시 이름"
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
          <input
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            placeholder="리전"
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
          <input
            value={accessKeyId}
            onChange={(event) => setAccessKeyId(event.target.value)}
            placeholder={provider === 'AWS' ? 'Access Key ID' : '프로젝트/계정 ID'}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
          <input
            type="password"
            value={secretAccessKey}
            onChange={(event) => setSecretAccessKey(event.target.value)}
            placeholder={provider === 'AWS' ? 'Secret Access Key' : 'Service Account JSON'}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px] sm:col-span-2"
          />
        </div>
        <button
          type="button"
          disabled={createMutation.isPending}
          onClick={() => void handleCreate()}
          className="mt-3 h-9 rounded-lg bg-[#0f172a] px-4 text-[13px] font-semibold text-white disabled:opacity-50"
        >
          연결 등록
        </button>
      </section>

      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h3 className="text-[14px] font-bold text-[#0f172a]">등록된 연결</h3>
        <ul className="mt-3 flex flex-col gap-2">
          {isLoading ? (
            skeletonItems.map((key) => (
              <li key={key} className="h-14 animate-pulse rounded-xl bg-[#f8fafc]" />
            ))
          ) : connections.length === 0 ? (
            <li className="rounded-xl border border-dashed border-[#e2e8f0] px-4 py-8 text-center text-[13px] text-[#94a3b8]">
              등록된 클라우드 연결이 없습니다.
            </li>
          ) : (
            connections.map((connection) => (
              <li
                key={connection.cloudConnectionId}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#f1f5f9] px-4 py-3"
              >
                <div>
                  <p className="text-[13px] font-semibold text-[#0f172a]">
                    {connection.displayName}
                  </p>
                  <p className="text-[11px] text-[#94a3b8]">
                    {connection.provider} · {connection.region} · {connection.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void handleHealth(connection.cloudConnectionId)}
                    className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
                  >
                    Health
                  </button>
                  <button
                    type="button"
                    onClick={() => postCloudConnectionVerificationJob(connection.cloudConnectionId)}
                    className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
                  >
                    재검증
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteMutation.mutate(connection.cloudConnectionId)}
                    className="h-8 rounded-lg border border-[#fecaca] px-3 text-[12px] font-semibold text-[#dc2626]"
                  >
                    해제
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

export default MeCloudConnectionsPanel;
