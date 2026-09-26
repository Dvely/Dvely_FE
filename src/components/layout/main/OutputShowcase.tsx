import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import { TEMPLATE_CATALOG_QUERY_KEY, useTemplateListQuery } from '@/api/templates';
import { toTemplateCard, type TemplateCardItem } from '@/lib/templateCatalog';
import TemplateBrowseFilters from '@/components/layout/templates/TemplateBrowseFilters';
import {
  TEMPLATE_INDUSTRY_LABEL,
  templateHasIndustry,
  type TemplateIndustryCategory,
  type TemplateSiteType,
} from '@/lib/templateCategories';

type CategoryFilter = 'all' | TemplateIndustryCategory;
type TypeFilter = 'all' | TemplateSiteType;

const LANDING_TEMPLATE_LIMIT = 3;

function filterTemplates(
  templates: TemplateCardItem[],
  industry: CategoryFilter,
  siteType: TypeFilter,
) {
  let items = templates;

  if (industry !== 'all') {
    items = items.filter((template) => templateHasIndustry(template.industries, industry));
  }

  if (siteType !== 'all') {
    items = items.filter((template) => template.siteType === siteType);
  }

  return items;
}

type LandingTemplateCardProps = {
  template: TemplateCardItem;
};

function LandingTemplateCard({ template }: LandingTemplateCardProps) {
  /*
    업종은 태그에서 파생한다. 아는 태그가 하나도 없으면 빈 배열이라 첫 값이 없다 —
    그때는 업종 줄을 아예 안 그린다. `undefined` 를 표에 넣으면 빈 칸이 나와서,
    설명이 빠진 것인지 고장인지 읽는 쪽이 구분할 수 없다.
  */
  const industryLabel = template.industries[0]
    ? TEMPLATE_INDUSTRY_LABEL[template.industries[0]]
    : null;

  return (
    <article className="group w-[78%] text-left sm:w-[46%] lg:w-[31%] xl:w-auto">
      <Link
        to="/project/new"
        search={{ type: template.siteType, templateId: template.templateId }}
        className="block"
      >
        {/*
          카탈로그 썸네일은 640×400 이다. 예전 더미는 세로 목업이라 `aspect-10/16` 이
          맞았는데, 가로 그림을 그 칸에 넣으면 `object-cover` 가 2.6 배로 확대해 가운데
          세로 띠만 남긴다 — 무슨 템플릿인지 알아볼 수 없다. 그림의 실제 비율에 맞춘다.
        */}
        <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] transition duration-300 group-hover:border-[#cbd5e1]">
          {template.thumbnailUrl ? (
            <img
              src={template.thumbnailUrl}
              alt={template.name}
              className="size-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            /*
              그림이 없을 수 있다 — 카탈로그가 GH Pages 에서 실시간으로 와서, 템플릿
              저장소가 발행되기 전에는 서버가 이 값을 안 준다. 깨진 이미지 아이콘보다
              이름이 적힌 칸이 낫다.
            */
            <div className="flex size-full items-center justify-center bg-linear-to-br from-[#ede9fe] to-[#f1f5f9] px-4">
              <p className="text-center text-[15px] font-semibold text-[#6d28d9]">
                {template.name}
              </p>
            </div>
          )}
        </div>
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="rounded-md bg-[#dbeafe] px-2 py-0.5 text-[12px] font-semibold text-[#2563eb]">
          무료
        </span>
        <span className="text-[15px] font-semibold text-[#0f172a]">{template.name}</span>
        {industryLabel ? <span className="text-[14px] text-[#64748b]">{industryLabel}</span> : null}
      </div>
    </article>
  );
}

function LandingTemplateCardSkeleton() {
  return (
    <div className="w-[78%] sm:w-[46%] lg:w-[31%] xl:w-auto">
      <div className="aspect-16/10 animate-pulse rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]" />
      <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-[#e2e8f0]" />
    </div>
  );
}

function OutputShowcase() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  /*
    로그인 전 화면인데도 서버에서 받아 온다. `GET /templates` 는 인증을 타지 않고,
    axios 인터셉터도 토큰이 없으면 헤더를 안 붙이고 그냥 통과시킨다.

    화면 안에 더미를 두면 **여기 걸린 템플릿을 눌렀을 때 만들어지지 않는다** — 카드의
    id 가 곧 생성 요청의 `templateType` 이라 서버가 아는 값이어야 한다.
  */
  const { data: catalog, isLoading } = useTemplateListQuery(TEMPLATE_CATALOG_QUERY_KEY);

  const visibleTemplates = useMemo(() => {
    const cards = (catalog ?? []).map(toTemplateCard);
    return filterTemplates(cards, categoryFilter, typeFilter).slice(0, LANDING_TEMPLATE_LIMIT);
  }, [catalog, categoryFilter, typeFilter]);

  return (
    <section id="showcase" className="w-full scroll-mt-4 bg-white">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center px-5 py-14 sm:px-6 sm:py-20">
        <header className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-[32px] font-bold tracking-tight text-[#0f172a] sm:text-[36px]">
            무료로 바로 시작해보세요
          </h2>
          <p className="max-w-[560px] text-[15px] leading-relaxed text-[#64748b] sm:text-[16px]">
            업종별 전문 템플릿. 선택하는 순간 나만의 홈페이지가 완성됩니다
          </p>
        </header>

        <TemplateBrowseFilters
          className="mt-10"
          align="center"
          typeValue={typeFilter}
          industryValue={categoryFilter}
          onTypeChange={setTypeFilter}
          onIndustryChange={setCategoryFilter}
        />

        <div className="mobile-rail mt-8 grid w-full grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [0, 1, 2].map((item) => <LandingTemplateCardSkeleton key={`skeleton-${item}`} />)
          ) : visibleTemplates.length > 0 ? (
            visibleTemplates.map((template) => (
              <LandingTemplateCard key={template.templateId} template={template} />
            ))
          ) : (
            <p className="col-span-full py-16 text-center text-[14px] text-[#94a3b8]">
              해당 업종의 템플릿을 준비 중입니다.
            </p>
          )}
        </div>

        <Link
          to="/home"
          className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-[#0f172a] px-6 text-[14px] font-semibold text-white transition hover:bg-[#1e293b]"
        >
          템플릿 더보기
          <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
        </Link>
      </div>
    </section>
  );
}

export default OutputShowcase;
