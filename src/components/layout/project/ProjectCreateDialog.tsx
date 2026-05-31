import { useCallback, useEffect, useId, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { postProjectCreate } from '@/api/projects';
import { Input } from '@/components/ui/input';

type ProjectCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function ProjectCreateDialog({ open, onOpenChange }: ProjectCreateDialogProps) {
  const titleFieldId = useId();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trimmedName = name.trim();
  const canSubmit = trimmedName.length >= 2 && !isSubmitting;

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    onOpenChange(false);
  }, [isSubmitting, onOpenChange]);

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await postProjectCreate({
        name: trimmedName,
        startMode: 'blank',
        templateType: null,
        draftMode: 'fast',
      });

      await queryClient.invalidateQueries({ queryKey: ['project-list'] });
      onOpenChange(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : '프로젝트 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    setName('');
    setErrorMessage(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="닫기"
        className="absolute inset-0 bg-black/35"
        onClick={handleClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-create-title"
        className="relative z-10 w-full max-w-[420px] rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-3 px-6 pt-6">
          <div className="min-w-0">
            <h2 id="project-create-title" className="text-lg font-semibold text-[#0f172a]">
              프로젝트 생성
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">새 프로젝트의 제목을 입력해 주세요.</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-lg p-1.5 text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#475569] disabled:opacity-50"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <form
          className="px-6 pb-6 pt-6"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <label htmlFor={titleFieldId} className="text-sm font-medium text-[#0f172a]">
            프로젝트 제목
          </label>
          <Input
            id={titleFieldId}
            value={name}
            maxLength={50}
            autoFocus
            placeholder="예: 우리 카페 랜딩"
            disabled={isSubmitting}
            onChange={(event) => setName(event.target.value)}
            className="mt-3 h-11 text-[15px]"
          />
          <p className="mt-2 text-xs text-[#94a3b8]">2자 이상 입력해 주세요.</p>

          {errorMessage ? (
            <p className="mt-3 text-xs text-red-600" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="h-10 flex-1 rounded-lg border border-[#e2e8f0] text-sm font-medium text-[#64748b] hover:bg-[#f8fafc] disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="h-10 flex-1 rounded-lg bg-[#7c3aed] text-sm font-semibold text-white hover:bg-[#6d28d9] disabled:bg-[#e2e8f0] disabled:text-[#94a3b8]"
            >
              {isSubmitting ? '생성 중…' : '생성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectCreateDialog;
