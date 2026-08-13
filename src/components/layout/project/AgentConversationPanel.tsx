import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SendHorizontal } from 'lucide-react';
import { postConversationMessageCreate, postProjectConversationCreate } from '@/api/chat';
import type { ConversationMessage } from '@/types/chat.type';
import {
  AGENT_CHAT_QUERY_KEY,
  clearHomeAgentPromptSendGuard,
  createLocalMessage,
  migrateSessionMessages,
  readSessionMessages,
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
  const [displayMessages, setDisplayMessages] = useState<ConversationMessage[]>([]);
  const [isAssistantReplying, setIsAssistantReplying] = useState(false);

  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const previousConversationIdRef = useRef(conversationId);
  const onConversationActivityRef = useRef(onConversationActivity);

  onConversationActivityRef.current = onConversationActivity;

  const notifyConversationActivity = (targetConversationId: number) => {
    onConversationActivityRef.current?.(targetConversationId);
  };

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (isNewConversation || conversationId === null) {
        const created = await postProjectConversationCreate(projectId);
        await postConversationMessageCreate(created.conversationId, { content });
        return created.conversationId;
      }

      await postConversationMessageCreate(conversationId, { content });
      return conversationId;
    },
    onMutate: (content) => {
      const draftConversationId = conversationId ?? 0;
      const userMessage = createLocalMessage(draftConversationId, 'user', content);
      setDisplayMessages((prev) => {
        const next = [...prev, userMessage];
        writeSessionMessages(draftConversationId, next);
        return next;
      });
      setInput('');
      return { content, userMessage, draftConversationId };
    },
    onSuccess: (targetConversationId, _content, context) => {
      if (context?.userMessage && context.draftConversationId !== targetConversationId) {
        migrateSessionMessages(context.draftConversationId, targetConversationId);
      }

      const sessionMessages = readSessionMessages(targetConversationId);
      setDisplayMessages(sessionMessages);

      if (isNewConversation || conversationId === null) {
        onConversationCreated(targetConversationId);
      }

      void queryClient.invalidateQueries({
        queryKey: ['project-conversation-list', AGENT_CHAT_QUERY_KEY, projectId],
      });

      if (!context?.userMessage) return;

      setIsAssistantReplying(false);
      notifyConversationActivity(targetConversationId);
    },
    onError: (_error, content, context) => {
      setInput(content);
      if (context?.userMessage) {
        setDisplayMessages((prev) =>
          prev.filter((message) => message.messageId !== context.userMessage.messageId),
        );
      }
      setIsAssistantReplying(false);
    },
  });

  const isSending = sendMessageMutation.isPending;
  const isInputLocked = isSending || isAssistantReplying;
  const showWelcome =
    isNewConversation && !isSending && !isAssistantReplying && displayMessages.length === 0;

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

  const syncConversationView = (targetConversationId: number | null) => {
    if (targetConversationId !== null) {
      setDisplayMessages(readSessionMessages(targetConversationId));
    } else {
      setDisplayMessages([]);
    }
    setIsAssistantReplying(false);
    setInput('');
  };

  const scrollToLatestMessage = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: 'end' });
  };

  useEffect(() => {
    syncConversationView(conversationId);
  }, [conversationId, isNewConversation]);

  useEffect(() => {
    const content = initialPrompt?.trim();
    if (!content || !shouldSendHomeAgentPromptOnce(content)) return;

    sendMessageMutation.mutate(content, {
      onError: () => clearHomeAgentPromptSendGuard(content),
    });
  }, [initialPrompt]);

  useEffect(() => {
    const isConversationSwitch = previousConversationIdRef.current !== conversationId;
    previousConversationIdRef.current = conversationId;

    const frameId = window.requestAnimationFrame(() => {
      scrollToLatestMessage(isConversationSwitch ? 'instant' : 'smooth');
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [conversationId, displayMessages, isAssistantReplying]);

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
          {displayMessages.map((message) => (
            <MessageBubble key={message.messageId} message={message} />
          ))}
          {isAssistantReplying ? (
            <div className="px-3.5 py-3 text-[13px] text-[#94a3b8]">
              SYS.AI Agent가 답변을 작성 중입니다...
            </div>
          ) : null}
          <div ref={messagesEndRef} aria-hidden="true" className="h-px shrink-0" />
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
