import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAgentTaskLogQuery } from '@/api/agent';
import AgentTaskTimeline from '@/components/layout/project/AgentTaskTimeline';
import {
  findStepProgress,
  selectVisibleEvents,
} from '@/components/layout/project/agentTaskEvent.utils';

/**
 * 지난 작업의 진행 기록을 다시 펼친다.
 *
 * 작업이 도는 동안 대화 끝에 보이던 기록(AssistantReplySkeleton)은 작업이 끝나거나 승인을
 * 기다리기 시작하면 사라진다. 그 작업이 남긴 줄 아래에 접어 두었다가, 펼칠 때만 서버에서
 * 읽어 같은 모양으로 그린다 — 대화를 열 때마다 작업 수만큼 요청이 나가지 않게 한다.
 */
function AgentTaskLogHistory({ taskId }: { taskId: string }) {
  const [open, setOpen] = useState(false);
  const { data, isPending, isError, refetch } = useAgentTaskLogQuery(taskId, open);

  const visibleEvents = data ? selectVisibleEvents(data) : [];
  // 단계 수는 한 번 읽은 뒤에만 안다. 모를 때는 적지 않는다
  const step = data ? findStepProgress(data) : null;

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        data-demo="task-log-toggle"
        className="inline-flex cursor-pointer items-center gap-1 text-[12px] font-medium text-[#94a3b8] transition hover:text-[#64748b]"
      >
        <ChevronRight
          className={`size-3.5 transition-transform ${open ? 'rotate-90' : ''}`}
          aria-hidden
        />
        {open ? '작업 내역 접기' : '작업 내역 보기'}
        {step ? <span className="font-normal">({step.total}단계)</span> : null}
      </button>

      {open ? (
        <div
          data-demo="task-log-panel"
          className="mt-2 rounded-lg border border-[#eef2f6] bg-[#f8fafc] px-3 py-2.5"
        >
          {isPending ? (
            <div aria-hidden="true" className="flex flex-col gap-1.5">
              <div className="h-3 w-[70%] animate-pulse rounded bg-[#e2e8f0]" />
              <div className="h-3 w-[55%] animate-pulse rounded bg-[#e2e8f0]" />
            </div>
          ) : isError ? (
            <p className="text-[12px] text-[#64748b]">
              작업 내역을 불러오지 못했습니다.{' '}
              <button
                type="button"
                onClick={() => void refetch()}
                className="cursor-pointer font-medium text-[#7c3aed] underline underline-offset-2"
              >
                다시 시도
              </button>
            </p>
          ) : visibleEvents.length === 0 ? (
            /*
              서버는 끝난 작업의 기록을 90일 동안 둔다(BE qeploy.agent.retention-days).
              작업 ID 가 있는 줄인데 기록이 비었다면 대개 그 기간이 지난 것이다.
            */
            <p className="text-[12px] leading-relaxed text-[#94a3b8]">
              남아 있는 작업 기록이 없습니다. 작업 기록은 끝난 뒤 90일이 지나면 지워집니다.
            </p>
          ) : (
            <AgentTaskTimeline events={data ?? []} live={false} />
          )}
        </div>
      ) : null}
    </div>
  );
}

export default AgentTaskLogHistory;
