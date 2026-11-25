// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import AgentSitePreviewPanel from '@/components/layout/project/AgentSitePreviewPanel';

/*
  #184. 프리뷰를 닫는 화면이 없어서, 동시 프리뷰 상한에 걸리면 빠져나올 길이 없었다.

  닫기는 되돌릴 수 없다 — 컨테이너가 꺼지고 지금 주소는 더 이상 열리지 않는다. 그래서
  **바로 닫지 않고 무엇을 잃는지 먼저 말한다.** 닫으면 안 되는 때는 잠그고 이유를 말한다.
*/

afterEach(() => cleanup());

function renderReady(overrides: Record<string, unknown> = {}) {
  const onClosePreview = vi.fn();
  render(
    <AgentSitePreviewPanel
      phase="ready"
      // happy-dom 은 iframe 주소를 실제로 받아 오려 한다. 바깥으로 나가지 않는 주소를 쓴다
      previewUrl="about:blank"
      frameKey={0}
      isLoading={false}
      isProvisioning={false}
      didReattach={false}
      failureReason=""
      onLoadPreview={vi.fn()}
      onForceRebuild={vi.fn()}
      closeState={{ kind: 'allowed', warning: null }}
      isClosingPreview={false}
      closeError=""
      onClosePreview={onClosePreview}
      {...overrides}
    />,
  );
  return { onClosePreview };
}

function buttonNamed(name: RegExp): HTMLButtonElement {
  const el = [...document.querySelectorAll('button')].find((b) =>
    name.test(b.textContent?.trim() ?? ''),
  );
  if (!el) throw new Error(`버튼을 찾지 못했습니다: ${name}`);
  return el as HTMLButtonElement;
}

const closeButton = () => buttonNamed(/^(프리뷰 닫기|닫는 중)/);

describe('프리뷰를 닫을 수 있다 (#184)', () => {
  it('누르면 바로 닫지 않고, 컨테이너가 꺼지고 주소가 더 이상 열리지 않는다고 먼저 알린다', () => {
    const { onClosePreview } = renderReady();

    fireEvent.click(closeButton());

    expect(onClosePreview).not.toHaveBeenCalled();
    expect(document.body.textContent).toMatch(/컨테이너가 꺼/);
    expect(document.body.textContent).toMatch(/더 이상 열리지 않습니다/);
  });

  it('확인하면 닫는다', () => {
    const { onClosePreview } = renderReady();

    fireEvent.click(closeButton());
    fireEvent.click(buttonNamed(/^닫기$/));

    expect(onClosePreview).toHaveBeenCalledTimes(1);
  });

  it('취소하면 닫지 않고 확인을 거둔다', () => {
    const { onClosePreview } = renderReady();

    fireEvent.click(closeButton());
    fireEvent.click(buttonNamed(/^취소$/));

    expect(onClosePreview).not.toHaveBeenCalled();
    expect(document.body.textContent).not.toMatch(/더 이상 열리지 않습니다/);
  });

  it('잃는 것이 더 있으면 확인 문구에 덧붙인다', () => {
    renderReady({
      closeState: { kind: 'allowed', warning: '재시도에 쓰일 작업물도 함께 사라집니다.' },
    });

    fireEvent.click(closeButton());

    expect(document.body.textContent).toContain('재시도에 쓰일 작업물도 함께 사라집니다.');
  });

  it('닫으면 안 될 때는 누를 수 없고 그 이유가 보인다', () => {
    renderReady({
      closeState: { kind: 'blocked', reason: '먼저 승인하거나 거절해 주세요.' },
    });

    expect(closeButton().disabled).toBe(true);
    expect(document.body.textContent).toContain('먼저 승인하거나 거절해 주세요.');
  });

  it('닫는 중에는 다시 누를 수 없다', () => {
    renderReady({ isClosingPreview: true });

    expect(closeButton().disabled).toBe(true);
  });

  it('닫기가 실패하면 그 문장을 보여준다', () => {
    renderReady({ closeError: '프리뷰를 닫지 못했습니다.' });

    expect(document.body.textContent).toContain('프리뷰를 닫지 못했습니다.');
  });
});

/*
  BE #650 뒤로 서버가 "버리고 새로 빌드"도 막는다(409 PREVIEW_IN_USE). 그 버튼은 프리뷰가 떠 있을
  때만 나오는데, 떠 있는 동안에는 실패 화면이 그려지지 않아 거절이 화면 어디에도 나타나지 않았다.
*/
describe('버리고 새로 빌드 (#184, BE #650)', () => {
  const rebuildButton = () => buttonNamed(/^버리고 새로 빌드$/);

  it('닫기가 잠긴 동안에는 버리고 새로 빌드도 잠근다 — 버리는 것도 닫는 것이다', () => {
    renderReady({
      didReattach: true,
      closeState: { kind: 'blocked', reason: '먼저 승인하거나 거절해 주세요.' },
    });

    expect(rebuildButton().disabled).toBe(true);
  });

  it('닫을 수 있으면 누를 수 있다', () => {
    renderReady({ didReattach: true });

    expect(rebuildButton().disabled).toBe(false);
  });

  it('프리뷰가 떠 있는 채로 거절되면 그 이유를 프리뷰 위에 보여 준다', () => {
    renderReady({
      rebuildError: '작업이 쓰는 프리뷰라 닫을 수 없습니다.\n\n아무것도 닫지 않았습니다.',
    });

    const alert = document.querySelector('[role="alert"]');
    expect(alert?.textContent).toMatch(/아무것도 닫지 않았습니다/);
    // 프리뷰는 그대로 떠 있다
    expect(document.querySelector('iframe')).not.toBeNull();
  });
});

describe('상한에 걸렸을 때 (#184)', () => {
  function renderFailure(overrides: Record<string, unknown> = {}) {
    render(
      <AgentSitePreviewPanel
        phase="unavailable"
        previewUrl=""
        frameKey={0}
        isLoading={false}
        isProvisioning={false}
        didReattach={false}
        failureReason="동시에 띄울 수 있는 프리뷰는 3개입니다."
        onLoadPreview={vi.fn()}
        onForceRebuild={vi.fn()}
        closeState={{ kind: 'allowed', warning: null }}
        isClosingPreview={false}
        closeError=""
        onClosePreview={vi.fn()}
        {...overrides}
      />,
    );
  }

  it('실패 화면에 다음 행동(떠 있는 프리뷰 보기)을 단다', () => {
    const onClick = vi.fn();
    renderFailure({ failureAction: { label: '떠 있는 프리뷰 보기', onClick } });

    fireEvent.click(buttonNamed(/^떠 있는 프리뷰 보기$/));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(buttonNamed(/^미리보기 불러오기$/)).toBeTruthy();
  });

  it('다음 행동이 없으면 버튼을 그리지 않는다', () => {
    renderFailure();

    expect(document.body.textContent).not.toMatch(/떠 있는 프리뷰 보기/);
  });
});

describe('프리뷰에서 짚기 (#211)', () => {
  /*
    happy-dom 의 about:blank iframe 은 창(contentWindow)이 없다. 브리지 쪽 창을 가짜로 끼워 넣고, 문서가 뜬 것(load)으로
    다시 인사하게 한다.
  */
  function renderWithPin(active = false) {
    const onActiveChange = vi.fn();
    const setMarks = vi.fn();
    renderReady({ pin: { marks: [], setMarks, active, onActiveChange } });
    const frame = document.querySelector('iframe') as HTMLIFrameElement;
    const bridgeWindow = { postMessage: vi.fn() } as unknown as Window;
    Object.defineProperty(frame, 'contentWindow', { configurable: true, get: () => bridgeWindow });
    fireEvent.load(frame);
    return { onActiveChange, setMarks, frame, bridgeWindow };
  }

  const pinButton = () => buttonNamed(/^짚기/);

  function sendFrom(source: Window | null, data: unknown) {
    act(() => {
      window.dispatchEvent(new MessageEvent('message', { data, source }));
    });
  }

  it('브리지가 답하기 전에는 짚기를 켤 수 없다', () => {
    renderWithPin();

    expect(pinButton().disabled).toBe(true);
  });

  it('그 iframe 의 창이 ready 를 보내면 켤 수 있고, 다른 창이 보낸 ready 는 듣지 않는다', () => {
    const { bridgeWindow, onActiveChange } = renderWithPin();
    // 문서가 뜨면 인사한다. 불투명 오리진이라 받는 쪽 이름은 '*' 다
    expect(bridgeWindow.postMessage).toHaveBeenCalledWith({ qeploy: 'pin', v: 1, type: 'hello' }, '*');

    sendFrom(window, { qeploy: 'pin', v: 1, type: 'ready', caps: [] });
    expect(pinButton().disabled).toBe(true);

    sendFrom(bridgeWindow, { qeploy: 'pin', v: 1, type: 'ready', caps: ['point'] });
    expect(pinButton().disabled).toBe(false);

    fireEvent.click(pinButton());
    expect(onActiveChange).toHaveBeenCalledWith(true);
  });

  it('짚기 모드면 iframe 위에 덮개를 깐다', () => {
    const { bridgeWindow } = renderWithPin(true);
    expect(document.querySelector('[data-testid="preview-pin-overlay"]')).toBeNull();

    sendFrom(bridgeWindow, { qeploy: 'pin', v: 1, type: 'ready', caps: ['point'] });

    expect(document.querySelector('[data-testid="preview-pin-overlay"]')).not.toBeNull();
    expect(document.body.textContent).toMatch(/고칠 곳을 누르세요/);
  });

  it('1.5초 안에 답이 없으면 짚을 수 없다고 말한다', () => {
    vi.useFakeTimers();
    try {
      renderWithPin();
      act(() => {
        vi.advanceTimersByTime(1600);
      });
      expect(pinButton().title).toMatch(/짚을 수 없습니다/);
    } finally {
      vi.useRealTimers();
    }
  });
});
