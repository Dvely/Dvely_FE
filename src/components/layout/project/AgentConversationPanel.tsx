import { useEffect, useState, type KeyboardEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SendHorizontal } from 'lucide-react';
import {
  postConversationMessageCreate,
  postProjectConversationCreate,
  useConversationMessageListQuery,
} from '@/api/chat';
import type { ConversationMessage } from '@/types/chat.type';
import { AGENT_CHAT_QUERY_KEY } from '@/components/layout/project/agentChat.utils';

const suggestedPrompts = [
  { label: 'UI 수정 요청', prompt: '히어로 섹션 CTA를 더 눈에 띄게 수정해줘' },
  { label: '도메인 & 배포 요청', prompt: '커스텀 도메인 연결하고 프로덕션에 배포해줘' },
] as const;

const messageSkeletonItems = Array.from({ length: 3 }, (_, index) => `message-skeleton-${index}`);

type AgentConversationPanelProps = {
  projectId: number;
  projectName: string;
  conversationId: number | null;
  isNewConversation: boolean;
  onConversationCreated: (conversationId: number) => void;
};

function AgentConversationPanel({
  projectId,
  projectName,
  conversationId,
  isNewConversation,
  onConversationCreated,
}: AgentConversationPanelProps) {
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  const isExistingConversation = conversationId !== null;

  const { data: messages = [], isLoading: isMessagesLoading } = useConversationMessageListQuery(
    AGENT_CHAT_QUERY_KEY,
    conversationId ?? 0,
  );

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
    onSuccess: (targetConversationId) => {
      if (isNewConversation || conversationId === null) {
        onConversationCreated(targetConversationId);
      }

      void queryClient.invalidateQueries({
        queryKey: ['project-conversation-list', AGENT_CHAT_QUERY_KEY, projectId],
      });
      void queryClient.invalidateQueries({
        queryKey: ['conversation-message-list', AGENT_CHAT_QUERY_KEY, targetConversationId],
      });
    },
  });

  const isSending = sendMessageMutation.isPending;
  const showWelcome = isNewConversation && !isSending;

  const handleSend = () => {
    const content = input.trim();
    if (!content || isSending) return;

    setInput('');
    sendMessageMutation.mutate(content, {
      onError: () => {
        setInput(content);
      },
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    setInput('');
  }, [conversationId, isNewConversation]);

  return (
    <>
      <div role="tabpanel" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {isExistingConversation && isMessagesLoading ? (
            messageSkeletonItems.map((key) => (
              <div
                key={key}
                className={`animate-pulse rounded-xl border border-[#e2e8f0] bg-[#f1f5f9] ${
                  key.endsWith('1') ? 'ml-6 h-16' : 'h-20'
                }`}
              />
            ))
          ) : (
            <>
              {showWelcome ? (
                <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-3 text-[13px] leading-relaxed text-[#475569]">
                  안녕하세요! <span className="font-semibold text-[#0f172a]">{projectName}</span>{' '}
                  워크스페이스입니다. 메시지를 입력하면 대화가 시작됩니다.
                </div>
              ) : null}
              {isExistingConversation
                ? messages.map((message) => (
                    <MessageBubble key={message.messageId} message={message} />
                  ))
                : null}
            </>
          )}
        </div>
      </div>

      <footer className="border-t border-[#f1f5f9] p-3">
        <div className="mb-2 flex flex-wrap gap-2">
          {suggestedPrompts.map(({ label, prompt }) => (
            <button
              key={label}
              type="button"
              disabled={isSending}
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
            disabled={isSending}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요"
            className="min-h-[40px] flex-1 resize-none bg-transparent text-[13px] text-[#0f172a] outline-none placeholder:text-[#94a3b8] disabled:opacity-60"
          />
          <button
            type="button"
            disabled={!input.trim() || isSending}
            onClick={handleSend}
            className="mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#2563eb] text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="전송"
          >
            <SendHorizontal className="size-4" />
          </button>
        </div>
      </footer>
    </>
  );
}

function MessageBubble({ message }: { message: ConversationMessage }) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`rounded-xl border px-3.5 py-3 text-[13px] leading-relaxed ${
        isUser
          ? 'ml-6 border-[#c4b5fd] bg-[#ede9fe] text-[#4c1d95]'
          : isAssistant
            ? 'border-[#e2e8f0] bg-[#f8fafc] text-[#475569]'
            : 'border-[#e2e8f0] bg-white text-[#64748b]'
      }`}
    >
      {message.content}
    </div>
  );
}

export default AgentConversationPanel;
