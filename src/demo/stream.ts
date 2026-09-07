/**
 * 시연 모드의 태스크 이벤트 스트림.
 *
 * 실제 스트림은 raw fetch 라서 axios 어댑터가 가로채지 못한다. 그대로 두면 요청이
 * 네트워크로 나가 실패하고, 훅은 세 번 실패한 뒤에야 목록 폴링으로 내려앉는다 —
 * 그 6초 동안 진행 표시가 비어서 시연에서 가장 눈에 띄는 구간이 죽는다.
 *
 * 그래서 여기서 시나리오를 직접 읽어 이벤트를 흘려준다. 훅 입장에서는 스트림이
 * 정상 동작하는 것과 구분되지 않는다.
 */
import { demoMs } from '@/demo/config';
import { advanceDemoClock, getTask } from '@/demo/scenario';
import type { AgentTaskEvent } from '@/types/agent.type';

/** 시나리오를 들여다보는 간격. 진행 이벤트가 뚝뚝 끊겨 보이지 않을 만큼만 촘촘하게 */
const TICK_MS = 300;

/** 스트림이 스스로 닫히는 상태. 실제 서버와 같은 기준이다 */
const TERMINAL = new Set(['DONE', 'CANCELLED', 'FAILED']);

type Options = {
  afterEventId?: number | null;
  signal?: AbortSignal;
  onEvent: (event: AgentTaskEvent) => void;
};

export function openDemoAgentTaskEventStream(taskId: string, options: Options) {
  return new Promise<void>((resolve) => {
    let lastEventId = options.afterEventId ?? 0;

    const finish = () => {
      window.clearInterval(timer);
      options.signal?.removeEventListener('abort', finish);
      resolve();
    };

    const timer = window.setInterval(() => {
      if (options.signal?.aborted) {
        finish();
        return;
      }

      advanceDemoClock();
      const task = getTask(taskId);
      if (!task) {
        finish();
        return;
      }

      for (const event of task.events) {
        if (event.eventId <= lastEventId) continue;
        lastEventId = event.eventId;
        options.onEvent(event);
      }

      // 승인·입력 대기에서는 닫지 않는다 — 사람이 누르면 같은 스트림으로 이어져야 한다
      if (TERMINAL.has(task.status)) finish();
    }, demoMs(TICK_MS));

    options.signal?.addEventListener('abort', finish);
  });
}
