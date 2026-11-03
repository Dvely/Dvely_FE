// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiError } from '@/utils/response';
import { DRAFT_STASH_KEY } from '@/lib/composerDraft';

/*
  **분할 전에 걸어 두는 고정 테스트다.**

  `AgentConversationPanel` 을 훅과 하위 컴포넌트로 쪼갤 예정인데, 순수 함수로 꺼내 둔
  판단(`runLimit`·`composerDraft`·`scrollAnchor`)은 이미 각자 테스트가 있다. 남는 위험은
  **그 판단을 화면에 잇는 배선**이다 — 조각을 옮기다 `onError` 분기 하나를 빠뜨리거나
  `data-*` 속성을 흘리면, 타입도 빌드도 통과하고 **화면만 조용히 망가진다.**

  그래서 여기서는 내부 구현이 아니라 **밖에서 보이는 약속**만 본다. 분할 뒤에도 이 파일은
  한 글자도 바뀌지 않아야 한다 — 그것이 "동작 변경 없음" 의 증거다.
*/

const postConversationMessageCreate = vi.fn();
const pollAgentTask = vi.fn();

/*
  승인 카드를 띄우려면 두 조회가 같은 승인을 돌려줘야 한다. 테스트마다 갈아끼울 수 있게
  바깥 변수로 둔다 — `vi.mock` 은 호이스팅되므로 안에서 바로 쓰면 초기화 전에 읽힌다.
*/
let approvalFixture: Record<string, unknown> | null = null;

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children?: unknown }) => children,
}));

vi.mock('@/api/chat', () => ({
  postConversationMessageCreate: (...a: unknown[]) => postConversationMessageCreate(...a),
  useConversationMessageListQuery: () => ({ data: [], isLoading: false }),
  AGENT_CHAT_QUERY_KEY: 'agent-chat',
}));

vi.mock('@/api/agent', () => ({
  pollAgentTask: (...a: unknown[]) => pollAgentTask(...a),
  postAgentTaskInput: vi.fn(),
  postAgentTaskRetry: vi.fn(),
  postAgentTaskCancel: vi.fn(),
  AgentPollTimeoutError: class AgentPollTimeoutError extends Error {},
  /*
    본인 키 제공자가 하나는 있어야 한다. 비우면 BYOK 게이트가 입력창을 잠그는데,
    그건 의도된 동작이라(무분별한 토큰 사용을 막는 장치) 여기서는 전송 경로를 보려고
    제공자를 하나 둔다.
  */
  useAiProviderListQuery: () => ({
    data: { providers: [{ provider: 'ANTHROPIC', label: 'Anthropic', models: [] }] },
    isLoading: false,
  }),
  openAgentTaskEventStream: () => () => {},
}));

vi.mock('@/api/approvals', () => ({
  postApprovalApprove: vi.fn(),
  postApprovalReject: vi.fn(),
  getProjectApprovalList: vi.fn(async () => []),
  useApprovalDetailQuery: () => ({ data: approvalFixture }),
  useConversationPendingApprovalQuery: () => ({ data: approvalFixture?.approvalId ?? null }),
  useApprovalResultScopeQuery: () => ({ data: null }),
}));

vi.mock('@/api/user', () => ({ refreshUserInfoInBackground: vi.fn() }));

const { default: AgentConversationPanel } =
  await import('@/components/layout/project/AgentConversationPanel');

function renderPanel(props: Record<string, unknown> = {}) {
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
        {...props}
      />
    </QueryClientProvider>,
  );
}

function composer(): HTMLTextAreaElement {
  const el = document.querySelector<HTMLTextAreaElement>('textarea[data-composer-draft]');
  if (!el) throw new Error('입력창을 찾지 못했습니다');
  return el;
}

beforeEach(() => {
  sessionStorage.clear();
  vi.clearAllMocks();
  approvalFixture = null;
});

afterEach(() => cleanup());

/*
  #169. 맡기는 쪽(전역 배너·자동 새로고침)은 라우트 바깥이라 React 로 대화를 알 수 없고
  **이 속성들을 읽어** 자리를 안다. 쪼개다 흘리면 맡기기가 조용히 멈춘다.
*/
describe('입력창이 자기 자리를 DOM 에 적어 둔다 (#169)', () => {
  it('data-composer-draft 와 프로젝트·대화 id 를 단다', () => {
    renderPanel();
    const el = composer();

    expect(el.getAttribute('data-composer-draft')).not.toBeNull();
    expect(el.dataset.projectId).toBe('42');
    expect(el.dataset.conversationId).toBe('7');
  });

  it('새 대화면 대화 id 자리를 비운다', () => {
    renderPanel({ conversationId: null, isNewConversation: true });
    expect(composer().dataset.conversationId).toBe('');
  });
});

/* #169. 새로고침으로 날아간 입력을 같은 자리로 돌아왔을 때 한 번 되돌린다 */
describe('맡겨 둔 입력을 되돌린다 (#169)', () => {
  it('같은 자리면 입력창에 채운다', async () => {
    sessionStorage.setItem(
      DRAFT_STASH_KEY,
      JSON.stringify({ scope: '42:7', text: '로그인 화면을 고쳐줘', at: Date.now() }),
    );

    renderPanel();

    await waitFor(() => expect(composer().value).toBe('로그인 화면을 고쳐줘'));
    // 한 번 쓰고 버린다 — 남겨두면 다음 방문에도 또 나타난다
    expect(sessionStorage.getItem(DRAFT_STASH_KEY)).toBeNull();
  });

  it('다른 대화의 것이면 채우지 않는다', async () => {
    sessionStorage.setItem(
      DRAFT_STASH_KEY,
      JSON.stringify({ scope: '42:999', text: '엉뚱한 말', at: Date.now() }),
    );

    renderPanel();

    await waitFor(() => expect(composer()).toBeTruthy());
    expect(composer().value).toBe('');
  });
});

/*
  #163. 동시 실행 상한(429)이면 메시지가 서버에 저장되지 않았다. 적은 말을 돌려주고
  저장도 안 된 낙관적 말풍선을 걷어낸다 — 기존 대화에서도 그래야 한다.
*/
describe('동시 실행 상한이면 적은 말을 돌려준다 (#163)', () => {
  it('기존 대화에서 429 가 오면 입력창에 되돌린다', async () => {
    postConversationMessageCreate.mockRejectedValue(
      new ApiError('동시에 2개까지 실행할 수 있습니다.', 'ACTIVE_RUN_LIMIT_EXCEEDED'),
    );

    renderPanel();

    fireEvent.change(composer(), { target: { value: '고쳐줘' } });
    await waitFor(() => expect(composer().value).toBe('고쳐줘'));

    const send = document.querySelector<HTMLButtonElement>('button[aria-label="전송"]');
    if (!send) throw new Error('전송 버튼을 찾지 못했습니다');
    expect(send.disabled).toBe(false);
    fireEvent.click(send);

    await waitFor(() => expect(postConversationMessageCreate).toHaveBeenCalled());

    // onMutate 가 입력창을 비웠다가, 429 를 받으면 되돌려 놓아야 한다
    await waitFor(() => expect(composer().value).toBe('고쳐줘'));
  });
});

/*
  #173. 승인 카드가 "응답 중" 이 풀리기 전에 먼저 뜨는 순간이 있다.

  `handleDecideApproval` 은 `isAssistantReplying` 이면 그냥 돌아가는데, 카드에는 그 사실이
  넘어가지 않아 **버튼이 활성으로 그려졌다.** 눌러도 아무 일도 없고 안내도 없었다.

  고친 뒤에는 그 구간 동안 버튼이 잠기고 이유가 보여야 한다. "눌러도 되는가" 가 아니라
  **"눌러도 되는 것처럼 보이는가"** 를 보는 테스트다.
*/
describe('승인 카드는 누를 수 없을 때 그렇게 보인다 (#173)', () => {
  const PENDING_APPROVAL = {
    approvalId: 7,
    projectId: 42,
    conversationId: 7,
    taskId: 'task-1',
    type: 'RESULT',
    status: 'PENDING',
    summary: '변경 결과를 반영할까요?',
    input: null,
    createdAt: '2026-11-03T10:00:00+09:00',
    decidedAt: null,
    rejectOption: null,
  };

  function approveButton(): HTMLButtonElement {
    const el = [...document.querySelectorAll('button')].find((b) =>
      /^(승인|처리 중)$/.test(b.textContent?.trim() ?? ''),
    );
    if (!el) throw new Error('승인 버튼을 찾지 못했습니다');
    return el as HTMLButtonElement;
  }

  it('응답을 기다리는 동안 승인 버튼이 잠기고 이유가 보인다', async () => {
    approvalFixture = PENDING_APPROVAL;
    // 보내기를 끝나지 않게 두면 isAssistantReplying 이 참으로 남는다 — 문제의 그 구간이다
    postConversationMessageCreate.mockReturnValue(new Promise(() => {}));

    renderPanel();
    await waitFor(() => expect(approveButton()).toBeTruthy());
    expect(approveButton().disabled).toBe(false);

    fireEvent.change(composer(), { target: { value: '고쳐줘' } });
    const send = document.querySelector<HTMLButtonElement>('button[aria-label="전송"]');
    fireEvent.click(send!);

    await waitFor(() => expect(approveButton().disabled).toBe(true));
    expect(document.body.textContent).toContain('곧 결정할 수 있습니다');
  });

  it('평소에는 승인 버튼이 눌린다', async () => {
    approvalFixture = PENDING_APPROVAL;

    renderPanel();

    await waitFor(() => expect(approveButton()).toBeTruthy());
    expect(approveButton().disabled).toBe(false);
    expect(document.body.textContent).not.toContain('곧 결정할 수 있습니다');
  });
});
