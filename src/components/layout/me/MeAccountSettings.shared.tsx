import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type MeAccountActionRowProps = {
  title: string;
  description?: string;
  action: ReactNode;
  danger?: boolean;
};

function MeAccountActionRow({ title, description, action, danger }: MeAccountActionRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <p className={cn('text-[14px] font-medium', danger ? 'text-[#0f172a]' : 'text-[#0f172a]')}>
          {title}
        </p>
        {description ? (
          <p
            className={cn(
              'mt-1 text-[13px] leading-relaxed',
              danger ? 'text-[#ef4444]' : 'text-[#64748b]',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

function MeAccountSettingsSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="h-4 w-16 animate-pulse rounded bg-[#e2e8f0]" />
        <div className="flex items-center gap-3">
          <div className="size-9 animate-pulse rounded-full bg-[#e2e8f0]" />
          <div className="h-11 flex-1 animate-pulse rounded-xl bg-[#e2e8f0]" />
        </div>
      </div>
      <div className="rounded-2xl bg-[#f8fafc] p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-5 w-12 animate-pulse rounded bg-[#e2e8f0]" />
          <div className="h-8 w-20 animate-pulse rounded-lg bg-[#e2e8f0]" />
        </div>
        <div className="space-y-4 border-t border-[#e2e8f0] pt-4">
          <div className="h-10 animate-pulse rounded bg-[#e2e8f0]" />
          <div className="h-12 animate-pulse rounded bg-[#e2e8f0]" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-20 animate-pulse rounded bg-[#e2e8f0]" />
        <div className="h-16 animate-pulse rounded bg-[#e2e8f0]" />
        <div className="h-16 animate-pulse rounded bg-[#e2e8f0]" />
      </div>
    </div>
  );
}

export { MeAccountActionRow, MeAccountSettingsSkeleton };
