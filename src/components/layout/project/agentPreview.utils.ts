import type { ConversationMessage } from '@/types/chat.type';

export type AgentPreviewPhase = 'empty' | 'building' | 'ready';

export function deriveAgentPreviewUrl(_messages: ConversationMessage[]): string {
  void _messages;
  return '';
}

/** 코드·수정 완료 안내 메시지가 오면 배포 URL 프리뷰를 표시한다. */
export function deriveAgentPreviewPhase(messages: ConversationMessage[]): AgentPreviewPhase {
  const hasUserMessage = messages.some((message) => message.role === 'user');
  if (hasUserMessage) return 'building';
  return 'empty';
}
