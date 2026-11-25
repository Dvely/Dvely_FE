import { describe, expect, it } from 'vitest';
import {
  chosenPeers,
  circled,
  markBounds,
  markLabel,
  parseBridgeMessage,
  scopeLabel,
  toPinPayload,
  type PreviewPinMark,
} from '@/lib/previewPin';

/*
  #211. 프리뷰 문서의 브리지가 보낸 것은 데이터다 — 프리뷰 안의 앱도 같은 창에서 메시지를 보낼 수 있다.
  모르는 모양은 버리고, 칩 이름은 서버(PinResultSanitizer)와 같은 말로 만든다.
*/

const button = {
  probeId: 'p1',
  ok: true,
  element: { type: 'button', text: '저장', selector: '#profile > button.save', bounds: { x: 0.28, y: 0.2, w: 0.07, h: 0.06 } },
  scopes: [
    { kind: 'element', type: 'button', text: '저장', bounds: { x: 0.28, y: 0.2, w: 0.07, h: 0.06 } },
    { kind: 'group', type: 'form', id: 'profile', bounds: { x: 0.03, y: 0.17, w: 0.92, h: 0.12 } },
    { kind: 'screen', type: 'screen', bounds: { x: 0, y: 0, w: 1, h: 1 } },
  ],
  defaultScope: 0,
};

const mark = (overrides: Partial<PreviewPinMark> = {}): PreviewPinMark => ({
  ref: 'p1',
  result: button,
  scope: 0,
  waiting: false,
  stale: false,
  ...overrides,
});

describe('브리지 메시지', () => {
  it('우리 프로토콜과 판만 받는다', () => {
    expect(parseBridgeMessage({ qeploy: 'pin', v: 1, type: 'ready', caps: ['point', 3] })).toEqual({
      type: 'ready',
      caps: ['point'],
    });
    expect(parseBridgeMessage({ qeploy: 'pin', v: 2, type: 'ready' })).toBeNull();
    expect(parseBridgeMessage({ qeploy: 'other', v: 1, type: 'ready' })).toBeNull();
    expect(parseBridgeMessage('ready')).toBeNull();
  });

  it('답의 id 와 결과의 probeId 가 다르면 버린다', () => {
    expect(parseBridgeMessage({ qeploy: 'pin', v: 1, type: 'result', id: 'p1', result: button })).not.toBeNull();
    expect(parseBridgeMessage({ qeploy: 'pin', v: 1, type: 'result', id: 'p2', result: button })).toBeNull();
  });

  it('테두리는 0~1 안의 것만 받는다', () => {
    expect(parseBridgeMessage({ qeploy: 'pin', v: 1, type: 'hit', x: 0.5, y: 0.5, bounds: { x: 2, y: 0, w: 1, h: 1 } })).toEqual({
      type: 'hit',
      x: 0.5,
      y: 0.5,
    });
  });
});

describe('칩 이름', () => {
  it('고른 칸의 이름이고, 요소 칸이면 요소 이름이다', () => {
    expect(markLabel(mark())).toBe('<button> "저장"');
    expect(markLabel(mark({ scope: 1 }))).toBe('폼 #profile');
    expect(markLabel(mark({ scope: 2 }))).toBe('화면 전체');
    expect(markLabel(mark({ waiting: true, result: null }))).toBe('찾는 중…');
  });

  it('영역은 안의 요소 수로, 비었으면 빈 자리로', () => {
    expect(scopeLabel({ kind: 'region', members: 3 })).toBe('영역 · 요소 3개');
    expect(scopeLabel({ kind: 'region', members: 0 })).toBe('빈 자리');
    expect(scopeLabel({ kind: 'component', type: 'div', component: 'PlanCard' })).toBe('컴포넌트 PlanCard');
  });

  it('번호는 ①~⑤', () => {
    expect([1, 2, 5].map(circled)).toEqual(['①', '②', '⑤']);
  });

  it('테두리는 고른 칸의 것이다', () => {
    expect(markBounds(mark({ scope: 1 }))).toEqual({ x: 0.03, y: 0.17, w: 0.92, h: 0.12 });
  });
});

describe('보낼 모양', () => {
  it('받은 결과 그대로와 고른 칸을 보낸다. 답을 못 받은 곳은 보내지 않는다', () => {
    expect(toPinPayload([mark({ scope: 1 }), mark({ ref: 'p2', result: null, waiting: true })])).toEqual([
      { result: button, scope: 1 },
    ]);
  });
});

describe('같은 것 모두 · 고칠 글 (§15.3 · §15.7)', () => {
  const cards = {
    probeId: 'p3',
    ok: true,
    element: { type: 'button', text: '고르기', bounds: { x: 0.3, y: 0.4, w: 0.05, h: 0.04 } },
    scopes: [
      { kind: 'text', type: 'text', text: '고르기', bounds: { x: 0.31, y: 0.41, w: 0.03, h: 0.02 } },
      { kind: 'element', type: 'button', text: '고르기', bounds: { x: 0.3, y: 0.4, w: 0.05, h: 0.04 } },
      {
        kind: 'group',
        type: 'li',
        selector: 'li.plan-card',
        bounds: { x: 0.25, y: 0.2, w: 0.2, h: 0.3 },
        peers: { count: 3, bounds: [{ x: 0.02, y: 0.2, w: 0.2, h: 0.3 }, { x: 0.5, y: 0.2, w: 2, h: 0.3 }] },
      },
      { kind: 'screen', type: 'screen', bounds: { x: 0, y: 0, w: 1, h: 1 } },
    ],
    defaultScope: 1,
  };

  it('문장 칸은 글자로 부른다', () => {
    expect(scopeLabel({ kind: 'text', text: '팀원을 3명까지 초대할 수 있습니다.' })).toBe('글자 "팀원을 3명까지 초대할 수 있습니다."');
    expect(markLabel(mark({ result: cards, scope: 0 }))).toBe('글자 "고르기"');
  });

  it('같은 것 모두를 켜면 이름 앞에 수를 달고, 고른 칸에 같은 것이 없으면 켜도 붙지 않는다', () => {
    expect(markLabel(mark({ result: cards, scope: 2, peers: true }))).toBe('같은 것 3개 모두 · 항목');
    expect(markLabel(mark({ result: cards, scope: 2, peers: false }))).toBe('항목');
    expect(markLabel(mark({ result: cards, scope: 1, peers: true }))).toBe('<button> "고르기"');
    expect(chosenPeers(mark({ result: cards, scope: 2 }))?.bounds).toHaveLength(1);
  });

  it('보낼 때 같은 것 모두는 고른 칸에 같은 것이 있을 때만 싣는다', () => {
    expect(toPinPayload([mark({ result: cards, scope: 2, peers: true })])[0]).toEqual({ result: cards, scope: 2, peers: true });
    expect(toPinPayload([mark({ result: cards, scope: 1, peers: true })])[0]).toEqual({ result: cards, scope: 1 });
  });
});
