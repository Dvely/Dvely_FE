// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PREVIEW_CLOSE_LABEL } from '@/lib/previewClose';
import type { GetPreviewSessionListResType, PreviewSessionItem } from '@/types/previewSession.type';
import { ApiError } from '@/utils/response';

/*
  설정 > 프리뷰(#184). 상한에 걸린 사용자가 어디에 무엇이 떠 있는지 보고 닫을 수 있는지,
  닫을 수 없는 것에는 버튼 대신 이유가 붙는지, 닫기는 확인을 한 번 거친 뒤에만 부르는지 본다.
  조회 훅은 고정 응답으로 바꾼다 — 닫을 수 있는지는 서버가 정한 값(closable)을 그대로 쓴다.
*/

const NOW = Date.parse('2026-11-14T21:00:00+09:00');

const deletePreviewSession = vi.fn();
const closeAllPreviewSessions = vi.fn();
const refetch = vi.fn();
let listState: {
  data: GetPreviewSessionListResType | undefined;
  isError: boolean;
  error: unknown;
} = { data: undefined, isError: false, error: null };

vi.mock('@/api/preview', () => ({
  PREVIEW_SESSION_LIST_KEY: ['preview-session-list'],
  deletePreviewSession: (...a: unknown[]) => deletePreviewSession(...a),
  closeAllPreviewSessions: (...a: unknown[]) => closeAllPreviewSessions(...a),
  usePreviewSessionListQuery: () => ({
    ...listState,
    dataUpdatedAt: NOW,
    isLoading: false,
    isFetching: false,
    refetch,
  }),
}));

// 라우터 없이 그린다. 프로젝트 열기는 평범한 링크로 본다
vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    params,
    onClick,
  }: {
    children: ReactNode;
    params: { slug: string };
    onClick?: () => void;
  }) => (
    <a href={`/project/${params.slug}/agent`} onClick={onClick}>
      {children}
    </a>
  ),
}));

const { default: MePreviewSessionsPanel } =
  await import('@/components/layout/me/MePreviewSessionsPanel');

function item(overrides: Partial<PreviewSessionItem> = {}): PreviewSessionItem {
  return {
    sessionId: 's-1',
    status: 'ACTIVE',
    projectId: 11,
    projectName: '쇼핑몰',
    taskId: null,
    taskStatus: null,
    closable: true,
    closeBlockedReason: null,
    lastAccessedAt: '2026-11-14T20:40:00',
    expiresAt: '2026-11-14T21:10:00',
    createdAt: '2026-11-14T20:00:00',
    ...overrides,
  };
}

function list(items: PreviewSessionItem[], maxLivePreviews = 3): GetPreviewSessionListResType {
  return { maxLivePreviews, items };
}

function renderPanel(props: Parameters<typeof MePreviewSessionsPanel>[0] = {}) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MePreviewSessionsPanel {...props} />
    </QueryClientProvider>,
  );
}

function row(name: string) {
  const title = screen.getByText(name);
  const li = title.closest('li');
  if (!li) throw new Error(`${name} 행을 찾지 못했습니다`);
  return within(li);
}

beforeEach(() => {
  listState = { data: undefined, isError: false, error: null };
});

afterEach(() => {
  cleanup();
  deletePreviewSession.mockReset();
  closeAllPreviewSessions.mockReset();
  refetch.mockReset();
});

describe('MePreviewSessionsPanel (#184)', () => {
  it('상한이 찼으면 몇 개가 떠 있는지와 어느 프로젝트인지 보여 준다', () => {
    listState.data = list([
      item(),
      item({ sessionId: 's-2', projectId: 12, projectName: '블로그' }),
      item({ sessionId: 's-3', projectId: 13, projectName: '포트폴리오' }),
    ]);

    renderPanel();

    expect(screen.getByText('3 / 3')).toBeTruthy();
    expect(screen.getByText(/3개를 다 썼습니다/)).toBeTruthy();
    expect(screen.getByText('쇼핑몰')).toBeTruthy();
    expect(screen.getByText('블로그')).toBeTruthy();
    expect(
      row('쇼핑몰')
        .getByRole('link', { name: /프로젝트 열기/ })
        .getAttribute('href'),
    ).toBe('/project/11/agent');
    // 마지막으로 본 뒤 30분이 지나면 서버가 저절로 닫는다 — 남은 시간을 적는다
    expect(row('쇼핑몰').getByText(/보지 않으면 10분 뒤 저절로 닫힘/)).toBeTruthy();
  });

  it('작업이 쓰는 프리뷰에는 닫기 버튼 대신 이유를 적는다', () => {
    listState.data = list([
      item({
        taskId: 't-1',
        taskStatus: 'WAITING_RESULT_APPROVAL',
        closable: false,
        closeBlockedReason: 'WAITING_RESULT_APPROVAL',
      }),
      item({
        sessionId: 's-2',
        projectName: '블로그',
        status: 'PROVISIONING',
        closable: false,
        closeBlockedReason: 'PROVISIONING',
      }),
    ]);

    renderPanel();

    const awaiting = row('쇼핑몰');
    expect(awaiting.queryByRole('button', { name: PREVIEW_CLOSE_LABEL })).toBeNull();
    expect(awaiting.getByText('결과 승인 대기')).toBeTruthy();
    expect(awaiting.getByText(/먼저 승인하거나 거절해 주세요/)).toBeTruthy();

    const preparing = row('블로그');
    expect(preparing.queryByRole('button', { name: PREVIEW_CLOSE_LABEL })).toBeNull();
    expect(preparing.getByText(/다 뜬 뒤에 닫을 수 있습니다/)).toBeTruthy();
  });

  it('닫을 수 있는 것이 하나도 없이 상한이 찼으면 기다리면 된다고 말한다', () => {
    listState.data = list(
      [
        item({
          taskId: 't-1',
          taskStatus: 'RUNNING',
          closable: false,
          closeBlockedReason: 'RUNNING',
        }),
      ],
      1,
    );

    renderPanel();

    expect(screen.getByText(/지금은 닫을 수 있는 것이 없습니다/)).toBeTruthy();
  });

  it('닫기는 잃는 것을 먼저 말하고, 확인해야 부른다', async () => {
    listState.data = list([item()]);
    deletePreviewSession.mockResolvedValue('');
    const onClosed = vi.fn();
    renderPanel({ onClosed });

    fireEvent.click(screen.getByRole('button', { name: PREVIEW_CLOSE_LABEL }));
    const confirm = within(screen.getByRole('group', { name: '프리뷰 닫기 확인' }));
    expect(confirm.getByText(/컨테이너가 꺼지고/)).toBeTruthy();
    expect(deletePreviewSession).not.toHaveBeenCalled();

    fireEvent.click(confirm.getByRole('button', { name: '닫기' }));

    await waitFor(() => expect(deletePreviewSession).toHaveBeenCalledWith('s-1'));
    await waitFor(() => expect(screen.getByText(/프리뷰를 닫았습니다/)).toBeTruthy());
    // 프로젝트에서 상한에 걸려 넘어왔다면 그 자리로 돌려보낼 수 있게 알린다
    expect(onClosed).toHaveBeenCalledTimes(1);
  });

  it('취소하면 닫지 않는다', () => {
    listState.data = list([item()]);
    renderPanel();

    fireEvent.click(screen.getByRole('button', { name: PREVIEW_CLOSE_LABEL }));
    fireEvent.click(screen.getByRole('button', { name: '취소' }));

    expect(screen.queryByRole('group', { name: '프리뷰 닫기 확인' })).toBeNull();
    expect(deletePreviewSession).not.toHaveBeenCalled();
  });

  it('실패한 작업의 프리뷰는 재시도 작업물이 사라진다고 덧붙인다', () => {
    listState.data = list([item({ taskId: 't-1', taskStatus: 'FAILED' })]);
    renderPanel();

    fireEvent.click(screen.getByRole('button', { name: PREVIEW_CLOSE_LABEL }));

    const confirm = within(screen.getByRole('group', { name: '프리뷰 닫기 확인' }));
    expect(confirm.getByText(/재시도는 이 컨테이너에 남은 작업물을 이어 쓰는데/)).toBeTruthy();
  });

  it('그새 작업이 쓰기 시작해 409 가 오면, 아무것도 닫지 않았다고 말한다', async () => {
    listState.data = list([item()]);
    deletePreviewSession.mockRejectedValue(
      new ApiError(
        '진행 중이거나 결정을 기다리는 작업이 쓰는 프리뷰라 닫을 수 없습니다. 결과 승인을 먼저 결정해 주세요.',
        'PREVIEW_IN_USE',
      ),
    );
    const onClosed = vi.fn();
    renderPanel({ onClosed });

    fireEvent.click(screen.getByRole('button', { name: PREVIEW_CLOSE_LABEL }));
    fireEvent.click(screen.getByRole('button', { name: '닫기' }));

    const status = await screen.findByText(/작업이 쓰는 프리뷰라 닫을 수 없습니다/);
    expect(status.textContent).toMatch(/아무것도 닫지 않았습니다/);
    expect(onClosed).not.toHaveBeenCalled();
  });

  it('닫을 수 있는 것이 둘 이상이면 모두 닫기를 두고, 남긴 것을 알려 준다', async () => {
    listState.data = list([
      item(),
      item({ sessionId: 's-2', projectName: '블로그' }),
      item({
        sessionId: 's-3',
        projectName: '포트폴리오',
        taskId: 't-3',
        taskStatus: 'RUNNING',
        closable: false,
        closeBlockedReason: 'RUNNING',
      }),
    ]);
    closeAllPreviewSessions.mockResolvedValue({
      closed: 2,
      kept: [{ sessionId: 's-3', projectId: 11, taskId: 't-3', taskStatus: 'RUNNING' }],
    });
    renderPanel();

    fireEvent.click(screen.getByRole('button', { name: '닫을 수 있는 2개 모두 닫기' }));
    expect(closeAllPreviewSessions).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: '모두 닫기' }));

    await waitFor(() => expect(closeAllPreviewSessions).toHaveBeenCalledTimes(1));
    expect(
      await screen.findByText('2개를 닫았습니다. 작업이 쓰고 있는 1개는 남겨 두었습니다.'),
    ).toBeTruthy();
  });

  it('모두 닫기에 실패한 작업의 프리뷰가 섞였으면 재시도가 처음부터라고 덧붙인다', () => {
    listState.data = list([
      item(),
      item({ sessionId: 's-2', projectName: '블로그', taskId: 't-2', taskStatus: 'FAILED' }),
    ]);
    renderPanel();

    fireEvent.click(screen.getByRole('button', { name: '닫을 수 있는 2개 모두 닫기' }));

    const confirm = within(screen.getByRole('group', { name: '모두 닫기 확인' }));
    expect(confirm.getByText(/실패한 작업의 프리뷰도 함께 닫힙니다/)).toBeTruthy();
  });

  it('모두 닫기 확인의 수는 연 순간의 것이다 — 그새 목록이 바뀌어도 그대로다', () => {
    listState.data = list([item(), item({ sessionId: 's-2', projectName: '블로그' })]);
    const { rerender } = renderPanel();

    fireEvent.click(screen.getByRole('button', { name: '닫을 수 있는 2개 모두 닫기' }));
    // 닫는 동안 다시 읽은 목록에서 하나가 먼저 빠졌다
    listState.data = list([item({ sessionId: 's-2', projectName: '블로그' })]);
    rerender(
      <QueryClientProvider client={new QueryClient()}>
        <MePreviewSessionsPanel />
      </QueryClientProvider>,
    );

    expect(screen.getByText(/닫을 수 있는 프리뷰 2개의 컨테이너가/)).toBeTruthy();
  });

  it('닫을 수 있는 것이 하나뿐이면 모두 닫기를 두지 않는다', () => {
    listState.data = list([
      item(),
      item({
        sessionId: 's-2',
        projectName: '블로그',
        taskId: 't-2',
        taskStatus: 'RUNNING',
        closable: false,
        closeBlockedReason: 'RUNNING',
      }),
    ]);
    renderPanel();

    expect(screen.queryByRole('button', { name: /모두 닫기/ })).toBeNull();
  });

  it('지워진 프로젝트의 프리뷰도 보여 주되 열 링크는 달지 않는다', () => {
    listState.data = list([item({ projectName: null })]);
    renderPanel();

    expect(screen.getByText('프로젝트 #11')).toBeTruthy();
    expect(screen.queryByRole('link', { name: /프로젝트 열기/ })).toBeNull();
    expect(screen.getByRole('button', { name: PREVIEW_CLOSE_LABEL })).toBeTruthy();
  });

  it('프로젝트를 열면 설정 창을 닫는다', () => {
    listState.data = list([item()]);
    const onLeave = vi.fn();
    renderPanel({ onLeave });

    fireEvent.click(screen.getByRole('link', { name: /프로젝트 열기/ }));

    expect(onLeave).toHaveBeenCalledTimes(1);
  });

  it('떠 있는 것이 없으면 그렇다고 말한다', () => {
    listState.data = list([]);
    renderPanel();

    expect(screen.getByText('0 / 3')).toBeTruthy();
    expect(screen.getByText(/떠 있는 프리뷰가 없습니다/)).toBeTruthy();
  });
});
