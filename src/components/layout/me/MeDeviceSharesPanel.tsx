import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronRight, Globe, MonitorSmartphone, RefreshCw, Smartphone } from 'lucide-react';
import { deleteDeviceShare, useDeviceShareListQuery } from '@/api/deviceShares';
import CommandBlock from '@/components/common/CommandBlock';
import type { MeSettingsSectionId } from '@/components/layout/me/meSettingsNav';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import { DEVICE_SHARE_GUIDES } from '@/lib/deviceShareGuide';
import { LOGIN_COMMAND } from '@/lib/agentConnect';
import { formatInSeoul } from '@/lib/seoulTime';
import { cn } from '@/lib/utils';
import {
  DEVICE_SHARE_MAX_ACTIVE,
  deviceShareKindLabel,
  deviceShareState,
  formatRemaining,
  splitDeviceShares,
  type DeviceShare,
  type DeviceShareKind,
} from '@/types/deviceShare.type';

/** 남은 시간을 다시 적는 간격. 분 단위로만 적으므로 30초면 늦어도 반 박자다 */
const CLOCK_TICK_MS = 30_000;

function formatMoment(value: string | null) {
  if (!value) return null;
  return (
    formatInSeoul(value, { month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }) ||
    null
  );
}

function KindBadge({ kind }: { kind: string }) {
  const Icon = kind === 'WEB' ? Globe : Smartphone;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
      <Icon className="size-3" aria-hidden />
      {deviceShareKindLabel(kind)}
    </span>
  );
}

type LiveShareRowProps = {
  share: DeviceShare;
  now: number;
  confirming: boolean;
  pending: boolean;
  onAskEnd: () => void;
  onCancel: () => void;
  onConfirmEnd: () => void;
};

function LiveShareRow({
  share,
  now,
  confirming,
  pending,
  onAskEnd,
  onCancel,
  onConfirmEnd,
}: LiveShareRowProps) {
  const remaining = formatRemaining(share.expiresAt, now);
  const lastViewed = formatMoment(share.lastViewedAt);

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <KindBadge kind={share.kind} />
            {share.deviceConnected ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf5] px-2 py-0.5 text-[11px] font-semibold text-[#047857]">
                <span className="size-1.5 rounded-full bg-[#10b981]" aria-hidden />
                기기 연결됨
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fffbeb] px-2 py-0.5 text-[11px] font-semibold text-[#b45309]">
                <span className="size-1.5 rounded-full bg-[#f59e0b]" aria-hidden />
                기기 연결 끊김
              </span>
            )}
          </div>
          {/* 사용자가 공유한 주소·앱 이름. 사용자 글이 보이는 자리라 analytics 규칙대로 표시한다 */}
          <p className="mt-1 text-[13px] break-all text-[#0f172a]" data-ga-ignore>
            {share.targetLabel}
          </p>
          <p className="mt-0.5 text-[11px] text-[#94a3b8]">
            링크{' '}
            <code className="rounded bg-[#f8fafc] px-1 py-px font-mono text-[11px] text-[#475569]">
              {share.tokenPrefix}…
            </code>
            {` · 접속 ${share.viewers}명`}
            {remaining ? ` · ${remaining}` : null}
            {lastViewed ? ` · 마지막 접속 ${lastViewed}` : ' · 아직 연 사람 없음'}
          </p>
          {share.deviceConnected ? null : (
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#92400e]">
              터미널의 공유가 꺼졌거나 다시 연결하는 중입니다. 터미널을 닫았다면 링크는 만료될
              때까지 남아 있으니 여기서 끝내 두세요.
            </p>
          )}
        </div>

        {confirming ? null : (
          <button
            type="button"
            disabled={pending}
            onClick={onAskEnd}
            className="h-9 shrink-0 rounded-lg border border-[#fecaca] px-3 text-[12px] font-semibold text-[#dc2626] transition hover:bg-[#fef2f2] disabled:opacity-50"
          >
            끝내기
          </button>
        )}
      </div>

      {confirming ? (
        <div
          role="group"
          aria-label="공유 끝내기 확인"
          className="flex flex-col gap-2 rounded-xl bg-[#fef2f2] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="min-w-0 flex-1 text-[12px] leading-relaxed text-[#991b1b]">
            {share.viewers > 0 ? `지금 접속한 ${share.viewers}명과 ` : ''}기기 연결이 바로 끊기고,
            터미널의 공유도 멈춥니다. 같은 링크는 다시 쓸 수 없습니다.
          </p>
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
              onClick={onConfirmEnd}
              disabled={pending}
              className="h-8 rounded-lg bg-[#dc2626] px-3 text-[12px] font-semibold text-white transition hover:bg-[#b91c1c] disabled:opacity-50"
            >
              {pending ? '끝내는 중…' : '공유 끝내기'}
            </button>
          </div>
        </div>
      ) : null}
    </li>
  );
}

function EndedShareRow({ share, now }: { share: DeviceShare; now: number }) {
  const state = deviceShareState(share, now);
  const endedAt =
    state === 'revoked' ? formatMoment(share.revokedAt) : formatMoment(share.expiresAt);

  return (
    <li className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-2.5">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <KindBadge kind={share.kind} />
        <span className="min-w-0 truncate text-[12px] text-[#475569]" data-ga-ignore>
          {share.targetLabel}
        </span>
      </div>
      <span className="shrink-0 text-[11px] text-[#94a3b8]">
        {state === 'revoked' ? '끝냄' : '만료'}
        {endedAt ? ` ${endedAt}` : ''} ·{' '}
        <code className="font-mono text-[11px]">{share.tokenPrefix}…</code>
      </span>
    </li>
  );
}

type MeDeviceSharesPanelProps = {
  /** 다른 설정 절로 보낸다(토큰 발급). 없으면 이름만 적는다 */
  onOpenSection?: (section: MeSettingsSectionId) => void;
};

function MeDeviceSharesPanel({ onOpenSection }: MeDeviceSharesPanelProps) {
  const queryClient = useQueryClient();
  const {
    data: shares = [],
    dataUpdatedAt,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useDeviceShareListQuery();

  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [guideKind, setGuideKind] = useState<DeviceShareKind>('WEB');

  /*
    남은 시간·만료 판정에 쓰는 지금. 렌더 중에 Date.now() 를 부르지 않고(같은 입력에 다른
    화면이 나온다) 목록을 받은 시각과 시계 틱 중 늦은 쪽을 쓴다.
  */
  const [tick, setTick] = useState(0);
  const now = Math.max(tick, dataUpdatedAt);
  const { live, ended } = useMemo(() => splitDeviceShares(shares, now), [shares, now]);
  const hasLive = live.length > 0;

  useEffect(() => {
    if (!hasLive) return;
    const timer = window.setInterval(() => setTick(Date.now()), CLOCK_TICK_MS);
    return () => window.clearInterval(timer);
  }, [hasLive]);

  const invalidate = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ['device-share-list'] });
  }, [queryClient]);

  const endMutation = useMutation({
    mutationFn: (shareId: number) => deleteDeviceShare(shareId),
    onSuccess: () => {
      setConfirmingId(null);
      invalidate();
      setNotice('공유를 끝냈습니다. 링크로 들어와 있던 사람과 터미널의 공유가 함께 끊깁니다.');
    },
    onError: (mutationError) => {
      setConfirmingId(null);
      // 404(남의 것·없는 것)도 여기로 온다. 목록을 다시 읽어 화면과 서버를 맞춘다
      invalidate();
      setNotice(composeApiErrorMessage(mutationError, '공유를 끝내지 못했습니다.'));
    },
  });

  const guide =
    DEVICE_SHARE_GUIDES.find((item) => item.kind === guideKind) ?? DEVICE_SHARE_GUIDES[0];
  const atLimit = live.length >= DEVICE_SHARE_MAX_ACTIVE;

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <p className="text-[13px] leading-relaxed text-[#64748b]">
          내 컴퓨터에서 띄운 앱 화면(웹 개발 서버, Android 에뮬레이터, iOS 시뮬레이터)을 링크로 보여
          줍니다. 받은 사람은 설치 없이 브라우저로 같은 화면을 보고, 내가 승인하면 직접 조작합니다.
          공유는 터미널에서 시작하고, 여기서는 만든 링크를 확인하고 끝냅니다.
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-[#94a3b8]">
          링크 주소는 만들 때 터미널에만 한 번 나옵니다. 서버는 해시만 저장하므로 여기서 다시 볼 수
          없고, 앞 여섯 자로 어떤 링크인지 맞춰 볼 수 있습니다.
        </p>
      </section>

      {notice ? (
        <p role="status" className="text-[12px] whitespace-pre-line text-[#475569]">
          {notice}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#0f172a]">
          공유 중인 링크
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-[11px] font-semibold',
              atLimit ? 'bg-[#fef2f2] text-[#b91c1c]' : 'bg-[#f1f5f9] text-[#475569]',
            )}
            title={`한 사람이 동시에 열어 둘 수 있는 링크는 ${DEVICE_SHARE_MAX_ACTIVE}개입니다`}
          >
            {live.length} / {DEVICE_SHARE_MAX_ACTIVE}
          </span>
        </h3>
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

      {atLimit ? (
        <p className="rounded-xl bg-[#fef2f2] px-3 py-2 text-[12px] leading-relaxed text-[#991b1b]">
          동시에 열어 둘 수 있는 링크 {DEVICE_SHARE_MAX_ACTIVE}개를 다 썼습니다. 새 공유를
          시작하려면 쓰지 않는 링크를 끝내세요.
        </p>
      ) : null}

      {isError ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3">
          <p className="min-w-0 flex-1 text-[12px] whitespace-pre-line text-[#991b1b]">
            {composeApiErrorMessage(error, '공유 목록을 불러오지 못했습니다.')}
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
                key={`share-skeleton-${index}`}
                className="h-24 animate-pulse rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]"
              />
            ))
          ) : live.length === 0 ? (
            <li className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#cbd5e1] px-4 py-8 text-center">
              <MonitorSmartphone className="size-6 text-[#cbd5e1]" aria-hidden />
              <p className="text-[13px] text-[#94a3b8]">
                지금 공유 중인 화면이 없습니다. 아래 명령으로 시작하세요.
              </p>
            </li>
          ) : (
            live.map((share) => (
              <LiveShareRow
                key={share.shareId}
                share={share}
                now={now}
                confirming={confirmingId === share.shareId}
                pending={endMutation.isPending}
                onAskEnd={() => {
                  setNotice(null);
                  setConfirmingId(share.shareId);
                }}
                onCancel={() => setConfirmingId(null)}
                onConfirmEnd={() => endMutation.mutate(share.shareId)}
              />
            ))
          )}
        </ul>
      )}

      {ended.length > 0 ? (
        <details className="group rounded-2xl border border-[#e2e8f0] bg-white">
          <summary className="flex cursor-pointer list-none items-center gap-1.5 px-4 py-3 text-[13px] font-semibold text-[#475569] [&::-webkit-details-marker]:hidden">
            <ChevronRight
              className="size-4 text-[#94a3b8] transition group-open:rotate-90"
              aria-hidden
            />
            끝난 공유 {ended.length}개
          </summary>
          <ul className="divide-y divide-[#f1f5f9] border-t border-[#f1f5f9]">
            {ended.map((share) => (
              <EndedShareRow key={share.shareId} share={share} now={now} />
            ))}
          </ul>
        </details>
      ) : null}

      <section className="flex flex-col gap-4 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5">
        <h3 className="text-[14px] font-bold text-[#0f172a]">공유 시작하기</h3>

        <ol className="flex flex-col gap-4">
          <li className="flex gap-2">
            <StepNumber value={1} />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-[#0f172a]">
                쓰기(WRITE) 토큰으로 CLI 에 로그인합니다
              </p>
              <CommandBlock command={LOGIN_COMMAND} />
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#64748b]">
                토큰은{' '}
                {onOpenSection ? (
                  <button
                    type="button"
                    onClick={() => onOpenSection('api-tokens')}
                    className="font-semibold text-[#7c3aed] underline-offset-2 hover:underline"
                  >
                    액세스 토큰 (MCP)
                  </button>
                ) : (
                  <b className="font-semibold text-[#0f172a]">액세스 토큰 (MCP)</b>
                )}
                에서 WRITE 로 발급합니다. 이미 로그인했다면 건너뜁니다.
              </p>
            </div>
          </li>

          <li className="flex gap-2">
            <StepNumber value={2} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[12px] font-semibold text-[#0f172a]">공유할 화면을 고릅니다</p>
                <div role="tablist" className="flex flex-wrap rounded-lg bg-[#e2e8f0]/60 p-0.5">
                  {DEVICE_SHARE_GUIDES.map((item) => (
                    <button
                      key={item.kind}
                      type="button"
                      role="tab"
                      aria-selected={guideKind === item.kind}
                      onClick={() => setGuideKind(item.kind)}
                      className={cn(
                        'cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-semibold transition',
                        guideKind === item.kind
                          ? 'bg-white text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,0.08)]'
                          : 'text-[#64748b] hover:text-[#334155]',
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <CommandBlock command={guide.command} />
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#64748b]">{guide.summary}</p>
              <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-4 text-[12px] leading-relaxed text-[#64748b]">
                {guide.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </li>

          <li className="flex gap-2">
            <StepNumber value={3} />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-[#0f172a]">
                터미널에 나온 보기 링크를 보냅니다
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-[#64748b]">
                보기 링크는 남에게 주는 것이고, 내 제어 링크는 나만 씁니다. 보기 링크로 들어온
                사람이 조작을 요청하면 터미널에서 승인합니다. 끝낼 때는 터미널에서 Ctrl+C 를
                누르거나 이 화면에서 끝냅니다.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  );
}

function StepNumber({ value }: { value: number }) {
  return (
    <span className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#e2e8f0] text-[11px] font-semibold text-[#475569]">
      {value}
    </span>
  );
}

export default MeDeviceSharesPanel;
