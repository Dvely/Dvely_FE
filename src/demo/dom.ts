/**
 * 자동 재생이 화면을 실제로 조작하기 위한 도구.
 *
 * 상태를 몰래 바꾸지 않고 **사람이 누르는 것과 같은 경로**로 간다 — 컨트롤을 찾아
 * 값을 넣고 클릭한다. 그래야 react-query 무효화·낙관적 갱신·스켈레톤까지 평소대로
 * 돌고, 영상에 찍히는 것이 실제 동작과 어긋나지 않는다.
 *
 * 선택자는 컴포넌트에 심어 둔 `data-demo` 값이다. 클래스명이나 화면 문구로 찾으면
 * 디자인을 손볼 때마다 조용히 깨진다.
 *
 * 누르기 전에는 커서를 그 자리로 옮긴다. 원인 없이 버튼이 눌리면 편집한 화면으로
 * 읽히는데, 커서가 가서 누르면 인과가 눈에 보인다.
 */
import { moveCursorToElement, pressCursor } from '@/demo/cursor';

/** React 가 관리하는 입력에 값을 넣는다 */
function setNativeValue(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: string) {
  /*
    element.value = x 로는 React 가 모른다.

    React 는 DOM 노드의 value 프로퍼티를 자기 setter 로 덮어써 두고 변경을 추적한다.
    그래서 프로토타입의 원래 setter 를 꺼내 호출해야 React 의 추적 값과 실제 값이
    어긋나고, 그때 이벤트를 쏘면 onChange 가 제대로 불린다.
  */
  const prototype = Object.getPrototypeOf(element) as object;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
  if (descriptor?.set) {
    descriptor.set.call(element, value);
  } else {
    element.value = value;
  }
}

export function find<T extends HTMLElement>(name: string): T | null {
  return document.querySelector<T>(`[data-demo="${name}"]`);
}

export function findAll<T extends HTMLElement>(name: string): T[] {
  return Array.from(document.querySelectorAll<T>(`[data-demo="${name}"]`));
}

export function pause(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/** 조건이 참이 될 때까지 기다린다. 시간 안에 안 되면 던진다 */
export async function waitUntil(label: string, probe: () => boolean, timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (probe()) return;
    await pause(120);
  }
  throw new Error(`기다리다 지쳤습니다: ${label}`);
}

/** 컨트롤이 나타나고 눌러도 되는 상태가 될 때까지 기다린다 */
export async function waitFor<T extends HTMLElement>(name: string, timeoutMs = 30000): Promise<T> {
  await waitUntil(`${name} 등장`, () => {
    const element = find<T>(name);
    // 비활성 버튼을 눌러봐야 아무 일도 안 일어난다. 눌러도 되는 순간까지 기다린다
    return element != null && !(element as unknown as { disabled?: boolean }).disabled;
  }, timeoutMs);
  return find<T>(name)!;
}

/** 화면에 보이게 스크롤하고 잠깐 둔다 — 영상에서 무엇을 누르는지 보여야 한다 */
async function reveal(element: HTMLElement) {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  await pause(420);
}

export async function click(name: string, timeoutMs = 30000) {
  const element = await waitFor<HTMLElement>(name, timeoutMs);
  await reveal(element);
  await moveCursorToElement(element);
  await pressCursor();
  element.click();
  await pause(180);
}

/** 한 글자씩 넣는다. 사람이 치는 것처럼 보이는 유일한 구간이라 그대로 둔다 */
export async function type(name: string, text: string, perCharMs = 26) {
  const element = await waitFor<HTMLTextAreaElement | HTMLInputElement>(name);
  await reveal(element);
  await moveCursorToElement(element);
  await pressCursor();
  element.focus();

  for (let index = 1; index <= text.length; index += 1) {
    setNativeValue(element, text.slice(0, index));
    element.dispatchEvent(new Event('input', { bubbles: true }));
    await pause(perCharMs);
  }
  await pause(260);
}

/** 입력을 통째로 채운다. 보여줄 값이 아닌 것(액세스 키 등)에 쓴다 */
export async function fill(name: string, text: string) {
  const element = await waitFor<HTMLTextAreaElement | HTMLInputElement>(name);
  setNativeValue(element, text);
  element.dispatchEvent(new Event('input', { bubbles: true }));
  await pause(140);
}

export async function select(name: string, value: string) {
  const element = await waitFor<HTMLSelectElement>(name);
  await reveal(element);
  await moveCursorToElement(element);
  await pressCursor();
  setNativeValue(element, value);
  element.dispatchEvent(new Event('change', { bubbles: true }));
  await pause(320);
}

/** 화면에 이 문구가 떴는지 */
export function pageHasText(text: string) {
  return (document.body.innerText || '').includes(text);
}

/* -------------------------------------------------------------------------- */
/* 프리뷰 안쪽                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * 프리뷰 iframe 의 문서.
 *
 * 프리뷰는 같은 오리진이라 안쪽까지 조작할 수 있다. 만들어진 앱이 실제로 동작하는지는
 * 바깥에서 말로 설명할 수 없고, 저 안에서 가입 버튼을 눌러 봐야 보인다.
 */
export async function waitForPreviewDocument(timeoutMs = 30000): Promise<Document> {
  await waitUntil(
    '프리뷰 문서',
    () => {
      const frame = document.querySelector('iframe');
      return Boolean(frame?.contentDocument?.querySelector('#authForm'));
    },
    timeoutMs,
  );
  return document.querySelector('iframe')!.contentDocument!;
}

function setFrameValue(element: HTMLInputElement, value: string) {
  const prototype = Object.getPrototypeOf(element) as object;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
  if (descriptor?.set) descriptor.set.call(element, value);
  else element.value = value;
}

export async function previewType(doc: Document, selector: string, text: string, perCharMs = 22) {
  const element = doc.querySelector<HTMLInputElement>(selector);
  if (!element) throw new Error(`프리뷰에 ${selector} 가 없습니다`);
  await moveCursorToElement(element, document.querySelector('iframe'));
  await pressCursor();
  element.focus();
  for (let index = 1; index <= text.length; index += 1) {
    setFrameValue(element, text.slice(0, index));
    element.dispatchEvent(new Event('input', { bubbles: true }));
    await pause(perCharMs);
  }
  await pause(200);
}

export async function previewClick(doc: Document, selector: string) {
  const element = doc.querySelector<HTMLElement>(selector);
  if (!element) throw new Error(`프리뷰에 ${selector} 가 없습니다`);
  await moveCursorToElement(element, document.querySelector('iframe'));
  await pressCursor();
  element.click();
  await pause(240);
}

export function previewHasText(doc: Document, text: string) {
  return (doc.body?.innerText || '').includes(text);
}
