import {
  TEMPLATE_INDUSTRY_CATEGORIES,
  type TemplateIndustryCategory,
} from '@/lib/templateCategories';
import { cn } from '@/lib/utils';

type CategoryValue = 'all' | TemplateIndustryCategory;

type TemplateCategoryFiltersProps = {
  value: CategoryValue;
  onChange: (value: CategoryValue) => void;
  availableCategories: readonly TemplateIndustryCategory[];
};

export default function TemplateCategoryFilters({
  value,
  onChange,
  availableCategories,
}: TemplateCategoryFiltersProps) {
  const categories = [
    { id: 'all', label: '전체' },
    ...TEMPLATE_INDUSTRY_CATEGORIES.filter((category) => availableCategories.includes(category.id)),
  ] as const;

  return (
    <div
      role="group"
      aria-label="템플릿 카테고리"
      className="flex flex-wrap justify-center gap-2.5 sm:gap-x-3.5 sm:gap-y-4"
    >
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          aria-pressed={value === category.id}
          onClick={() => onChange(category.id)}
          className={cn(
            'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border bg-white px-4 py-2 text-[14px] leading-6 whitespace-nowrap transition-colors sm:min-h-10 sm:py-[7px] sm:text-[16px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#528fff]',
            value === category.id
              ? 'border-[#528fff] text-[#528fff]'
              : 'border-[#dedee3] text-[#333] hover:border-[#528fff] hover:text-[#528fff]',
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
