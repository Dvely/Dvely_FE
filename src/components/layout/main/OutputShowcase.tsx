import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import InfoCard from '@/components/common/InfoCard';

const showcaseCardClassName = 'rounded-3xl w-full h-[147px] p-3.5';

type ShowcaseCardProps = {
  cardBackgroundClassName: string;
  badgeBackgroundClassName: string;
  badgeTextClassName: string;
  badgeLabel: ReactNode;
};

const showcaseItems: ShowcaseCardProps[] = [
  {
    cardBackgroundClassName: 'bg-[linear-gradient(135deg,#1E293B_0%,#312E81_100%)]',
    badgeBackgroundClassName: 'bg-black',
    badgeTextClassName: 'text-white',
    badgeLabel: 'SaaS 랜딩',
  },
  {
    cardBackgroundClassName: 'bg-red-500',
    badgeBackgroundClassName: 'bg-white',
    badgeTextClassName: 'text-[#111827]',
    badgeLabel: '포트폴리오',
  },
  {
    cardBackgroundClassName: 'bg-orange-500',
    badgeBackgroundClassName: 'bg-white',
    badgeTextClassName: 'text-[#111827]',
    badgeLabel: '로컬 비즈니스',
  },
  {
    cardBackgroundClassName: 'bg-yellow-400',
    badgeBackgroundClassName: 'bg-white',
    badgeTextClassName: 'text-[#111827]',
    badgeLabel: '블로그 · 문서',
  },
  {
    cardBackgroundClassName: 'bg-green-500',
    badgeBackgroundClassName: 'bg-white',
    badgeTextClassName: 'text-[#111827]',
    badgeLabel: '대시보드형',
  },
  {
    cardBackgroundClassName: 'bg-blue-500',
    badgeBackgroundClassName: 'bg-white',
    badgeTextClassName: 'text-[#111827]',
    badgeLabel: '이벤트 페이지',
  },
];

function ShowcaseCard({
  cardBackgroundClassName,
  badgeBackgroundClassName,
  badgeTextClassName,
  badgeLabel,
}: ShowcaseCardProps) {
  return (
    <div
      className={cn(
        showcaseCardClassName,
        'flex flex-col justify-end items-start',
        cardBackgroundClassName,
      )}
    >
      <div
        className={cn(
          'rounded-full font-semibold text-[13px] py-2 px-3 w-fit',
          badgeBackgroundClassName,
          badgeTextClassName,
        )}
      >
        {badgeLabel}
      </div>
    </div>
  );
}

function OutputShowcase() {
  return (
    <section className="w-full bg-white">
      <div className="flex flex-col gap-2 items-start justify-center py-16 px-52">
        <p className="text-[#7C3AED] text-lg font-extrabold">만들 수 있는 결과물</p>
        <p className="text-[#111827] text-[40px] font-bold">다양한 웹 서비스 유형</p>
        <div className="flex justify-between w-full">
          <p className="text-[#64748B] text-lg font-medium">
            아래는 스타일 레퍼런스용 목업입니다. 실제 생성물은 프롬프트
            <br />와 템플리셍 따라 달라집니다.
          </p>
          <Button variant="link" className="text-[#7C3AED] text-md font-medium">
            템플릿 보러가기 {'->'}
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-5 w-full">
          {showcaseItems.map((item, i) => (
            <ShowcaseCard key={i} {...item} />
          ))}
          <InfoCard
            title="템플릿으로 시작하면"
            description={
              <p className="text-[#64748B] font-medium">
                카페·스튜디오·SaaS 등
                <span className="text-[#111827] font-semibold">업종별 뼈대</span>가 잡혀 있어 첫
                프롬프트 부담이 줄어듭니다. 이후에는 섹션 추가·카피 교체만 반복하면 됩니다.
              </p>
            }
            className="bg-transparent border-none"
          />
          <InfoCard
            title="브랜드 톤 맞추기"
            description='다크/라이트, 미니멀/감성 등 키워드를 프롬프트에 섞으면 라이아웃 밀도와 여백 감각이 달라집니다. 에이전트에 "톤만 살짝 더 딱딱하게"처럼 요청해 미세 조정할 수 있습니다.'
            className="bg-transparent border-none"
          />
          <InfoCard
            title="배포 후에도"
            description="같은 프로젝트에서 버전·파이프라인 상태를 보고, 다음 스프린트에 맞춰 페이지를 덧붙이는 흐름을 가정했습니다."
            className="bg-transparent border-none"
          />
        </div>
      </div>
    </section>
  );
}

export default OutputShowcase;
