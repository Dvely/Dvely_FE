import { useCallback, useId, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { FileArchive } from 'lucide-react';
import { getZipFileError, MAX_MY_TEMPLATE_ZIP_BYTES } from '@/lib/zipFile';
import { cn } from '@/lib/utils';

type MyTemplateZipDropzoneProps = {
  file: File | null;
  error: string | null;
  onFileChange: (file: File | null, error: string | null) => void;
};

function MyTemplateZipDropzone({ file, error, onFileChange }: MyTemplateZipDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const maxSizeLabel = `${Math.round(MAX_MY_TEMPLATE_ZIP_BYTES / (1024 * 1024))}MB`;

  const applyFile = useCallback(
    (nextFile: File | undefined) => {
      if (!nextFile) {
        onFileChange(null, null);
        return;
      }

      onFileChange(nextFile, getZipFileError(nextFile));
    },
    [onFileChange],
  );

  const handleOpenPicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      applyFile(event.target.files?.[0]);
      event.target.value = '';
    },
    [applyFile],
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      applyFile(event.dataTransfer.files?.[0]);
    },
    [applyFile],
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-8 text-center transition',
        isDragging
          ? 'border-[#7c3aed] bg-[#faf5ff]'
          : error
            ? 'border-[#f9a8d4] bg-[#fff7fb]'
            : 'border-[#d6d3d1] bg-[#fafafa] hover:border-[#c4b5fd] hover:bg-[#faf5ff]',
      )}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept=".zip,application/zip,application/x-zip-compressed"
        className="sr-only"
        onChange={handleInputChange}
      />
      <span className="flex size-12 items-center justify-center rounded-full border border-[#ede9fe] bg-white text-[#7c3aed]">
        <FileArchive className="size-5" strokeWidth={1.75} aria-hidden />
      </span>
      <p className="mt-4 text-[15px] font-medium text-[#0f172a]">
        {file ? file.name : 'ZIP 파일을 여기에 놓거나 클릭해서 선택'}
      </p>
      <p className="mt-1 text-[13px] text-[#64748b]">.zip · 최대 {maxSizeLabel}</p>
      {error ? (
        <p role="alert" className="mt-2 text-[13px] font-medium text-[#be185d]">
          {error}
        </p>
      ) : null}
      <button
        type="button"
        onClick={handleOpenPicker}
        className="mt-4 inline-flex h-9 cursor-pointer items-center rounded-xl border border-[#e5e7eb] bg-white px-3.5 text-[13px] font-medium text-[#334155] transition hover:border-[#d4d4d8] hover:bg-[#fafafa]"
      >
        파일 선택
      </button>
    </div>
  );
}

export default MyTemplateZipDropzone;
