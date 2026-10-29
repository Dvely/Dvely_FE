/**
 * 시연의 GitHub 팝업.
 *
 * 실제 로그인은 GitHub 화면 두 개를 팝업으로 거친다 — 계정 접근 승인(OAuth)과 GitHub App
 * 설치다. 시연은 github.com 에 나가지 않으므로 그 두 화면을 시연 빌드 안에서 단순하게
 * 재현해 띄운다(DemoGitHubWindow). 재현이라는 사실은 자막에 붙인다.
 *
 * 팝업 안에서 승인하면 실제처럼 우리 콜백 주소(`/auth/callback`·`/auth/app-callback`)를
 * 잠깐 거쳐 닫히고, 그때 여기서 기다리던 쪽이 이어서 처리한다.
 *
 * **비밀번호·OTP 칸은 만들지 않는다.** 이미 GitHub 에 로그인된 사람이 승인 버튼만 누르는
 * 장면이다.
 */

export type DemoGitHubWindowKind = 'oauth' | 'install';

export type DemoGitHubWindowState = {
  kind: DemoGitHubWindowKind;
  /** github: GitHub 화면 · callback: 승인 뒤 우리 콜백 주소를 거치는 중 */
  phase: 'github' | 'callback';
};

type Listener = (state: DemoGitHubWindowState | null) => void;

/** 콜백 주소에 머무는 시간. 주소가 바뀐 것이 읽힐 만큼만 둔다 */
const CALLBACK_MS = 650;

let current: DemoGitHubWindowState | null = null;
let settle: ((approved: boolean) => void) | null = null;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener(current);
}

export function subscribeDemoGitHubWindow(listener: Listener) {
  listeners.add(listener);
  listener(current);
  return () => {
    listeners.delete(listener);
  };
}

/** 팝업을 띄우고 닫힐 때까지 기다린다. 승인했으면 true, 취소했으면 false */
export function runDemoGitHubWindow(kind: DemoGitHubWindowKind): Promise<boolean> {
  settle?.(false);
  current = { kind, phase: 'github' };
  emit();
  return new Promise((resolve) => {
    settle = resolve;
  });
}

function close(approved: boolean) {
  const resolve = settle;
  settle = null;
  current = null;
  emit();
  resolve?.(approved);
}

/** 승인·설치를 눌렀다. 콜백 주소를 잠깐 보여 주고 닫는다 */
export function approveDemoGitHubWindow() {
  if (!current || current.phase !== 'github') return;
  current = { ...current, phase: 'callback' };
  emit();
  window.setTimeout(() => close(true), CALLBACK_MS);
}

export function cancelDemoGitHubWindow() {
  if (!current) return;
  close(false);
}
