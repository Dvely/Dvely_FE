import { describe, expect, it } from 'vitest';
import { findTaskLogAnchors, isTaskLogFinal } from '@/lib/agentTaskLog';
import type { AgentTaskEvent } from '@/types/agent.type';
import type { ConversationMessage } from '@/types/chat.type';

function message(
  messageId: number,
  overrides: Partial<ConversationMessage> = {},
): ConversationMessage {
  return {
    messageId,
    conversationId: 1,
    role: 'assistant',
    content: `줄 ${messageId}`,
    tokenCount: 0,
    createdAt: '2026-10-29T14:00:00+09:00',
    taskId: null,
    kind: null,
    ...overrides,
  };
}

function event(eventId: number, status: string): AgentTaskEvent {
  return {
    eventId,
    taskId: 'task-1',
    type: 'PROGRESS',
    status,
    message: `기록 ${eventId}`,
    stepIndex: null,
    stepTotal: null,
    agentType: null,
    createdAt: '2026-10-29T14:00:00+09:00',
  };
}

describe('findTaskLogAnchors', () => {
  it('작업이 매듭을 지은 줄에 그 작업의 기록을 붙인다', () => {
    const anchors = findTaskLogAnchors([
      message(1, { role: 'user', taskId: 'task-1' }),
      message(2, { taskId: 'task-1', kind: 'AGENT_RESULT' }),
    ]);

    expect([...anchors]).toEqual([[2, 'task-1']]);
  });

  /** 승인 요청 → 결과처럼 한 작업이 여러 줄을 남기면 같은 기록이 겹쳐 나온다 */
  it('같은 작업의 줄이 여럿이면 마지막 줄 하나에만 붙인다', () => {
    const anchors = findTaskLogAnchors([
      message(1, { taskId: 'task-1', kind: 'APPROVAL_REQUESTED' }),
      message(2, { taskId: 'task-2', kind: 'AGENT_RESULT' }),
      message(3, { taskId: 'task-1', kind: 'AGENT_RESULT' }),
    ]);

    expect(anchors.get(1)).toBeUndefined();
    expect(anchors.get(2)).toBe('task-2');
    expect(anchors.get(3)).toBe('task-1');
  });

  it('승인 요청·실패·취소·마무리 줄에도 붙인다', () => {
    const anchors = findTaskLogAnchors([
      message(1, { taskId: 'a', kind: 'APPROVAL_REQUESTED' }),
      message(2, { taskId: 'b', kind: 'TASK_FAILED' }),
      message(3, { taskId: 'c', kind: 'TASK_CANCELLED' }),
      message(4, { taskId: 'd', kind: 'TASK_CLOSED' }),
    ]);

    expect(anchors.size).toBe(4);
  });

  /** 작업이 아직 이어지는 중이라 같은 작업의 뒤 줄이 곧 따라온다 */
  it('진행 안내와 되묻기 줄에는 붙이지 않는다', () => {
    const anchors = findTaskLogAnchors([
      message(1, { taskId: 'task-1', kind: 'TASK_PROGRESS' }),
      message(2, { taskId: 'task-1', kind: 'INPUT_REQUIRED' }),
      message(3, { taskId: 'task-1', kind: 'CLARIFICATION_ANSWER' }),
    ]);

    expect(anchors.size).toBe(0);
  });

  it('작업 ID 가 없는 줄과 종류를 모르는 줄에는 붙이지 않는다', () => {
    const anchors = findTaskLogAnchors([
      message(1, { taskId: null, kind: 'AGENT_RESULT' }),
      message(2, { taskId: '', kind: 'AGENT_RESULT' }),
      message(3, { taskId: 'task-1', kind: null }),
      message(4, { taskId: 'task-1', kind: 'SOMETHING_NEW' }),
    ]);

    expect(anchors.size).toBe(0);
  });
});

describe('isTaskLogFinal', () => {
  it('끝났거나 취소된 작업의 기록은 더 늘지 않는다', () => {
    expect(isTaskLogFinal([event(1, 'RUNNING'), event(2, 'DONE')])).toBe(true);
    expect(isTaskLogFinal([event(1, 'CANCELLED')])).toBe(true);
  });

  /** 승인 뒤에 이어 달리고, 실패한 작업도 다시 시도하면 기록이 붙는다 */
  it('승인을 기다리거나 실패한 작업의 기록은 다시 읽는다', () => {
    expect(isTaskLogFinal([event(1, 'WAITING_APPROVAL')])).toBe(false);
    expect(isTaskLogFinal([event(1, 'FAILED')])).toBe(false);
  });

  it('비었거나 아직 안 읽었으면 끝났다고 보지 않는다', () => {
    expect(isTaskLogFinal([])).toBe(false);
    expect(isTaskLogFinal(undefined)).toBe(false);
  });
});
