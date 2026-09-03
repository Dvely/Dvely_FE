import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteDomain,
  getDomainSearch,
  getDomainVerificationGuide,
  postDomainVerificationCheck,
  postProjectDomainBind,
  useProjectDomainListQuery,
} from '@/api/domains';
import type { DomainType, HostingTarget, VerificationMethod } from '@/types/common.enum';

type ProjectDomainsPageProps = {
  projectId: number;
};

const skeletonItems = Array.from({ length: 3 }, (_, index) => `domain-skeleton-${index}`);

/** 지금 실제로 연결되는 것은 GitHub Pages 뿐이다 */
const HOSTING_TARGET_OPTIONS: { value: HostingTarget; label: string; enabled: boolean }[] = [
  { value: 'GITHUB_PAGES', label: 'GitHub Pages', enabled: true },
  { value: 'AWS', label: 'AWS (곧 지원)', enabled: false },
  { value: 'GCP', label: 'GCP (곧 지원)', enabled: false },
];

function ProjectDomainsPage({ projectId }: ProjectDomainsPageProps) {
  const [keyword, setKeyword] = useState('');
  const [bindType, setBindType] = useState<DomainType>('custom_domain');
  const [hostname, setHostname] = useState('');
  const [label, setLabel] = useState('');
  const [hostingTarget, setHostingTarget] = useState<HostingTarget>('GITHUB_PAGES');
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('CNAME');
  const [selectedDomainId, setSelectedDomainId] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: domains = [], isLoading } = useProjectDomainListQuery(
    'project-domains-page',
    projectId,
  );
  const { data: searchResult, isFetching: isSearching } = useQuery({
    queryKey: ['domain-search', keyword],
    queryFn: () => getDomainSearch(keyword),
    enabled: keyword.trim().length > 1,
    gcTime: 0,
  });
  const { data: guide } = useQuery({
    queryKey: ['domain-verification-guide', selectedDomainId],
    queryFn: () => getDomainVerificationGuide(selectedDomainId as number),
    enabled: selectedDomainId != null,
    gcTime: 0,
  });

  const invalidateDomains = () => {
    void queryClient.invalidateQueries({ queryKey: ['project-domain-list'] });
  };

  const bindMutation = useMutation({
    mutationFn: () =>
      postProjectDomainBind(projectId, {
        type: bindType,
        hostname,
        label,
        hostingTarget,
        verificationMethod,
      }),
    onSuccess: invalidateDomains,
  });
  const verifyMutation = useMutation({
    mutationFn: postDomainVerificationCheck,
    onSuccess: invalidateDomains,
  });
  const unbindMutation = useMutation({
    mutationFn: deleteDomain,
    onSuccess: invalidateDomains,
  });

  const handleBind = async () => {
    setFormError(null);
    try {
      await bindMutation.mutateAsync();
      setHostname('');
      setLabel('');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : '도메인 연결에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">도메인 검색 · 연결</h2>
        {formError ? <p className="mt-3 text-[12px] text-[#dc2626]">{formError}</p> : null}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="도메인 검색"
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
          <select
            value={bindType}
            onChange={(event) => setBindType(event.target.value as DomainType)}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          >
            <option value="managed_subdomain">관리형 서브도메인</option>
            <option value="custom_domain">커스텀 도메인</option>
            <option value="purchasable_domain">구매 가능 도메인</option>
          </select>
          <input
            value={hostname}
            onChange={(event) => setHostname(event.target.value)}
            placeholder="hostname"
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
          <input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="서브도메인 라벨"
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          />
          {/*
            AWS·GCP 는 서버에 어댑터가 없다. DomainHostingAdapterRegistry 가 지원 어댑터를
            못 찾으면 예외를 던져서, 고르면 저장조차 안 되고 실패한다. 고를 수 있게 두면
            누른 사람만 헛돈다 — 비활성으로 보여주되 목록에는 남긴다. 곧 온다는 것 자체가
            정보다(DB 방식의 DOCKER 와 같은 처리).
          */}
          <select
            value={hostingTarget}
            onChange={(event) => setHostingTarget(event.target.value as HostingTarget)}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          >
            {HOSTING_TARGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} disabled={!option.enabled}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={verificationMethod}
            onChange={(event) => setVerificationMethod(event.target.value as VerificationMethod)}
            className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px]"
          >
            <option value="CNAME">CNAME</option>
            <option value="A">A</option>
          </select>
        </div>
        <button
          type="button"
          disabled={bindMutation.isPending}
          onClick={() => void handleBind()}
          className="mt-3 h-9 rounded-lg bg-[#0f172a] px-4 text-[13px] font-semibold text-white disabled:opacity-50"
        >
          연결 요청
        </button>
        {isSearching ? (
          <div className="mt-3 h-10 animate-pulse rounded bg-[#f8fafc]" />
        ) : searchResult?.results?.length ? (
          <ul className="mt-3 divide-y divide-[#f1f5f9] rounded-lg border border-[#f1f5f9]">
            {searchResult.results.map((item) => (
              <li
                key={item.hostname}
                className="flex items-center justify-between px-3 py-2 text-[12px]"
              >
                <span>{item.hostname}</span>
                <span className="text-[#94a3b8]">
                  {item.available ? '사용 가능' : '사용 불가'}
                  {item.price != null ? ` · ${item.price} ${item.currency}` : ''}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">연결된 도메인</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {isLoading ? (
            skeletonItems.map((key) => (
              <li key={key} className="h-16 animate-pulse rounded-xl bg-[#f8fafc]" />
            ))
          ) : domains.length === 0 ? (
            <li className="rounded-xl border border-dashed border-[#e2e8f0] px-4 py-8 text-center text-[13px] text-[#94a3b8]">
              연결된 도메인이 없습니다.
            </li>
          ) : (
            domains.map((domain) => (
              <li key={domain.domainId} className="rounded-xl border border-[#f1f5f9] px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-semibold text-[#0f172a]">{domain.hostname}</p>
                    <p className="mt-1 text-[11px] text-[#94a3b8]">
                      {domain.status} · {domain.hostingTarget}
                    </p>
                  </div>
                  <div className="flex gap-2">
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
                  <ul className="mt-3 rounded-lg bg-[#f8fafc] p-3 text-[12px] text-[#475569]">
                    {guide.records.map((record) => (
                      <li key={`${record.host}-${record.value}`}>
                        {record.type} {record.host} → {record.value}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

export default ProjectDomainsPage;
