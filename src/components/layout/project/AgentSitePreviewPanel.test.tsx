// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
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
