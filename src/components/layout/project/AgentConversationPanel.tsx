import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SendHorizontal } from 'lucide-react';
import {
  postConversationMessageCreate,
  postProjectConversationCreate,
  useConversationMessageListQuery,
} from '@/api/chat';
import {
  getAgentTask,
  pollAgentTask,
  SETTLED_AGENT_TASK_STATUSES,
} from '@/api/agent';
import {
  getProjectApprovalList,
  getApprovalDetail,
  postApprovalApprove,
  postApprovalReject,
} from '@/api/approvals';
import AppAlertDialog from '@/components/common/AppAlertDialog';
import type { GetAgentTaskResType } from '@/types/agent.type';
import type { ConversationMessage } from '@/types/chat.type';
import {
  AGENT_CHAT_QUERY_KEY,
  clearHomeAgentPromptSendGuard,
  createLocalMessage,
  mergeConversationMessages,
  migrateSessionMessages,
  readSessionMessages,
  rememberConversationTaskId,
  rememberProjectTaskId,
  shouldSendHomeAgentPromptOnce,
  writeSessionMessages,
} from '@/components/layout/project/agentChat.utils';

const suggestedPrompts = [
  {
    label: '포트폴리오 만들기',
    prompt: 'React + Vite로 포트폴리오 사이트를 만들어줘.',
  },
  {
    label: '기존 레포 수정',
    prompt: '현재 프로젝트에서 수정하고 싶은 부분을 알려줄게.',
  },
] as const;

type AgentConversationPanelProps = {
  projectId: number;
  projectName: string;
  conversationId: number | null;
  isNewConversation: boolean;
  initialPrompt?: string | null;
  onConversationCreated: (conversationId: number) => void;
  onConversationActivity?: (conversationId: number) => void;
  /** 배포 제안(약 2~3분) 수락 시 파이프라인 실행 */
  onDeployPipelineStart?: () => Promise<void>;
};

function formatAgentTaskReply(task: GetAgentTaskResType) {
  switch (task.status) {
    case 'DONE':
      return task.summary?.trim() || '작업을 완료했습니다.';
    case 'FAILED':
      return (
        task.error?.trim() ||
        task.suggestedFix?.trim() ||
        '작업에 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    case 'CANCELLED':
      return '작업이 취소되었습니다.';
    case 'WAITING_INPUT':
      return task.question?.trim() || '추가 입력이 필요합니다.';
    case 'WAITING_APPROVAL':
      return (
        task.summary?.trim() ||
        '작업 실행 전 승인이 필요합니다. 아래 버튼으로 승인하거나 거절해 주세요.'
      );
    case 'WAITING_RESULT_APPROVAL':
      return task.summary?.trim() || '결과 승인이 필요합니다. 미리보기를 확인한 뒤 승인해 주세요.';
    default:
      return task.summary?.trim() || '작업 상태를 확인했습니다.';
  }
}

const APPROVAL_WAIT_STATUSES = new Set(['WAITING_APPROVAL', 'WAITING_RESULT_APPROVAL']);

async function resolvePendingApprovalId(
  task: GetAgentTaskResType,
  projectId: number,
  conversationId: number | null,
) {
  if (task.pendingApprovalId != null) return task.pendingApprovalId;
  if (!APPROVAL_WAIT_STATUSES.has(task.status)) return null;

  const approvals = await getProjectApprovalList(projectId);
  const pending = approvals.find((approval) => {
    if (approval.status !== 'PENDING') return false;
    if (approval.taskId && approval.taskId === task.taskId) return true;
    if (conversationId != null && approval.conversationId === conversationId) return true;
    return false;
  });

  return (
    pending?.approvalId ??
    approvals.find((approval) => approval.status === 'PENDING')?.approvalId ??
    null
  );
}

function formatApiErrorMessage(error: unknown) {
  if (!(error instanceof Error) || !error.message) {
    return '요청 처리 중 오류가 발생했습니다.';
  }

  try {
    const parsed: unknown = JSON.parse(error.message);
    if (parsed && typeof parsed === 'object' && 'message' in parsed) {
      const message = (parsed as { message?: unknown }).message;
      if (typeof message === 'string' && message.trim()) {
        return message.trim();
      }
    }
  } catch {
    // 일반 문자열 오류 메시지는 그대로 사용한다.
  }

  return error.message;
}

function AgentConversationPanel({
  projectId,
  projectName,
  conversationId,
  isNewConversation,
  initialPrompt,
  onConversationCreated,
  onConversationActivity,
}: AgentConversationPanelProps) {
  const [input, setInput] = useState('');
  const [overlayMessages, setOverlayMessages] = useState<ConversationMessage[]>([]);
  const [isAssistantReplying, setIsAssistantReplying] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: serverMessages, isLoading: isMessagesLoading } = useConversationMessageListQuery(
    AGENT_CHAT_QUERY_KEY,
    conversationId ?? 0,
  );
  const displayMessages = useMemo(
    () => mergeConversationMessages(serverMessages ?? [], overlayMessages),
    [serverMessages, overlayMessages],
  );
  const pollAbortRef = useRef<AbortController | null>(null);

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      let targetConversationId = conversationId;

      if (isNewConversation || targetConversationId === null) {
        const created = await postProjectConversationCreate(projectId);
        targetConversationId = created.conversationId;
      }

      const createdMessage = await postConversationMessageCreate(targetConversationId, { content });

      const taskId = createdMessage.taskId?.trim() || '';
      if (!taskId) {
        return {
          conversationId: targetConversationId,
          task: null,
          taskId: '',
          pendingApprovalId: null,
        };
      }

      rememberConversationTaskId(targetConversationId, taskId);
      rememberProjectTaskId(projectId, taskId);
      onConversationActivity?.(targetConversationId);

      const sessionMessages = readSessionMessages(targetConversationId);
      const lastUserIndex = [...sessionMessages]
        .map((message, index) => ({ message, index }))
        .reverse()
        .find(({ message }) => message.role === 'user' && message.content === content)?.index;
      if (lastUserIndex != null) {
        const nextMessages = sessionMessages.map((message, index) =>
          index === lastUserIndex ? { ...message, taskId } : message,
        );
        writeSessionMessages(targetConversationId, nextMessages);
      }

      pollAbortRef.current?.abort();
      const controller = new AbortController();
      pollAbortRef.current = controller;
      const task = await pollAgentTask(taskId, { signal: controller.signal });

      const pendingApprovalId = await resolvePendingApprovalId(
        task,
        projectId,
        targetConversationId,
      );

      return {
        conversationId: targetConversationId,
        task,
        taskId,
        pendingApprovalId,
      };
    },
    onMutate: (content) => {
      const draftConversationId = conversationId ?? 0;
      const userMessage = createLocalMessage(draftConversationId, 'user', content);
      setOverlayMessages((prev) => {
        const next = [...mergeConversationMessages(serverMessages ?? [], prev), userMessage];
        writeSessionMessages(draftConversationId, next);
        return next;
      });
      setInput('');
      setIsAssistantReplying(true);
      return { content, userMessage, draftConversationId };
    },
    onSuccess: (result, _content, context) => {
      const targetConversationId = result.conversationId;

      if (context?.userMessage && context.draftConversationId !== targetConversationId) {
        migrateSessionMessages(context.draftConversationId, targetConversationId);
      }

      const sessionMessages = readSessionMessages(targetConversationId);
      const pendingApprovalId = result.task?.pendingApprovalId ?? result.pendingApprovalId ?? null;
      const nextMessages = result.task
        ? [
            ...sessionMessages,
            createLocalMessage(
              targetConversationId,
              'assistant',
              formatAgentTaskReply(result.task),
              {
                taskId: result.task.taskId,
                pendingApprovalId,
                needsApproval: APPROVAL_WAIT_STATUSES.has(result.task.status),
              },
            ),
          ]
        : sessionMessages;

      writeSessionMessages(targetConversationId, nextMessages);
      setOverlayMessages(nextMessages);

      if (isNewConversation || conversationId === null) {
        onConversationCreated(targetConversationId);
      }

      if (result.taskId) {
        rememberConversationTaskId(targetConversationId, result.taskId);
      }

      void queryClient.invalidateQueries({
        queryKey: ['project-conversation-list', AGENT_CHAT_QUERY_KEY, projectId],
      });
      void queryClient.invalidateQueries({
        queryKey: ['conversation-message-list', AGENT_CHAT_QUERY_KEY, targetConversationId],
      });

      if (!result.task && context?.userMessage) {
        console.warn('[agent] message created without taskId', {
          conversationId: targetConversationId,
          taskId: result.taskId,
        });
        setAlertMessage(
          '메시지는 저장됐지만 작업이 시작되지 않았습니다. 다시 요청해 주세요.',
        );
      }

      setIsAssistantReplying(false);
      onConversationActivity?.(targetConversationId);
    },
    onError: (error, content, context) => {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setIsAssistantReplying(false);
        return;
      }

      console.error('[agent] send/poll failed', error);

      setAlertMessage(formatApiErrorMessage(error));

      if (!(conversationId != null && context?.userMessage)) {
        setInput(content);
        if (context?.userMessage) {
          setOverlayMessages((prev) =>
            prev.filter((message) => message.messageId !== context.userMessage.messageId),
          );
        }
      }
      setIsAssistantReplying(false);
    },
  });

  const decideApprovalMutation = useMutation({
    mutationFn: async ({
      approvalId,
      action,
      taskId,
      messageId,
    }: {
      approvalId: number;
      action: 'approve' | 'reject';
      taskId: string;
      messageId: number;
    }) => {
      if (action === 'approve') {
        await postApprovalApprove(approvalId);
      } else {
        await postApprovalReject(approvalId);
      }

      pollAbortRef.current?.abort();
      const controller = new AbortController();
      pollAbortRef.current = controller;
      rememberConversationTaskId(conversationId ?? 0, taskId);
      const task = await pollAgentTask(taskId, {
        signal: controller.signal,
        until: (nextTask) => {
          const stillSameApproval =
            nextTask.pendingApprovalId === approvalId &&
            APPROVAL_WAIT_STATUSES.has(nextTask.status);
          if (stillSameApproval) return false;
          return SETTLED_AGENT_TASK_STATUSES.has(nextTask.status);
        },
      });
      const nextPendingApprovalId = await resolvePendingApprovalId(task, projectId, conversationId);
      const pendingApprovalId = nextPendingApprovalId === approvalId ? null : nextPendingApprovalId;

      return { task, messageId, pendingApprovalId, decidedApprovalId: approvalId };
    },
    onMutate: ({ messageId }) => {
      setIsAssistantReplying(true);
      setOverlayMessages((prev) => {
        const next = mergeConversationMessages(serverMessages ?? [], prev).map((message) =>
          message.messageId === messageId
            ? { ...message, pendingApprovalId: null, needsApproval: false }
            : message,
        );
        if (conversationId != null) writeSessionMessages(conversationId, next);
        return next;
      });
    },
    onSuccess: ({ task, messageId, pendingApprovalId }) => {
      const targetConversationId = conversationId;
      if (targetConversationId == null) return;

      rememberConversationTaskId(targetConversationId, task.taskId);
      rememberProjectTaskId(projectId, task.taskId);

      const needsApproval = APPROVAL_WAIT_STATUSES.has(task.status) && pendingApprovalId != null;

      const assistantMessage = createLocalMessage(
        targetConversationId,
        'assistant',
        formatAgentTaskReply(task),
        {
          taskId: task.taskId,
          pendingApprovalId: needsApproval ? pendingApprovalId : null,
          needsApproval,
        },
      );

      setOverlayMessages((prev) => {
        const next = [
          ...mergeConversationMessages(serverMessages ?? [], prev).map((message) =>
            message.messageId === messageId
              ? { ...message, pendingApprovalId: null, needsApproval: false }
              : message,
          ),
          assistantMessage,
        ];
        writeSessionMessages(targetConversationId, next);
        return next;
      });

      void queryClient.invalidateQueries({ queryKey: ['project-approval-list'] });
      setIsAssistantReplying(false);
      onConversationActivity?.(targetConversationId);
    },
    onError: (error) => {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setIsAssistantReplying(false);
        return;
      }

      setAlertMessage(formatApiErrorMessage(error));
      setIsAssistantReplying(false);
    },
  });

  const isSending = sendMessageMutation.isPending;
  const isInputLocked = isSending || isAssistantReplying;
  const showMessageSkeletons = isMessagesLoading && displayMessages.length === 0;
  const showWelcome =
    !showMessageSkeletons &&
    isNewConversation &&
    !isSending &&
    !isAssistantReplying &&
    displayMessages.length === 0;

  const handleSend = () => {
    const content = input.trim();
    if (!content || isInputLocked) return;

    sendMessageMutation.mutate(content);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleAlertOpenChange = (open: boolean) => {
    if (!open) setAlertMessage(null);
  };

  const handleDecideApproval = (message: ConversationMessage, action: 'approve' | 'reject') => {
    if (decideApprovalMutation.isPending || isAssistantReplying) {
      return;
    }

    if (message.pendingApprovalId == null && !message.needsApproval) {
      return;
    }

    void (async () => {
      let approvalId = message.pendingApprovalId;
      let taskId = message.taskId?.trim() || '';

      if (approvalId == null && taskId) {
        try {
          const task = await getAgentTask(taskId);
          approvalId = await resolvePendingApprovalId(task, projectId, conversationId);
        } catch (error) {
          setAlertMessage(formatApiErrorMessage(error));
          return;
        }
      }

      if (approvalId != null && !taskId) {
        try {
          const detail = await getApprovalDetail(approvalId);
          taskId = detail.taskId?.trim() || '';
        } catch (error) {
          setAlertMessage(formatApiErrorMessage(error));
          return;
        }
      }

      if (approvalId == null) {
        setAlertMessage('승인할 항목을 찾지 못했습니다. 승인 탭에서 확인해주세요.');
        return;
      }

      if (!taskId) {
        setAlertMessage('이어서 진행할 작업 ID를 찾지 못했습니다.');
        return;
      }

      decideApprovalMutation.mutate({
        approvalId,
        action,
        taskId,
        messageId: message.messageId,
      });
    })();
  };

  useEffect(() => {
    const content = initialPrompt?.trim();
    if (!content || !shouldSendHomeAgentPromptOnce(content)) return;

    sendMessageMutation.mutate(content, {
      onError: () => clearHomeAgentPromptSendGuard(content),
    });
    // 홈에서 넘어온 프롬프트는 마운트 시 한 번만 전송한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  useEffect(() => {
    return () => {
      pollAbortRef.current?.abort();
    };
  }, []);

  return (
    <>
      <div role="tabpanel" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {showWelcome ? (
            <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-3 text-[13px] leading-relaxed text-[#475569]">
              안녕하세요! <span className="font-semibold text-[#0f172a]">{projectName}</span>{' '}
              워크스페이스입니다. 메시지를 입력하면 대화가 시작됩니다.
            </div>
          ) : null}
          {showMessageSkeletons
            ? [0, 1, 2, 3].map((item) => (
                <AssistantReplySkeleton key={`message-skeleton-${item}`} />
              ))
            : displayMessages.map((message) => (
                <MessageBubble
                  key={message.messageId}
                  message={message}
                  isDecideBusy={decideApprovalMutation.isPending}
                  onApprove={() => handleDecideApproval(message, 'approve')}
                  onReject={() => handleDecideApproval(message, 'reject')}
                />
              ))}
          {isSending || isAssistantReplying ? <AssistantReplySkeleton /> : null}
          <div
            key={`${displayMessages.length}-${isAssistantReplying ? 'replying' : 'idle'}`}
            ref={(node) => {
              node?.scrollIntoView({ block: 'end' });
            }}
            aria-hidden="true"
            className="h-px shrink-0"
          />
        </div>
      </div>

      <footer className="border-t border-[#f1f5f9] p-3">
        <div className="mb-2 flex flex-wrap gap-2">
          {suggestedPrompts.map(({ label, prompt }) => (
            <button
              key={label}
              type="button"
              disabled={isInputLocked}
              onClick={() => setInput(prompt)}
              className="rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#475569] transition hover:border-[#c4b5fd] hover:text-[#7c3aed] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 focus-within:border-[#a5b4fc] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#6366f1]/15">
          <textarea
            rows={2}
            value={input}
            disabled={isInputLocked}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요"
            className="min-h-[40px] flex-1 resize-none bg-transparent text-[13px] text-[#0f172a] outline-none placeholder:text-[#94a3b8] disabled:opacity-60"
          />
          <button
            type="button"
            disabled={!input.trim() || isInputLocked}
            onClick={handleSend}
            className="mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#7c3aed] text-white transition hover:bg-[#6d28d9] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="전송"
          >
            <SendHorizontal className="size-4" />
          </button>
        </div>
      </footer>

      <AppAlertDialog
        open={alertMessage != null}
        message={alertMessage ?? ''}
        onOpenChange={handleAlertOpenChange}
      />
    </>
  );
}

type MessageBubbleProps = {
  message: ConversationMessage;
  isDecideBusy: boolean;
  onApprove: () => void;
  onReject: () => void;
};

const MESSAGE_URL_REGEX = /(https?:\/\/[^\s]+)/g;

function normalizeMessageUrl(url: string) {
  return url.replace(/[.,;:!?)]+$/, '');
}

function linkifyMessageContent(content: string, linkClassName: string) {
  return content.split(MESSAGE_URL_REGEX).map((part, index) => {
    if (!part.startsWith('http://') && !part.startsWith('https://')) {
      return part;
    }

    const href = normalizeMessageUrl(part);

    return (
      <a
        key={`${href}-${index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {part}
      </a>
    );
  });
}

function AssistantReplySkeleton() {
  return (
    <div aria-hidden="true" className="px-3.5 py-3">
      <div className="flex flex-col gap-2">
        <div className="h-3 w-[78%] animate-pulse rounded bg-[#e2e8f0]" />
        <div className="h-3 w-[92%] animate-pulse rounded bg-[#e2e8f0]" />
        <div className="h-3 w-[64%] animate-pulse rounded bg-[#f1f5f9]" />
      </div>
    </div>
  );
}

function MessageBubble({ message, isDecideBusy, onApprove, onReject }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  const showApprovalActions = isAssistant && message.needsApproval === true;
  const linkClassName = isUser
    ? 'underline underline-offset-2 hover:text-[#5b21b6]'
    : 'text-[#7c3aed] underline underline-offset-2 hover:text-[#6d28d9]';

  return (
    <div className={isUser ? 'ml-6' : undefined}>
      <div
        className={`text-[13px] leading-relaxed ${
          isUser
            ? 'rounded-xl border border-[#c4b5fd] bg-[#ede9fe] px-3.5 py-3 text-[#4c1d95]'
            : isAssistant
              ? 'px-3.5 py-3 text-[#475569]'
              : 'rounded-xl border border-[#e2e8f0] bg-white px-3.5 py-3 text-[#64748b]'
        }`}
      >
        <p className="whitespace-pre-wrap">
          {linkifyMessageContent(message.content, linkClassName)}
        </p>
        {showApprovalActions ? (
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={isDecideBusy}
              onClick={onReject}
              className="h-8 rounded-lg border border-[#e2e8f0] px-3 text-[12px] font-semibold text-[#64748b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              거절
            </button>
            <button
              type="button"
              disabled={isDecideBusy}
              onClick={onApprove}
              className="h-8 rounded-lg bg-[#0f172a] px-3 text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDecideBusy ? '처리 중' : '승인'}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AgentConversationPanel;
