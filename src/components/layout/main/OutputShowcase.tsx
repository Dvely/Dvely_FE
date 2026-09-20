import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import {
  homeTemplates,
  type HomeTemplateItem,
} from '@/mocks/home/homeTemplates';
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
  templates: HomeTemplateItem[],
  industry: CategoryFilter,
  siteType: TypeFilter,
) {
  let items = templates;

  if (industry !== 'all') {
    items = items.filter((template) => templateHasIndustry(template.categories, industry));
  }

  if (siteType !== 'all') {
    items = items.filter((template) => template.startType === siteType);
  }

  return items;
}

type LandingTemplateCardProps = {
  template: HomeTemplateItem;
};

function LandingTemplateCard({ template }: LandingTemplateCardProps) {
  return (
    <article className="group text-left">
      <Link
        to="/project/new"
        search={{ type: template.startType, templateId: template.id }}
        className="block"
      >
        <div className="relative aspect-10/16 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] transition duration-300 group-hover:border-[#cbd5e1]">
          <img
            src={template.image}
            alt={template.title}
            className="size-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="rounded-md bg-[#dbeafe] px-2 py-0.5 text-[12px] font-semibold text-[#2563eb]">
          무료
        </span>
        <span className="text-[15px] font-semibold text-[#0f172a]">{template.title}</span>
        <span className="text-[14px] text-[#64748b]">
          {TEMPLATE_INDUSTRY_LABEL[template.categories[0]]}
        </span>
      </div>
    </article>
  );
}

function OutputShowcase() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const visibleTemplates = useMemo(() => {
    return filterTemplates(homeTemplates, categoryFilter, typeFilter).slice(
      0,
      LANDING_TEMPLATE_LIMIT,
    );
  }, [categoryFilter, typeFilter]);

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

        <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTemplates.length > 0 ? (
            visibleTemplates.map((template) => (
              <LandingTemplateCard key={template.id} template={template} />
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
