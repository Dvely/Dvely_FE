import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FilterOption = {
  value: string;
  label: string;
};

type FilterProps = React.ComponentProps<'div'>;

type FilterSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  className?: string;
  'aria-label'?: string;
  menuPlacement?: 'overlay' | 'push';
};

function Filter({ className, ...props }: FilterProps) {
  return <div className={cn('flex flex-wrap items-center gap-2', className)} {...props} />;
}

function FilterSelect({
  value,
  onChange,
  options,
  className,
  'aria-label': ariaLabel,
  menuPlacement = 'overlay',
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];
  const isPush = menuPlacement === 'push';

  const handleToggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  const handleSelect = useCallback(
    (nextValue: string) => {
      onChange(nextValue);
      setOpen(false);
    },
    [onChange],
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative', open && 'z-40', className)}>
      <button
        type="button"
        aria-label={ariaLabel ?? selected?.label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={handleToggle}
        className={cn(
          'inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl border bg-white px-3.5 text-[14px] font-medium whitespace-nowrap outline-none transition',
          open
            ? 'border-[#ddd6fe] bg-[#faf5ff] text-[#6d28d9] shadow-[0_0_0_3px_rgba(124,58,237,0.12)]'
            : 'border-[#e5e7eb] text-[#334155] hover:border-[#d4d4d8] hover:bg-[#fafafa]',
        )}
      >
        {selected?.label}
        <ChevronDown
          className={cn('size-4 text-current transition duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={ariaLabel ?? selected?.label}
          className={cn(
            'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 min-w-full origin-top rounded-2xl border border-[#ececf1] bg-white px-2 py-2 shadow-[0_18px_50px_rgba(15,23,42,0.12)] duration-200',
            isPush ? 'mt-2' : 'absolute top-full left-0 z-30 mt-2',
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left text-[14px] whitespace-nowrap transition',
                    isSelected
                      ? 'bg-[#f8f5ff] font-medium text-[#6d28d9]'
                      : 'text-[#334155] hover:bg-[#f8fafc]',
                  )}
                >
                  {option.label}
                  {isSelected ? <Check className="size-3.5 text-[#7c3aed]" aria-hidden /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

Filter.Select = FilterSelect;

export { Filter, FilterSelect };
export default Filter;
