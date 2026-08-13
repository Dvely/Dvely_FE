import type { ConversationMessage } from '@/types/chat.type';

export type AgentPreviewPhase = 'empty' | 'building' | 'ready';

export function deriveAgentPreviewUrl(_messages: ConversationMessage[]): string {
  void _messages;
  return '';
}

/** taskId가 있는 사용자 메시지가 있으면 에이전트 작업 진행 중으로 본다. */
export function deriveAgentPreviewPhase(messages: ConversationMessage[]): AgentPreviewPhase {
  const hasQueuedTask = messages.some(
    (message) => message.role === 'user' && Boolean(message.taskId),
  );
  if (hasQueuedTask) return 'building';
  return 'empty';
}
