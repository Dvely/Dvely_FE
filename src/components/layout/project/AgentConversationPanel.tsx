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
  postApprovalApprove,
  postApprovalReject,
  useApprovalDetailQuery,
} from '@/api/approvals';
import AppAlertDialog from '@/components/common/AppAlertDialog';
import AgentApprovalCard from '@/components/layout/project/AgentApprovalCard';
import type { GetAgentTaskResType } from '@/types/agent.type';
import type { ConversationMessage } from '@/types/chat.type';
import {
  AGENT_CHAT_QUERY_KEY,
  clearHomeAgentPromptSendGuard,
  createLocalMessage,
  mergeConversationMessages,
  migrateSessionMessages,
  readConversationTaskId,
  readSessionMessages,
  rememberConversationTaskId,
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
  /** Agent 태스크가 도는 중인지 알린다. 프리뷰 세션 폴링을 열어 두는 데 쓰인다 */
  onAgentTaskActiveChange?: (isActive: boolean) => void;
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

  // 이 태스크·대화에 속한 승인만 쓴다. 예전에는 매칭이 실패하면 프로젝트 안 아무 PENDING이나
  // 집어왔는데, 스캐폴딩 승인이 WAITING_APPROVAL로 남아 쌓이는 구조라 다른 대화의 승인 카드가
  // 뜰 수 있었다. 승인은 되돌리기 어려우므로 엉뚱한 것을 띄우느니 아무것도 안 띄운다.
  return pending?.approvalId ?? null;
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
  onAgentTaskActiveChange,
}: AgentConversationPanelProps) {
  const [input, setInput] = useState('');
  const [overlayMessages, setOverlayMessages] = useState<ConversationMessage[]>([]);
  const [isAssistantReplying, setIsAssistantReplying] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  // 승인 대기 여부는 서버만 안다 — 채팅 본문에서 유추하지 않는다
  const [pendingApprovalId, setPendingApprovalId] = useState<number | null>(null);

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

  const { data: pendingApproval } = useApprovalDetailQuery(AGENT_CHAT_QUERY_KEY, pendingApprovalId);
  const activeApproval = pendingApproval?.status === 'PENDING' ? pendingApproval : null;

  // 대화를 열거나 바꿀 때 마지막 태스크로 승인 대기 상태를 서버에서 복원한다
  useEffect(() => {
    const taskId = readConversationTaskId(conversationId);
    if (!taskId) {
      setPendingApprovalId(null);
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const task = await getAgentTask(taskId);
        const approvalId = await resolvePendingApprovalId(task, projectId, conversationId);
        if (!cancelled) setPendingApprovalId(approvalId);
      } catch {
        // 복원에 실패하면 승인 없음으로 둔다 — 없는 승인을 띄우는 것보다 낫다
        if (!cancelled) setPendingApprovalId(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [conversationId, projectId]);

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
      setPendingApprovalId(pendingApprovalId);
      const nextMessages = result.task
        ? [
            ...sessionMessages,
            createLocalMessage(
              targetConversationId,
              'assistant',
              formatAgentTaskReply(result.task),
              { taskId: result.task.taskId },
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
      payload,
    }: {
      approvalId: number;
      action: 'approve' | 'reject';
      taskId: string;
      payload?: Record<string, string>;
    }) => {
      if (action === 'approve') {
        await postApprovalApprove(approvalId, payload);
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

      return { task, pendingApprovalId, decidedApprovalId: approvalId };
    },
    onMutate: () => {
      setIsAssistantReplying(true);
      setPendingApprovalId(null);
    },
    onSuccess: ({ task, pendingApprovalId }) => {
      const targetConversationId = conversationId;
      if (targetConversationId == null) return;

      rememberConversationTaskId(targetConversationId, task.taskId);

      const needsApproval = APPROVAL_WAIT_STATUSES.has(task.status) && pendingApprovalId != null;
      setPendingApprovalId(needsApproval ? pendingApprovalId : null);

      // 태스크가 끝났으면 게이트 안내와 결과가 서버에 기록돼 있다.
      // 로컬 임시 메시지를 덧붙이면 곧 도착할 서버 메시지와 겹치므로 오버레이를 비우고
      // 서버 목록을 단일 출처로 삼는다 (기존 메시지는 그대로 남아 화면이 비지 않는다)
      setOverlayMessages([]);
      writeSessionMessages(targetConversationId, []);

      void queryClient.invalidateQueries({ queryKey: ['project-approval-list'] });
      // 승인은 서버 쪽 상태를 바꾼다 — 결정 뒤 화면에 남아 있는 옛 값을 걷어낸다.
      // 메시지: 게이트 안내와 결과가 서버에 기록되므로 다시 읽어야 이력이 보인다
      // 저장소 설정·프로젝트: REPOSITORY_BINDING 승인이 저장소를 붙인다
      void queryClient.invalidateQueries({
        queryKey: ['conversation-message-list', AGENT_CHAT_QUERY_KEY, targetConversationId],
      });
      void queryClient.invalidateQueries({ queryKey: ['project-repository-settings'] });
      void queryClient.invalidateQueries({ queryKey: ['project-detail'] });
      setIsAssistantReplying(false);
      onConversationActivity?.(targetConversationId);
    },
    onError: (error, variables) => {
      // onMutate에서 낙관적으로 감췄던 승인을 되돌린다 — 실패했으면 아직 대기 중이다
      setPendingApprovalId(variables.approvalId);

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

  // 세 경로 모두 mutationFn 안에서 태스크가 끝날 때까지 폴링하므로, 이 값이 참인 동안이 곧 작업 구간이다
  const isAgentTaskActive = isInputLocked || decideApprovalMutation.isPending;

  useEffect(() => {
    onAgentTaskActiveChange?.(isAgentTaskActive);
  }, [isAgentTaskActive, onAgentTaskActiveChange]);

  // 작업 중에 패널이 사라지면 부모가 참인 채로 남아 폴링이 멈추지 않는다
  useEffect(() => () => onAgentTaskActiveChange?.(false), [onAgentTaskActiveChange]);

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

  const handleDecideApproval = (
    action: 'approve' | 'reject',
    payload?: Record<string, string>,
  ) => {
    if (decideApprovalMutation.isPending || isAssistantReplying || !activeApproval) {
      return;
    }

    const taskId = activeApproval.taskId?.trim() || readConversationTaskId(conversationId);
    if (!taskId) {
      setAlertMessage('이어서 진행할 작업 ID를 찾지 못했습니다.');
      return;
    }

    decideApprovalMutation.mutate({
      approvalId: activeApproval.approvalId,
      action,
      taskId,
      payload,
    });
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
                <MessageBubble key={message.messageId} message={message} />
              ))}
          {activeApproval ? (
            <AgentApprovalCard
              key={activeApproval.approvalId}
              approval={activeApproval}
              isBusy={decideApprovalMutation.isPending}
              onApprove={(payload) => handleDecideApproval('approve', payload)}
              onReject={() => handleDecideApproval('reject')}
            />
          ) : null}
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

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
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
      </div>
    </div>
  );
}

export default AgentConversationPanel;
