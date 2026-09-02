import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { postProjectDatabase, useProjectDatabaseListQuery } from '@/api/databases';
import { useProjectPreviewQuery } from '@/api/preview';
import { usePreviewRuntimeConfigQuery } from '@/api/previewRuntime';
import { getProjectInfrastructureSettings } from '@/api/projects';
import { extractApiErrorMessage } from '@/utils/response';
import type {
  CreatedDatabase,
  DatabaseEngine,
  DatabaseMethod,
  ProvisionedDatabase,
} from '@/types/database.type';

const QUERY_KEY = 'project-infra-page';

/**
 * DOCKER 는 서버가 아직 막아둔다. 고를 수 있게 두면 눌러도 오류만 나므로
 * 비활성으로 보여주되 목록에는 남긴다 — 곧 온다는 것 자체가 정보다.
 */
const METHOD_OPTIONS: { value: DatabaseMethod; label: string; enabled: boolean }[] = [
  { value: 'LOCAL', label: '테스트용 (프리뷰와 함께, 무료)', enabled: true },
  { value: 'RDS', label: 'AWS RDS (과금, 승인 필요)', enabled: true },
  { value: 'DOCKER', label: 'EC2 컨테이너 (곧 지원)', enabled: false },
];

const ENGINE_OPTIONS: { value: DatabaseEngine; label: string }[] = [
  { value: 'POSTGRESQL', label: 'PostgreSQL' },
  { value: 'MYSQL', label: 'MySQL' },
];

const STATUS_LABEL: Record<string, string> = {
  PENDING: '대기 중',
  PROVISIONING: '준비 중',
  READY: '사용 가능',
  FAILED: '실패',
  EXPIRED: '만료됨',
};

/** 모르는 분류는 PROVIDER_ERROR 로 취급한다 — 서버가 오류 종류를 늘려도 화면이 버틴다 */
const ERROR_LABEL: Record<string, string> = {
  IAM_PERMISSION: '클라우드 권한이 부족합니다',
  QUOTA_EXCEEDED: '클라우드 할당량을 초과했습니다',
  ENGINE_UNSUPPORTED: '지원하지 않는 엔진입니다',
  PROVIDER_ERROR: '클라우드 오류가 발생했습니다',
};

/**
 * 실패 사유 라벨.
 *
 * 실패인데 errorCode 가 없으면 사용자가 거부한 것이다(RDS 승인 거절). 클라우드 오류가
 * 아니므로 그렇게 말하면 안 된다 — 사용자가 스스로 거부해놓고 "클라우드 오류가
 * 발생했습니다"를 보면 원인을 잘못 짚게 된다.
 */
function describeError(database: ProvisionedDatabase): string | null {
  if (!database.errorCode) {
    return database.status === 'FAILED' ? '요청이 거부되었습니다' : null;
  }
  return ERROR_LABEL[database.errorCode] ?? ERROR_LABEL.PROVIDER_ERROR;
}

/**
 * 남은 시간. 서버 status 가 정본이므로 이 값으로 만료를 판정하지 않는다.
 * 회수 워커가 EXPIRED 로 넘기기까지 최대 1분 시차가 있어 그동안 "-3분" 이 나오지 않게 한다.
 */
function formatRemaining(expiresAt: string | null): string | null {
  if (!expiresAt) return null;

  const expiry = new Date(expiresAt).getTime();
  if (Number.isNaN(expiry)) return null;

  const remainingMs = expiry - Date.now();
  if (remainingMs <= 0) return '만료 처리 중';

  const minutes = Math.ceil(remainingMs / 60000);
  return `${minutes}분 남음`;
}

function ProjectDatabaseSection({ projectId }: { projectId: number }) {
  const [method, setMethod] = useState<DatabaseMethod>('LOCAL');
  const [engine, setEngine] = useState<DatabaseEngine>('POSTGRESQL');
  const [createError, setCreateError] = useState<string | null>(null);
  // 생성 응답에만 실려 오는 비밀번호. 목록 조회에는 없으므로 이 자리에서만 보여줄 수 있다
  const [createdDatabase, setCreatedDatabase] = useState<CreatedDatabase | null>(null);
  // RDS 는 승인을 거치므로 생성 응답에 database 가 없다. 그 사실을 알려줄 자리
  const [awaitingApproval, setAwaitingApproval] = useState(false);

  const queryClient = useQueryClient();
  const { data: databases = [], isLoading } = useProjectDatabaseListQuery(QUERY_KEY, projectId);
  const { data: preview } = useProjectPreviewQuery(QUERY_KEY, projectId);
  // 런타임 설정과 같은 키라 react-query 가 요청을 합친다
  const { data: runtime } = usePreviewRuntimeConfigQuery(QUERY_KEY, projectId);

  // 서버형은 프리뷰가 뜰 때 DB 를 자동으로 마련한다. 그 구간에 수동 생성을 열어두면
  // 사용자가 만든 것과 자동으로 생긴 것이 겹친다. 현재 떠 있는 프리뷰가 아니라
  // 설정값으로 판단한다 — 설정을 바꾼 시점부터 "이제 자동으로 마련된다"가 참이다
  const isServerRuntime = runtime?.runtimeType === 'NODE_SERVER';

  // LOCAL DB 는 프리뷰 세션 컨테이너의 형제로 뜬다. 프리뷰가 없으면 서버가 404 로 막는데,
  // 누르고 나서 알게 하는 것보다 미리 비활성으로 알리는 편이 낫다
  const isPreviewActive = preview?.status === 'ACTIVE';
  const needsPreview = method === 'LOCAL' && !isPreviewActive;

  // RDS 는 사용자 AWS 에 실제 인스턴스를 만든다. 프로젝트에 CONNECTED 연결이 없으면
  // 서버가 404·409 로 막는데, 인프라 탭 맨 위에 그 선택이 있으니 미리 알린다
  const { data: infraSettings } = useQuery({
    queryKey: ['project-infra-settings', projectId],
    queryFn: () => getProjectInfrastructureSettings(projectId),
    enabled: !!projectId,
    gcTime: 0,
  });
  const isCloudConnected =
    infraSettings?.cloudConnectionId != null && infraSettings.status === 'CONNECTED';
  const needsCloudConnection = method === 'RDS' && !isCloudConnected;

  const createMutation = useMutation({
    mutationFn: () => postProjectDatabase(projectId, { method, engine }),
    onSuccess: (result) => {
      setCreateError(null);
      // requiresApproval 로 가른다. 요청한 method 로 추측하지 않는다 — 서버가 승인 여부를
      // 바꾸면 그 추측이 조용히 틀리고, 그때 화면은 비밀번호를 기다리며 멈춰 있게 된다
      setAwaitingApproval(result.requiresApproval);
      setCreatedDatabase(result.database);
      void queryClient.invalidateQueries({ queryKey: ['project-database-list'] });
      void queryClient.invalidateQueries({ queryKey: ['project-approval-list'] });
    },
    onError: (error) => {
      setAwaitingApproval(false);
      setCreateError(extractApiErrorMessage(error) ?? '데이터베이스를 만들지 못했습니다.');
    },
  });

  return (
    <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
      <h2 className="text-[16px] font-bold text-[#0f172a]">데이터베이스</h2>
      <p className="mt-1 text-[13px] text-[#64748b]">
        {isServerRuntime
          ? '런타임이 Node 서버라 프리뷰가 뜰 때 DB가 자동으로 마련됩니다. 직접 만들 필요가 없습니다.'
          : '백엔드가 있는 앱을 위한 DB를 마련합니다. 테스트용 DB는 현재 프리뷰 세션과 함께 사라지므로, 프리뷰를 다시 띄우면 DB도 다시 만들어야 합니다.'}
      </p>

      {isServerRuntime ? null : (
        <>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#475569]">방식</span>
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value as DatabaseMethod)}
              className="h-9 rounded-lg border border-[#e2e8f0] px-2.5 text-[13px]"
            >
              {METHOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} disabled={!option.enabled}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#475569]">엔진</span>
            <select
              value={engine}
              onChange={(event) => setEngine(event.target.value as DatabaseEngine)}
              className="h-9 rounded-lg border border-[#e2e8f0] px-2.5 text-[13px]"
            >
              {ENGINE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {needsPreview ? (
          <p className="mt-3 text-[12px] text-[#b45309]">
            테스트용 DB는 실행 중인 프리뷰가 있어야 만들 수 있습니다. 먼저 프리뷰를 띄워주세요.
          </p>
        ) : null}
        {needsCloudConnection ? (
          <p className="mt-3 text-[12px] leading-relaxed text-[#b45309]">
            RDS는 연결된 클라우드 계정이 있어야 만들 수 있습니다. 위 클라우드 연결 선택에서 먼저
            연결해 주세요.{' '}
            <Link
              to="/onboarding/cloud"
              className="font-semibold underline underline-offset-2 hover:text-[#92400e]"
            >
              AWS가 처음이신가요?
            </Link>
          </p>
        ) : null}
        {method === 'RDS' ? (
          <p className="mt-3 text-[12px] leading-relaxed text-[#64748b]">
            RDS는 실제 AWS 자원이라 과금됩니다. 요청하면 승인 절차를 거치고, 승인 후 생성에 5~10분이
            걸립니다.
          </p>
        ) : null}
        {createError ? <p className="mt-3 text-[12px] text-[#dc2626]">{createError}</p> : null}

        <button
          type="button"
          disabled={needsPreview || needsCloudConnection || createMutation.isPending}
          onClick={() => createMutation.mutate()}
          className="mt-3 h-9 cursor-pointer rounded-lg bg-[#0f172a] px-4 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createMutation.isPending ? '만드는 중...' : 'DB 추가'}
        </button>
        </>
      )}

      {awaitingApproval ? (
        <div className="mt-4 rounded-xl border border-[#fcd34d] bg-[#fffbeb] px-4 py-3">
          <p className="text-[13px] font-semibold text-[#92400e]">승인을 기다리고 있습니다</p>
          <p className="mt-1 text-[12px] leading-relaxed text-[#b45309]">
            과금되는 자원이라 승인 절차를 거칩니다. 승인 탭에서 결정하면 생성이 시작되고, 5~10분
            뒤 접속정보가 아래 목록에 나타납니다.
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

      {createdDatabase?.password ? (
        <div className="mt-4 rounded-xl border border-[#c4b5fd] bg-[#faf5ff] px-4 py-3">
          <p className="text-[13px] font-semibold text-[#4c1d95]">
            비밀번호는 지금만 확인할 수 있습니다
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-[#6d28d9]">
            이후 조회에는 나오지 않습니다. 지금 복사해 두세요.
          </p>
          <p className="mt-2 break-all rounded-lg bg-white px-2.5 py-2 font-mono text-[13px] text-[#0f172a]">
            {createdDatabase.password}
          </p>
          <button
            type="button"
            onClick={() => setCreatedDatabase(null)}
            className="mt-2 cursor-pointer text-[12px] font-medium text-[#7c3aed] hover:underline"
          >
            확인했습니다
          </button>
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-4 h-16 animate-pulse rounded-xl bg-[#f8fafc]" />
      ) : databases.length === 0 ? (
        <p className="mt-4 text-[13px] text-[#94a3b8]">마련된 데이터베이스가 없습니다.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {databases.map((database) => {
            const remaining = formatRemaining(database.expiresAt);
            const errorLabel = describeError(database);

            return (
              <li
                key={database.databaseId}
                className="rounded-xl border border-[#f1f5f9] px-4 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-[#0f172a]">
                    {database.engine} · {database.method}
                    {database.origin === 'PREVIEW_AUTO' ? (
                      <span className="ml-2 rounded-full bg-[#eff6ff] px-2 py-0.5 text-[11px] font-medium text-[#1d4ed8]">
                        프리뷰가 자동 마련
                      </span>
                    ) : null}
                  </p>
                  <span className="shrink-0 rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-medium text-[#64748b]">
                    {STATUS_LABEL[database.status] ?? database.status}
                    {remaining ? ` · ${remaining}` : ''}
                  </span>
                </div>

                {database.status === 'READY' && database.host ? (
                  <dl className="mt-2 grid gap-x-4 gap-y-1 text-[12px] text-[#475569] sm:grid-cols-2">
                    <div className="flex gap-1.5">
                      <dt className="text-[#94a3b8]">host</dt>
                      <dd className="break-all font-mono">
                        {database.host}:{database.port}
                      </dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="text-[#94a3b8]">database</dt>
                      <dd className="break-all font-mono">{database.database}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="text-[#94a3b8]">username</dt>
                      <dd className="break-all font-mono">{database.username}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="text-[#94a3b8]">password</dt>
                      {/*
                        자동 DB 는 사용자가 생성 요청을 하지 않아 비밀번호를 볼 기회가 없다.
                        앱에는 env 로 주입되므로 동작에는 문제가 없다 — 찾다 헤매지 않게 적어둔다.
                      */}
                      <dd className="font-mono">
                        {database.origin === 'PREVIEW_AUTO'
                          ? '환경변수로 자동 주입됨'
                          : '•••••• (생성 시에만 표시)'}
                      </dd>
                    </div>
                  </dl>
                ) : null}

                {errorLabel ? (
                  <p className="mt-2 text-[12px] text-[#b91c1c]">{errorLabel}</p>
                ) : null}
                {database.errorMessage ? (
                  <p className="mt-1 text-[11px] leading-relaxed text-[#94a3b8]">
                    {database.errorMessage}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default ProjectDatabaseSection;
