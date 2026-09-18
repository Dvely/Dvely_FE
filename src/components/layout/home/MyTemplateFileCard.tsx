import { useCallback } from 'react';
import { FileArchive, Trash2 } from 'lucide-react';
import { formatFileSize } from '@/lib/zipFile';
import type { MyTemplateItem } from '@/types/my-template.type';

type MyTemplateFileCardProps = {
  template: MyTemplateItem;
  onRemove: (id: string) => void;
};

function formatAddedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function MyTemplateFileCard({ template, onRemove }: MyTemplateFileCardProps) {
  const addedLabel = formatAddedAt(template.addedAt);

  const handleRemove = useCallback(() => {
    onRemove(template.id);
  }, [onRemove, template.id]);

  return (
    <article className="flex aspect-16/10 flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-4 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-[#faf5ff] text-[#7c3aed]">
          <FileArchive className="size-5" strokeWidth={1.75} aria-hidden />
        </span>
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`${template.name} 삭제`}
          className="flex size-8 cursor-pointer items-center justify-center rounded-full text-[#94a3b8] transition hover:bg-[#f1f5f9] hover:text-[#be185d]"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
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
