// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { DeviceShare } from '@/types/deviceShare.type';
import type { ShareFeedback } from '@/types/shareFeedback.type';
import { ApiError } from '@/utils/response';

/*
  목록을 살아 있는 것·끝난 것으로 나눠 그리는지, 끝내기가 확인을 한 번 거친 뒤에만 DELETE 를
  부르는지 본다. 조회 훅은 고정 응답으로 바꾼다 — 폴링 간격·만료 판정은 타입 쪽 테스트가 본다.
*/

const NOW = Date.parse('2026-11-13T21:00:00+09:00');

const deleteDeviceShare = vi.fn();
const refetch = vi.fn();
let listState: {
  data: DeviceShare[];
  isError: boolean;
  error: unknown;
} = { data: [], isError: false, error: null };

vi.mock('@/api/deviceShares', () => ({
  deleteDeviceShare: (...a: unknown[]) => deleteDeviceShare(...a),
  useDeviceShareListQuery: () => ({
    ...listState,
    dataUpdatedAt: NOW,
    isLoading: false,
    isFetching: false,
    refetch,
  }),
}));

let feedbackState: { data: ShareFeedback[]; isError: boolean; error: unknown } = {
  data: [],
  isError: false,
  error: null,
};
const feedbackPoll: boolean[] = [];
const patchShareFeedbackStatus = vi.fn();
const postShareFeedbackFixed = vi.fn();

vi.mock('@/api/shareFeedback', () => ({
  useShareFeedbackListQuery: ({ poll }: { poll: boolean }) => {
    feedbackPoll.push(poll);
    return { ...feedbackState, isLoading: false, refetch: vi.fn() };
  },
  useShareFeedbackDetailQuery: () => ({ data: undefined, isError: false }),
  useShareFeedbackPromptQuery: () => ({ data: undefined, isError: false }),
  useShareFeedbackImageQuery: () => ({ data: undefined, isError: true, isLoading: false }),
  patchShareFeedbackStatus: (...a: unknown[]) => patchShareFeedbackStatus(...a),
  postShareFeedbackFixed: (...a: unknown[]) => postShareFeedbackFixed(...a),
}));

const { default: MeDeviceSharesPanel } = await import('@/components/layout/me/MeDeviceSharesPanel');

function share(overrides: Partial<DeviceShare> = {}): DeviceShare {
  return {
    shareId: 1,
    kind: 'WEB',
    targetLabel: 'http://localhost:5173',
    tokenPrefix: 'k3x9q2',
    status: 'ACTIVE',
    deviceConnected: true,
    viewers: 2,
    expiresAt: '2026-11-13T21:37:00+09:00',
    revokedAt: null,
    lastViewedAt: '2026-11-13T20:55:00+09:00',
    createdAt: '2026-11-13T20:37:00+09:00',
    ...overrides,
  };
}

function renderPanel(props: Parameters<typeof MeDeviceSharesPanel>[0] = {}) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MeDeviceSharesPanel {...props} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  listState = { data: [], isError: false, error: null };
  feedbackState = { data: [], isError: false, error: null };
  feedbackPoll.length = 0;
});

afterEach(() => {
  cleanup();
  deleteDeviceShare.mockReset();
  refetch.mockReset();
  patchShareFeedbackStatus.mockReset();
  postShareFeedbackFixed.mockReset();
});

function feedback(overrides: Partial<ShareFeedback> = {}): ShareFeedback {
  return {
    feedbackId: 21,
    shareId: 1,
    kind: 'WEB',
    status: 'NEW',
    authorRole: 'GUEST',
    authorName: '민지',
    screenLabel: '/settings',
    label: '<button> "저장"',
    component: 'SaveButton',
    body: '저장 버튼이 너무 작아요',
    createdAt: '2026-11-13T20:50:00+09:00',
    updatedAt: '2026-11-13T20:50:00+09:00',
    ...overrides,
  };
}

describe('MeDeviceSharesPanel', () => {
  it('살아 있는 링크는 위에, 끝난 링크는 접힌 목록에 그린다', () => {
    listState.data = [
      share(),
      share({
        shareId: 2,
        kind: 'ANDROID',
        targetLabel: 'qeploy_test · com.android.chrome',
        tokenPrefix: 'a1b2c3',
        deviceConnected: false,
        viewers: 0,
      }),
      share({
        shareId: 3,
        kind: 'IOS',
        status: 'REVOKED',
        tokenPrefix: 'zzzzzz',
        targetLabel: 'Qeploy Share Test · com.apple.mobilesafari',
      }),
      share({
        shareId: 4,
        status: 'EXPIRED',
        tokenPrefix: 'yyyyyy',
        targetLabel: 'http://localhost:3000',
      }),
    ];
    renderPanel();

    expect(screen.getByText('2 / 5')).toBeTruthy();
    expect(screen.getByText('http://localhost:5173')).toBeTruthy();
    expect(screen.getByText('기기 연결됨')).toBeTruthy();
    expect(screen.getByText(/접속 2명 · 37분 남음/)).toBeTruthy();

    // 터미널이 끊긴 링크는 여기서 끝내라고 말한다
    expect(screen.getByText('기기 연결 끊김')).toBeTruthy();
    expect(screen.getByText(/터미널을 닫았다면/)).toBeTruthy();

    expect(screen.getByText('끝난 공유 2개')).toBeTruthy();
    // 끝내기 버튼은 살아 있는 두 줄에만
    expect(screen.getAllByRole('button', { name: '끝내기' })).toHaveLength(2);
  });

  it('끝내기는 확인을 한 번 거친 뒤에만 DELETE 를 부른다', async () => {
    listState.data = [share({ shareId: 28 })];
    deleteDeviceShare.mockResolvedValue(true);
    renderPanel();

    fireEvent.click(screen.getByRole('button', { name: '끝내기' }));
    expect(deleteDeviceShare).not.toHaveBeenCalled();

    const confirm = screen.getByRole('group', { name: '공유 끝내기 확인' });
    expect(within(confirm).getByText(/지금 접속한 2명과/)).toBeTruthy();

    fireEvent.click(within(confirm).getByRole('button', { name: '취소' }));
    expect(screen.queryByRole('group', { name: '공유 끝내기 확인' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: '끝내기' }));
    fireEvent.click(screen.getByRole('button', { name: '공유 끝내기' }));

    await waitFor(() => expect(deleteDeviceShare).toHaveBeenCalledTimes(1));
    expect(deleteDeviceShare.mock.calls[0][0]).toBe(28);
    expect(await screen.findByText(/공유를 끝냈습니다/)).toBeTruthy();
  });

  it('끝내기가 실패하면 서버 문장을 보여 준다', async () => {
    listState.data = [share()];
    deleteDeviceShare.mockRejectedValue(new ApiError('공유를 찾을 수 없습니다.', 'NOT_FOUND'));
    renderPanel();

    fireEvent.click(screen.getByRole('button', { name: '끝내기' }));
    fireEvent.click(screen.getByRole('button', { name: '공유 끝내기' }));

    expect(await screen.findByText(/공유를 찾을 수 없습니다/)).toBeTruthy();
  });

  it('한도에 닿으면 무엇을 해야 하는지 말한다', () => {
    listState.data = Array.from({ length: 5 }, (_, i) => share({ shareId: i + 1 }));
    renderPanel();

    expect(screen.getByText('5 / 5')).toBeTruthy();
    expect(screen.getByText(/쓰지 않는 링크를 끝내세요/)).toBeTruthy();
  });

  it('공유 중인 것이 없으면 시작 안내로 보낸다', () => {
    renderPanel();
    expect(screen.getByText(/지금 공유 중인 화면이 없습니다/)).toBeTruthy();
  });

  it('목록을 못 읽으면 다시 불러올 수 있다', () => {
    listState = { data: [], isError: true, error: new ApiError('서버에 닿지 못했습니다.', null) };
    renderPanel();

    expect(screen.getByText('서버에 닿지 못했습니다.')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '다시 불러오기' }));
    expect(refetch).toHaveBeenCalled();
  });

  it('시작 안내는 종류마다 명령이 바뀌고, 토큰 발급 절로 보낼 수 있다', () => {
    const onOpenSection = vi.fn();
    renderPanel({ onOpenSection });

    expect(screen.getByText('npx @qeploy/cli share web http://localhost:5173')).toBeTruthy();
    fireEvent.click(screen.getByRole('tab', { name: 'Android' }));
    expect(screen.getByText('npx @qeploy/cli share android --app com.example.app')).toBeTruthy();
    fireEvent.click(screen.getByRole('tab', { name: 'iOS' }));
    expect(screen.getByText('npx @qeploy/cli share ios --app com.example.app')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: '액세스 토큰 (MCP)' }));
    expect(onOpenSection).toHaveBeenCalledWith('api-tokens');
  });
});

/*
  짚기 피드백(#210). 링크의 "새 피드백" 이 받기 전 탭으로 보내고, 받기·고침 표시가 서버의 바뀌는 길
  대로 API 를 부르는지 본다. 손님 글은 텍스트로만 그린다.
*/
describe('짚기 피드백', () => {
  it('살아 있는 링크가 있으면 다시 읽고, 받기 전이 있는 링크에 "새 피드백" 을 단다', () => {
    listState.data = [share()];
    feedbackState.data = [
      feedback(),
      feedback({ feedbackId: 22 }),
      feedback({ feedbackId: 23, status: 'ACCEPTED' }),
    ];
    renderPanel();

    expect(feedbackPoll.at(-1)).toBe(true);
    const chip = screen.getByRole('button', { name: '새 피드백 2' });
    fireEvent.click(chip);
    expect(screen.getByRole('tab', { name: /받기 전/ }).getAttribute('aria-selected')).toBe('true');
  });

  it('끝난 링크뿐이면 다시 읽지 않는다', () => {
    listState.data = [share({ status: 'EXPIRED' })];
    renderPanel();
    expect(feedbackPoll.at(-1)).toBe(false);
  });

  it('받기 전이 있으면 그 탭부터 보이고, 받기를 누르면 ACCEPTED 로 바꾼다', async () => {
    listState.data = [share()];
    feedbackState.data = [feedback()];
    patchShareFeedbackStatus.mockResolvedValue({});
    renderPanel();

    const section = document.getElementById('share-feedback')!;
    expect(within(section).getByText('저장 버튼이 너무 작아요')).toBeTruthy();
    expect(within(section).getByText(/받기 전에는 나가지 않습니다/)).toBeTruthy();
    fireEvent.click(within(section).getByRole('button', { name: '받기' }));

    await waitFor(() => expect(patchShareFeedbackStatus).toHaveBeenCalledWith(21, 'ACCEPTED'));
    expect(
      await within(section).findByText(/코딩 에이전트\(MCP\)·CLI 가 읽을 수 있습니다/),
    ).toBeTruthy();
  });

  it('받은 것은 메모와 함께 고침으로 표시한다', async () => {
    listState.data = [share()];
    feedbackState.data = [feedback({ status: 'ACCEPTED' })];
    postShareFeedbackFixed.mockResolvedValue({});
    renderPanel();

    const section = document.getElementById('share-feedback')!;
    expect(within(section).getByRole('tab', { name: /받음/ }).getAttribute('aria-selected')).toBe(
      'true',
    );
    fireEvent.click(within(section).getByRole('button', { name: '고침 표시' }));
    fireEvent.change(within(section).getByLabelText(/무엇을 바꿨는지/), {
      target: { value: '패딩을 16px 로 늘렸습니다' },
    });
    fireEvent.click(within(section).getByRole('button', { name: '고쳤다고 표시' }));

    await waitFor(() =>
      expect(postShareFeedbackFixed).toHaveBeenCalledWith(21, '패딩을 16px 로 늘렸습니다'),
    );
  });

  it('상태가 그 사이 바뀌어 409 가 오면 서버 문장을 보인다', async () => {
    listState.data = [share()];
    feedbackState.data = [feedback()];
    patchShareFeedbackStatus.mockRejectedValue(
      new ApiError(
        '지금 상태(받음)에서는 받음(으)로 바꿀 수 없습니다.',
        'DEVICE_SHARE_FEEDBACK_INVALID_TRANSITION',
      ),
    );
    renderPanel();

    const section = document.getElementById('share-feedback')!;
    fireEvent.click(within(section).getByRole('button', { name: '받기' }));
    expect(await within(section).findByText(/바꿀 수 없습니다/)).toBeTruthy();
  });

  it('손님 글은 HTML 이 아니라 글자로 그린다', () => {
    listState.data = [share()];
    feedbackState.data = [feedback({ body: '<img src=x onerror="alert(1)">더 크게' })];
    renderPanel();

    const section = document.getElementById('share-feedback')!;
    expect(within(section).getByText('<img src=x onerror="alert(1)">더 크게')).toBeTruthy();
    expect(section.querySelector('img[src="x"]')).toBeNull();
  });
});
