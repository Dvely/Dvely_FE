import { useCallback } from 'react';
import { FileArchive, X } from 'lucide-react';
import { formatFileSize } from '@/lib/zipFile';

type MyTemplateZipPreviewProps = {
  file: File;
  onClear: () => void;
};

function MyTemplateZipPreview({ file, onClear }: MyTemplateZipPreviewProps) {
  const handleClear = useCallback(() => {
    onClear();
  }, [onClear]);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#ececf1] bg-white px-4 py-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#faf5ff] text-[#7c3aed]">
        <FileArchive className="size-5" strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-medium text-[#0f172a]">{file.name}</p>
        <p className="mt-0.5 text-[12px] text-[#64748b]">{formatFileSize(file.size)}</p>
      </div>
      <button
        type="button"
        onClick={handleClear}
        aria-label="선택한 ZIP 파일 제거"
        className="flex size-8 cursor-pointer items-center justify-center rounded-full text-[#94a3b8] transition hover:bg-[#f1f5f9] hover:text-[#334155]"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

export default MyTemplateZipPreview;
