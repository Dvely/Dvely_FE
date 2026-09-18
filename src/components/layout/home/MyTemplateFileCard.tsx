import { FileArchive } from 'lucide-react';
import { formatFileSize } from '@/lib/zipFile';
import type { MyTemplateItem } from '@/types/my-template.type';

type MyTemplateFileCardProps = {
  template: MyTemplateItem;
};

function formatAddedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function MyTemplateFileCard({ template }: MyTemplateFileCardProps) {
  const addedLabel = formatAddedAt(template.addedAt);

  return (
    <article className="flex aspect-16/10 flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-4 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <span className="flex size-11 items-center justify-center rounded-2xl bg-[#faf5ff] text-[#7c3aed]">
        <FileArchive className="size-5" strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[16px] font-semibold tracking-tight text-[#0f172a]">
          {template.name}
        </p>
        <p className="mt-1 truncate text-[13px] text-[#64748b]">{template.fileName}</p>
        <p className="mt-2 text-[12px] text-[#94a3b8]">
          {formatFileSize(template.size)}
          {addedLabel ? ` · ${addedLabel} 추가` : ''}
        </p>
      </div>
    </article>
  );
}

export default MyTemplateFileCard;
