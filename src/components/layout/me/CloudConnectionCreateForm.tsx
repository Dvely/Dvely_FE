import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postCloudConnectionCreate,
  useCloudConnectionVerificationJobQuery,
} from '@/api/cloudConnections';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import { isCloudConnectionVerified } from '@/lib/cloudConnectionStatus';
import type { CloudProvider } from '@/types/common.enum';

type CloudConnectionCreateFormProps = {
  /**
   * 새 연결이 검증까지 끝나 쓸 수 있게 됐을 때.
   *
   * 등록 응답에서 부르지 않는다 — 등록은 형식만 본 것이고(VALIDATED) 실제 권한은 검증
   * Job 이 끝나야 안다. 권한이 모자란 연결로 다음 단계에 가면 배포에서 다시 막힌다.
   */
  onVerified?: (cloudConnectionId: number) => void;
  /** 좁은 자리(시트)에서는 칸을 한 줄에 하나씩 세운다 */
  layout?: 'grid' | 'stacked';
};

/**
 * 클라우드 연결 등록 폼. 설정의 클라우드 연결 화면과, 프로젝트 안에서 여는 연결 시트가
 * 같이 쓴다 — 프로젝트를 떠나지 않고 등록을 마칠 수 있게 폼만 따로 뺐다.
 */
function CloudConnectionCreateForm({
  onVerified,
  layout = 'grid',
}: CloudConnectionCreateFormProps) {
  const [provider, setProvider] = useState<CloudProvider>('AWS');
  const [displayName, setDisplayName] = useState('');
  const [region, setRegion] = useState('');
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [accountId, setAccountId] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  /*
    새로 등록한 연결의 검증. 예전에는 등록하고 나서 아무 말이 없었다 — 목록의 상태가
    바뀌는 걸 보고 짐작해야 했다.
  */
  const [created, setCreated] = useState<{ cloudConnectionId: number; jobId: string } | null>(null);
  const { data: createdJob } = useCloudConnectionVerificationJobQuery(
    'cloud-create-form',
    created?.jobId || null,
  );
  const createdJobId = created?.jobId || null;
  const createdJobDone = createdJob?.status === 'SUCCEEDED' || createdJob?.status === 'FAILED';
  const createdConnectionReady = isCloudConnectionVerified(createdJob);

  /*
    지금 화면에 없는 목록까지 바로 읽는다(`refetchType: 'all'`). 프로젝트의 연결 안내가 같은
    목록을 쓰는데, 기본값이면 그 화면이 다시 보일 때에야 읽어서 방금 만든 연결이 잠깐 안
    보인다.
  */
  useEffect(() => {
    if (!createdJobDone) return;
    void queryClient.invalidateQueries({ queryKey: ['cloud-connection-list'], refetchType: 'all' });
  }, [createdJobDone, queryClient]);

  // 쓸 수 있는 연결이 됐을 때만 알린다. 권한 부족이면 폼에 남아 사유를 읽게 한다
  useEffect(() => {
    if (createdConnectionReady && created) onVerified?.(created.cloudConnectionId);
  }, [createdConnectionReady, created, onVerified]);

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
    onSuccess: (result) => {
      setDisplayName('');
      setRegion('');
      setAccessKeyId('');
      setSecretAccessKey('');
      setAccountId('');
      setCreated({ cloudConnectionId: result.cloudConnectionId, jobId: result.jobId });
      void queryClient.invalidateQueries({
        queryKey: ['cloud-connection-list'],
        refetchType: 'all',
      });
    },
  });

  const handleCreate = async () => {
    setFormError(null);
    setCreated(null);
    try {
      await createMutation.mutateAsync();
    } catch (error) {
      setFormError(composeApiErrorMessage(error, '클라우드 연결에 실패했습니다.'));
    }
  };

  return (
    <>
      {/*
        칸마다 보이는 label 을 둔다.

        전에는 placeholder 하나로 칸을 설명했다. placeholder 는 **값을 넣는 순간
        사라지므로**, Access Key ID 칸과 계정 ID 칸처럼 생김새가 같은 자리에서 무엇을
        넣었는지 되짚을 방법이 없었다. 스크린리더는 애초에 읽지 못한다.
      */}
      <div className={layout === 'stacked' ? 'grid gap-3' : 'grid gap-3 sm:grid-cols-2'}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cloud-provider" className="text-[12px] font-medium text-[#475569]">
            클라우드
          </label>
          <select
            id="cloud-provider"
            value={provider}
            onChange={(event) => setProvider(event.target.value as CloudProvider)}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          >
            <option value="AWS">AWS</option>
            <option value="GCP">GCP</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cloud-display-name" className="text-[12px] font-medium text-[#475569]">
            표시 이름
          </label>
          <input
            id="cloud-display-name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="예: 내 AWS 계정"
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cloud-region" className="text-[12px] font-medium text-[#475569]">
            리전
          </label>
          <input
            id="cloud-region"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            /*
              다른 입력들은 예시를 주는데(`예: 내 AWS 계정`·`AKIA...`·`12자리 숫자`)
              리전만 빈칸이었다. 형식을 아는 사람에게는 사소하지만, 처음 연결하는
              사람은 `서울` 인지 `ap-northeast-2` 인지 짐작해야 했다.
            */
            placeholder={provider === 'AWS' ? '예: ap-northeast-2' : '예: asia-northeast3'}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cloud-access-key-id" className="text-[12px] font-medium text-[#475569]">
            {provider === 'AWS' ? 'Access Key ID' : '프로젝트/계정 ID'}
          </label>
          <input
            id="cloud-access-key-id"
            value={accessKeyId}
            onChange={(event) => setAccessKeyId(event.target.value)}
            placeholder={provider === 'AWS' ? 'AKIA…' : undefined}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
        </div>
        <div
          className={
            layout === 'stacked' ? 'flex flex-col gap-1.5' : 'flex flex-col gap-1.5 sm:col-span-2'
          }
        >
          <label htmlFor="cloud-secret" className="text-[12px] font-medium text-[#475569]">
            {provider === 'AWS' ? 'Secret Access Key' : 'Service Account JSON'}
          </label>
          {/*
            `autoComplete="new-password"` 는 브라우저가 이 값을 **저장된 비밀번호로 채우거나
            저장 제안하지 않게** 한다. Chrome 은 비밀번호 칸에서 `off` 를 무시하므로 이 값이어야
            한다. 클라우드 시크릿은 사이트 비밀번호가 아니라 자격 증명이고, 브라우저 금고에
            "qeploy.com 비밀번호" 로 들어가면 지울 생각조차 못 하게 된다.
          */}
          <input
            id="cloud-secret"
            type="password"
            autoComplete="new-password"
            value={secretAccessKey}
            onChange={(event) => setSecretAccessKey(event.target.value)}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
        </div>
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
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cloud-account-id" className="text-[12px] font-medium text-[#475569]">
              AWS 계정 ID
            </label>
            <input
              id="cloud-account-id"
              value={accountId}
              onChange={(event) => setAccountId(event.target.value)}
              inputMode="numeric"
              placeholder="12자리 숫자"
              className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
            />
          </div>
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
      {formError ? (
        <p
          role="alert"
          className="mt-2 text-[12px] leading-relaxed whitespace-pre-line text-[#dc2626]"
        >
          {formError}
        </p>
      ) : null}
      {createdJobId ? (
        <p
          role="status"
          className="mt-2 text-[12px] leading-relaxed whitespace-pre-line text-[#475569]"
        >
          {!createdJobDone
            ? '등록했습니다. 이 키로 배포할 권한이 있는지 확인하는 중입니다 — 잠시 걸립니다.'
            : createdConnectionReady
              ? '권한 확인까지 마쳤습니다. 이제 프로젝트에서 이 연결을 고를 수 있습니다.'
              : createdJob?.message ||
                '등록은 됐지만 권한 확인을 통과하지 못했습니다. 아래 목록에서 상태를 확인해 주세요.'}
        </p>
      ) : null}
    </>
  );
}

export default CloudConnectionCreateForm;
