import { useMemo, useState } from 'react';
import HomeStepProgress from '@/components/layout/home/HomeStepProgress';
import HomeTemplateCard, {
  type HomeTemplateCardData,
} from '@/components/layout/home/HomeTemplateCard';
import { homeTemplates } from '@/mocks/home/homeTemplates';

type TemplateCategory = 'all' | 'service' | 'church' | 'academy' | 'company' | 'store' | 'politics';

type TemplateCard = HomeTemplateCardData & {
  category: Exclude<TemplateCategory, 'all'>;
};

const categories: { id: TemplateCategory; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'service', label: '서비스업' },
  { id: 'church', label: '교회/워십' },
  { id: 'academy', label: '숙박/레저' },
  { id: 'company', label: '기업' },
  { id: 'store', label: '종교/단체' },
  { id: 'politics', label: '정치' },
];

const templateCards: TemplateCard[] = homeTemplates.map((item) => ({
  id: item.id,
  title: item.title,
  tags: item.tags,
  image: item.image,
  startType: item.startType,
  category: item.category,
}));

function HomePage() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('all');
  const [selectedId, setSelectedId] = useState('2');

  const filteredCards = useMemo(
    () =>
      activeCategory === 'all'
        ? templateCards
        : templateCards.filter((card) => card.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="min-h-full bg-white px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <HomeStepProgress currentStep={1} />

        <section className="rounded-2xl border border-[#e2e8f0] bg-white px-5 py-6 text-center">
          <h1 className="text-[36px] font-bold tracking-tight text-[#0f172a]">
            마음에 드는 템플릿을 선택하세요
          </h1>
          <p className="mt-2 text-[14px] text-[#64748b]">
            마음에 드는 스타일을 골라보세요. 선택한 템플릿을 기반으로 멋진 웹페이지가 만들어집니다.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const active = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition ${
                    active
                      ? 'bg-[#1d9bf0] text-white'
                      : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCards.map((card) => (
              <HomeTemplateCard
                key={card.id}
                card={card}
                selected={selectedId === card.id}
                onSelect={() => setSelectedId(card.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
