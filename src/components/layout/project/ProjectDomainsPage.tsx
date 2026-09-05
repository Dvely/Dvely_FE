import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  deleteDomain,
  getDomainVerificationGuide,
  postDomainVerificationCheck,
  postProjectDomainBind,
  useProjectDomainListQuery,
  useHostingTargetsQuery,
  FALLBACK_HOSTING_TARGETS,
} from '@/api/domains';
import type { Domain, GetDomainVerificationGuideResType } from '@/types/domain.type';
import type { DomainStatus, DomainType, HostingTarget, VerificationMethod } from '@/types/common.enum';
import { toSafeHttpUrl } from '@/lib/safeUrl';

type ProjectDomainsPageProps = {
  projectId: number;
};

const skeletonItems = Array.from({ length: 3 }, (_, index) => `domain-skeleton-${index}`);

const MANAGED_SUFFIX = '.qeploy.com';

/**
 * 호스팅 대상 — 어디에 붙는 도메인인지. 서버에 어댑터가 있는 것만 연다.
 * - GITHUB_PAGES: 프론트(GitHub Pages)
 * - AWS: 백엔드 EC2(API 주소)
 * - AWS_EC2_FRONTEND: 독립 프론트 EC2
 * - AWS_S3_FRONTEND: S3 프론트(CloudFront + ACM)
 * GCP 는 아직 어댑터가 없어 비활성으로만 노출한다(곧 온다는 것 자체가 정보다).
 */
const HOSTING_TARGET_OPTIONS: {
  value: HostingTarget;
  label: string;
  hint: string;
  enabled: boolean;
}[] = [
  {
    value: 'GITHUB_PAGES',
    label: 'GitHub Pages (프론트)',
    hint: 'GitHub Pages 로 배포한 프론트 주소에 도메인을 붙입니다.',
    enabled: true,
  },
  {
    value: 'AWS_S3_FRONTEND',
    label: 'S3 프론트 (CloudFront)',
    hint: 'S3 로 배포한 프론트에 CloudFront + ACM 인증서로 HTTPS 를 붙입니다. 관리형은 자동, 커스텀 도메인은 DNS 2단계 안내를 따릅니다.',
    enabled: true,
  },
  {
    value: 'AWS_EC2_FRONTEND',
    label: '독립 프론트 EC2',
    hint: 'EC2 로 배포한 독립 프론트 서버에 도메인을 붙입니다. HTTPS 는 인스턴스 Caddy 가 자동 적용합니다.',
    enabled: true,
  },
  {
    value: 'AWS',
    label: '백엔드 EC2 (API)',
    hint: 'EC2 백엔드 API 주소에 도메인을 붙입니다. HTTPS 는 인스턴스 Caddy 가 자동 적용합니다.',
    enabled: true,
  },
  {
    value: 'GCP',
    label: 'GCP (곧 지원)',
    hint: '',
    enabled: false,
  },
];

const STATUS_STYLE: Record<DomainStatus, { label: string; className: string }> = {
  REQUESTED: { label: '요청됨', className: 'bg-[#f1f5f9] text-[#475569]' },
  PROVISIONING: { label: '준비 중', className: 'bg-[#fef9c3] text-[#a16207]' },
  VERIFYING: { label: 'DNS 검증 중', className: 'bg-[#fef9c3] text-[#a16207]' },
  CONNECTED: { label: '연결됨', className: 'bg-[#dcfce7] text-[#15803d]' },
  FAILED: { label: '실패', className: 'bg-[#fee2e2] text-[#b91c1c]' },
};

/** 프론트 도메인(프로젝트 공개 주소)인지 — 백엔드(AWS)만 API 주소다. */
function isFrontendTarget(target: HostingTarget): boolean {
  return target !== 'AWS';
}

function targetLabel(target: HostingTarget): string {
  return HOSTING_TARGET_OPTIONS.find((option) => option.value === target)?.label ?? target;
}

function CopyField({ labelText, value }: { labelText: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8]">{labelText}</p>
        <p className="truncate font-mono text-[12px] text-[#334155]">{value}</p>
      </div>
      <button
        type="button"
        onClick={() => void handleCopy()}
        className="h-7 shrink-0 cursor-pointer rounded-lg border border-[#e2e8f0] bg-white px-2.5 text-[11px] font-semibold text-[#334155] hover:bg-[#f1f5f9]"
      >
        {copied ? '복사됨' : '복사'}
      </button>
    </div>
  );
}

function DnsGuide({ domain, guide }: { domain: Domain; guide: GetDomainVerificationGuideResType }) {
  const isS3Custom = domain.hostingTarget === 'AWS_S3_FRONTEND' && domain.type === 'custom_domain';
  // S3 커스텀은 2단계다: 배포 전(dnsTarget 없음)=ACM 검증 CNAME, 배포 후=최종 CNAME→CloudFront.
  const s3Step = isS3Custom ? (domain.dnsTarget ? 2 : 1) : null;
  return (
    <div className="mt-3 rounded-lg bg-[#f8fafc] p-3">
      <p className="text-[12px] leading-relaxed text-[#475569]">
        아래 레코드를 <span className="font-semibold">{domain.hostname}</span> 도메인의 DNS 에 추가한 뒤{' '}
        <span className="font-semibold">검증 재시도</span>를 누르세요.
      </p>
      {isS3Custom ? (
        <p className="mt-1.5 text-[11px] leading-relaxed text-[#a16207]">
          {s3Step === 1
            ? 'S3 커스텀 도메인은 2단계입니다 — 지금 이 인증서 검증 CNAME 을 넣으면 인증서가 발급되고, 그 뒤 여기 CloudFront 연결용 최종 CNAME 이 표시됩니다.'
            : '2단계 중 마지막입니다 — 이 CNAME 을 넣으면 CloudFront 로 트래픽이 연결되고 HTTPS 가 켜집니다.'}
        </p>
      ) : null}
      <div className="mt-2.5 flex flex-col gap-2">
        {guide.records.map((record) => (
          <div key={`${record.host}-${record.value}`} className="flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold text-[#64748b]">유형 {record.type}</p>
            <CopyField labelText="이름(host)" value={record.host} />
            <CopyField labelText="값(value)" value={record.value} />
          </div>
        ))}
        {guide.records.length === 0 ? (
          <p className="text-[12px] text-[#94a3b8]">레코드를 준비 중입니다. 잠시 후 다시 열어주세요.</p>
        ) : null}
      </div>
    </div>
  );
}

function ProjectDomainsPage({ projectId }: ProjectDomainsPageProps) {
  const [hostingTarget, setHostingTarget] = useState<HostingTarget>('GITHUB_PAGES');

  /*
    서버가 실제로 붙일 수 있는 대상만 고르게 한다.

    예전에는 화면이 목록을 들고 있었는데, 서버가 지원하지 않는 값이 섞여 **고를 수는
    있는데 누르면 실패하는 옵션**이 운영에 나갔었다. 이제 서버에 물어보므로 그 어긋남이
    구조적으로 안 생긴다 — 어댑터가 등록된 것만 담겨 온다.

    조회에 실패하면(운영에는 아직 이 엔드포인트가 없다) 운영이 실제로 지원하는 둘로
    떨어진다. 그래서 여기서 오류를 다루지 않는다.

    **아직 못 받았을 때도 같은 둘을 쓴다.** 빈 목록으로 두면 한 프레임 동안 고를 것이
    하나도 없는 select 가 되고, 기본값에 맞는 항목이 없어 빈 칸처럼 보인다. 어차피 둘은
    어디서나 되므로 먼저 보여주고, 응답이 오면 늘어난다.
  */
  const { data: supportedTargets = FALLBACK_HOSTING_TARGETS } =
    useHostingTargetsQuery('project-domains-page');
  const availableTargetOptions = HOSTING_TARGET_OPTIONS.filter((option) =>
    supportedTargets.includes(option.value),
  );
  const [bindType, setBindType] = useState<DomainType>('managed_subdomain');
  const [label, setLabel] = useState('');
  const [hostname, setHostname] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('A');
  const [selectedDomainId, setSelectedDomainId] = useState<number | null>(null);
  const [awaitingApproval, setAwaitingApproval] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: domains = [], isLoading } = useProjectDomainListQuery('project-domains-page', projectId);
  const { data: guide } = useQuery({
    queryKey: ['domain-verification-guide', selectedDomainId],
    queryFn: () => getDomainVerificationGuide(selectedDomainId as number),
    enabled: selectedDomainId != null,
    gcTime: 0,
  });

  const isManaged = bindType === 'managed_subdomain';
  const isCustom = bindType === 'custom_domain';
  const isEc2Target = hostingTarget === 'AWS' || hostingTarget === 'AWS_EC2_FRONTEND';
  // 검증 방식(A/CNAME) 선택은 EC2/백엔드 커스텀 도메인에서만 의미가 있다 —
  // 대상이 EIP(IP)라 보통 A 레코드다. 관리형·S3·GitHub Pages 는 서버가 알아서 정한다.
  const showVerificationMethod = isCustom && isEc2Target;

  const invalidateDomains = () => {
    void queryClient.invalidateQueries({ queryKey: ['project-domain-list'] });
  };

  const bindMutation = useMutation({
    mutationFn: () =>
      postProjectDomainBind(projectId, {
        type: bindType,
        label: isManaged ? label.trim() : '',
        hostname: isCustom ? hostname.trim() : '',
        hostingTarget,
        verificationMethod: showVerificationMethod ? verificationMethod : null,
      }),
    onSuccess: (result) => {
      invalidateDomains();
      void queryClient.invalidateQueries({ queryKey: ['project-approval-list'] });
      // 승인 정책이 켜져 있으면 approvalIds 가 온다 — 승인 화면으로 안내한다(무시하면 "성공한 척").
      setAwaitingApproval((result?.approvalIds.length ?? 0) > 0);
    },
  });
  const verifyMutation = useMutation({ mutationFn: postDomainVerificationCheck, onSuccess: invalidateDomains });
  const unbindMutation = useMutation({ mutationFn: deleteDomain, onSuccess: invalidateDomains });

  const selectedTarget = HOSTING_TARGET_OPTIONS.find((option) => option.value === hostingTarget);

  const handleBind = async () => {
    setFormError(null);
    if (isManaged && !label.trim()) {
      setFormError('서브도메인 라벨을 입력해주세요.');
      return;
    }
    if (isCustom && !hostname.trim()) {
      setFormError('연결할 도메인(hostname)을 입력해주세요.');
      return;
    }
    try {
      await bindMutation.mutateAsync();
      setLabel('');
      setHostname('');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : '도메인 연결에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">도메인 연결</h2>
        <p className="mt-1 text-[12px] text-[#64748b]">
          배포한 프론트(또는 백엔드) 주소에 도메인과 HTTPS 를 붙입니다.
        </p>
        {formError ? <p className="mt-3 text-[12px] text-[#dc2626]">{formError}</p> : null}

        {awaitingApproval ? (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[#fde68a] bg-[#fffbeb] px-4 py-3">
            <p className="text-[12px] leading-relaxed text-[#92400e]">
              도메인 연결 요청이 승인 대기 중입니다. 승인 화면에서 승인하면 진행됩니다.
            </p>
            <div className="flex shrink-0 gap-2">
              <Link
                to="/project/$slug/approvals"
                params={{ slug: String(projectId) }}
                className="h-8 rounded-lg bg-[#0f172a] px-3 text-[12px] font-semibold leading-8 text-white"
              >
                승인 화면으로
              </Link>
              <button
                type="button"
                onClick={() => setAwaitingApproval(false)}
                className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
              >
                닫기
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-[#334155]">대상</span>
            <select
              value={hostingTarget}
              onChange={(event) => setHostingTarget(event.target.value as HostingTarget)}
              className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
            >
              {availableTargetOptions.map((option) => (
                <option key={option.value} value={option.value} disabled={!option.enabled}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-[#334155]">도메인 유형</span>
            <select
              value={bindType}
              onChange={(event) => setBindType(event.target.value as DomainType)}
              className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
            >
              <option value="managed_subdomain">관리형 서브도메인 (.qeploy.com)</option>
              <option value="custom_domain">커스텀 도메인 (내 도메인)</option>
            </select>
          </label>

          {isManaged ? (
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-[12px] font-semibold text-[#334155]">서브도메인 라벨</span>
              <div className="flex items-center gap-2">
                <input
                  value={label}
                  onChange={(event) => setLabel(event.target.value)}
                  placeholder="my-app"
                  className="h-9 flex-1 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
                />
                <span className="text-[13px] text-[#94a3b8]">{MANAGED_SUFFIX}</span>
              </div>
              {label.trim() ? (
                <span className="text-[11px] text-[#64748b]">
                  최종 주소: {label.trim()}
                  {MANAGED_SUFFIX}
                </span>
              ) : null}
            </label>
          ) : (
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-[12px] font-semibold text-[#334155]">내 도메인 (hostname)</span>
              <input
                value={hostname}
                onChange={(event) => setHostname(event.target.value)}
                placeholder="www.example.com"
                className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
              />
            </label>
          )}

          {showVerificationMethod ? (
            <label className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#334155]">DNS 검증 방식</span>
              <select
                value={verificationMethod}
                onChange={(event) => setVerificationMethod(event.target.value as VerificationMethod)}
                className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
              >
                <option value="A">A (IP 직접)</option>
                <option value="CNAME">CNAME</option>
              </select>
            </label>
          ) : null}
        </div>

        {selectedTarget?.hint ? (
          <p className="mt-3 rounded-lg bg-[#f8fafc] px-3 py-2 text-[12px] leading-relaxed text-[#64748b]">
            {selectedTarget.hint}
          </p>
        ) : null}

        <button
          type="button"
          disabled={bindMutation.isPending}
          onClick={() => void handleBind()}
          className="mt-3 h-9 rounded-lg bg-[#0f172a] px-4 text-[13px] font-semibold text-white disabled:opacity-50"
        >
          {bindMutation.isPending ? '연결 요청 중…' : '연결 요청'}
        </button>
      </section>

      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">연결된 도메인</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {isLoading ? (
            skeletonItems.map((key) => <li key={key} className="h-16 animate-pulse rounded-xl bg-[#f8fafc]" />)
          ) : domains.length === 0 ? (
            <li className="rounded-xl border border-dashed border-[#e2e8f0] px-4 py-8 text-center text-[13px] text-[#94a3b8]">
              연결된 도메인이 없습니다.
            </li>
          ) : (
            domains.map((domain) => {
              const status = STATUS_STYLE[domain.status];
              const httpsUrl = toSafeHttpUrl(`https://${domain.hostname}`);
              const showGuideButton = domain.type === 'custom_domain';
              return (
                <li key={domain.domainId} className="rounded-xl border border-[#f1f5f9] px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <p className="text-[13px] font-semibold text-[#0f172a]">{domain.hostname}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${status.className}`}>
                          {status.label}
                        </span>
                        {domain.status === 'CONNECTED' && domain.httpsEnforced ? (
                          <span className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-[11px] font-medium text-[#15803d]">
                            HTTPS
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-[#94a3b8]">
                        <span
                          className={`rounded-full px-2 py-0.5 font-medium ${
                            isFrontendTarget(domain.hostingTarget)
                              ? 'bg-[#eef2ff] text-[#4338ca]'
                              : 'bg-[#eff6ff] text-[#1d4ed8]'
                          }`}
                        >
                          {isFrontendTarget(domain.hostingTarget) ? '프론트' : '백엔드'}
                        </span>
                        <span>{targetLabel(domain.hostingTarget)}</span>
                      </p>
                      {domain.status === 'CONNECTED' && httpsUrl ? (
                        <a
                          href={httpsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-block text-[12px] font-medium text-[#2563eb] hover:underline"
                        >
                          {httpsUrl}
                        </a>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {showGuideButton ? (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedDomainId((current) =>
                              current === domain.domainId ? null : domain.domainId,
                            )
                          }
                          className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
                        >
                          DNS 가이드
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => verifyMutation.mutate(domain.domainId)}
                        className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold"
                      >
                        검증 재시도
                      </button>
                      <button
                        type="button"
                        onClick={() => unbindMutation.mutate(domain.domainId)}
                        className="h-8 rounded-lg border border-[#fecaca] px-3 text-[12px] font-semibold text-[#dc2626]"
                      >
                        해제
                      </button>
                    </div>
                  </div>
                  {selectedDomainId === domain.domainId && guide ? (
                    <DnsGuide domain={domain} guide={guide} />
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

export default ProjectDomainsPage;
