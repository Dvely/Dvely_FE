import { useMemo, useState } from 'react';
import HomeTemplateCard, {
  type HomeTemplateCardData,
} from '@/components/layout/home/HomeTemplateCard';
import HomeAddTemplateCard from '@/components/layout/home/HomeAddTemplateCard';
import Filter, { FilterSelect } from '@/components/ui/Filter';
import { homeTemplates } from '@/mocks/home/homeTemplates';
import {
  TEMPLATE_INDUSTRY_CATEGORIES,
  TEMPLATE_SITE_TYPES,
  templateHasIndustry,
  type TemplateIndustryCategory,
} from '@/lib/templateCategories';
import { cn } from '@/lib/utils';

type HomeTab = 'explore' | 'my-templates';
type StyleFilter = 'all' | TemplateIndustryCategory;
type ThemeFilter = 'all' | (typeof TEMPLATE_SITE_TYPES)[number]['id'];
type SortOption = 'popular' | 'newest';

type TemplateCard = HomeTemplateCardData & {
  categories: (typeof homeTemplates)[number]['categories'];
};

const templateCards: TemplateCard[] = homeTemplates.map((item) => ({
  id: item.id,
  title: item.title,
  tags: item.tags,
  image: item.image,
  startType: item.startType,
  categories: item.categories,
  thumbnailPreviewUrl: item.thumbnailPreviewUrl,
}));

const styleOptions: { value: StyleFilter; label: string }[] = [
  { value: 'all', label: '모든 업종' },
  ...TEMPLATE_INDUSTRY_CATEGORIES.map((item) => ({ value: item.id, label: item.label })),
];

const themeOptions: { value: ThemeFilter; label: string }[] = [
  { value: 'all', label: '모든 유형' },
  ...TEMPLATE_SITE_TYPES.map((item) => ({ value: item.id, label: item.label })),
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: '인기순' },
  { value: 'newest', label: '최신순' },
];

function HomeExploreSection() {
  const [activeTab, setActiveTab] = useState<HomeTab>('explore');
  const [selectedId, setSelectedId] = useState(templateCards[0]?.id ?? '');
  const [styleFilter, setStyleFilter] = useState<StyleFilter>('all');
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>('all');
  const [sort, setSort] = useState<SortOption>('popular');

  const filteredCards = useMemo(() => {
    let items = templateCards;

    if (styleFilter !== 'all') {
      items = items.filter((card) => templateHasIndustry(card.categories, styleFilter));
    }

    if (themeFilter === 'portfolio') {
      items = items.filter((card) => card.startType === 'portfolio');
    } else if (themeFilter === 'landing') {
      items = items.filter((card) => card.startType === 'landing');
    }

    if (sort === 'newest') {
      return [...items].reverse();
    }

    return items;
  }, [sort, styleFilter, themeFilter]);

  return (
    <section className="mx-auto w-full max-w-[1280px]">
      <div className="flex gap-6 border-b border-[#e5e7eb]">
        {(
          [
            { id: 'explore' as const, label: '탐색' },
            { id: 'my-templates' as const, label: '내 템플릿' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative pb-3 text-[15px] font-medium transition',
              activeTab === tab.id
                ? 'text-[#0f172a] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[#0f172a]'
                : 'text-[#94a3b8] hover:text-[#64748b]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Filter className="relative z-20 mt-4 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <FilterSelect
            value={styleFilter}
            onChange={(value) => setStyleFilter(value as StyleFilter)}
            options={styleOptions}
            aria-label="업종 필터"
          />
          <FilterSelect
            value={themeFilter}
            onChange={(value) => setThemeFilter(value as ThemeFilter)}
            options={themeOptions}
            aria-label="사이트 유형 필터"
          />
        </div>
        {activeTab === 'explore' ? (
          <FilterSelect
            value={sort}
            onChange={(value) => setSort(value as SortOption)}
            options={sortOptions}
            aria-label="정렬 기준"
          />
        ) : null}
      </Filter>

      {activeTab === 'explore' ? (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <HomeAddTemplateCard />
          {filteredCards.map((card) => (
            <HomeTemplateCard
              key={card.id}
              card={card}
              selected={selectedId === card.id}
              onSelect={() => setSelectedId(card.id)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 grid max-w-[280px] grid-cols-1 gap-5 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          <HomeAddTemplateCard />
          <div className="col-span-full flex min-h-[150px] items-center justify-center rounded-2xl border border-dashed border-[#e2e8f0] bg-[#f8fafc] sm:col-span-2 lg:col-span-3">
            <p className="text-[14px] text-[#94a3b8]">저장한 템플릿이 없습니다.</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default HomeExploreSection;
