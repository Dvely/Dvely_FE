import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  TEMPLATE_INDUSTRY_CATEGORIES,
  TEMPLATE_INDUSTRY_LABEL,
  TEMPLATE_SITE_TYPES,
  type TemplateIndustryCategory,
  type TemplateSiteType,
} from '@/lib/templateCategories';
import { cn } from '@/lib/utils';

type MenuId = 'type' | 'industry';

type TemplateBrowseFiltersProps = {
  typeValue: 'all' | TemplateSiteType;
  industryValue: 'all' | TemplateIndustryCategory;
  onTypeChange: (value: 'all' | TemplateSiteType) => void;
  onIndustryChange: (value: 'all' | TemplateIndustryCategory) => void;
  className?: string;
  align?: 'start' | 'center';
};

const typeOptions = [
  { id: 'all', label: '모든 유형' },
  ...TEMPLATE_SITE_TYPES,
] as const;

const industryMidpoint = Math.ceil(TEMPLATE_INDUSTRY_CATEGORIES.length / 2);
const leftIndustries = TEMPLATE_INDUSTRY_CATEGORIES.slice(0, industryMidpoint);
const rightIndustries = TEMPLATE_INDUSTRY_CATEGORIES.slice(industryMidpoint);

const panelClassName =
  'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 origin-top rounded-2xl border border-[#ececf1] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] duration-200';

function TemplateBrowseFilters({
  typeValue,
  industryValue,
  onTypeChange,
  onIndustryChange,
  className,
  align = 'start',
}: TemplateBrowseFiltersProps) {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const typeMenuId = useId();
  const industryMenuId = useId();
  const industryLabel =
    industryValue === 'all' ? '모든 업종' : TEMPLATE_INDUSTRY_LABEL[industryValue];
  const typeLabel =
    typeOptions.find((option) => option.id === typeValue)?.label ?? '모든 유형';
  const isCentered = align === 'center';

  const handleToggle = useCallback((menu: MenuId) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  }, []);

  const handleTypeSelect = useCallback(
    (value: 'all' | TemplateSiteType) => {
      onTypeChange(value);
      setOpenMenu(null);
    },
    [onTypeChange],
  );

  const handleIndustrySelect = useCallback(
    (value: 'all' | TemplateIndustryCategory) => {
      onIndustryChange(value);
      setOpenMenu(null);
    },
    [onIndustryChange],
  );

  useEffect(() => {
    if (!openMenu) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMenu]);

  return (
    <div
      ref={rootRef}
      className={cn('relative z-20 flex items-center gap-2', isCentered && 'justify-center', className)}
    >
      <div className="relative">
        <FilterTrigger
          label={industryLabel}
          open={openMenu === 'industry'}
          menuId={industryMenuId}
          ariaLabel="업종 필터"
          onClick={() => handleToggle('industry')}
        />
        {openMenu === 'industry' ? (
          <div
            id={industryMenuId}
            role="listbox"
            aria-label="업종"
            className={cn(
              panelClassName,
              'absolute top-full z-30 mt-2 w-[min(560px,calc(100vw-32px))] p-3',
              isCentered ? 'left-1/2 -translate-x-1/2' : 'left-0',
            )}
          >
            <IndustryOption
              label="모든 업종"
              selected={industryValue === 'all'}
              onSelect={() => handleIndustrySelect('all')}
              className="mb-1"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col sm:pr-3">
                {leftIndustries.map((item) => (
                  <IndustryOption
                    key={item.id}
                    label={item.label}
                    selected={industryValue === item.id}
                    onSelect={() => handleIndustrySelect(item.id)}
                  />
                ))}
              </div>
              <div className="flex flex-col sm:border-l sm:border-[#eeeef3] sm:pl-3">
                {rightIndustries.map((item) => (
                  <IndustryOption
                    key={item.id}
                    label={item.label}
                    selected={industryValue === item.id}
                    onSelect={() => handleIndustrySelect(item.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative">
        <FilterTrigger
          label={typeLabel}
          open={openMenu === 'type'}
          menuId={typeMenuId}
          ariaLabel="유형 필터"
          onClick={() => handleToggle('type')}
        />
        {openMenu === 'type' ? (
          <ul
            id={typeMenuId}
            role="listbox"
            aria-label="유형"
            className={cn(
              panelClassName,
              'absolute top-full z-30 mt-2 min-w-[200px] py-2',
              isCentered ? 'left-1/2 -translate-x-1/2' : 'left-0',
            )}
          >
            {typeOptions.map((option) => {
              const selected = typeValue === option.id;

              return (
                <li key={option.id} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => handleTypeSelect(option.id)}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between gap-6 px-4 py-2.5 text-left text-[14px] transition',
                      selected
                        ? 'bg-[#f8f5ff] font-medium text-[#6d28d9]'
                        : 'text-[#334155] hover:bg-[#f8fafc]',
                    )}
                  >
                    {option.label}
                    {selected ? <Check className="size-4 text-[#7c3aed]" aria-hidden /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

type FilterTriggerProps = {
  label: string;
  open: boolean;
  menuId: string;
  ariaLabel: string;
  onClick: () => void;
};

function FilterTrigger({ label, open, menuId, ariaLabel, onClick }: FilterTriggerProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={menuId}
      onClick={onClick}
      className={cn(
        'inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl border bg-white px-3.5 text-[14px] font-medium whitespace-nowrap outline-none transition',
        open
          ? 'border-[#ddd6fe] bg-[#faf5ff] text-[#6d28d9] shadow-[0_0_0_3px_rgba(124,58,237,0.12)]'
          : 'border-[#e5e7eb] text-[#334155] hover:border-[#d4d4d8] hover:bg-[#fafafa]',
      )}
    >
      {label}
      <ChevronDown
        className={cn('size-4 text-current transition duration-200', open && 'rotate-180')}
        aria-hidden
      />
    </button>
  );
}

type IndustryOptionProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
};

function IndustryOption({ label, selected, onSelect, className }: IndustryOptionProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onSelect}
      className={cn(
        'flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] transition',
        selected
          ? 'bg-[#f8f5ff] font-medium text-[#6d28d9]'
          : 'text-[#334155] hover:bg-[#f8fafc]',
        className,
      )}
    >
      {label}
      {selected ? <Check className="size-4 shrink-0 text-[#7c3aed]" aria-hidden /> : null}
    </button>
  );
}

export default TemplateBrowseFilters;
