import { cn } from '@/lib/utils';

const processCards = [
  {
    step: '01',
    title: '문의·상담',
    items: [
      '프로젝트 목적과 예산·일정 청취',
      '타겟 고객·경쟁사 현황 파악',
      '기대하는 결과물과 범위 정리',
    ],
  },
  {
    step: '02',
    title: '적합성 검토',
    items: [
      '잘 맞는 프로젝트인지 내부 리뷰',
      '기술 스택·리소스 가능성 확인',
      '솔직한 피드백과 방향 제안',
    ],
  },
  {
    step: '03',
    title: '시안 제작',
    items: [
      '계약 전, 메인페이지 시안 먼저 제공',
      '브랜드 톤에 맞춘 디자인 방향 제시',
      '보고 결정하셔도 늦지 않습니다',
    ],
  },
  {
    step: '04',
    title: '계약·킥오프',
    items: ['범위·일정·금액 확정 후 계약', '전담 PM 배정 및 킥오프 미팅'],
  },
  {
    step: '05',
    title: '디자인·개발',
    items: ['기획 → 디자인 → 퍼블 → 개발 원팀 진행', '주 단위 진행 공유 및 검수'],
  },
  {
    step: '06',
    title: '오픈·케어',
    items: ['도메인·서버 이관 및 실서버 배포', '오픈 직후 2주 안정화 케어'],
  },
] as const;

function ProcessSection() {
  return (
    <section id="process" className="w-full scroll-mt-4 bg-white">
      <div className="flex flex-col items-start justify-center gap-2 px-5 py-12 md:px-10 md:py-14 xl:px-52 xl:py-16">
        <p className="text-[13px] font-extrabold tracking-wide md:text-lg md:tracking-normal text-[#7C3AED]">
          프로그램 진행 과정
        </p>
        <p className="typo-h2-bd text-[#111827]">이렇게 이어집니다</p>

        {/*
          좁은 화면: 세로 타임라인.

          진행 과정은 순서가 곧 내용이다. 옆으로 흐르게 하면 몇 번째인지, 몇 개가
          남았는지 감이 사라진다. 번호를 줄로 잇는 세로 타임라인이 그 두 가지를
          한눈에 준다. 접어서 숨기지도 않는다 — 여섯 단계 전부 읽히는 게 맞다.
        */}
        <ol className="mt-6 w-full xl:hidden">
          {processCards.map((card, index) => (
            <li key={card.step} className="relative flex gap-3.5 pb-4 last:pb-0">
              {/* 다음 단계로 잇는 선. 마지막에는 긋지 않는다 */}
              {index < processCards.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute top-9 left-[17px] h-[calc(100%-1.75rem)] w-0.5 rounded bg-[linear-gradient(180deg,#DDD6FE_0%,#EEF2F7_100%)]"
                />
              ) : null}
              <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-[13px] font-bold text-white shadow-[0_4px_10px_rgba(124,58,237,0.3)]">
                {card.step}
              </span>
              <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                {/* 큰 반투명 숫자. 단계감을 카드 안에서도 한 번 더 준다 */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 right-1 text-[54px] leading-none font-extrabold text-[#7C3AED]/6 select-none"
                >
                  {card.step}
                </span>
                <h3 className="relative text-[16px] font-bold text-[#111827]">{card.title}</h3>
                <ul className="relative mt-2 space-y-1 text-[13px] leading-relaxed text-[#64748B]">
                  {card.items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* xl 이상: 기존 3열 표 그대로 */}
        <div className="mt-5 hidden w-full border-t border-[#E2E8F0] xl:block">
          <div className="grid grid-cols-3">
            {processCards.map((card, index) => (
              <article
                key={card.step}
                className={cn(
                  'px-8 py-10',
                  index < 3 && 'border-b border-[#E2E8F0]',
                  index % 3 !== 2 && 'border-r border-[#E2E8F0]',
                )}
              >
                <span className="inline-flex rounded border border-[#E2E8F0] px-2.5 py-1 text-[12px] font-medium text-[#64748B]">
                  Step {card.step}
                </span>
                <h3 className="mt-5 text-[20px] font-bold text-[#111827]">{card.title}</h3>
                <ul className="mt-4 space-y-1 text-[13px] leading-relaxed text-[#64748B]">
                  {card.items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
