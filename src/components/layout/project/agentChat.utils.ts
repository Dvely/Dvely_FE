import type { ConversationMessage } from '@/types/chat.type';

let localMessageId = -1;

type CreateLocalMessageOptions = {
  tokenCount?: number;
  taskId?: string | null;
  pendingApprovalId?: number | null;
  needsApproval?: boolean | null;
};

export function createLocalMessage(
  conversationId: number,
  role: 'user' | 'assistant',
  content: string,
  options: CreateLocalMessageOptions = {},
): ConversationMessage {
  const messageId = localMessageId;
  localMessageId -= 1;
  const tokenCount = options.tokenCount ?? (role === 'assistant' ? 96 : 0);

  return {
    messageId,
    conversationId,
    role,
    content,
    tokenCount,
    createdAt: new Date().toISOString(),
    taskId: options.taskId ?? null,
    pendingApprovalId: options.pendingApprovalId ?? null,
    needsApproval: options.needsApproval ?? null,
  };
}

export const AGENT_CHAT_QUERY_KEY = 'project-agent';

const sessionMessagesByConversation = new Map<number, ConversationMessage[]>();
const taskIdByConversation = new Map<number, string>();

export function readSessionMessages(conversationId: number): ConversationMessage[] {
  return sessionMessagesByConversation.get(conversationId) ?? [];
}

export function writeSessionMessages(conversationId: number, messages: ConversationMessage[]) {
  sessionMessagesByConversation.set(conversationId, messages);
}

export function rememberConversationTaskId(conversationId: number, taskId: string) {
  const trimmed = taskId.trim();
  if (!trimmed) return;
  taskIdByConversation.set(conversationId, trimmed);
}

const taskIdByProject = new Map<number, string>();

export function rememberProjectTaskId(projectId: number, taskId: string) {
  const trimmed = taskId.trim();
  if (!trimmed) return;
  taskIdByProject.set(projectId, trimmed);
}

export function readProjectTaskId(projectId: number) {
  return taskIdByProject.get(projectId) ?? null;
}

export function readConversationTaskId(conversationId: number | null) {
  if (conversationId == null) return null;
  return taskIdByConversation.get(conversationId) ?? null;
}

/** 서버 메시지에 세션의 승인 버튼 상태·아직 저장 안 된 로컬 메시지를 합친다. */
export function mergeConversationMessages(
  serverMessages: ConversationMessage[],
  sessionMessages: ConversationMessage[],
): ConversationMessage[] {
  const usedSessionIds = new Set<number>();

  const takeSessionMatch = (message: ConversationMessage) => {
    const byId = sessionMessages.find(
      (sessionMessage) => sessionMessage.messageId === message.messageId,
    );
    if (byId) {
      usedSessionIds.add(byId.messageId);
      return byId;
    }

    const byContent = sessionMessages.find(
      (sessionMessage) =>
        !usedSessionIds.has(sessionMessage.messageId) &&
        sessionMessage.role === message.role &&
        sessionMessage.content === message.content,
    );
    if (byContent) {
      usedSessionIds.add(byContent.messageId);
      return byContent;
    }

    return null;
  };

  const mergedServer = serverMessages.map((message) => {
    const sessionMessage = takeSessionMatch(message);
    if (!sessionMessage) return message;

    return {
      ...message,
      taskId: sessionMessage.taskId || message.taskId,
      pendingApprovalId: sessionMessage.pendingApprovalId ?? message.pendingApprovalId,
      needsApproval: sessionMessage.needsApproval ?? message.needsApproval,
    };
  });

  const localOnly = sessionMessages.filter((message) => !usedSessionIds.has(message.messageId));

  return applyApprovalActionState([...mergedServer, ...localOnly]);
}

function parseApprovalIdFromPlan(content: string) {
  const match = content.match(/\[(\d+)\]/);
  if (!match) return null;

  const approvalId = Number(match[1]);
  return Number.isInteger(approvalId) ? approvalId : null;
}

function isApprovalPlanContent(content: string) {
  return content.includes('승인 후 실행');
}

function isApprovalResolvedContent(content: string) {
  return (
    content.includes('모든 승인이 완료') ||
    content.includes('작업을 시작') ||
    content.includes('작업 중 오류') ||
    content.includes('작업이 취소')
  );
}

/** 아직 처리되지 않은 승인 계획 메시지에만 승인/거절 버튼을 붙인다. */
export function applyApprovalActionState(messages: ConversationMessage[]): ConversationMessage[] {
  return messages.map((message, index) => {
    if (message.needsApproval === false) {
      return { ...message, needsApproval: false, pendingApprovalId: null };
    }

    if (message.role !== 'assistant' || !isApprovalPlanContent(message.content)) {
      return message;
    }

    const alreadyResolved = messages
      .slice(index + 1)
      .some((later) => later.role === 'assistant' && isApprovalResolvedContent(later.content));

    if (alreadyResolved) {
      return { ...message, needsApproval: false, pendingApprovalId: null };
    }

    return {
      ...message,
      needsApproval: true,
      pendingApprovalId: message.pendingApprovalId ?? parseApprovalIdFromPlan(message.content),
    };
  });
}

/** 새 대화 생성 전 임시 ID(0)에 쌓인 메시지를 실제 conversationId로 옮긴다. */
export function migrateSessionMessages(fromConversationId: number, toConversationId: number) {
  const messages = readSessionMessages(fromConversationId);
  if (messages.length === 0) return;

  writeSessionMessages(
    toConversationId,
    messages.map((message) => ({ ...message, conversationId: toConversationId })),
  );
  sessionMessagesByConversation.delete(fromConversationId);
}

const PENDING_HOME_AGENT_PROMPT_KEY = 'dvely:pending-home-agent-prompt';

export function setPendingHomeAgentPrompt(prompt: string) {
  sessionStorage.setItem(PENDING_HOME_AGENT_PROMPT_KEY, prompt.trim());
}

export function consumePendingHomeAgentPrompt(): string | null {
  const value = sessionStorage.getItem(PENDING_HOME_AGENT_PROMPT_KEY);
  if (value) {
    sessionStorage.removeItem(PENDING_HOME_AGENT_PROMPT_KEY);
  }
  return value;
}

const sentHomeAgentPrompts = new Set<string>();

export function shouldSendHomeAgentPromptOnce(prompt: string): boolean {
  const normalized = prompt.trim();
  if (!normalized || sentHomeAgentPrompts.has(normalized)) return false;
  sentHomeAgentPrompts.add(normalized);
  return true;
}

export function clearHomeAgentPromptSendGuard(prompt: string) {
  sentHomeAgentPrompts.delete(prompt.trim());
}

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
