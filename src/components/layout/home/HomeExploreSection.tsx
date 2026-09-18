import { useCallback, useMemo, useState } from 'react';
import HomeTemplateCard, {
  type HomeTemplateCardData,
} from '@/components/layout/home/HomeTemplateCard';
import HomeAddTemplateCard from '@/components/layout/home/HomeAddTemplateCard';
import MyTemplateFileCard from '@/components/layout/home/MyTemplateFileCard';
import MyTemplateUploadDialog from '@/components/layout/home/MyTemplateUploadDialog';
import { FilterSelect } from '@/components/ui/Filter';
import TemplateBrowseFilters from '@/components/layout/templates/TemplateBrowseFilters';
import { homeTemplates } from '@/mocks/home/homeTemplates';
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
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const { templates: myTemplates, isLoading: isMyTemplatesLoading, addTemplate } = useMyTemplates();
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
  const skeletonItems = Array.from({ length: 3 }, (_, idx) => idx);

  const handleOpenUpload = useCallback(() => {
    setActiveTab('my-templates');
    setIsUploadOpen(true);
  }, []);

  const handleAddTemplate = useCallback(
    (file: File, name: string) => {
      addTemplate(file, name);
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

      <div className="relative z-20 mt-4 flex items-center justify-between gap-3">
        {activeTab === 'explore' ? (
          <>
            <TemplateBrowseFilters
              typeValue={themeFilter}
              industryValue={styleFilter}
              onTypeChange={setThemeFilter}
              onIndustryChange={setStyleFilter}
            />
            <FilterSelect
              value={sort}
              onChange={(value) => setSort(value as SortOption)}
              options={sortOptions}
              aria-label="정렬 기준"
            />
          </>
        ) : (
          <p className="text-[14px] text-[#64748b]">ZIP 파일을 첨부해 나만의 템플릿을 추가하세요.</p>
        )}
      </div>

      {activeTab === 'explore' ? (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <HomeAddTemplateCard onClick={handleOpenUpload} />
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
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <HomeAddTemplateCard label="ZIP 템플릿 추가" onClick={handleOpenUpload} />
          {isMyTemplatesLoading
            ? skeletonItems.map((item) => (
                <div
                  key={item}
                  className="aspect-16/10 animate-pulse rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]"
                />
              ))
            : myTemplates.map((template) => (
                <MyTemplateFileCard key={template.id} template={template} />
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
