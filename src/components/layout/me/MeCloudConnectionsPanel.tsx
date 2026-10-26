import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteCloudConnection,
  getCloudConnectionHealth,
  postCloudConnectionCreate,
  postCloudConnectionVerificationJob,
  useCloudConnectionListQuery,
} from '@/api/cloudConnections';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import type { CloudProvider } from '@/types/common.enum';

const skeletonItems = Array.from({ length: 3 }, (_, index) => `cloud-skeleton-${index}`);

/** 서버가 막아 주지 않는 경우에 대비한 기본 경고. 409 message 가 오면 그쪽이 더 정확하다 */
const RELEASE_WARNING =
  '이 연결로 만든 DB·서버·CDN 은 함께 정리되지 않습니다. 해제하면 Qeploy 화면에서는 사라지지만 AWS 계정에는 남아 계속 과금됩니다. 프로젝트에서 자원을 먼저 정리한 뒤 해제해 주세요.';

function MeCloudConnectionsPanel() {
  const [provider, setProvider] = useState<CloudProvider>('AWS');
  const [displayName, setDisplayName] = useState('');
  const [region, setRegion] = useState('');
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [accountId, setAccountId] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  /** 해제를 한 번 누른 연결. 두 번째 누름에서만 실제로 지운다 */
  const [pendingRelease, setPendingRelease] = useState<number | null>(null);
  /**
   * 해제 실패 사유. 위쪽 formError 가 아니라 **누른 행 안에서** 보여준다 — 서버가 보내는
   * 409 는 "DB 1개, CloudFront 도메인 2개" 처럼 그 연결에 대한 말이고, 화면 맨 위로
   * 올려 보내면 어느 연결 이야기인지가 사라진다.
   */
  const [releaseError, setReleaseError] = useState<string | null>(null);

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
        accountId: provider === 'AWS' ? accountId.trim() : '',
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
      setAccountId('');
      invalidate();
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteCloudConnection,
    onSuccess: () => {
      setPendingRelease(null);
      setReleaseError(null);
      invalidate();
    },
    /*
      서버 message 를 그대로 띄운다. 자원이 남은 연결은 409 로 막히고, 그 문구가 무엇이
      몇 개 남았는지까지 말해 준다 — FE 가 세어 볼 수 없는 값이라 저희 문구로 대신할 수
      없다. 확인 상자는 닫지 않는다. 닫으면 방금 읽어야 할 말이 사라진다.
    */
    onError: (error) => {
      setReleaseError(composeApiErrorMessage(error, '연결을 해제하지 못했습니다.'));
    },
  });

  const handleCreate = async () => {
    setFormError(null);
    try {
      await createMutation.mutateAsync();
    } catch (error) {
      setFormError(composeApiErrorMessage(error, '클라우드 연결에 실패했습니다.'));
    }
  };

  const handleHealth = async (cloudConnectionId: number) => {
    try {
      const health = await getCloudConnectionHealth(cloudConnectionId);
      setFormError(`health: ${health.status}${health.message ? ` · ${health.message}` : ''}`);
    } catch (error) {
      setFormError(composeApiErrorMessage(error, 'health 조회에 실패했습니다.'));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <p className="text-[13px] leading-relaxed text-[#64748b]">
          AWS/GCP 계정을 연결하면 프로젝트 인프라 설정에서 선택할 수 있습니다.
        </p>
        {formError ? (
          <p className="mt-3 text-[12px] whitespace-pre-line text-[#7c3aed]">{formError}</p>
        ) : null}
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
          {/*
            AWS 전용 칸. GCP 는 계정 ID 를 키 JSON 에서 뽑는다.

            accountId 는 서버가 아티팩트 버킷 이름을 qeploy-artifacts-{accountId}-{region}
            으로 짓는 데 쓴다. 비워 보내면 이름에 계정 부분이 통째로 빠져서, 서로 다른
            계정이 같은 버킷 이름을 노리게 된다(S3 이름은 전역이라 그 순간 충돌한다).

            **Session Token 칸은 없다.** 전에는 여기 있었고 "ASIA 로 시작하면 넣어야 한다" 고
            안내까지 했는데, 서버가 그 반대로 바뀌었다 — 임시 자격(ASIA)은 입력 시점에
            거절하고, 장기 키(AKIA)에 세션 토큰이 붙어 있어도 거절한다(#429 A안,
            CloudConnectionCommandService#validateAwsAccessKey). 즉 무엇을 넣어도 400 이라
            칸이 있는 것 자체가 실패로 가는 길이었다.

            payload 의 sessionToken 은 빈 문자열로 고정해 남겨 둔다. 서버가 거절하는 것은
            "값이 있는" 경우이고, 필드 자체는 이미 저장된 임시 자격 때문에 서버에 남아 있다.
          */}
          {provider === 'AWS' ? (
            <input
              value={accountId}
              onChange={(event) => setAccountId(event.target.value)}
              inputMode="numeric"
              placeholder="AWS 계정 ID (12자리)"
              className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
            />
          ) : null}
        </div>
        {provider === 'AWS' ? (
          <p className="mt-2 text-[12px] leading-relaxed text-[#94a3b8]">
            <span className="font-mono">AKIA</span>로 시작하는 IAM 사용자의 장기 Access Key를
            넣어주세요. <span className="font-mono">ASIA</span>로 시작하는 임시 자격(SSO·AWS
            Academy)은 만료되는 값이라 등록되지 않습니다.
          </p>
        ) : null}
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
                {/*
                  해제는 **한 번 클릭으로 나가면 안 된다.** 서버의 DELETE 는 연결 행만
                  지운다 — 그 연결로 만든 DB·서버·CDN 에서 연결로 걸린 외래키가 없어서,
                  지운 뒤에는 Qeploy 화면에서 보이지 않으면서 AWS 에서는 계속 돈이 나가는
                  자원이 된다. 자격이 만료돼 화면이 빨간 사용자가 가장 누르기 쉬운 버튼이
                  이것이라서, 확인 단계 없이 두면 사고가 아니라 설계다.

                  서버가 살아 있는 자원을 보고 409 로 막아 주게 되면, 이 자리는 그 message
                  를 그대로 보여주는 자리로 바꾸면 된다(그때는 몇 개가 남았는지까지 말해
                  줄 수 있다). 지금은 FE 가 자원 개수를 모르므로 결과만 말한다.
                */}
                {pendingRelease === connection.cloudConnectionId ? (
                  <div className="flex w-full flex-col gap-2 rounded-xl bg-[#fef2f2] px-3 py-2">
                    <p className="text-[12px] leading-relaxed whitespace-pre-line text-[#b91c1c]">
                      {releaseError ?? RELEASE_WARNING}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={deleteMutation.isPending}
                        onClick={() => deleteMutation.mutate(connection.cloudConnectionId)}
                        className="h-8 rounded-lg bg-[#dc2626] px-3 text-[12px] font-semibold text-white disabled:opacity-50"
                      >
                        그래도 해제
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPendingRelease(null);
                          setReleaseError(null);
                        }}
                        className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
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
                      onClick={() =>
                        postCloudConnectionVerificationJob(connection.cloudConnectionId)
                      }
                      className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
                    >
                      재검증
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormError(null);
                        setReleaseError(null);
                        setPendingRelease(connection.cloudConnectionId);
                      }}
                      className="h-8 rounded-lg border border-[#fecaca] px-3 text-[12px] font-semibold text-[#dc2626]"
                    >
                      해제
                    </button>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

export default MeCloudConnectionsPanel;
