// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { AxiosError } from 'axios';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const httpDelete = vi.fn();
const httpGet = vi.fn();

vi.mock('@/utils/httpClients', () => ({
  default: {
    instance: {
      delete: (...a: unknown[]) => httpDelete(...a),
      get: (...a: unknown[]) => httpGet(...a),
    },
  },
}));

const { closeAllPreviewSessions, getPreviewSessionList, useClosePreviewMutation } =
  await import('@/api/preview');

/*
  #184. 닫고 나서 프로젝트 프리뷰를 다시 읽지 않으면 화면에는 **죽은 프레임**이 남는다 —
  다른 오리진이라 404 도 onload 로 와서 화면은 그걸 모른다. 이미 닫혀 있어 404 가 와도
  마찬가지로 다시 읽어야 빈 상태로 돌아온다.
*/
describe('프리뷰 닫기 (#184)', () => {
  const PREVIEW_KEY = ['project-preview-session', 'page', 42];

  function setup() {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    client.setQueryData(PREVIEW_KEY, { sessionId: 's-1', status: 'ACTIVE' });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useClosePreviewMutation('page', 42), { wrapper });
    return { client, result };
  }

  it('그 세션을 닫고 프로젝트 프리뷰를 다시 읽게 한다', async () => {
    httpDelete.mockResolvedValue({ status: 204, data: '' });
    const { client, result } = setup();

    act(() => result.current.mutate('s-1'));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(httpDelete).toHaveBeenCalledWith('/preview-sessions/s-1');
    expect(client.getQueryState(PREVIEW_KEY)?.isInvalidated).toBe(true);
  });

  it('닫기가 실패해도 다시 읽는다 — 이미 닫혀 있었다면 그 조회가 빈 상태로 돌려놓는다', async () => {
    // 이미 닫혔거나 만료된 세션이면 서버는 404 를 준다
    const notFound = new AxiosError('Not Found');
    notFound.response = {
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config: { headers: {} } as never,
      data: { status: 404, message: 'PreviewSession을 찾을 수 없습니다.' },
    };
    httpDelete.mockRejectedValue(notFound);
    const { client, result } = setup();

    act(() => result.current.mutate('s-1'));

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(client.getQueryState(PREVIEW_KEY)?.isInvalidated).toBe(true);
  });

  it('닫은 뒤 내 프리뷰 목록과 프리뷰를 띄운 작업의 상태도 다시 읽는다', async () => {
    // 409 였다면 화면의 잠금이 늦은 것이다 — 작업 상태를 바로 다시 읽어 이유를 보여 준다
    const inUse = new AxiosError('Conflict');
    inUse.response = {
      status: 409,
      statusText: 'Conflict',
      headers: {},
      config: { headers: {} } as never,
      data: {
        status: 409,
        code: 'PREVIEW_IN_USE',
        message: '작업이 쓰는 프리뷰라 닫을 수 없습니다.',
      },
    };
    httpDelete.mockRejectedValue(inUse);
    const { client, result } = setup();
    const LIST_KEY = ['preview-session-list'];
    const OWNER_KEY = ['agent-task', 'preview-owner', 't-1'];
    client.setQueryData(LIST_KEY, { maxLivePreviews: 3, items: [] });
    client.setQueryData(OWNER_KEY, { status: 'DONE' });

    act(() => result.current.mutate('s-1'));

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(client.getQueryState(LIST_KEY)?.isInvalidated).toBe(true);
    expect(client.getQueryState(OWNER_KEY)?.isInvalidated).toBe(true);
  });
});

describe('내 프리뷰 목록·모두 닫기 (#184, BE #650·#651)', () => {
  it('목록을 봉투에서 꺼내고, 빠진 필드는 기본값으로 채운다', async () => {
    httpGet.mockResolvedValue({
      status: 200,
      data: {
        status: 200,
        data: {
          maxLivePreviews: 3,
          items: [
            {
              sessionId: 's-1',
              status: 'ACTIVE',
              projectId: 11,
              projectName: '쇼핑몰',
              taskId: 't-1',
              taskStatus: 'WAITING_RESULT_APPROVAL',
              closable: false,
              closeBlockedReason: 'WAITING_RESULT_APPROVAL',
              lastAccessedAt: '2026-11-14T20:40:00',
              expiresAt: '2026-11-14T21:10:00',
              createdAt: '2026-11-14T20:00:00',
            },
            // 서버가 필드를 빼도 목록 전체가 깨지지 않는다 — 모르면 닫을 수 없는 쪽이다
            { sessionId: 's-2', status: 'ACTIVE' },
          ],
        },
      },
    });

    const result = await getPreviewSessionList();

    expect(httpGet).toHaveBeenCalledWith('/preview-sessions');
    expect(result.maxLivePreviews).toBe(3);
    expect(result.items[0]).toMatchObject({ projectName: '쇼핑몰', closable: false });
    expect(result.items[1]).toMatchObject({ sessionId: 's-2', closable: false, taskId: null });
  });

  it('모두 닫기는 DELETE /agent/session 의 닫은 수와 남긴 것을 돌려준다', async () => {
    httpDelete.mockResolvedValue({
      status: 200,
      data: {
        status: 200,
        data: {
          closed: 2,
          kept: [{ sessionId: 's-3', projectId: 11, taskId: 't-3', taskStatus: 'RUNNING' }],
        },
      },
    });

    const result = await closeAllPreviewSessions();

    expect(httpDelete).toHaveBeenCalledWith('/agent/session');
    expect(result.closed).toBe(2);
    expect(result.kept).toEqual([
      { sessionId: 's-3', projectId: 11, taskId: 't-3', taskStatus: 'RUNNING' },
    ]);
  });
});
