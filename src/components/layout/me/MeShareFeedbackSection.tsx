import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronDown, Crosshair, ImageOff } from 'lucide-react';
import {
  patchShareFeedbackStatus,
  postShareFeedbackFixed,
  useShareFeedbackDetailQuery,
  useShareFeedbackImageQuery,
  useShareFeedbackPromptQuery,
} from '@/api/shareFeedback';
import CopyButton from '@/components/common/CopyButton';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import { formatInSeoul } from '@/lib/seoulTime';
import { cn } from '@/lib/utils';
import {
  FIXED_NOTE_MAX,
  STATUS_ORDER,
  agentCanRead,
  authorLabel,
  feedbackActions,
  feedbackStatusLabel,
  hintReasonLabel,
  noteLabel,
  type FeedbackStatus,
  type ShareFeedback,
} from '@/types/shareFeedback.type';

/** 한 탭에 처음 보이는 개수. 더 있으면 "더 보기" — 잘라 낸 이미지를 한꺼번에 받지 않게 */
const PAGE = 10;

const STATUS_STYLES: Record<string, string> = {
  NEW: 'bg-[#fef3c7] text-[#92400e]',
  ACCEPTED: 'bg-[#ede9fe] text-[#5b21b6]',
  FIXED: 'bg-[#dbeafe] text-[#1e40af]',
  CONFIRMED: 'bg-[#dcfce7] text-[#166534]',
  DISMISSED: 'bg-[#f1f5f9] text-[#64748b]',
};

function formatMoment(value: string) {
  return (
    formatInSeoul(value, { month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }) ||
    null
  );
}

/** 인증 요청으로 받은 이미지(data URL)를 그린다 */
function FeedbackImage({
  feedbackId,
  kind,
  alt,
  className,
}: {
  feedbackId: number;
  kind: 'crop' | 'screen';
  alt: string;
  className?: string;
}) {
  const { data: url, isError, isLoading } = useShareFeedbackImageQuery(feedbackId, kind, true);

  if (isError) {
    return (
      <span
        className={cn(
          'flex items-center justify-center rounded-lg bg-[#f8fafc] text-[#cbd5e1]',
          className,
        )}
        title="이미지가 없습니다"
      >
        <ImageOff className="size-4" aria-hidden />
      </span>
    );
  }
  if (isLoading || !url) {
    return <span className={cn('animate-pulse rounded-lg bg-[#f1f5f9]', className)} aria-hidden />;
  }
  return (
    <img
      src={url}
      alt={alt}
      className={cn('rounded-lg border border-[#e2e8f0] bg-white object-contain', className)}
    />
  );
}

type CardProps = {
  item: ShareFeedback;
  shareLabel: string | null;
  open: boolean;
  onToggle: () => void;
  onNotice: (message: string) => void;
};

function FeedbackCard({ item, shareLabel, open, onToggle, onNotice }: CardProps) {
  const queryClient = useQueryClient();
  const [fixing, setFixing] = useState(false);
  const [note, setNote] = useState('');
  const [showScreen, setShowScreen] = useState(false);
  const actions = feedbackActions(item.status);

  const detail = useShareFeedbackDetailQuery(item.feedbackId, open);
  const prompt = useShareFeedbackPromptQuery(item.feedbackId, open && agentCanRead(item.status));

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ['share-feedback-list'] });
    void queryClient.invalidateQueries({ queryKey: ['share-feedback-detail', item.feedbackId] });
    void queryClient.invalidateQueries({ queryKey: ['share-feedback-prompt', item.feedbackId] });
  };

  const mutation = useMutation({
    mutationFn: (action: 'accept' | 'dismiss' | 'confirm' | 'fixed') => {
      if (action === 'fixed') return postShareFeedbackFixed(item.feedbackId, note);
      const status =
        action === 'accept' ? 'ACCEPTED' : action === 'dismiss' ? 'DISMISSED' : 'CONFIRMED';
      return patchShareFeedbackStatus(item.feedbackId, status);
    },
    onSuccess: (_, action) => {
      setFixing(false);
      setNote('');
      refresh();
      onNotice(
        action === 'accept'
          ? `피드백 #${item.feedbackId} 을 받았습니다. 이제 코딩 에이전트(MCP)·CLI 가 읽을 수 있습니다.`
          : action === 'dismiss'
            ? `피드백 #${item.feedbackId} 을 받지 않았습니다. 에이전트에게 나가지 않습니다.`
            : action === 'fixed'
              ? `피드백 #${item.feedbackId} 을 고침으로 표시했습니다. 짚은 사람의 화면에 알림이 갑니다.`
              : `피드백 #${item.feedbackId} 을 확인함으로 닫았습니다.`,
      );
    },
    onError: (error) => {
      // 409 는 그 사이 다른 곳(터미널·에이전트·짚은 사람)에서 바뀐 것이다. 목록을 다시 읽는다
      refresh();
      onNotice(composeApiErrorMessage(error, '피드백 상태를 바꾸지 못했습니다.'));
    },
  });

  const created = formatMoment(item.createdAt);
  const isNew = item.status === 'NEW';
  const element = detail.data?.element;
  const components = element?.components ?? [];
  const hints = element?.sourceHints ?? [];
  const noteLength = Array.from(note.trim()).length;

  return (
    <li
      className={cn(
        'rounded-2xl border bg-white px-4 py-3',
        isNew ? 'border-[#fcd34d]' : 'border-[#e2e8f0]',
      )}
    >
      <div className="flex gap-3">
        <FeedbackImage
          feedbackId={item.feedbackId}
          kind="crop"
          alt={`짚은 곳: ${item.label ?? '짚은 자리'}`}
          className="h-16 w-24 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                STATUS_STYLES[item.status] ?? STATUS_STYLES.DISMISSED,
              )}
            >
              {feedbackStatusLabel(item.status)}
            </span>
            <code className="min-w-0 truncate font-mono text-[12px] text-[#0f172a]" data-ga-ignore>
              {item.label ?? '짚은 자리'}
            </code>
            {item.component ? (
              <span className="rounded bg-[#f1f5f9] px-1.5 py-px font-mono text-[11px] text-[#475569]">
                {item.component}
              </span>
            ) : null}
          </div>
          {/* 짚은 사람이 쓴 글. 지시가 아니라 데이터라 텍스트로만 그린다 */}
          <p
            className="mt-1 text-[13px] leading-relaxed break-words whitespace-pre-wrap text-[#0f172a]"
            data-ga-ignore
          >
            {item.body}
          </p>
          <p className="mt-1 text-[11px] text-[#94a3b8]" data-ga-ignore>
            #{item.feedbackId} · {authorLabel(item)}
            {created ? ` · ${created}` : ''}
            {item.screenLabel ? ` · ${item.screenLabel}` : ''}
            {shareLabel ? ` · ${shareLabel}` : ''}
          </p>
        </div>
      </div>

      {isNew ? (
        <p className="mt-2 rounded-lg bg-[#fffbeb] px-3 py-2 text-[12px] leading-relaxed text-[#92400e]">
          {item.authorRole === 'OWNER' ? '' : '손님이 남긴 글입니다. '}
          받으면 이 글과 짚은 화면이 코딩 에이전트(MCP)·CLI 에 넘어갑니다. 받기 전에는 나가지
          않습니다.
        </p>
      ) : null}

      <div className="mt-2 flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="mr-auto inline-flex h-8 items-center gap-1 rounded-lg px-2 text-[12px] font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
        >
          <ChevronDown className={cn('size-3.5 transition', open && 'rotate-180')} aria-hidden />
          {open ? '접기' : '자세히'}
        </button>
        {actions.includes('dismiss') ? (
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate('dismiss')}
            className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc] disabled:opacity-50"
          >
            받지 않기
          </button>
        ) : null}
        {actions.includes('confirm') ? (
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate('confirm')}
            className="h-8 rounded-lg border border-[#bbf7d0] px-3 text-[12px] font-semibold text-[#15803d] transition hover:bg-[#f0fdf4] disabled:opacity-50"
          >
            확인함으로
          </button>
        ) : null}
        {actions.includes('accept') ? (
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate('accept')}
            className="h-8 rounded-lg bg-[#7c3aed] px-3 text-[12px] font-semibold text-white transition hover:bg-[#6d28d9] disabled:opacity-50"
          >
            {item.status === 'FIXED'
              ? '다시 열기'
              : item.status === 'DISMISSED'
                ? '되돌려 받기'
                : '받기'}
          </button>
        ) : null}
        {actions.includes('fixed') && !fixing ? (
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={() => setFixing(true)}
            className="h-8 rounded-lg bg-[#2563eb] px-3 text-[12px] font-semibold text-white transition hover:bg-[#1d4ed8] disabled:opacity-50"
          >
            고침 표시
          </button>
        ) : null}
      </div>

      {fixing ? (
        <form
          className="mt-2 flex flex-col gap-2 rounded-xl bg-[#eff6ff] px-3 py-2.5"
          onSubmit={(event) => {
            event.preventDefault();
            if (noteLength <= FIXED_NOTE_MAX) mutation.mutate('fixed');
          }}
        >
          <label
            className="text-[12px] font-semibold text-[#1e3a8a]"
            htmlFor={`fix-note-${item.feedbackId}`}
          >
            무엇을 바꿨는지 (짚은 사람에게 그대로 보입니다)
          </label>
          <textarea
            id={`fix-note-${item.feedbackId}`}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={2}
            maxLength={FIXED_NOTE_MAX}
            placeholder="예: 저장 버튼 padding 을 16px 로 키웠습니다"
            className="w-full resize-y rounded-lg border border-[#bfdbfe] bg-white px-3 py-2 text-[13px] text-[#0f172a] outline-none focus:ring-2 focus:ring-[#93c5fd]"
          />
          <div className="flex items-center justify-end gap-2">
            <span className="mr-auto text-[11px] text-[#64748b] tabular-nums">
              {noteLength}/{FIXED_NOTE_MAX}
            </span>
            <button
              type="button"
              onClick={() => setFixing(false)}
              disabled={mutation.isPending}
              className="h-8 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-semibold text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={mutation.isPending || noteLength > FIXED_NOTE_MAX}
              className="h-8 rounded-lg bg-[#2563eb] px-3 text-[12px] font-semibold text-white transition hover:bg-[#1d4ed8] disabled:opacity-50"
            >
              {mutation.isPending ? '표시하는 중…' : '고쳤다고 표시'}
            </button>
          </div>
        </form>
      ) : null}

      {open ? (
        <div className="mt-3 flex flex-col gap-3 border-t border-[#f1f5f9] pt-3">
          {detail.isError ? (
            <p className="text-[12px] text-[#b91c1c]">
              {composeApiErrorMessage(detail.error, '자세한 내용을 불러오지 못했습니다.')}
            </p>
          ) : null}

          {element?.element?.selector || element?.element?.id ? (
            <p className="text-[12px] text-[#475569]" data-ga-ignore>
              짚은 요소{' '}
              <code className="rounded bg-[#f8fafc] px-1 font-mono text-[11px]">
                {element.element.selector ?? `#${element.element.id}`}
              </code>
            </p>
          ) : null}

          {components.length > 0 ? (
            <div className="text-[12px] text-[#475569]" data-ga-ignore>
              <p className="font-semibold text-[#0f172a]">컴포넌트</p>
              <p className="mt-0.5 font-mono text-[11px] break-all">
                {components
                  .map((c) =>
                    c.file ? `${c.name} (${c.file}${c.line ? `:${c.line}` : ''})` : c.name,
                  )
                  .join(' ‹ ')}
              </p>
            </div>
          ) : null}

          {hints.length > 0 ? (
            <div className="text-[12px] text-[#475569]" data-ga-ignore>
              <p className="font-semibold text-[#0f172a]">소스 후보</p>
              <ol className="mt-0.5 list-decimal pl-4">
                {hints.map((h) => (
                  <li
                    key={`${h.file}:${h.line ?? 0}:${h.reason ?? ''}`}
                    className="font-mono text-[11px] break-all"
                  >
                    {h.file}
                    {h.line ? `:${h.line}` : ''}
                    {h.reason ? (
                      <span className="font-sans text-[#94a3b8]">
                        {' '}
                        — {hintReasonLabel(h.reason)}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {(detail.data?.notes ?? []).length > 0 ? (
            <div className="text-[12px] text-[#475569]">
              <p className="font-semibold text-[#0f172a]">이어진 대화</p>
              <ul className="mt-0.5 flex flex-col gap-1">
                {detail.data!.notes.map((n) => (
                  <li key={n.noteId} className="break-words whitespace-pre-wrap" data-ga-ignore>
                    <span className="font-semibold">{noteLabel(n)}</span>
                    {n.body ? `: ${n.body}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {detail.data?.hasScreen ? (
            showScreen ? (
              <FeedbackImage
                feedbackId={item.feedbackId}
                kind="screen"
                alt="짚은 순간의 화면"
                className="max-h-[420px] w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowScreen(true)}
                className="self-start text-[12px] font-semibold text-[#7c3aed] underline-offset-2 hover:underline"
              >
                짚은 순간의 화면 보기
              </button>
            )
          ) : null}

          {agentCanRead(item.status) ? (
            <div className="rounded-xl bg-[#0f172a] p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[12px] font-semibold text-[#e2e8f0]">에이전트용 프롬프트</p>
                {prompt.data ? (
                  <CopyButton key={prompt.data} text={prompt.data} tone="onDark" />
                ) : null}
              </div>
              <p className="mt-1 text-[11px] text-[#94a3b8]">
                Claude Code·Codex 에 붙여 넣으세요. MCP 를 붙였다면 &ldquo;받은 피드백 반영해
                줘&rdquo; 만으로도 읽습니다. 잘라 낸 이미지는 따로 첨부합니다.
              </p>
              {prompt.isError ? (
                <p className="mt-2 text-[12px] text-[#fca5a5]">
                  {composeApiErrorMessage(prompt.error, '프롬프트를 불러오지 못했습니다.')}
                </p>
              ) : (
                <pre
                  className="mt-2 max-h-64 overflow-auto font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-[#e2e8f0]"
                  data-ga-ignore
                >
                  {prompt.data ?? '불러오는 중…'}
                </pre>
              )}
            </div>
          ) : (
            <p className="text-[12px] text-[#94a3b8]">
              받기 전·받지 않은 피드백은 에이전트용 프롬프트를 만들지 않습니다.
            </p>
          )}
        </div>
      ) : null}
    </li>
  );
}

type SectionProps = {
  items: ShareFeedback[];
  /** shareId → 공유한 주소·앱 이름 */
  shareLabels: Map<number, string>;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onRetry: () => void;
  /** 바깥에서 고른 탭(링크의 "새 피드백" 을 누르면 받기 전으로) */
  tab: FeedbackStatus;
  onTab: (tab: FeedbackStatus) => void;
};

function MeShareFeedbackSection({
  items,
  shareLabels,
  isLoading,
  isError,
  error,
  onRetry,
  tab,
  onTab,
}: SectionProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE);

  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const item of items) out[item.status] = (out[item.status] ?? 0) + 1;
    return out;
  }, [items]);
  const visible = useMemo(() => items.filter((item) => item.status === tab), [items, tab]);

  return (
    <section id="share-feedback" className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#0f172a]">
          <Crosshair className="size-4 text-[#7c3aed]" aria-hidden />
          짚기 피드백
        </h3>
        <p className="text-[12px] leading-relaxed text-[#64748b]">
          보기 링크로 들어온 사람이 화면의 한 곳을 짚어 남긴 글입니다. 짚은 요소·컴포넌트·소스
          후보와 그 순간의 화면이 함께 저장됩니다. 받은 것만 코딩 에이전트(MCP)·CLI 가 읽습니다.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="피드백 상태"
        className="flex flex-wrap gap-1 rounded-lg bg-[#f1f5f9] p-0.5"
      >
        {STATUS_ORDER.map((status) => {
          const count = counts[status] ?? 0;
          const selected = tab === status;
          return (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                onTab(status);
                setShown(PAGE);
                setOpenId(null);
              }}
              className={cn(
                'inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[12px] font-semibold transition',
                selected
                  ? 'bg-white text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.08)]'
                  : 'text-[#64748b] hover:text-[#334155]',
              )}
            >
              {feedbackStatusLabel(status)}
              <span
                className={cn(
                  'rounded-full px-1.5 text-[11px] tabular-nums',
                  status === 'NEW' && count > 0 ? 'bg-[#f59e0b] text-white' : 'text-[#94a3b8]',
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {notice ? (
        <p role="status" className="text-[12px] whitespace-pre-line text-[#475569]">
          {notice}
        </p>
      ) : null}

      {isError ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3">
          <p className="min-w-0 flex-1 text-[12px] whitespace-pre-line text-[#991b1b]">
            {composeApiErrorMessage(error, '피드백을 불러오지 못했습니다.')}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="h-8 shrink-0 rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-semibold text-[#b91c1c] transition hover:bg-[#fff1f2]"
          >
            다시 불러오기
          </button>
        </div>
      ) : isLoading ? (
        <div className="h-20 animate-pulse rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]" />
      ) : visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#cbd5e1] px-4 py-6 text-center text-[13px] text-[#94a3b8]">
          {tab === 'NEW'
            ? '받기 전인 피드백이 없습니다. 보기 링크의 화면에서 "짚기" 를 누르면 여기로 옵니다.'
            : `${feedbackStatusLabel(tab)} 피드백이 없습니다.`}
        </p>
      ) : (
        <>
          <ul className="flex flex-col gap-2">
            {visible.slice(0, shown).map((item) => (
              <FeedbackCard
                key={item.feedbackId}
                item={item}
                shareLabel={shareLabels.get(item.shareId) ?? null}
                open={openId === item.feedbackId}
                onToggle={() =>
                  setOpenId((id) => (id === item.feedbackId ? null : item.feedbackId))
                }
                onNotice={setNotice}
              />
            ))}
          </ul>
          {visible.length > shown ? (
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="self-center text-[12px] font-semibold text-[#7c3aed] hover:underline"
            >
              {visible.length - shown}개 더 보기
            </button>
          ) : null}
        </>
      )}
    </section>
  );
}

export default MeShareFeedbackSection;
