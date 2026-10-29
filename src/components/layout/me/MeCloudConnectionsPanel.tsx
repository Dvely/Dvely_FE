import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteCloudConnection,
  getCloudConnectionHealth,
  postCloudConnectionVerificationJob,
  putCloudConnectionCredentials,
  useCloudConnectionListQuery,
  useCloudConnectionVerificationJobQuery,
} from '@/api/cloudConnections';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import CloudConnectionCreateForm from '@/components/layout/me/CloudConnectionCreateForm';
import { cloudConnectionStatusLabel } from '@/lib/cloudConnectionStatus';

const skeletonItems = Array.from({ length: 3 }, (_, index) => `cloud-skeleton-${index}`);

/** 서버가 막아 주지 않는 경우에 대비한 기본 경고. 409 message 가 오면 그쪽이 더 정확하다 */
const RELEASE_WARNING =
  '이 연결로 만든 DB·서버·CDN 은 함께 정리되지 않습니다. 해제하면 Qeploy 화면에서는 사라지지만 AWS 계정에는 남아 계속 과금됩니다. 프로젝트에서 자원을 먼저 정리한 뒤 해제해 주세요.';

type MeCloudConnectionsPanelProps = {
  /**
   * 새 연결이 검증까지 끝나 쓸 수 있게 됐을 때. 프로젝트에서 연결하러 온 경우에만 온다.
   *
   * 등록 응답에서 부르지 않는다 — 등록은 형식만 본 것이고(VALIDATED) 실제 권한은 검증
   * Job 이 끝나야 안다. 권한이 모자란 연결을 들고 돌아가면 배포에서 다시 막힌다.
   */
  onConnected?: () => void;
};

function MeCloudConnectionsPanel({ onConnected }: MeCloudConnectionsPanelProps) {
  /** 상태 확인(health) 결과. 등록 폼의 오류는 폼이 따로 말한다 */
  const [healthNotice, setHealthNotice] = useState<string | null>(null);
  /** 해제를 한 번 누른 연결. 두 번째 누름에서만 실제로 지운다 */
  const [pendingRelease, setPendingRelease] = useState<number | null>(null);
  /**
   * 해제 실패 사유. 위쪽 formError 가 아니라 **누른 행 안에서** 보여준다 — 서버가 보내는
   * 409 는 "DB 1개, CloudFront 도메인 2개" 처럼 그 연결에 대한 말이고, 화면 맨 위로
   * 올려 보내면 어느 연결 이야기인지가 사라진다.
   */
  const [releaseError, setReleaseError] = useState<string | null>(null);
  /*
    자격 교체를 열어 둔 연결. 한 번에 하나만 연다 — 검증 Job 폴링이 하나라서,
    여러 행을 동시에 열면 어느 행의 결과인지 화면이 말할 수 없다.
  */
  const [replaceTarget, setReplaceTarget] = useState<number | null>(null);
  const [replaceKeyId, setReplaceKeyId] = useState('');
  const [replaceSecret, setReplaceSecret] = useState('');
  const [replaceError, setReplaceError] = useState<string | null>(null);
  const [verifyingJobId, setVerifyingJobId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: connections = [], isLoading } = useCloudConnectionListQuery('me-cloud-connections');
  /*
    자격을 바꿨다고 끝이 아니다. 맞는 자격인지는 서버가 검증 Job 을 돌려 봐야 알고,
    그동안 연결 상태는 그대로다. 끝날 때까지 읽는다.
  */
  const { data: verificationJob } = useCloudConnectionVerificationJobQuery(
    'me-cloud-credentials',
    verifyingJobId,
  );
  const verificationDone =
    verificationJob?.status === 'SUCCEEDED' || verificationJob?.status === 'FAILED';
  /*
    지금 화면에 없는 목록까지 바로 읽는다(`refetchType: 'all'`). 프로젝트의 연결 안내가 같은
    목록을 쓰는데, 기본값이면 돌아간 뒤에야 읽어서 방금 만든 연결이 잠깐 안 보인다.
  */
  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ['cloud-connection-list'], refetchType: 'all' });
  };

  // 검증이 끝나면 목록의 상태도 바뀌어 있다
  useEffect(() => {
    if (!verificationDone) return;
    void queryClient.invalidateQueries({ queryKey: ['cloud-connection-list'], refetchType: 'all' });
  }, [verificationDone, queryClient]);

  const closeReplace = () => {
    setReplaceTarget(null);
    setReplaceKeyId('');
    setReplaceSecret('');
    setReplaceError(null);
    setVerifyingJobId(null);
  };

  /*
    자격 교체. **새 연결을 만드는 길과 다르다** — 자격이 만료됐을 때 새로 만들면 기존
    연결로 만든 DB·서버·CDN 을 지울 자격이 사라져 AWS 에 과금 자원으로 남는다. 연결
    id 와 리전은 그대로 두고 자격만 갈아 끼운다.

    역할 ARN 은 여기서 받지 않는다. 이 패널은 액세스 키로만 연결을 만들고, 위임 설정은
    콘솔에서 따로 밟아야 하는 일이라 교체 한 칸으로 끝나지 않는다.
  */
  const replaceMutation = useMutation({
    mutationFn: (cloudConnectionId: number) =>
      putCloudConnectionCredentials(cloudConnectionId, {
        awsCredentialType: 'ACCESS_KEY',
        accountId: '',
        roleArn: '',
        accessKeyId: replaceKeyId.trim(),
        secretAccessKey: replaceSecret.trim(),
      }),
    onSuccess: (job) => {
      setReplaceError(null);
      setReplaceKeyId('');
      setReplaceSecret('');
      setVerifyingJobId(job.jobId);
    },
    onError: (error) => {
      setReplaceError(composeApiErrorMessage(error, '자격을 교체하지 못했습니다.'));
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

  const handleHealth = async (cloudConnectionId: number) => {
    try {
      const health = await getCloudConnectionHealth(cloudConnectionId);
      setHealthNotice(`health: ${health.status}${health.message ? ` · ${health.message}` : ''}`);
    } catch (error) {
      setHealthNotice(composeApiErrorMessage(error, 'health 조회에 실패했습니다.'));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <p className="text-[13px] leading-relaxed text-[#64748b]">
          AWS/GCP 계정을 연결하면 프로젝트 인프라 설정에서 선택할 수 있습니다.
        </p>
        {healthNotice ? (
          <p className="mt-3 text-[12px] whitespace-pre-line text-[#7c3aed]">{healthNotice}</p>
        ) : null}
        <div className="mt-4">
          <CloudConnectionCreateForm onVerified={onConnected ? () => onConnected() : undefined} />
        </div>
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
                    {connection.provider} · {connection.region} ·{' '}
                    {cloudConnectionStatusLabel(connection.status)}
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
                {replaceTarget === connection.cloudConnectionId ? (
                  <div className="flex w-full flex-col gap-2 rounded-xl bg-[#f8fafc] px-3 py-2.5">
                    {verifyingJobId ? (
                      /* 보낸 뒤. 맞는 자격인지는 서버가 검증을 끝내야 안다 */
                      <>
                        <p className="text-[12px] leading-relaxed whitespace-pre-line text-[#334155]">
                          {verificationDone
                            ? (verificationJob?.message ??
                              (verificationJob?.status === 'SUCCEEDED'
                                ? '새 자격으로 연결했습니다.'
                                : '새 자격으로 연결하지 못했습니다.'))
                            : '새 자격을 확인하는 중입니다. 잠시 걸립니다.'}
                        </p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={closeReplace}
                            className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
                          >
                            {verificationDone ? '닫기' : '숨기기'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-[12px] leading-relaxed text-[#334155]">
                          새 Access Key 를 넣으면 이 연결의 자격만 바뀝니다. 연결과 리전은 그대로라,
                          이 연결로 만든 DB·서버·CDN 을 계속 관리할 수 있습니다.
                        </p>
                        {/* 목록 안이라 id 가 겹치지 않게 연결 id 를 붙인다 */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor={`replace-key-id-${connection.cloudConnectionId}`}
                            className="text-[12px] font-medium text-[#475569]"
                          >
                            새 Access Key ID
                          </label>
                          <input
                            id={`replace-key-id-${connection.cloudConnectionId}`}
                            value={replaceKeyId}
                            onChange={(event) => setReplaceKeyId(event.target.value)}
                            placeholder="AKIA…"
                            className="h-9 rounded-lg border border-[#e5e7eb] bg-white px-3 text-[13px]"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor={`replace-secret-${connection.cloudConnectionId}`}
                            className="text-[12px] font-medium text-[#475569]"
                          >
                            새 Secret Access Key
                          </label>
                          <input
                            id={`replace-secret-${connection.cloudConnectionId}`}
                            type="password"
                            autoComplete="new-password"
                            value={replaceSecret}
                            onChange={(event) => setReplaceSecret(event.target.value)}
                            className="h-9 rounded-lg border border-[#e5e7eb] bg-white px-3 text-[13px]"
                          />
                        </div>
                        {replaceError ? (
                          <p className="text-[12px] leading-relaxed whitespace-pre-line text-[#b91c1c]">
                            {replaceError}
                          </p>
                        ) : null}
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={
                              replaceMutation.isPending ||
                              !replaceKeyId.trim() ||
                              !replaceSecret.trim()
                            }
                            onClick={() => replaceMutation.mutate(connection.cloudConnectionId)}
                            className="h-8 rounded-lg bg-[#0f172a] px-3 text-[12px] font-semibold text-white disabled:opacity-50"
                          >
                            {replaceMutation.isPending ? '보내는 중' : '자격 교체'}
                          </button>
                          <button
                            type="button"
                            onClick={closeReplace}
                            className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
                          >
                            취소
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : pendingRelease === connection.cloudConnectionId ? (
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
                  <div className="flex flex-wrap gap-2">
                    {/*
                      자격이 깨진 연결에만 내놓는다. 이 자리에 "새로 등록" 으로 가는 길을
                      두면 안 된다 — 새 연결을 만들면 이 연결로 만든 DB·서버·CDN 을 지울
                      자격이 사라져 AWS 에 과금 자원으로 남는다.
                    */}
                    {connection.provider === 'AWS' && connection.status === 'INVALID_CREDENTIAL' ? (
                      <button
                        type="button"
                        onClick={() => {
                          setHealthNotice(null);
                          setReleaseError(null);
                          setPendingRelease(null);
                          setReplaceError(null);
                          setVerifyingJobId(null);
                          setReplaceTarget(connection.cloudConnectionId);
                        }}
                        className="h-8 rounded-lg bg-[#0f172a] px-3 text-[12px] font-semibold text-white"
                      >
                        자격 교체
                      </button>
                    ) : null}
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
                        setHealthNotice(null);
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
