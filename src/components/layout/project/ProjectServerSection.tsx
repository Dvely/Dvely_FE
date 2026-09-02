import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { postProjectServer, postServerTerminate, useProjectServerListQuery } from '@/api/servers';
import { getProjectInfrastructureSettings } from '@/api/projects';
import { describeProvisionFailure } from '@/lib/provisionFailure';
import { toSafeHttpUrl } from '@/lib/safeUrl';
import { extractApiErrorMessage } from '@/utils/response';

const QUERY_KEY = 'project-infra-page';

/**
 * 인스턴스 티어. 서버는 문자열을 그대로 EC2 에 넘기고 별도 허용목록을 두지 않지만,
 * 화면에서 자유입력을 받으면 오타 하나가 몇 분 뒤 PROVIDER_ERROR 로 돌아온다.
 * 흔한 몇 개만 고르게 하고, 기본은 프리티어 대상인 micro 로 둔다.
 */
const INSTANCE_TYPE_OPTIONS = [
  { value: 't3.micro', label: 't3.micro (프리티어 대상)' },
  { value: 't3.small', label: 't3.small' },
  { value: 't3.medium', label: 't3.medium' },
];

const STATUS_LABEL: Record<string, string> = {
  PENDING: '승인 대기',
  QUEUED: '대기 중',
  BUILDING: '빌드 중',
  PROVISIONING: '서버 준비 중',
  RUNNING: '실행 중',
  FAILED: '실패',
  TERMINATED: '종료됨',
};

/**
 * 지금 무슨 일이 일어나는 중인지. 빌드부터 헬스체크까지 수 분이라 상태 이름만 두면
 * 멈춘 것처럼 보인다 — 진행 중인 단계는 무엇을 기다리는지 한 줄 덧붙인다.
 */
const STATUS_HINT: Record<string, string> = {
  PENDING: '승인 탭에서 결정하면 배포가 시작됩니다.',
  QUEUED: '배포 워커를 기다리는 중입니다.',
  BUILDING: '소스를 빌드하는 중입니다. 몇 분 걸립니다.',
  PROVISIONING: '인스턴스를 띄우고 헬스체크를 기다리는 중입니다.',
};

function ProjectServerSection({ projectId }: { projectId: number }) {
  const [instanceType, setInstanceType] = useState(INSTANCE_TYPE_OPTIONS[0].value);
  const [createError, setCreateError] = useState<string | null>(null);
  const [awaitingApproval, setAwaitingApproval] = useState(false);
  // 종료 확인을 받는 중인 서버. window.confirm 을 쓰지 않는 이유는 무엇을 잃는지
  // (데이터·과금·DB) 네 줄로 보여줘야 하는데 그 대화상자로는 못 하기 때문이다
  const [terminatingId, setTerminatingId] = useState<number | null>(null);
  const [terminateError, setTerminateError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: servers = [], isLoading } = useProjectServerListQuery(QUERY_KEY, projectId);

  // EC2 는 사용자 AWS 에 실제 인스턴스를 만든다. 프로젝트에 CONNECTED 연결이 없으면
  // 서버가 404·409 로 막는데, 인프라 탭 맨 위에 그 선택이 있으니 미리 알린다
  const { data: infraSettings } = useQuery({
    queryKey: ['project-infra-settings', projectId],
    queryFn: () => getProjectInfrastructureSettings(projectId),
    enabled: !!projectId,
    gcTime: 0,
  });
  const isCloudConnected =
    infraSettings?.cloudConnectionId != null && infraSettings.status === 'CONNECTED';

  const createMutation = useMutation({
    mutationFn: () => postProjectServer(projectId, { instanceType }),
    onSuccess: (result) => {
      setCreateError(null);
      // 지금은 서버가 항상 승인을 요구하지만, 그 사실을 화면이 가정하지 않는다
      setAwaitingApproval(result.requiresApproval);
      void queryClient.invalidateQueries({ queryKey: ['project-server-list'] });
      void queryClient.invalidateQueries({ queryKey: ['project-approval-list'] });
    },
    onError: (error) => {
      setAwaitingApproval(false);
      setCreateError(extractApiErrorMessage(error) ?? '백엔드 서버를 만들지 못했습니다.');
    },
  });

  const terminateMutation = useMutation({
    mutationFn: (serverId: number) => postServerTerminate(serverId),
    onSuccess: () => {
      setTerminateError(null);
      setTerminatingId(null);
      void queryClient.invalidateQueries({ queryKey: ['project-server-list'] });
    },
    onError: (error) => {
      setTerminateError(extractApiErrorMessage(error) ?? '서버를 종료하지 못했습니다.');
    },
  });

  return (
    <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
      <h2 className="text-[16px] font-bold text-[#0f172a]">백엔드 서버</h2>
      <p className="mt-1 text-[13px] leading-relaxed text-[#64748b]">
        당신의 AWS 계정에 EC2 인스턴스를 띄워 백엔드를 운영합니다. 프리뷰와 달리 계속 떠 있고,{' '}
        <b className="font-semibold text-[#475569]">켜져 있는 동안 과금됩니다.</b>
      </p>

      <label className="mt-4 flex max-w-xs flex-col gap-1">
        <span className="text-[12px] font-medium text-[#475569]">인스턴스 티어</span>
        <select
          value={instanceType}
          onChange={(event) => setInstanceType(event.target.value)}
          className="h-9 rounded-lg border border-[#e2e8f0] px-2.5 text-[13px]"
        >
          {INSTANCE_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {isCloudConnected ? null : (
        <p className="mt-3 text-[12px] leading-relaxed text-[#b45309]">
          백엔드 서버는 연결된 클라우드 계정이 있어야 만들 수 있습니다. 위 클라우드 연결 선택에서
          먼저 연결해 주세요.{' '}
          <Link
            to="/onboarding/cloud"
            className="font-semibold underline underline-offset-2 hover:text-[#92400e]"
          >
            AWS가 처음이신가요?
          </Link>
        </p>
      )}

      <p className="mt-3 text-[12px] leading-relaxed text-[#64748b]">
        요청하면 승인 절차를 거칩니다. 승인 후 소스를 빌드하고 인스턴스를 띄우기까지 몇 분 걸립니다.
      </p>
      {createError ? <p className="mt-3 text-[12px] text-[#dc2626]">{createError}</p> : null}

      <button
        type="button"
        disabled={!isCloudConnected || createMutation.isPending}
        onClick={() => createMutation.mutate()}
        className="mt-3 h-9 cursor-pointer rounded-lg bg-[#0f172a] px-4 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {createMutation.isPending ? '요청하는 중...' : '백엔드 서버 만들기'}
      </button>

      {awaitingApproval ? (
        <div className="mt-4 rounded-xl border border-[#fcd34d] bg-[#fffbeb] px-4 py-3">
          <p className="text-[13px] font-semibold text-[#92400e]">승인을 기다리고 있습니다</p>
          <p className="mt-1 text-[12px] leading-relaxed text-[#b45309]">
            과금되는 자원이라 승인 절차를 거칩니다. 승인 탭에서 결정하면 빌드가 시작되고, 진행 상황이
            아래 목록에 나타납니다.
          </p>
          <button
            type="button"
            onClick={() => setAwaitingApproval(false)}
            className="mt-2 cursor-pointer text-[12px] font-medium text-[#b45309] hover:underline"
          >
            확인했습니다
          </button>
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-4 h-16 animate-pulse rounded-xl bg-[#f8fafc]" />
      ) : servers.length === 0 ? (
        <p className="mt-4 text-[13px] text-[#94a3b8]">마련된 백엔드 서버가 없습니다.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {servers.map((server) => {
            const errorLabel = describeProvisionFailure(server);
            const hint = STATUS_HINT[server.status];
            const safeUrl = toSafeHttpUrl(server.url);
            const isConfirming = terminatingId === server.serverId;
            // 이미 종료된 서버는 지울 것이 없다. 실패한 서버는 자원이 일부 남아 있을 수
            // 있어 종료를 열어둔다 — 서버 쪽이 멱등이라 눌러서 손해 볼 일은 없다
            const canTerminate = server.status !== 'TERMINATED';

            return (
              <li key={server.serverId} className="rounded-xl border border-[#f1f5f9] px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-[#0f172a]">
                    {server.instanceType ?? '인스턴스'}
                  </p>
                  <span className="shrink-0 rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-medium text-[#64748b]">
                    {STATUS_LABEL[server.status] ?? server.status}
                  </span>
                </div>

                {hint ? <p className="mt-1 text-[12px] text-[#64748b]">{hint}</p> : null}

                {safeUrl ? (
                  <a
                    href={safeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block break-all font-mono text-[12px] text-[#1d4ed8] underline underline-offset-2"
                  >
                    {safeUrl}
                  </a>
                ) : null}

                {server.instanceId ? (
                  <p className="mt-1 font-mono text-[11px] text-[#94a3b8]">{server.instanceId}</p>
                ) : null}

                {errorLabel ? (
                  <p className="mt-2 text-[12px] text-[#b91c1c]">{errorLabel}</p>
                ) : null}
                {server.errorMessage ? (
                  <p className="mt-1 text-[11px] leading-relaxed text-[#94a3b8]">
                    {server.errorMessage}
                  </p>
                ) : null}

                {canTerminate ? (
                  isConfirming ? (
                    /*
                      되돌릴 수 없는 작업이라 무엇을 잃는지 먼저 읽히게 한다. 특히 DB 는
                      별개 자원이라 함께 사라지지 않는데, 적어두지 않으면 서버를 껐으니
                      DB 과금도 멈췄으리라 여기고 그대로 두게 된다.
                    */
                    <div className="mt-3 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-3.5 py-3">
                      <p className="text-[13px] font-semibold text-[#991b1b]">
                        이 서버를 종료할까요?
                      </p>
                      <ul className="mt-1.5 flex list-disc flex-col gap-0.5 pl-4 text-[12px] leading-relaxed text-[#b91c1c]">
                        <li>되돌릴 수 없습니다. 다시 만들려면 처음부터 배포해야 합니다.</li>
                        <li>서버에 쌓인 데이터는 사라집니다.</li>
                        <li>이 인스턴스 청구는 종료하는 순간 멈춥니다.</li>
                        <li>데이터베이스는 별개 자원이라 남습니다 — 필요하면 따로 정리하세요.</li>
                      </ul>
                      {terminateError ? (
                        <p className="mt-2 text-[12px] text-[#dc2626]">{terminateError}</p>
                      ) : null}
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          disabled={terminateMutation.isPending}
                          onClick={() => {
                            setTerminatingId(null);
                            setTerminateError(null);
                          }}
                          className="h-8 cursor-pointer rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-semibold text-[#64748b] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          disabled={terminateMutation.isPending}
                          onClick={() => terminateMutation.mutate(server.serverId)}
                          className="h-8 cursor-pointer rounded-lg bg-[#b91c1c] px-3 text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {terminateMutation.isPending ? '종료하는 중...' : '종료합니다'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setTerminatingId(server.serverId);
                        setTerminateError(null);
                      }}
                      className="mt-3 cursor-pointer text-[12px] font-semibold text-[#dc2626] hover:underline"
                    >
                      서버 종료
                    </button>
                  )
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default ProjectServerSection;
