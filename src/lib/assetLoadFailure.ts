import { useSyncExternalStore } from 'react';

/**
 * 나눠 받는 조각을 못 받았다는 신호.
 *
 * Vite 가 동적 import 와 CSS 프리로드 실패마다 `vite:preloadError` 를 window 에 쏜다
 * (`handlePreloadError`). 브라우저마다 다른 오류 문구를 정규식으로 맞추는 것보다 이쪽이
 * 정확하다 — 문구가 바뀌어도, CSS 프리로드가 실패해도(`Unable to preload CSS for ...`)
 * 같은 이벤트로 온다.
 *
 * **무엇 때문인지는 우리가 모른다.** 배포로 옛 해시 파일이 지워졌을 수도 있고, 그냥
 * 네트워크가 잠깐 끊겼을 수도 있다. 브라우저가 내는 문구는 둘을 구분하지 않는다
 * (Chrome 은 404 든 연결 실패든 "Failed to fetch dynamically imported module" 이다).
 * 그래서 이 신호는 "조각을 못 받았다" 까지만 말하고, 화면도 딱 그만큼만 말해야 한다.
 *
 * 앱 전체가 하나를 본다. 조각은 어느 화면에서든 실패할 수 있고, 화면을 옮겼다고 해서
 * 못 받은 사실이 없어지지 않는다.
 */

let hasFailed = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

/** 앱 시작 때 한 번 건다. 이벤트는 window 로 오므로 어느 화면이 떠 있든 잡힌다 */
function listenForAssetLoadFailure() {
  window.addEventListener('vite:preloadError', () => {
    /*
      기본 동작을 막지 않는다. Vite 는 preventDefault 가 없으면 오류를 다시 던지는데,
      그래야 `lazy` 가 거절되고 경계가 대신 그릴 것을 띄운다. 여기서 삼키면 화면은
      영원히 기다린다.
    */
    if (hasFailed) return;
    hasFailed = true;
    emit();
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return hasFailed;
}

/** 다시 받아보기로 했으면 지운다 — 새로고침 대신 재시도를 주는 자리에서 쓴다 */
function clearAssetLoadFailure() {
  if (!hasFailed) return;
  hasFailed = false;
  emit();
}

/** 조각을 못 받은 적이 있는지 */
function useAssetLoadFailed() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export { listenForAssetLoadFailure, useAssetLoadFailed, clearAssetLoadFailure };
