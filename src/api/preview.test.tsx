// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { AxiosError } from 'axios';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const httpDelete = vi.fn();

vi.mock('@/utils/httpClients', () => ({
  default: { instance: { delete: (...a: unknown[]) => httpDelete(...a) } },
}));

const { useClosePreviewMutation } = await import('@/api/preview');

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
});
