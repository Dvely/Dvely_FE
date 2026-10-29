import type { AgentTaskEvent } from '@/types/agent.type';
import type { ConversationMessage } from '@/types/chat.type';

/**
 * 지난 작업의 진행 기록을 어느 줄에서 다시 펼칠지.
 *
 * 진행 기록(시각 + "요청을 받았습니다 · 분석 중 …")은 작업이 도는 동안만 대화 끝에
 * 보인다. 끝나거나 승인을 기다리기 시작하면 그 자리가 사라지고 서버가 남긴 결과 줄만
 * 남는다 — 어떻게 거기까지 왔는지는 다시 볼 길이 없었다. 서버는 기록을 그대로 갖고 있다
 * (`GET /agent/tasks/{taskId}/events`, 끝난 작업 기준 90일 보존).
 */

/**
 * 펼치기를 붙이는 줄의 종류. 작업이 한 매듭을 지은 줄이다 — 결과 · 승인 요청 · 실패 ·
 * 취소 · 시스템 마무리.
 *
 * 진행 안내(TASK_PROGRESS)와 되묻기(INPUT_REQUIRED)는 뺀다. 작업이 아직 이어지는 중이라
 * 같은 작업의 뒤 줄이 곧 따라오고, 거기에 붙는다.
 */
const TASK_LOG_ANCHOR_KINDS = new Set([
  'AGENT_RESULT',
  'APPROVAL_REQUESTED',
  'TASK_FAILED',
  'TASK_CANCELLED',
  'TASK_CLOSED',
]);

/**
 * 메시지 ID → 그 줄에서 펼칠 작업 ID.
 *
 * 한 작업이 줄을 여러 개 남긴다(승인 요청 → 결과). 줄마다 붙이면 같은 기록이 두세 번
 * 나오므로 **그 작업의 마지막 줄 하나**에만 붙인다 — 가장 나중까지 진행된 지점이라
 * 기록과 읽는 순서가 맞는다.
 *
 * 작업 ID 가 없는 줄(작업과 무관한 줄, 컬럼이 생기기 전에 쌓인 줄)에는 붙이지 않는다.
 */
function findTaskLogAnchors(messages: ConversationMessage[]): Map<number, string> {
  const lastMessageIdByTask = new Map<string, number>();

  for (const message of messages) {
    if (message.role !== 'assistant' || !message.taskId) continue;
    if (!message.kind || !TASK_LOG_ANCHOR_KINDS.has(message.kind)) continue;
    lastMessageIdByTask.set(message.taskId, message.messageId);
  }

  const anchors = new Map<number, string>();
  for (const [taskId, messageId] of lastMessageIdByTask) anchors.set(messageId, taskId);
  return anchors;
}

/**
 * 더 늘지 않는 기록의 마지막 상태.
 *
 * 실행 스트림이 닫는 기준(useAgentTaskEventStream 의 STREAM_TERMINAL_STATUSES)과 같다.
 * 그쪽을 가져다 쓰지 않는 이유는 그 훅이 api/agent 를 읽어서, 여기를 읽는 api/agent 와
 * 서로 물리기 때문이다. 승인을 기다리는 작업은 승인 뒤에 이어 달리고, 실패한 작업도 다시
 * 시도하면 기록이 붙을 수 있어서 둘 다 빠진다.
 */
const FINAL_TASK_STATUSES = new Set(['DONE', 'CANCELLED']);

/** 이 기록이 더 늘지 않는가. 그렇다면 한 번 읽은 것을 다시 읽을 까닭이 없다 */
function isTaskLogFinal(events: AgentTaskEvent[] | undefined): boolean {
  const last = events?.at(-1);
  return last != null && FINAL_TASK_STATUSES.has(last.status);
}

export { findTaskLogAnchors, isTaskLogFinal };
