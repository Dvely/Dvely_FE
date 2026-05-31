import type { ConversationMessage } from '@/types/chat.type';

export type AgentPreviewPhase = 'empty' | 'building' | 'ready';

export const AGENT_PORTFOLIO_PREVIEW_URL = 'https://dldnsgkr.github.io/portfolio/';
export const AGENT_BLOG_PREVIEW_URL = 'https://dldnsgkr.github.io/my-blog/';

/** 신규 생성: 코드 작성 완료 / 기존 레포 수정: 프로젝트 수정 완료 */
export const AGENT_PREVIEW_READY_MARKERS = ['코드 작성이 완료', '프로젝트를 불러오고'] as const;

function hasPreviewReadyMessage(messages: ConversationMessage[]): boolean {
  return messages.some(
    (message) =>
      message.role === 'assistant' &&
      AGENT_PREVIEW_READY_MARKERS.some((marker) => message.content.includes(marker)),
  );
}

export function deriveAgentPreviewUrl(messages: ConversationMessage[]): string {
  const hasBlogContext = messages.some(
    (message) =>
      message.content.includes('my-blog') ||
      message.content.includes('blog.dldnsgkr.dev'),
  );

  return hasBlogContext ? AGENT_BLOG_PREVIEW_URL : AGENT_PORTFOLIO_PREVIEW_URL;
}

/** 코드·수정 완료 안내 메시지가 오면 배포 URL 프리뷰를 표시한다. */
export function deriveAgentPreviewPhase(messages: ConversationMessage[]): AgentPreviewPhase {
  if (hasPreviewReadyMessage(messages)) return 'ready';

  const hasUserMessage = messages.some((message) => message.role === 'user');
  if (hasUserMessage) return 'building';

  return 'empty';
}
