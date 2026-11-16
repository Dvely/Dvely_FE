import { useCallback, useEffect, useId, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { X } from 'lucide-react';
import {
  patchProject,
  useDeleteProjectMutation,
  useProjectDeletionCheckQuery,
} from '@/api/projects';
import { formatProjectDisplayName } from '@/components/layout/project/agentChat.utils';
import { Input } from '@/components/ui/input';
import {
  describeLiveResource,
  isProjectDeletionBlocked,
  projectDeletionBlockedSummary,
} from '@/lib/projectDeletion';
type ProjectSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
  projectName: string;
};

function ProjectSettingsDialog({
  open,
  onOpenChange,
  projectId,
  projectName,
}: ProjectSettingsDialogProps) {
  const titleFieldId = useId();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState(projectName);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const deleteProjectMutation = useDeleteProjectMutation();
  const isDeleting = deleteProjectMutation.isPending;

  // 삭제 확인 단계에 들어가면 AWS 에 남은 자원을 먼저 본다(#186, BE #595). 이 프로젝트로 만든 서버·DB 가
  // 살아 있으면 서버가 삭제를 막는다 — 지우면 끌 길이 없는데 요금은 계속 나가기 때문이다.
  const deletionCheck = useProjectDeletionCheckQuery(projectId, open && isDeleteConfirming);
  const liveResources = deletionCheck.data?.liveResources ?? [];
  const isCheckingDeletion = isDeleteConfirming && deletionCheck.isFetching;
  const isDeletionBlocked = isDeleteConfirming && deletionCheck.data?.deletable === false;
  const canCleanUpInInfra = liveResources.some(
    (resource) => describeLiveResource(resource).cleanupInInfra,
  );

  const displayName = formatProjectDisplayName(projectName, projectId);
  const trimmedName = name.trim();
  const canSave = trimmedName.length > 0 && trimmedName !== projectName.trim() && !isSaving;
  const isBusy = isSaving || isDeleting;

  const invalidateProjectQueries = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['project-list'] }),
      queryClient.invalidateQueries({ queryKey: ['project-detail'] }),
      queryClient.invalidateQueries({ queryKey: ['project-detail-bundle'] }),
    ]);
  }, [queryClient]);

  const handleClose = useCallback(() => {
    if (isBusy) return;
    onOpenChange(false);
  }, [isBusy, onOpenChange]);

  const handleSaveName = async () => {
    if (!canSave || isDeleting) return;

    setSaveError(null);
    setIsSaving(true);

    try {
      await patchProject(projectId, { name: trimmedName });
      await invalidateProjectQueries();
      onOpenChange(false);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : '저장하지 못했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (isSaving || isDeleting) return;

    if (!isDeleteConfirming) {
      setIsDeleteConfirming(true);
      setDeleteError(null);
      return;
    }

    if (isCheckingDeletion || isDeletionBlocked) return;

    setDeleteError(null);

    deleteProjectMutation.mutate(
      { projectId },
      {
        onSuccess: () => {
          onOpenChange(false);
          void navigate({ to: '/project' });
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : '삭제하지 못했습니다.';
          if (!isProjectDeletionBlocked(error)) {
            setDeleteError(message);
            return;
          }
          // 확인 창을 연 사이 배포가 시작된 경우 등. 아무것도 지워지지 않았다(GitHub 저장소도 그대로).
          // 오류 본문의 목록은 ApiError 로 바뀌며 버려지므로 다시 읽어 같은 안내를 띄운다.
          void deletionCheck.refetch().then((result) => {
            if (result.data?.deletable !== false) setDeleteError(message);
          });
        },
      },
    );
  };

  const goToInfra = () => {
    onOpenChange(false);
    void navigate({ to: '/project/$slug/infra', params: { slug: String(projectId) } });
  };

  useEffect(() => {
    if (!open) return;
    setName(projectName);
    setSaveError(null);
    setDeleteError(null);
    setIsDeleteConfirming(false);
  }, [open, projectName]);

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
        aria-labelledby="project-settings-title"
        className="relative z-10 w-full max-w-[420px] rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-3 px-6 pt-6">
          <div className="min-w-0">
            <h2 id="project-settings-title" className="text-lg font-semibold text-[#0f172a]">
              프로젝트 설정
            </h2>
            <p className="mt-1 truncate text-sm text-[#64748b]">{displayName}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isBusy}
            className="rounded-lg p-1.5 text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#475569] disabled:opacity-50"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="mt-6 space-y-8 px-6 pb-6">
          <section>
            <h3 className="text-sm font-medium text-[#0f172a]">프로젝트 이름</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#64748b]">
              목록과 대시보드에 보이는 이름이에요.
            </p>
            <Input
              id={titleFieldId}
              value={name}
              maxLength={50}
              onChange={(event) => setName(event.target.value)}
              disabled={isBusy}
              className="mt-3 h-11 text-[15px]"
              onKeyDown={(event) => {
                if (event.key === 'Enter' && canSave) void handleSaveName();
              }}
            />
            {saveError ? (
              <p className="mt-2 text-xs text-red-600" role="alert">
                {saveError}
              </p>
            ) : null}
            <button
              type="button"
              disabled={!canSave}
              onClick={() => void handleSaveName()}
              className="mt-3 h-10 w-full rounded-lg bg-[#7c3aed] text-sm font-medium text-white hover:bg-[#6d28d9] disabled:bg-[#e2e8f0] disabled:text-[#94a3b8]"
            >
              {isSaving ? '저장 중…' : '이름 저장'}
            </button>
          </section>

          <section className="border-t border-[#f1f5f9] pt-8">
            <h3 className="text-sm font-medium text-[#0f172a]">프로젝트 삭제</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#64748b]">
              삭제하면 되돌릴 수 없어요. 필요한 데이터는 미리 백업해 주세요.
            </p>

            {isDeleteConfirming && isCheckingDeletion && !deletionCheck.data ? (
              <p className="mt-4 rounded-lg bg-[#f8fafc] px-3 py-2.5 text-xs text-[#64748b]">
                남아 있는 AWS 자원을 확인하고 있어요…
              </p>
            ) : null}

            {isDeletionBlocked ? (
              <div
                role="alert"
                className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-xs text-amber-900"
              >
                <p className="leading-relaxed">
                  {projectDeletionBlockedSummary(liveResources.length)}
                </p>
                <ul className="mt-3 max-h-60 space-y-2 overflow-y-auto">
                  {liveResources.map((resource) => {
                    const view = describeLiveResource(resource);
                    return (
                      <li
                        key={`${resource.type}-${resource.id}`}
                        className="rounded-md bg-white/80 px-2.5 py-2"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-medium text-[#0f172a]">{view.kind}</span>
                          <span className="shrink-0 text-[11px] text-amber-800">{view.status}</span>
                        </div>
                        <p className="mt-0.5 truncate text-[11px] text-[#475569]">{view.name}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#64748b]">
                          {view.action}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 flex gap-2">
                  {canCleanUpInInfra ? (
                    <button
                      type="button"
                      onClick={goToInfra}
                      className="h-9 flex-1 rounded-lg bg-[#0f172a] text-xs font-medium text-white hover:bg-[#1e293b]"
                    >
                      인프라 탭으로 가기
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => void deletionCheck.refetch()}
                    disabled={deletionCheck.isFetching}
                    className="h-9 flex-1 rounded-lg border border-amber-300 bg-white text-xs font-medium text-amber-900 hover:bg-amber-100 disabled:opacity-50"
                  >
                    {deletionCheck.isFetching ? '확인 중…' : '다시 확인'}
                  </button>
                </div>
              </div>
            ) : null}

            {isDeleteConfirming && deletionCheck.isError ? (
              <p className="mt-2 text-xs leading-relaxed text-[#64748b]">
                남은 AWS 자원을 확인하지 못했어요. 삭제를 누르면 서버가 한 번 더 확인해요.
              </p>
            ) : null}

            {isDeleteConfirming && (deletionCheck.data?.deletable || deletionCheck.isError) ? (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2.5 text-xs leading-relaxed text-red-700">
                <strong className="font-semibold">{displayName}</strong> 프로젝트를 삭제할까요? 아래
                버튼을 눌러 주세요.
              </p>
            ) : null}

            {deleteError ? (
              <p className="mt-2 text-xs text-red-600" role="alert">
                {deleteError}
              </p>
            ) : null}

            <div className="mt-4 flex gap-2">
              {isDeleteConfirming ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteConfirming(false);
                    setDeleteError(null);
                  }}
                  disabled={isDeleting}
                  className="h-10 flex-1 rounded-lg border border-[#e2e8f0] text-sm text-[#64748b] hover:bg-[#f8fafc] disabled:opacity-50"
                >
                  취소
                </button>
              ) : null}
              <button
                type="button"
                disabled={isDeleting || isCheckingDeletion || isDeletionBlocked}
                onClick={handleDelete}
                className={`h-10 rounded-lg text-sm font-medium disabled:opacity-50 ${
                  isDeleteConfirming
                    ? 'flex-1 bg-red-600 text-white hover:bg-red-700'
                    : 'w-full border border-red-200 text-red-600 hover:bg-red-50'
                }`}
              >
                {isDeleting
                  ? '삭제 중…'
                  : isCheckingDeletion
                    ? '확인 중…'
                    : isDeleteConfirming
                      ? '삭제할게요'
                      : '삭제하기'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProjectSettingsDialog;
