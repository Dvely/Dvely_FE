import type { ReactNode } from 'react';

type MeAccountActionRowProps = {
  title: string;
  description?: string;
  action: ReactNode;
};

function MeAccountActionRow({ title, description, action }: MeAccountActionRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-[#0f172a]">{title}</p>
        {description ? (
          <p className="mt-1 text-[13px] leading-relaxed text-[#64748b]">{description}</p>
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
      <div className="space-y-4">
        <div className="h-4 w-20 animate-pulse rounded bg-[#e2e8f0]" />
        <div className="h-16 animate-pulse rounded bg-[#e2e8f0]" />
        <div className="h-16 animate-pulse rounded bg-[#e2e8f0]" />
      </div>
    </div>
  );
}

export { MeAccountActionRow, MeAccountSettingsSkeleton };
