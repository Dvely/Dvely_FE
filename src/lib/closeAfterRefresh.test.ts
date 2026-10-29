import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { REFRESH_BEFORE_CLOSE_TIMEOUT_MS, closeAfterRefresh } from '@/lib/closeAfterRefresh';

/*
  GitHub App 설치 팝업이 끝난 뒤 권한 안내를 닫는 순서.

  예전에는 닫고 나서 사용자 정보를 다시 읽었다. 대조군으로 그 순서(close → refresh)를
  넣고 돌리면 4건 중 3건이 실패한다 — 통과하는 것은 "실패해도 닫는다" 하나뿐이다.
*/
describe('closeAfterRefresh', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('다시 읽기가 끝나기 전에는 닫지 않는다', async () => {
    let finishRefresh!: () => void;
    const refresh = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishRefresh = resolve;
        }),
    );
    const close = vi.fn();

    const done = closeAfterRefresh({ refresh, close });
    await vi.advanceTimersByTimeAsync(1000);
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(close).not.toHaveBeenCalled();

    finishRefresh();
    await vi.runAllTimersAsync();
    await done;
    expect(close).toHaveBeenCalledTimes(1);
  });

  /** 읽은 값이 화면에 알려지는 것은 다음 태스크라, 같은 태스크에서 닫으면 안내가 먼저 걷힌다 */
  it('다시 읽은 직후가 아니라 한 태스크를 넘긴 뒤 닫는다', async () => {
    const close = vi.fn();
    const done = closeAfterRefresh({ refresh: () => Promise.resolve(), close });

    await Promise.resolve();
    await Promise.resolve();
    expect(close).not.toHaveBeenCalled();

    await vi.runAllTimersAsync();
    await done;
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('다시 읽기가 실패해도 닫는다', async () => {
    const close = vi.fn();
    const done = closeAfterRefresh({
      refresh: () => Promise.reject(new Error('401')),
      close,
    });

    await vi.runAllTimersAsync();
    await done;
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('응답이 오지 않으면 정해 둔 시간이 지난 뒤 닫는다', async () => {
    const close = vi.fn();
    const done = closeAfterRefresh({ refresh: () => new Promise(() => {}), close });

    await vi.advanceTimersByTimeAsync(REFRESH_BEFORE_CLOSE_TIMEOUT_MS - 1);
    expect(close).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    await vi.runAllTimersAsync();
    await done;
    expect(close).toHaveBeenCalledTimes(1);
  });
});
