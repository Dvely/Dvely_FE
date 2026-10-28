// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isChunkLoadError, reloadOnceForChunkFailure } from '@/lib/chunkReload';

/*
  배포로 사라진 청크를 만났을 때 한 번만 새로고침한다. 무한 루프를 막는 것이 핵심이라,
  "새로고침했는가" 보다 **"두 번째에도 새로고침하는가"** 를 더 꼼꼼히 본다.
*/

const RELOAD_AT_KEY = 'qeploy.chunk-reload-at';

let reload: ReturnType<typeof vi.fn>;

beforeEach(() => {
  sessionStorage.clear();
  reload = vi.fn();
  // happy-dom 의 location.reload 는 실제로 뭔가 하려 들므로 갈아끼운다
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...window.location, reload },
  });
});

afterEach(() => {
  vi.useRealTimers();
  sessionStorage.clear();
});

describe('isChunkLoadError', () => {
  it.each([
    ['Chrome', 'Failed to fetch dynamically imported module: https://qeploy.com/assets/a.js'],
    ['Safari', 'Importing a module script failed.'],
    ['Firefox', 'error loading dynamically imported module'],
    ['Vite CSS preload', 'Unable to preload CSS for /assets/a.css'],
  ])('%s 의 문구를 알아본다', (_browser, message) => {
    expect(isChunkLoadError(new Error(message))).toBe(true);
  });

  it('대소문자가 달라도 알아본다', () => {
    expect(isChunkLoadError(new Error('FAILED TO FETCH DYNAMICALLY IMPORTED MODULE'))).toBe(true);
  });

  it.each([
    ['평범한 버그', new Error('Cannot read properties of undefined')],
    ['네트워크 오류', new Error('Network Error')],
    ['Error 가 아닌 값', 'something'],
    ['null', null],
    ['undefined', undefined],
  ])('%s 는 조각 오류가 아니다', (_label, error) => {
    expect(isChunkLoadError(error)).toBe(false);
  });
});

describe('reloadOnceForChunkFailure', () => {
  const chunkError = () => new Error('Failed to fetch dynamically imported module: /assets/a.js');

  it('조각 오류가 아니면 아무것도 하지 않는다', () => {
    expect(reloadOnceForChunkFailure(new Error('그냥 버그'))).toBe(false);
    expect(reload).not.toHaveBeenCalled();
    expect(sessionStorage.getItem(RELOAD_AT_KEY)).toBeNull();
  });

  it('처음 만나면 새로고침한다', () => {
    expect(reloadOnceForChunkFailure(chunkError())).toBe(true);
    expect(reload).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem(RELOAD_AT_KEY)).not.toBeNull();
  });

  it('곧바로 또 실패하면 새로고침하지 않는다 — 무한 루프 방지', () => {
    reloadOnceForChunkFailure(chunkError());
    reload.mockClear();

    expect(reloadOnceForChunkFailure(chunkError())).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });

  it('쿨다운이 지난 뒤에는 다시 시도한다 — 다음 배포 때 또 막히면 안 된다', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-28T10:00:00Z'));
    reloadOnceForChunkFailure(chunkError());
    reload.mockClear();

    vi.setSystemTime(new Date('2026-10-28T10:00:11Z')); // 11초 뒤
    expect(reloadOnceForChunkFailure(chunkError())).toBe(true);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it('쿨다운이 아직 안 지났으면 참는다 (9초)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-28T10:00:00Z'));
    reloadOnceForChunkFailure(chunkError());
    reload.mockClear();

    vi.setSystemTime(new Date('2026-10-28T10:00:09Z'));
    expect(reloadOnceForChunkFailure(chunkError())).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });

  it('저장소를 못 읽으면 새로고침하지 않는다 — 막을 길 없이 도는 것보다 낫다', () => {
    // 프로토타입이 아니라 인스턴스에 건다 — happy-dom 에서는 프로토타입 스파이가 안 먹었다
    vi.spyOn(sessionStorage, 'getItem').mockImplementation(() => {
      throw new Error('사생활 보호 모드');
    });

    expect(reloadOnceForChunkFailure(chunkError())).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });
});
