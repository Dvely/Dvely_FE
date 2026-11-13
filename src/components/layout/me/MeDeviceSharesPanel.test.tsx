// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { DeviceShare } from '@/types/deviceShare.type';
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
});

afterEach(() => {
  cleanup();
  deleteDeviceShare.mockReset();
  refetch.mockReset();
});

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
