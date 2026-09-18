import { useCallback, useState, type ChangeEvent } from 'react';
import { Dialog } from 'radix-ui';
import { X } from 'lucide-react';
import MyTemplateZipDropzone from '@/components/layout/home/MyTemplateZipDropzone';
import MyTemplateZipPreview from '@/components/layout/home/MyTemplateZipPreview';

type MyTemplateUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (file: File, name: string) => void;
};

function MyTemplateUploadDialog({ open, onOpenChange, onSubmit }: MyTemplateUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');

  const canSubmit = Boolean(file) && !error;

  const resetForm = useCallback(() => {
    setFile(null);
    setError(null);
    setName('');
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) resetForm();
      onOpenChange(nextOpen);
    },
    [onOpenChange, resetForm],
  );

  const handleFileChange = useCallback((nextFile: File | null, nextError: string | null) => {
    setFile(nextFile);
    setError(nextError);
    if (nextFile) {
      setName((current) => current || nextFile.name.replace(/\.zip$/i, ''));
    }
  }, []);

  const handleClearFile = useCallback(() => {
    setFile(null);
    setError(null);
  }, []);

  const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!file || error) return;
    onSubmit(file, name.trim() || file.name.replace(/\.zip$/i, ''));
    resetForm();
    onOpenChange(false);
  }, [error, file, name, onOpenChange, onSubmit, resetForm]);

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-32px)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-[18px] font-semibold tracking-tight text-[#0f172a]">
                ZIP으로 내 템플릿 추가
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-[13px] leading-5 text-[#64748b]">
                사이트 템플릿 ZIP 파일을 첨부하면 내 템플릿 목록에서 바로 확인할 수 있습니다.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="닫기"
              className="flex size-8 cursor-pointer items-center justify-center rounded-full text-[#94a3b8] transition hover:bg-[#f1f5f9] hover:text-[#334155]"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div className="mt-5">
            <MyTemplateZipDropzone file={file} error={error} onFileChange={handleFileChange} />
          </div>

          {file && !error ? (
            <div className="mt-3">
              <MyTemplateZipPreview file={file} onClear={handleClearFile} />
            </div>
          ) : null}

          <label className="mt-4 block">
            <span className="mb-1.5 block text-[13px] font-medium text-[#334155]">템플릿 이름</span>
            <input
              value={name}
              onChange={handleNameChange}
              placeholder="예: 브랜드 랜딩 템플릿"
              className="h-10 w-full rounded-xl border border-[#e5e7eb] bg-white px-3 text-[14px] text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#c4b5fd] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
            />
          </label>

          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close className="inline-flex h-10 cursor-pointer items-center rounded-xl border border-[#e5e7eb] px-4 text-[14px] font-medium text-[#334155] transition hover:bg-[#f8fafc]">
              취소
            </Dialog.Close>
            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="inline-flex h-10 cursor-pointer items-center rounded-xl bg-[#7c3aed] px-4 text-[14px] font-medium text-white transition hover:bg-[#6d28d9] disabled:cursor-not-allowed disabled:bg-[#ddd6fe]"
            >
              추가하기
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MyTemplateUploadDialog;
