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
          좁은 화면: 데스크탑과 같은 3열 2행을 그대로 줄인다.

          배치를 바꾸지 않고 치수만 내린다 — 여섯 단계가 한 화면에 들어오고,
          가로로 세 개씩 두 줄이라는 형태도 PC 와 같게 읽힌다.
        */}
        <div className="mt-4 w-full border-t border-[#E2E8F0] xl:hidden">
          <div className="grid grid-cols-3">
            {processCards.map((card, index) => (
              <article
                key={card.step}
                className={cn(
                  'px-2.5 py-4',
                  index < 3 && 'border-b border-[#E2E8F0]',
                  index % 3 !== 2 && 'border-r border-[#E2E8F0]',
                )}
              >
                <span className="inline-flex rounded border border-[#E2E8F0] px-1.5 py-0.5 text-[10px] font-medium text-[#64748B]">
                  Step {card.step}
                </span>
                <h3 className="mt-2 text-[13px] leading-snug font-bold text-[#111827]">
                  {card.title}
                </h3>
                <ul className="mt-1.5 space-y-1 text-[11px] leading-snug text-[#64748B]">
                  {card.items.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

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
