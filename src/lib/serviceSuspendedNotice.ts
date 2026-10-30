import { useSyncExternalStore } from 'react';

/**
 * 일시 중단 안내 창을 열었는지.
 *
 * 여는 곳이 둘이다 — 로그인 버튼(`useGitHubLogin`)과 워크스페이스 진입(`requireAuth`).
 * 뒤쪽은 라우트의 `beforeLoad` 라서 **화면이 그려지기 전에** 돈다. 주소로 `/home` 을 바로
 * 열면 안내 창이 마운트되기도 전에 열라는 신호가 온다. window 이벤트로 보내면 그 신호는
 * 받을 사람이 없어 사라지므로, 값으로 들고 있다가 나중에 붙은 쪽도 읽게 한다.
 */

let isOpen = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return isOpen;
}

function openServiceSuspendedNotice() {
  if (isOpen) return;
  isOpen = true;
  emit();
}

function closeServiceSuspendedNotice() {
  if (!isOpen) return;
  isOpen = false;
  emit();
}

function useServiceSuspendedNoticeOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export { openServiceSuspendedNotice, closeServiceSuspendedNotice, useServiceSuspendedNoticeOpen };
