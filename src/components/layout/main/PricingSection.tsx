/*
  요금제는 아직 없다.

  이 자리에는 타사 솔루션 이름("고도몰 basic/pro", "삼바이 enterprise")과 쇼핑몰
  기능 설명이 그대로 들어가 있었다. Qeploy 와 관계없는 값인 데다, 결제가 붙지도
  않은 화면에서 "시작하기" 버튼이 결제로 읽힌다.

  플랜 구성을 Qeploy 기준 예정안으로 바꾸고, 결제가 없다는 사실을 섹션 맨 위에서
  먼저 말한다. CTA 는 누를 수 없게 둔다 — 눌러서 갈 곳이 없다.
*/

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type PricingCardProps = {
  planName: string;
  price: string;
  periodText: string;
  description: string;
  features: string[];
  buttonText: string;
};

function PricingCard({
  planName,
  price,
  periodText,
  description,
  features,
  buttonText,
}: PricingCardProps) {
  return (
    <div className="flex w-full flex-col justify-between gap-3 rounded-3xl border border-[#0B0C12]/8 px-4 py-4 transition-all xl:h-[360px] xl:w-[247.4px] xl:gap-0 xl:py-4.5">
      <div className="flex flex-col gap-2">
        {/*
          데스크탑은 플랜명과 금액을 세로로 쌓는다. 좁은 화면에서는 한 줄로 합쳐
          카드 머리를 줄인다 — 셋을 비교하려면 스크롤이 짧아야 한다.
        */}
        <div className="flex items-baseline justify-between gap-2 xl:flex-col xl:items-stretch xl:gap-2">
          <p className="typo-b3-sb">{planName}</p>
          <p className="typo-h2-bd">
            {price}
            <span className="typo-b3-rg text-[#64748B]">{periodText}</span>
          </p>
        </div>
        <p className="typo-b3-rg text-[#64748B] pb-1 xl:pb-2">{description}</p>
        {features.map((feature) => (
          <p
            key={feature}
            className="typo-b5-rg flex gap-4 items-center"
            style={{ color: 'rgba(11, 12, 18, 0.82)' }}
          >
            ✓{' '}
            <span className="typo-b3-rg" style={{ color: 'rgba(11, 12, 18, 0.72)' }}>
              {feature}
            </span>
          </p>
        ))}
      </div>
      {/* 결제 연동 전이라 누를 수 없다. 커서도 손가락으로 바뀌지 않는다 */}
      <span
        aria-disabled="true"
        title="결제는 준비 중입니다"
        className="typo-b5-sb flex w-full cursor-default items-center justify-center rounded-xl border border-[#0B0C12]/10 bg-[#F1F5F9] py-3 text-[#94A3B8] select-none"
      >
        {buttonText}
      </span>
    </div>
  );
}

const pricingCardItems: PricingCardProps[] = [
  {
    planName: 'Free',
    price: '0원',
    periodText: ' /월',
    description: '혼자 쓰면서 Qeploy 흐름을 끝까지 확인해 보는 구간입니다.',
    features: ['프로젝트 1개', '에이전트 대화·미리보기', '관리형 서브도메인 배포'],
    buttonText: '출시 예정',
  },
  {
    planName: 'Pro',
    price: '미정',
    periodText: ' /월',
    description: '팀으로 반복 제작하고 내 저장소·도메인까지 붙이는 구간입니다.',
    features: ['Free 모든 기능 포함', '프로젝트 무제한 · GitHub 연동', '커스텀 도메인 · 배포 승인'],
    buttonText: '출시 예정',
  },
  {
    planName: 'Enterprise',
    price: '문의',
    periodText: '',
    description: '자체 클라우드(BYOC)에 올리고 인프라를 직접 통제하는 구간입니다.',
    features: ['Pro 모든 기능 포함', 'BYOC · 전용 인프라 구성', '월 예산·승인 정책 관리'],
    buttonText: '출시 예정',
  },
];

const comparisonRows: { label: string; values: [string, string, string] }[] = [
  { label: '프로젝트 수', values: ['1개', '무제한', '무제한'] },
  { label: 'GitHub 저장소 연동', values: ['—', '✓', '✓'] },
  { label: '커스텀 도메인', values: ['—', '✓', '✓'] },
  { label: '내 클라우드(BYOC) 배포', values: ['—', '—', '✓'] },
];

function PricingSection() {
  /*
    전체 기능 비교표는 넷을 가로로 늘어놓는 표라 좁은 화면에서 가로 스크롤 없이는
    담기지 않는다. 대부분은 플랜 카드의 요약만 보고 판단하므로, 표는 기본으로
    접어 두고 필요한 사람만 펼치게 한다(xl 이상은 지금처럼 항상 펼쳐져 있다).
  */
  const [tableOpen, setTableOpen] = useState(false);

  return (
    <section
      id="pricing"
      className="w-full scroll-mt-4 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)]"
    >
      <div className="flex flex-col gap-2 items-start justify-center px-5 py-12 md:px-10 md:py-14 xl:px-52 xl:py-16">
        <p className="text-[#7C3AED] text-[13px] font-extrabold tracking-wide md:text-lg md:tracking-normal">
          요금 안내
        </p>
        <p className="text-[#111827] typo-h2-bd">팀 규모에 맞는 플랜</p>

        {/* 결제가 없다는 것을 카드보다 먼저 말한다 */}
        <div className="mt-1 flex w-full items-start gap-2.5 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3">
          <span aria-hidden className="mt-[3px] size-2 shrink-0 rounded-full bg-[#F59E0B]" />
          <p className="typo-b3-rg text-[#92400E]">
            <b className="font-semibold">요금제와 결제는 아직 준비 중입니다.</b> 아래 구성과 금액은
            확정 전의 예정안이며, 지금은 결제가 이루어지지 않습니다.
          </p>
        </div>

        <div
          className="p-4 sm:p-6 xl:p-6.5 rounded-2xl bg-white flex flex-col gap-4.5 w-full"
          style={{ boxShadow: '0 28px 70px 0 rgba(0, 0, 0, 0.18)' }}
        >
          <div className="flex w-full flex-col gap-6 xl:flex-row xl:justify-between xl:gap-0">
            <div className="flex flex-col">
              <p className="typo-h4-bd">
                한눈에 <br className="hidden xl:inline" />
                비교해 보세요
              </p>
              <p
                className="typo-b3-rg"
                style={{ color: 'var(--color-blue-670, rgba(11, 12, 18, 0.70))' }}
              >
                플랜 구성은 출시 전까지 바뀔 수 있습니다.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
              {pricingCardItems.map((item, index) => (
                <PricingCard key={index} {...item} />
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-expanded={tableOpen}
            onClick={() => setTableOpen((open) => !open)}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-[#0B0C12]/8 bg-[#F8FAFC] px-4 py-3 text-left xl:hidden"
          >
            <span className="typo-b5-sb text-[#111827]">전체 기능 비교</span>
            <ChevronDown
              className={cn('size-4 text-[#64748B] transition', tableOpen && 'rotate-180')}
              aria-hidden
            />
          </button>

          <div
            className={cn(
              'overflow-x-auto rounded-2xl border border-[#0B0C12]/8 xl:block',
              !tableOpen && 'hidden',
            )}
          >
            <table className="w-full min-w-[540px] table-fixed border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="py-3 px-4 text-left typo-b5-sb text-[#64748B] border-b border-[#0B0C12]/8">
                    &nbsp;
                  </th>
                  {pricingCardItems.map((item) => (
                    <th
                      key={item.planName}
                      className="py-3 px-4 text-center typo-b5-sb text-[#111827] border-b border-[#0B0C12]/8"
                    >
                      {item.planName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rowIndex) => {
                  const isLast = rowIndex === comparisonRows.length - 1;
                  const cellBorder = isLast ? '' : ' border-b border-[#0B0C12]/8';

                  return (
                    <tr key={row.label} className="bg-white">
                      <td className={`py-3 px-4 typo-b5-sb text-[#64748B]${cellBorder}`}>
                        {row.label}
                      </td>
                      {row.values.map((value, index) => (
                        <td
                          key={`${row.label}-${index}`}
                          className={`py-3 px-4 typo-b5-sb text-center text-[#111827]${cellBorder}`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
