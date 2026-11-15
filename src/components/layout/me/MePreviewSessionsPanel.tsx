import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Container, ExternalLink, Lock, RefreshCw } from 'lucide-react';
import {
  PREVIEW_SESSION_LIST_KEY,
  closeAllPreviewSessions,
  deletePreviewSession,
  usePreviewSessionListQuery,
} from '@/api/preview';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import {
  FAILED_TASK_WARNING,
  PREVIEW_CLOSE_CONSEQUENCE,
  PREVIEW_CLOSE_LABEL,
  previewCloseBlockedReasonText,
} from '@/lib/previewClose';
import { formatInSeoul, toSeoulDate } from '@/lib/seoulTime';
import { cn } from '@/lib/utils';
import type { PreviewSessionItem } from '@/types/previewSession.type';

/** 남은 시간을 다시 적는 간격. 분 단위로만 적으므로 30초면 늦어도 반 박자다 */
const CLOCK_TICK_MS = 30_000;

/** 작업 상태를 한 마디로. 처음 보는 값은 그대로 적는다 */
const TASK_STATUS_LABEL: Record<string, string> = {
  PENDING: '접수됨',
  WAITING_APPROVAL: '계획 승인 대기',
  QUEUED: '대기 중',
  RETRY_WAIT: '재시도 대기',
  RUNNING: '실행 중',
  WAITING_INPUT: '답변 대기',
  WAITING_RESULT_APPROVAL: '결과 승인 대기',
  DONE: '끝남',
  FAILED: '실패',
  CANCELLED: '취소됨',
};

function formatMoment(value: string | null) {
  if (!value) return null;
  return (
    formatInSeoul(value, { month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }) ||
    null
  );
}

/**
 * 저절로 닫히기까지. 서버는 아무도 보지 않은 채 만료 시각이 지나면 컨테이너를 회수하고, 보면 그
 * 시각을 늦춘다. 분 단위로 올려 적는다 — "0분" 이 살아 있는 프리뷰에 붙지 않게.
 */
function formatAutoClose(expiresAt: string | null, now: number) {
  const expiry = toSeoulDate(expiresAt)?.getTime();
  if (expiry == null) return null;
  const minutes = Math.ceil((expiry - now) / 60_000);
  if (minutes <= 0) return '곧 저절로 닫힘';
  if (minutes < 60) return `보지 않으면 ${minutes}분 뒤 저절로 닫힘`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `보지 않으면 ${rest === 0 ? `${hours}시간` : `${hours}시간 ${rest}분`} 뒤 저절로 닫힘`;
}

type PreviewRowProps = {
  item: PreviewSessionItem;
  now: number;
  confirming: boolean;
  pending: boolean;
  onAskClose: () => void;
  onCancel: () => void;
  onConfirmClose: () => void;
  onLeave?: () => void;
};

function PreviewRow({
  item,
  now,
  confirming,
  pending,
  onAskClose,
  onCancel,
  onConfirmClose,
  onLeave,
}: PreviewRowProps) {
  const lastViewed = formatMoment(item.lastAccessedAt);
  const autoClose = formatAutoClose(item.expiresAt, now);
  const isProvisioning = item.status === 'PROVISIONING';
  const blockedReason =
    !item.closable && item.closeBlockedReason
      ? previewCloseBlockedReasonText(item.closeBlockedReason)
      : null;
  const projectTitle = item.projectName ?? (item.projectId ? `프로젝트 #${item.projectId}` : null);

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        {/* 폭이 모자라면 버튼이 아래 줄로 내려간다 — 글이 버튼 옆에서 좁게 접히지 않게 */}
        <div className="min-w-0 flex-[1_1_15rem]">
          <div className="flex flex-wrap items-center gap-2">
            {/* 프로젝트 이름은 사용자 글이라 analytics 규칙대로 표시한다 */}
            <span
              className="min-w-0 truncate text-[14px] font-semibold text-[#0f172a]"
              data-ga-ignore
            >
              {projectTitle ?? '지워진 프로젝트'}
            </span>
            <span className="rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
              {item.taskId ? '에이전트 작업' : '직접 띄운 프리뷰'}
            </span>
            {isProvisioning ? (
              <span className="rounded-full bg-[#eff6ff] px-2 py-0.5 text-[11px] font-semibold text-[#1d4ed8]">
                준비 중
              </span>
            ) : null}
            {item.taskStatus ? (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                  item.taskStatus === 'WAITING_RESULT_APPROVAL'
                    ? 'bg-[#fffbeb] text-[#b45309]'
                    : item.taskStatus === 'FAILED'
                      ? 'bg-[#fef2f2] text-[#b91c1c]'
                      : 'bg-[#f1f5f9] text-[#475569]',
                )}
              >
                {TASK_STATUS_LABEL[item.taskStatus] ?? item.taskStatus}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-[11px] text-[#94a3b8]">
            {lastViewed ? `마지막으로 본 때 ${lastViewed}` : '아직 열어 본 적 없음'}
            {autoClose ? ` · ${autoClose}` : null}
          </p>
          {blockedReason ? (
            <p className="mt-1.5 flex items-start gap-1.5 text-[12px] leading-relaxed text-[#64748b]">
              <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              <span>{blockedReason}</span>
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {item.projectName && item.projectId ? (
            <Link
              to="/project/$slug/agent"
              params={{ slug: String(item.projectId) }}
              onClick={onLeave}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
            >
              <ExternalLink className="size-3.5" aria-hidden />
              프로젝트 열기
            </Link>
          ) : null}
          {item.closable && !confirming ? (
            <button
              type="button"
              disabled={pending}
              onClick={onAskClose}
              className="h-9 rounded-lg border border-[#fecaca] px-3 text-[12px] font-semibold text-[#dc2626] transition hover:bg-[#fef2f2] disabled:opacity-50"
            >
              {PREVIEW_CLOSE_LABEL}
            </button>
          ) : null}
        </div>
      </div>

      {confirming ? (
        <div
          role="group"
          aria-label="프리뷰 닫기 확인"
          className="flex flex-col gap-2 rounded-xl bg-[#fef2f2] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1 text-[12px] leading-relaxed text-[#991b1b]">
            <p>{PREVIEW_CLOSE_CONSEQUENCE}</p>
            {item.taskStatus === 'FAILED' ? <p>{FAILED_TASK_WARNING}</p> : null}
          </div>
          <div className="flex shrink-0 justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={pending}
              className="h-8 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-semibold text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="button"
              onClick={onConfirmClose}
              disabled={pending}
              className="h-8 rounded-lg bg-[#dc2626] px-3 text-[12px] font-semibold text-white transition hover:bg-[#b91c1c] disabled:opacity-50"
            >
              {pending ? '닫는 중…' : '닫기'}
            </button>
          </div>
        </div>
      ) : null}
    </li>
  );
}

type MePreviewSessionsPanelProps = {
  /**
   * 하나라도 닫았을 때. 프로젝트에서 상한에 걸려 넘어왔다면 그 자리로 돌려보낸다(돌아간 자리에서
   * 보여 줄 한 줄을 넘긴다). 돌아갈 자리가 없으면 오지 않는다
   */
  onClosed?: (notice: string) => void;
  /** 이 화면을 떠날 때(프로젝트 열기). 설정이 창으로 떠 있으면 닫는다 */
  onLeave?: () => void;
};

/**
 * 설정 > 프리뷰 — 지금 떠 있는 내 프리뷰와 닫기(#184).
 *
 * 동시 프리뷰 상한은 다른 프로젝트의 것까지 함께 센다. 상한에 걸린 사용자가 어디에 무엇이 떠
 * 있는지 모르면 프로젝트를 하나씩 열어 봐야 했다. 여기서 모두 보고 바로 닫는다.
 *
 * 닫을 수 있는지는 서버가 정한다(`closable`, BE #650 과 같은 규칙). 진행 중이거나 결정을 기다리는
 * 작업이 쓰는 프리뷰는 그 작업물이 컨테이너 안에만 있어 닫지 않는다 — 버튼 대신 이유를 적는다.
 */
function MePreviewSessionsPanel({ onClosed, onLeave }: MePreviewSessionsPanelProps) {
  const queryClient = useQueryClient();
  const { data, dataUpdatedAt, isLoading, isError, error, refetch, isFetching } =
    usePreviewSessionListQuery();
  const items = data?.items ?? [];
  const maxLivePreviews = data?.maxLivePreviews ?? 3;

  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  /*
    모두 닫기 확인. 연 순간의 수와 실패한 작업이 섞였는지를 붙들어 둔다 — 닫는 동안에도 목록을 다시
    읽어서, 문구의 수가 눈앞에서 바뀌면 무엇을 닫겠다고 했는지 흐려진다.
  */
  const [confirmingAll, setConfirmingAll] = useState<{ count: number; hasFailed: boolean } | null>(
    null,
  );
  const [notice, setNotice] = useState<string | null>(null);

  /*
    저절로 닫히기까지 남은 시간에 쓰는 지금. 렌더 중에 Date.now() 를 부르지 않고(같은 입력에
    다른 화면이 나온다) 목록을 받은 시각과 시계 틱 중 늦은 쪽을 쓴다.
  */
  const [tick, setTick] = useState(0);
  const now = Math.max(tick, dataUpdatedAt);
  const hasItems = items.length > 0;

  useEffect(() => {
    if (!hasItems) return;
    const timer = window.setInterval(() => setTick(Date.now()), CLOCK_TICK_MS);
    return () => window.clearInterval(timer);
  }, [hasItems]);

  const invalidate = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: PREVIEW_SESSION_LIST_KEY });
    // 프로젝트 화면의 프리뷰도 이 목록과 같은 세션이다
    void queryClient.invalidateQueries({ queryKey: ['project-preview-session'] });
  }, [queryClient]);

  const closeMutation = useMutation({
    mutationFn: (sessionId: string) => deletePreviewSession(sessionId),
    onSuccess: () => {
      setConfirmingId(null);
      invalidate();
      setNotice('프리뷰를 닫았습니다. 자리가 하나 생겼습니다.');
      onClosed?.('프리뷰 하나를 닫아 자리가 생겼습니다 — "미리보기 불러오기"를 다시 눌러 주세요');
    },
    onError: (mutationError) => {
      setConfirmingId(null);
      // 409(그새 작업이 쓰기 시작함)·404(그새 닫힘)도 여기로 온다. 목록을 다시 읽어 서버와 맞춘다
      invalidate();
      setNotice(composeApiErrorMessage(mutationError, '프리뷰를 닫지 못했습니다.'));
    },
  });

  const closeAllMutation = useMutation({
    mutationFn: closeAllPreviewSessions,
    onSuccess: ({ closed, kept }) => {
      setConfirmingAll(null);
      invalidate();
      setNotice(
        `${closed}개를 닫았습니다.` +
          (kept.length > 0 ? ` 작업이 쓰고 있는 ${kept.length}개는 남겨 두었습니다.` : ''),
      );
      if (closed > 0) {
        onClosed?.(
          `프리뷰 ${closed}개를 닫아 자리가 생겼습니다 — "미리보기 불러오기"를 다시 눌러 주세요`,
        );
      }
    },
    onError: (mutationError) => {
      setConfirmingAll(null);
      invalidate();
      setNotice(composeApiErrorMessage(mutationError, '프리뷰를 닫지 못했습니다.'));
    },
  });

  const pending = closeMutation.isPending || closeAllMutation.isPending;
  const closableItems = items.filter((item) => item.closable);
  const closableCount = closableItems.length;
  const atLimit = items.length >= maxLivePreviews;

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <p className="text-[13px] leading-relaxed text-[#64748b]">
          프로젝트 프리뷰는 서버의 컨테이너로 떠 있습니다. 동시에 {maxLivePreviews}개까지 띄울 수
          있고, 프로젝트가 달라도 함께 셉니다. 쓰지 않는 프리뷰를 여기서 닫으면 자리가 생깁니다.
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-[#94a3b8]">
          진행 중이거나 결정을 기다리는 에이전트 작업이 쓰는 프리뷰는 닫을 수 없습니다. 그 작업물이
          컨테이너 안에만 있어, 닫으면 되살릴 수 없기 때문입니다.
        </p>
      </section>

      {notice ? (
        <p role="status" className="text-[12px] whitespace-pre-line text-[#475569]">
          {notice}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#0f172a]">
          떠 있는 프리뷰
          {data ? (
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                atLimit ? 'bg-[#fef2f2] text-[#b91c1c]' : 'bg-[#f1f5f9] text-[#475569]',
              )}
              title={`동시에 띄울 수 있는 프리뷰는 ${maxLivePreviews}개입니다`}
            >
              {items.length} / {maxLivePreviews}
            </span>
          ) : null}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {closableCount >= 2 && !confirmingAll ? (
            <button
              type="button"
              onClick={() => {
                setNotice(null);
                setConfirmingId(null);
                setConfirmingAll({
                  count: closableCount,
                  hasFailed: closableItems.some((item) => item.taskStatus === 'FAILED'),
                });
              }}
              disabled={pending}
              className="h-8 rounded-lg border border-[#fecaca] px-2.5 text-[12px] font-semibold text-[#dc2626] transition hover:bg-[#fef2f2] disabled:opacity-50"
            >
              닫을 수 있는 {closableCount}개 모두 닫기
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setNotice(null);
              void refetch();
            }}
            disabled={isFetching}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] px-2.5 text-[12px] font-semibold text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50"
          >
            <RefreshCw className={cn('size-3.5', isFetching && 'animate-spin')} aria-hidden />
            새로고침
          </button>
        </div>
      </div>

      {confirmingAll ? (
        <div
          role="group"
          aria-label="모두 닫기 확인"
          className="flex flex-col gap-2 rounded-xl bg-[#fef2f2] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1 text-[12px] leading-relaxed text-[#991b1b]">
            <p>
              닫을 수 있는 프리뷰 {confirmingAll.count}개의 컨테이너가 모두 꺼지고, 그 주소들은 더
              이상 열리지 않습니다. 작업이 쓰고 있는 프리뷰는 그대로 둡니다.
            </p>
            {confirmingAll.hasFailed ? (
              <p>
                실패한 작업의 프리뷰도 함께 닫힙니다. 재시도는 그 컨테이너에 남은 작업물을 이어
                쓰는데, 닫으면 처음부터 다시 시작합니다.
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 justify-end gap-2">
            <button
              type="button"
              onClick={() => setConfirmingAll(null)}
              disabled={pending}
              className="h-8 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-semibold text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="button"
              onClick={() => closeAllMutation.mutate()}
              disabled={pending}
              className="h-8 rounded-lg bg-[#dc2626] px-3 text-[12px] font-semibold text-white transition hover:bg-[#b91c1c] disabled:opacity-50"
            >
              {closeAllMutation.isPending ? '닫는 중…' : '모두 닫기'}
            </button>
          </div>
        </div>
      ) : null}

      {atLimit ? (
        <p className="rounded-xl bg-[#fef2f2] px-3 py-2 text-[12px] leading-relaxed text-[#991b1b]">
          동시에 띄울 수 있는 프리뷰 {maxLivePreviews}개를 다 썼습니다.{' '}
          {closableCount > 0
            ? '새 프리뷰를 띄우려면 하나를 닫으세요.'
            : '지금은 닫을 수 있는 것이 없습니다. 작업이 끝나거나 결정되면 닫을 수 있고, 아무도 보지 않는 프리뷰는 적힌 시간이 지나면 저절로 닫힙니다.'}
        </p>
      ) : null}

      {isError ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3">
          <p className="min-w-0 flex-1 text-[12px] whitespace-pre-line text-[#991b1b]">
            {composeApiErrorMessage(error, '프리뷰 목록을 불러오지 못했습니다.')}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="h-8 shrink-0 rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-semibold text-[#b91c1c] transition hover:bg-[#fff1f2]"
          >
            다시 불러오기
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {isLoading ? (
            Array.from({ length: 2 }, (_, index) => (
              <li
                key={`preview-skeleton-${index}`}
                className="h-20 animate-pulse rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]"
              />
            ))
          ) : items.length === 0 ? (
            <li className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#cbd5e1] px-4 py-8 text-center">
              <Container className="size-6 text-[#cbd5e1]" aria-hidden />
              <p className="text-[13px] text-[#94a3b8]">
                떠 있는 프리뷰가 없습니다. 프로젝트 화면에서 &quot;미리보기 불러오기&quot;로
                띄웁니다.
              </p>
            </li>
          ) : (
            items.map((item) => (
              <PreviewRow
                key={item.sessionId}
                item={item}
                now={now}
                confirming={confirmingId === item.sessionId}
                pending={pending}
                onAskClose={() => {
                  setNotice(null);
                  setConfirmingAll(null);
                  setConfirmingId(item.sessionId);
                }}
                onCancel={() => setConfirmingId(null)}
                onConfirmClose={() => closeMutation.mutate(item.sessionId)}
                onLeave={onLeave}
              />
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default MePreviewSessionsPanel;
