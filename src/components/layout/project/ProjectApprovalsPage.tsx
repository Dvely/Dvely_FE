import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getApprovalDetail,
  postApprovalApprove,
  postApprovalReject,
  useProjectApprovalListQuery,
} from '@/api/approvals';
import { getChangeDiff, useProjectChangeListQuery } from '@/api/changes';
import { getPreviewSessionStatus } from '@/api/preview';

type ProjectApprovalsPageProps = {
  projectId: number;
};

const skeletonItems = Array.from({ length: 4 }, (_, index) => `approval-skeleton-${index}`);

function ProjectApprovalsPage({ projectId }: ProjectApprovalsPageProps) {
  const [busyApprovalId, setBusyApprovalId] = useState<number | null>(null);
  const [selectedChangeId, setSelectedChangeId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: approvals = [], isLoading: isApprovalsLoading } = useProjectApprovalListQuery(
    'project-approvals-page',
    projectId,
  );
  const { data: changes = [], isLoading: isChangesLoading } = useProjectChangeListQuery(
    'project-approvals-page',
    projectId,
  );
  const selectedChange = changes.find((change) => change.changeId === selectedChangeId);
  const { data: changeDiff, isLoading: isDiffLoading } = useQuery({
    queryKey: ['change-diff', selectedChangeId],
    queryFn: () => getChangeDiff(selectedChangeId as number),
    enabled: selectedChangeId != null,
    gcTime: 0,
  });
  const { data: previewStatus } = useQuery({
    queryKey: ['preview-session-status', selectedChange?.previewSessionId],
    queryFn: () => getPreviewSessionStatus(selectedChange?.previewSessionId as string),
    enabled: Boolean(selectedChange?.previewSessionId),
    gcTime: 0,
  });

  const invalidateApprovals = () => {
    void queryClient.invalidateQueries({ queryKey: ['project-approval-list'] });
    void queryClient.invalidateQueries({ queryKey: ['project-change-list'] });
  };

  const approveMutation = useMutation({
    mutationFn: postApprovalApprove,
    onSuccess: invalidateApprovals,
  });
  const rejectMutation = useMutation({
    mutationFn: postApprovalReject,
    onSuccess: invalidateApprovals,
  });

  const handleDecide = async (approvalId: number, action: 'approve' | 'reject') => {
    if (busyApprovalId !== null) return;
    setBusyApprovalId(approvalId);
    setActionError(null);
    try {
      await getApprovalDetail(approvalId);
      if (action === 'approve') {
        await approveMutation.mutateAsync(approvalId);
      } else {
        await rejectMutation.mutateAsync(approvalId);
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : '승인 처리에 실패했습니다.');
    } finally {
      setBusyApprovalId(null);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">승인 대기</h2>
        <p className="mt-1 text-[13px] text-[#64748b]">
          에이전트 작업·배포·도메인·인프라 변경을 확인하고 승인하거나 거절합니다.
        </p>
        {actionError ? <p className="mt-3 text-[12px] text-[#dc2626]">{actionError}</p> : null}

        <ul className="mt-4 flex flex-col gap-2">
          {isApprovalsLoading
            ? skeletonItems.map((key) => (
                <li key={key} className="rounded-xl border border-[#f1f5f9] p-4">
                  <div className="h-4 w-40 animate-pulse rounded bg-[#e2e8f0]" />
                  <div className="mt-2 h-3 w-full animate-pulse rounded bg-[#f1f5f9]" />
                </li>
              ))
            : approvals.length === 0
              ? (
                  <li className="rounded-xl border border-dashed border-[#e2e8f0] px-4 py-8 text-center text-[13px] text-[#94a3b8]">
                    대기 중인 승인이 없습니다.
                  </li>
                )
              : approvals.map((approval) => {
                  const isBusy = busyApprovalId === approval.approvalId;
                  const isPending = approval.status === 'PENDING';

                  return (
                    <li
                      key={approval.approvalId}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#f1f5f9] px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-[#0f172a]">
                          {approval.summary || approval.type}
                        </p>
                        <p className="mt-1 text-[11px] text-[#94a3b8]">
                          {approval.type} · {approval.status} · {approval.createdAt}
                        </p>
                      </div>
                      {isPending ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => void handleDecide(approval.approvalId, 'reject')}
                            className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold text-[#64748b] disabled:opacity-50"
                          >
                            거절
                          </button>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => void handleDecide(approval.approvalId, 'approve')}
                            className="h-8 rounded-lg bg-[#0f172a] px-3 text-[12px] font-semibold text-white disabled:opacity-50"
                          >
                            {isBusy ? '처리 중' : '승인'}
                          </button>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
        </ul>
      </section>

      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="text-[16px] font-bold text-[#0f172a]">Change</h2>
        <p className="mt-1 text-[13px] text-[#64748b]">코드 변경과 프리뷰 세션을 확인합니다.</p>
        <ul className="mt-4 flex flex-col gap-2">
          {isChangesLoading
            ? skeletonItems.map((key) => (
                <li key={key} className="h-14 animate-pulse rounded-xl bg-[#f8fafc]" />
              ))
            : changes.map((change) => (
                <li key={change.changeId}>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedChangeId((current) =>
                        current === change.changeId ? null : change.changeId,
                      )
                    }
                    className="flex w-full items-center justify-between rounded-xl border border-[#f1f5f9] px-4 py-3 text-left hover:bg-[#f8fafc]"
                  >
                    <span className="text-[13px] font-semibold text-[#0f172a]">
                      {change.summary || `Change #${change.changeId}`}
                    </span>
                    <span className="text-[11px] text-[#94a3b8]">{change.status}</span>
                  </button>
                  {selectedChangeId === change.changeId ? (
                    <div className="mt-2 rounded-xl bg-[#0f172a] p-4 text-[12px] text-[#e2e8f0]">
                      {previewStatus ? (
                        <p className="mb-2 text-[#c4b5fd]">
                          Preview {previewStatus.sessionStatus}
                          {previewStatus.containerRunning ? ' · 컨테이너 실행 중' : ''}
                        </p>
                      ) : null}
                      {isDiffLoading ? (
                        <div className="h-24 animate-pulse rounded bg-white/10" />
                      ) : (
                        <pre className="max-h-64 overflow-auto whitespace-pre-wrap">
                          {changeDiff?.diff || '표시할 diff가 없습니다.'}
                        </pre>
                      )}
                    </div>
                  ) : null}
                </li>
              ))}
        </ul>
      </section>
    </div>
  );
}

export default ProjectApprovalsPage;
