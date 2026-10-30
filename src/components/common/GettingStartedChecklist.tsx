import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { Check, ChevronRight } from 'lucide-react';
import { dispatchGitHubAppInstallRequired } from '@/constants/authEvents';
import { useGettingStarted } from '@/hooks/useGettingStarted';
import type { GettingStartedStep } from '@/lib/gettingStarted';
import { cn } from '@/lib/utils';

type GettingStartedChecklistProps = {
  /** 아래에 붙는 줄(숨기기 등). 놓이는 자리마다 다르다 */
  footer?: ReactNode;
  /** 단계 링크를 눌렀을 때. 팝오버라면 닫는다 */
  onNavigate?: () => void;
  className?: string;
};

const ACTION_CLASS =
  'mt-2 inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg bg-[#7c3aed] px-3 text-[12px] font-semibold text-white transition hover:bg-[#6d28d9]';

/** 다음 단계로 가는 버튼. 그 일을 하는 화면으로 바로 데려간다 */
function StepAction({
  step,
  latestProjectId,
  onNavigate,
}: {
  step: GettingStartedStep;
  latestProjectId: number | null;
  onNavigate?: () => void;
}) {
  const arrow = <ChevronRight className="size-3.5" aria-hidden />;

  switch (step.id) {
    case 'github':
      // 앱 설치는 이미 있는 권한 안내 대화상자가 맡는다
      return (
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            dispatchGitHubAppInstallRequired();
          }}
          className={ACTION_CLASS}
          data-demo="guide-next"
        >
          권한 설정하기 {arrow}
        </button>
      );
    case 'ai-key':
      return (
        <Link
          to="/settings"
          search={{ section: 'ai-credentials' }}
          onClick={onNavigate}
          className={ACTION_CLASS}
          data-demo="guide-next"
        >
          키 등록하러 가기 {arrow}
        </Link>
      );
    case 'project':
      return (
        <Link to="/project" onClick={onNavigate} className={ACTION_CLASS} data-demo="guide-next">
          프로젝트 만들기 {arrow}
        </Link>
      );
    case 'cloud':
      return (
        <Link
          to="/onboarding/cloud"
          onClick={onNavigate}
          className={ACTION_CLASS}
          data-demo="guide-next"
        >
          연결 안내 보기 {arrow}
        </Link>
      );
    case 'first-request':
    case 'repository':
    case 'deploy':
      // 셋 다 대화에서 하는 일이다. 프로젝트가 없으면 앞 단계가 먼저 걸리므로 여기 안 온다
      return latestProjectId == null ? null : (
        <Link
          to="/project/$slug/agent"
          params={{ slug: String(latestProjectId) }}
          onClick={onNavigate}
          className={ACTION_CLASS}
          data-demo="guide-next"
        >
          대화로 가기 {arrow}
        </Link>
      );
  }
}

/**
 * 시작하기 체크리스트. 홈 카드와 사이드바 팝오버가 같이 쓴다.
 *
 * 다음에 할 단계만 펼쳐서 설명과 버튼을 보인다. 전부 펼치면 일곱 줄의 설명이 한꺼번에
 * 쏟아져 무엇부터 할지가 오히려 흐려진다.
 */
function GettingStartedChecklist({ footer, onNavigate, className }: GettingStartedChecklistProps) {
  const { steps, doneCount, total, next, allDone, latestProjectId } = useGettingStarted();

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[14px] font-bold text-[#0f172a]">시작하기</p>
        <p className="text-[12px] font-semibold tabular-nums text-[#7c3aed]">
          {doneCount}/{total} 완료
        </p>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#ede9fe]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={doneCount}
        aria-label="시작하기 진행"
      >
        <div
          className="h-full rounded-full bg-[#7c3aed] transition-[width] duration-500"
          style={{ width: `${(doneCount / total) * 100}%` }}
        />
      </div>

      {allDone ? (
        <p className="mt-3 rounded-xl bg-[#f0fdf4] px-3 py-2.5 text-[12px] leading-relaxed text-[#166534]">
          모두 마쳤습니다. 이제 같은 대화에서 고치고, 늘리고, 다시 배포하면 됩니다.
        </p>
      ) : null}

      <ol className="mt-3 flex flex-col gap-1">
        {steps.map((step, index) => {
          const isNext = next?.id === step.id;
          return (
            <li
              key={step.id}
              data-step={step.id}
              data-done={step.done ? '' : undefined}
              className={cn(
                'flex gap-2.5 rounded-xl px-2.5 py-2',
                isNext && 'bg-[#faf5ff] ring-1 ring-[#ddd6fe]',
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                  step.done
                    ? 'bg-[#16a34a] text-white'
                    : isNext
                      ? 'border-2 border-[#7c3aed] text-[#7c3aed]'
                      : 'border border-[#cbd5e1] text-[#94a3b8]',
                )}
                aria-hidden
              >
                {step.done ? <Check className="size-3" strokeWidth={3} /> : index + 1}
              </span>
              <div className="min-w-0">
                <p
                  className={cn(
                    'text-[13px] font-semibold',
                    step.done ? 'text-[#94a3b8]' : 'text-[#0f172a]',
                  )}
                >
                  {step.title}
                  <span className="sr-only">{step.done ? ' (완료)' : ' (아직)'}</span>
                </p>
                {isNext ? (
                  <>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-[#64748b]">
                      {step.detail}
                    </p>
                    <StepAction
                      step={step}
                      latestProjectId={latestProjectId}
                      onNavigate={onNavigate}
                    />
                  </>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      {footer ? <div className="mt-3 text-[12px] text-[#64748b]">{footer}</div> : null}
    </div>
  );
}

export default GettingStartedChecklist;
