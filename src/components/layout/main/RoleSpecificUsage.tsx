import { useState, type ReactNode } from 'react';
import InfoCard from '@/components/common/InfoCard';
import { cn } from '@/lib/utils';

const infoCardClassName = 'bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)]';

type Role = {
  id: string;
  label: string;
  /* 데스크탑 줄바꿈이 문구에 박혀 있어 노드째로 들고 있는다 — 두 레이아웃이 같은 문장을 쓴다 */
  summary: ReactNode;
  points: string[];
};

const ROLES: Role[] = [
  {
    id: 'pm',
    label: '기획 · PM',
    summary: (
      <>
        IA 없이도 섹션 순서를 대화로 바꾸고, CTA 문구·가격 표현을 A/B 느낌/
        <br className="hidden xl:inline" />
        으로 여러 번 뽑아 비교합니다.
      </>
    ),
    points: ['요구사항을 프롬프트로 공유', '리뷰 코멘트를 에이전트에 그대로 전달'],
  },
  {
    id: 'design',
    label: 'UI/UX · 브랜드',
    summary: (
      <>
        랜딩 전용 테마(SaaS/로컬 등)로 톤을 맞추고, 미리보기에서 색·타이
        <br className="hidden xl:inline" />포 방향을 빠르게 맞춥니다.
      </>
    ),
    points: ['세부 랜딩 테마 선택·미리보기', '카드·히어로 레이아웃 반복 시도'],
  },
  {
    id: 'dev',
    label: '개발',
    summary: (
      <>
        Code 탭에서 폴더 구조를 보고, GitHub·ZIP으로 기존 레포를 끌어온{' '}
        <br className="hidden xl:inline" />뒤 파이프라인 로그로 빌드 상태를 확인합니다.
      </>
    ),
    points: [
      '에이전트와 병행해 수동 수정도 가능(제품 로드맵)',
      '배포 실패 시 로그 기반으로 재시도',
    ],
  },
  {
    id: 'junior',
    label: '취준 · 부트캠프',
    summary: (
      <>
        포트폴리오용 프로젝트 카드와 설명 문구를 정리하고, 배포 URL을 한{' '}
        <br className="hidden xl:inline" />
        줄로 남깁니다.
      </>
    ),
    points: ['템플릿별로 다른 스토리 연습', '기한 맞춰 데모 URL 제출'],
  },
];

function RoleSpecificUsage() {
  /*
    직군은 "네 개를 다 읽는" 정보가 아니라 "내 것을 고르는" 정보다.
    좁은 화면에서는 네 장을 나열하는 대신 탭으로 고르게 한다 — 한 화면에 선택지
    전부가 보이고, 고른 하나만 자세히 읽힌다. xl 이상은 기존 2열 그리드 그대로다.
  */
  const [activeId, setActiveId] = useState(ROLES[0].id);
  const activeRole = ROLES.find((role) => role.id === activeId) ?? ROLES[0];

  return (
    <section
      id="roles"
      className="w-full scroll-mt-4 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)]"
    >
      <div className="flex flex-col gap-2 items-start justify-center px-5 py-12 md:px-10 md:py-14 xl:px-52 xl:py-16">
        <p className="text-[#7C3AED] text-[13px] font-extrabold tracking-wide md:text-lg md:tracking-normal">
          이런 분들에게
        </p>
        <p className="text-[#111827] typo-h2-bd">직군별로 이렇게 씁니다</p>
        <p className="text-[#64748B] text-[15px] font-medium md:text-lg">
          팀 구성이 달라도 같은 워크스페이스에서 역할만 나누면 됩니다.{' '}
          <br className="hidden xl:inline" />
          아래는 대표적인 사용 시나리오입니다.
        </p>

        {/* 좁은 화면: 직군을 고르는 탭 */}
        <div className="w-full pt-5 xl:hidden">
          <div role="tablist" aria-label="직군 선택" className="grid grid-cols-2 gap-2">
            {ROLES.map((role) => {
              const isActive = role.id === activeRole.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(role.id)}
                  className={cn(
                    'h-11 rounded-xl border px-2 text-[13px] font-semibold transition',
                    isActive
                      ? 'border-[#7C3AED] bg-[#7C3AED] text-white'
                      : 'border-[#E2E8F0] bg-white text-[#475569]',
                  )}
                >
                  {role.label}
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-3xl border border-[#0F172A]/8 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] p-5">
            <p className="text-[14px] leading-relaxed font-semibold text-[#475569]">
              {activeRole.summary}
            </p>
            <ul className="mt-3 list-disc pl-5 text-[14px] font-medium text-[#475569]">
              {activeRole.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* xl 이상: 기존 2열 그리드 그대로 */}
        <div className="hidden w-full grid-cols-2 gap-4 pt-5 xl:grid">
          {ROLES.map((role, index) => (
            <InfoCard
              key={role.id}
              title={
                <div className={cn('flex flex-col gap-2.5', index === 0 && 'w-full xl:w-[504px]')}>
                  <p className="text-[#7C3AED] text-[16px] font-extrabold md:text-lg">
                    {role.label}
                  </p>
                  <p className="text-[#475569] text-sm font-semibold">{role.summary}</p>
                </div>
              }
              description={
                <ul className="list-disc pl-8 text-sm text-[#475569] font-medium">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              }
              className={infoCardClassName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoleSpecificUsage;
