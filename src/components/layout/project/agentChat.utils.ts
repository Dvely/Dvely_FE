export const AGENT_CHAT_QUERY_KEY = 'project-agent';

/** 대화·프로젝트 등 제목 필드가 없을 때 표시 */
export function formatUntitledLabel(id: number): string {
  return `제목없음 · ${id}`;
}

export function formatProjectDisplayName(name: string, projectId: number): string {
  const trimmed = name.trim();
  return trimmed ? trimmed : formatUntitledLabel(projectId);
}

export function formatConversationDateLabel(iso: string): string {
  if (!iso) return '';

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return '오늘';
  if (isYesterday) return '어제';

  return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
}

export function formatConversationPreview(iso: string): string {
  if (!iso) return '대화';

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '대화';

  return date.toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
