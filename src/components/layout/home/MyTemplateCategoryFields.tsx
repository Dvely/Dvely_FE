import { useCallback } from 'react';
import {
  TEMPLATE_INDUSTRY_CATEGORIES,
  TEMPLATE_INDUSTRY_LABEL,
  TEMPLATE_SITE_TYPES,
  type TemplateIndustryCategory,
  type TemplateSiteType,
} from '@/lib/templateCategories';
import { cn } from '@/lib/utils';

type MyTemplateCategoryFieldsProps = {
  siteType: TemplateSiteType | null;
  categories: TemplateIndustryCategory[];
  onSiteTypeChange: (value: TemplateSiteType) => void;
  onCategoriesChange: (value: TemplateIndustryCategory[]) => void;
};

function MyTemplateCategoryFields({
  siteType,
  categories,
  onSiteTypeChange,
  onCategoriesChange,
}: MyTemplateCategoryFieldsProps) {
  const handleToggleIndustry = useCallback(
    (id: TemplateIndustryCategory) => {
      onCategoriesChange(
        categories.includes(id) ? categories.filter((item) => item !== id) : [...categories, id],
      );
    },
    [categories, onCategoriesChange],
  );

  return (
    <div className="mt-4 space-y-4">
      <fieldset>
        <legend className="mb-1.5 text-[13px] font-medium text-[#334155]">유형</legend>
        <div className="flex flex-wrap gap-2">
          {TEMPLATE_SITE_TYPES.map((item) => {
            const selected = siteType === item.id;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSiteTypeChange(item.id)}
                className={cn(
                  'inline-flex h-9 cursor-pointer items-center rounded-full border px-3.5 text-[13px] font-medium transition',
                  selected
                    ? 'border-[#ddd6fe] bg-[#faf5ff] text-[#6d28d9]'
                    : 'border-[#e5e7eb] bg-white text-[#334155] hover:border-[#d4d4d8] hover:bg-[#fafafa]',
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1.5 text-[13px] font-medium text-[#334155]">업종</legend>
        <div className="flex max-h-[168px] flex-wrap gap-2 overflow-y-auto pr-1">
          {TEMPLATE_INDUSTRY_CATEGORIES.map((item) => {
            const selected = categories.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => handleToggleIndustry(item.id)}
                className={cn(
                  'inline-flex h-9 cursor-pointer items-center rounded-full border px-3.5 text-[13px] font-medium transition',
                  selected
                    ? 'border-[#ddd6fe] bg-[#faf5ff] text-[#6d28d9]'
                    : 'border-[#e5e7eb] bg-white text-[#334155] hover:border-[#d4d4d8] hover:bg-[#fafafa]',
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {categories.length > 0 ? (
          <p className="mt-2 text-[12px] text-[#64748b]">
            {categories.map((id) => TEMPLATE_INDUSTRY_LABEL[id]).join(' · ')}
          </p>
        ) : (
          <p className="mt-2 text-[12px] text-[#94a3b8]">업종을 하나 이상 선택하세요.</p>
        )}
      </fieldset>
    </div>
  );
}

export default MyTemplateCategoryFields;
