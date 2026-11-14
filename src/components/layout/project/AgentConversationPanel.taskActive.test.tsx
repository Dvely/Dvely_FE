// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/*
  #184 로컬 실측. 대화가 부모에게 알리는 "작업이 도는 중" 은 프로젝트 화면이 프리뷰 닫기를 잠그는 데
  쓴다. 키가 없어 입력창을 막은 것까지 거기 섞이면, 키를 등록하지 않은 사용자는 직접 띄운 프리뷰도
  닫지 못한다 — "에이전트 작업이 이 프리뷰의 컨테이너를 쓰고 있어" 라는 틀린 이유와 함께.

  `AgentConversationPanel.test.tsx` 는 분할 전에 걸어 둔 고정 테스트라 손대지 않고 따로 둔다.
*/

let providers: { provider: string; label: string; models: unknown[] }[] = [];

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children?: unknown }) => children,
}));

vi.mock('@/api/chat', () => ({
  postConversationMessageCreate: vi.fn(),
  useConversationMessageListQuery: () => ({ data: [], isLoading: false }),
  AGENT_CHAT_QUERY_KEY: 'agent-chat',
}));

vi.mock('@/api/agent', () => ({
  pollAgentTask: vi.fn(),
  postAgentTaskInput: vi.fn(),
  postAgentTaskRetry: vi.fn(),
  postAgentTaskCancel: vi.fn(),
  AgentPollTimeoutError: class AgentPollTimeoutError extends Error {},
  useAiProviderListQuery: () => ({ data: { providers }, isLoading: false }),
  openAgentTaskEventStream: () => () => {},
}));

vi.mock('@/api/approvals', () => ({
  postApprovalApprove: vi.fn(),
  postApprovalReject: vi.fn(),
  getProjectApprovalList: vi.fn(async () => []),
  useApprovalDetailQuery: () => ({ data: null }),
  useConversationPendingApprovalQuery: () => ({ data: null }),
  useApprovalResultScopeQuery: () => ({ data: null }),
}));

vi.mock('@/api/user', () => ({ refreshUserInfoInBackground: vi.fn() }));

const { default: AgentConversationPanel } =
  await import('@/components/layout/project/AgentConversationPanel');

function renderPanel(onAgentTaskActiveChange: (isActive: boolean) => void) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <AgentConversationPanel
        projectId={42}
        projectName="데모"
        conversationId={7}
        isNewConversation={false}
        onConversationCreated={() => {}}
        onAgentTaskActiveChange={onAgentTaskActiveChange}
      />
    </QueryClientProvider>,
  );
}

afterEach(() => cleanup());

describe('작업이 도는 중이라고 알리는 것 (#184)', () => {
  it('키가 없어 입력창을 막은 것은 작업이 도는 것이 아니다', async () => {
    providers = [];
    const onAgentTaskActiveChange = vi.fn();
    renderPanel(onAgentTaskActiveChange);

    // 입력창은 잠긴다 — 키를 넣기 전에는 보낼 수 없다
    await waitFor(() =>
      expect(document.querySelector<HTMLTextAreaElement>('textarea')?.disabled).toBe(true),
    );
    expect(onAgentTaskActiveChange).toHaveBeenCalled();
    expect(onAgentTaskActiveChange).not.toHaveBeenCalledWith(true);
  });

  it('키가 있고 아무것도 보내지 않았으면 역시 도는 작업이 없다', () => {
    providers = [{ provider: 'ANTHROPIC', label: 'Anthropic', models: [] }];
    const onAgentTaskActiveChange = vi.fn();
    renderPanel(onAgentTaskActiveChange);

    expect(onAgentTaskActiveChange).not.toHaveBeenCalledWith(true);
  });
});
