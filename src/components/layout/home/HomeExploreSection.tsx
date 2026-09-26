import { useCallback, useMemo, useState } from 'react';
import HomeTemplateCard, {
  type HomeTemplateCardData,
} from '@/components/layout/home/HomeTemplateCard';
import HomeAddTemplateCard from '@/components/layout/home/HomeAddTemplateCard';
import MyTemplateFileCard from '@/components/layout/home/MyTemplateFileCard';
import MyTemplateUploadDialog from '@/components/layout/home/MyTemplateUploadDialog';
import { FilterSelect } from '@/components/ui/Filter';
import TemplateBrowseFilters from '@/components/layout/templates/TemplateBrowseFilters';
import { TEMPLATE_CATALOG_QUERY_KEY, useTemplateListQuery } from '@/api/templates';
import { toTemplateCard } from '@/lib/templateCatalog';
import { useMyTemplates } from '@/hooks/useMyTemplates';
import {
  templateHasIndustry,
  type TemplateIndustryCategory,
  type TemplateSiteType,
} from '@/lib/templateCategories';
import { cn } from '@/lib/utils';

type HomeTab = 'explore' | 'my-templates';
type StyleFilter = 'all' | TemplateIndustryCategory;
type ThemeFilter = 'all' | TemplateSiteType;
type SortOption = 'popular' | 'newest';

type TemplateCard = HomeTemplateCardData & {
  categories: TemplateIndustryCategory[];
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: '인기순' },
  { value: 'newest', label: '최신순' },
];

function HomeExploreSection() {
  const [activeTab, setActiveTab] = useState<HomeTab>('explore');
  const [selectedId, setSelectedId] = useState('');

  /*
    템플릿은 서버 카탈로그에서 온다.

    예전에는 화면 안에 더미 12종을 들고 있었다. 그것들은 프로젝트를 만들 때 쓰는
    `templateType` 에 해당하는 값이 아니라, 골라도 씨딩되지 않았다 — 서버가 아는
    id 를 보내야 한다(없는 값은 400).
  */
  const { data: catalog, isLoading: isCatalogLoading } = useTemplateListQuery(TEMPLATE_CATALOG_QUERY_KEY);

  const templateCards: TemplateCard[] = useMemo(
    () =>
      (catalog ?? []).map((template) => {
        const card = toTemplateCard(template);
        return {
          id: card.templateId,
          title: card.name,
          tags: card.tags,
          image: card.thumbnailUrl,
          startType: card.siteType,
          categories: card.industries,
          thumbnailPreviewUrl: undefined,
        };
      }),
    [catalog],
  );
  const [styleFilter, setStyleFilter] = useState<StyleFilter>('all');
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>('all');
  const [sort, setSort] = useState<SortOption>('popular');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const {
    templates: myTemplates,
    addTemplate,
    removeTemplate,
  } = useMyTemplates();
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
  }, [templateCards, sort, styleFilter, themeFilter]);
  const filteredMyTemplates = useMemo(() => {
    let items = myTemplates;

    if (styleFilter !== 'all') {
      items = items.filter((template) => templateHasIndustry(template.categories, styleFilter));
    }

    if (themeFilter !== 'all') {
      items = items.filter((template) => template.siteType === themeFilter);
    }

    return items;
  }, [myTemplates, styleFilter, themeFilter]);

  const handleOpenUpload = useCallback(() => {
    setActiveTab('my-templates');
    setIsUploadOpen(true);
  }, []);

  const handleAddTemplate = useCallback(
    (
      file: File,
      payload: {
        name: string;
        siteType: TemplateSiteType;
        categories: TemplateIndustryCategory[];
      },
    ) => {
      addTemplate(file, payload);
    },
    [addTemplate],
  );

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
              'relative pb-3 text-[15px] font-medium transition cursor-pointer',
              activeTab === tab.id
                ? 'text-[#0f172a] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[#0f172a]'
                : 'text-[#94a3b8] hover:text-[#64748b]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative z-20 mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TemplateBrowseFilters
          typeValue={themeFilter}
          industryValue={styleFilter}
          onTypeChange={setThemeFilter}
          onIndustryChange={setStyleFilter}
        />
        {activeTab === 'explore' ? (
          <FilterSelect
            value={sort}
            onChange={(value) => setSort(value as SortOption)}
            options={sortOptions}
            aria-label="정렬 기준"
          />
        ) : (
          <p className="hidden text-[13px] text-[#64748b] sm:block">
            ZIP을 첨부하고 카테고리를 지정하세요.
          </p>
        )}
      </div>

      {activeTab === 'explore' ? (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <HomeAddTemplateCard onClick={handleOpenUpload} />
          {/*
            여기는 진짜로 기다린다 — 카탈로그가 서버에서 온다. 내 템플릿 탭과 다르다
            (그쪽은 localStorage 라 기다릴 것이 없어 스켈레톤을 걷어냈다).
          */}
          {isCatalogLoading
            ? [0, 1, 2, 3].map((item) => (
                <div
                  key={`template-skeleton-${item}`}
                  className="aspect-16/10 animate-pulse rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]"
                />
              ))
            : filteredCards.map((card) => (
                <HomeTemplateCard
                  key={card.id}
                  card={card}
                  selected={selectedId === card.id}
                  onSelect={() => setSelectedId(card.id)}
                />
              ))}
          {!isCatalogLoading && filteredCards.length === 0 ? (
            <p className="col-span-full py-10 text-center text-[13px] text-[#94a3b8]">
              조건에 맞는 템플릿이 없습니다.
            </p>
          ) : null}
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <HomeAddTemplateCard label="ZIP 템플릿 추가" onClick={handleOpenUpload} />
          {filteredMyTemplates.map((template) => (
            <MyTemplateFileCard key={template.id} template={template} onRemove={removeTemplate} />
          ))}
        </div>
      )}

      <MyTemplateUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onSubmit={handleAddTemplate}
      />
    </section>
  );
}

export default HomeExploreSection;
