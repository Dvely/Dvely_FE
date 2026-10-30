// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DRAFT_STASH_KEY,
  DRAFT_TTL_MS,
  SETUP_DRAFT_TTL_MS,
  stashComposerDraft,
  stashComposerDraftFromDom,
  takeComposerDraft,
} from '@/lib/composerDraft';

/*
  배포로 조각이 사라져 새로고침되면 적던 말이 날아간다. 맡겼다가 **같은 자리로 돌아왔을
  때만** 한 번 돌려준다.

  "돌려준다" 보다 **"엉뚱한 곳에 돌려주지 않는다"** 를 더 꼼꼼히 본다. A 대화에서 적던
  말이 B 대화에 붙으면 사라지는 것보다 나쁘다 — 그대로 보내버릴 수 있다.
*/

const HERE = { projectId: 42, conversationId: 7 };

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('stash → take', () => {
  it('같은 자리로 돌아오면 돌려준다', () => {
    stashComposerDraft(HERE, '로그인 화면을 고쳐줘');
    expect(takeComposerDraft(HERE)).toBe('로그인 화면을 고쳐줘');
  });

  it('앞뒤 공백은 떼고 맡는다', () => {
    stashComposerDraft(HERE, '  고쳐줘  ');
    expect(takeComposerDraft(HERE)).toBe('고쳐줘');
  });

  it('빈 말은 아예 맡지 않는다', () => {
    stashComposerDraft(HERE, '   ');
    expect(sessionStorage.getItem(DRAFT_STASH_KEY)).toBeNull();
  });

  /** 한 번만 돌려준다 — 남겨두면 지워도 계속 돌아오는 것처럼 보인다 */
  it('두 번째에는 돌려주지 않는다', () => {
    stashComposerDraft(HERE, '고쳐줘');
    expect(takeComposerDraft(HERE)).toBe('고쳐줘');
    expect(takeComposerDraft(HERE)).toBe('');
  });

  it('맡긴 적이 없으면 빈 문자열', () => {
    expect(takeComposerDraft(HERE)).toBe('');
  });
});

describe('자리가 다르면 돌려주지 않는다', () => {
  it('다른 대화에는 붙이지 않는다', () => {
    stashComposerDraft(HERE, '고쳐줘');
    expect(takeComposerDraft({ projectId: 42, conversationId: 8 })).toBe('');
  });

  it('다른 프로젝트에는 붙이지 않는다', () => {
    stashComposerDraft(HERE, '고쳐줘');
    expect(takeComposerDraft({ projectId: 43, conversationId: 7 })).toBe('');
  });

  /** 두 프로젝트에서 각각 새 대화를 열면 둘 다 대화 id 가 없다 */
  it('프로젝트가 다른 새 대화끼리도 가른다', () => {
    stashComposerDraft({ projectId: 42, conversationId: null }, '고쳐줘');
    expect(takeComposerDraft({ projectId: 43, conversationId: null })).toBe('');
  });

  it('같은 새 대화면 돌려준다', () => {
    stashComposerDraft({ projectId: 42, conversationId: null }, '고쳐줘');
    expect(takeComposerDraft({ projectId: 42, conversationId: null })).toBe('고쳐줘');
  });

  /** 자리가 안 맞아 못 돌려준 값도 치운다. 남겨두면 나중에 엉뚱하게 걸린다 */
  it('자리가 안 맞아도 맡긴 값은 치운다', () => {
    stashComposerDraft(HERE, '고쳐줘');
    takeComposerDraft({ projectId: 42, conversationId: 8 });
    expect(sessionStorage.getItem(DRAFT_STASH_KEY)).toBeNull();
  });
});

describe('오래된 것은 버린다', () => {
  it('상한을 넘기면 돌려주지 않는다', () => {
    vi.useFakeTimers();
    stashComposerDraft(HERE, '고쳐줘');
    vi.advanceTimersByTime(DRAFT_TTL_MS + 1000);
    expect(takeComposerDraft(HERE)).toBe('');
  });

  it('상한 안이면 돌려준다', () => {
    vi.useFakeTimers();
    stashComposerDraft(HERE, '고쳐줘');
    vi.advanceTimersByTime(DRAFT_TTL_MS - 1000);
    expect(takeComposerDraft(HERE)).toBe('고쳐줘');
  });
});

/*
  키·연결을 넣으러 설정에 다녀오는 길은 새로고침보다 훨씬 길다. 그 길에서 맡긴 말은 오래
  두되, 저장소 값을 고쳐 상한을 끝없이 늘리지는 못하게 한다.
*/
describe('설정에 다녀오는 동안', () => {
  it('새로고침 상한을 넘겨도 설정 왕복 상한 안이면 돌려준다', () => {
    vi.useFakeTimers();
    stashComposerDraft(HERE, '고쳐줘', SETUP_DRAFT_TTL_MS);
    vi.advanceTimersByTime(DRAFT_TTL_MS + 60_000);
    expect(takeComposerDraft(HERE)).toBe('고쳐줘');
  });

  it('설정 왕복 상한을 넘기면 버린다', () => {
    vi.useFakeTimers();
    stashComposerDraft(HERE, '고쳐줘', SETUP_DRAFT_TTL_MS);
    vi.advanceTimersByTime(SETUP_DRAFT_TTL_MS + 1000);
    expect(takeComposerDraft(HERE)).toBe('');
  });

  it('저장소에 적힌 상한이 길어도 설정 왕복 상한까지만 따른다', () => {
    vi.useFakeTimers();
    sessionStorage.setItem(
      DRAFT_STASH_KEY,
      JSON.stringify({
        scope: '42:7',
        text: '고쳐줘',
        at: Date.now(),
        ttl: 10 * SETUP_DRAFT_TTL_MS,
      }),
    );
    vi.advanceTimersByTime(SETUP_DRAFT_TTL_MS + 1000);
    expect(takeComposerDraft(HERE)).toBe('');
  });

  /** 이 기능 전에 맡긴 값에는 상한이 적혀 있지 않다 — 예전 상한을 따른다 */
  it('상한이 적혀 있지 않으면 새로고침 상한을 따른다', () => {
    vi.useFakeTimers();
    sessionStorage.setItem(
      DRAFT_STASH_KEY,
      JSON.stringify({ scope: '42:7', text: '고쳐줘', at: Date.now() }),
    );
    vi.advanceTimersByTime(DRAFT_TTL_MS + 1000);
    expect(takeComposerDraft(HERE)).toBe('');
  });

  it('DOM 에서 맡길 때도 상한을 넘길 수 있다', () => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
    const el = document.createElement('textarea');
    el.setAttribute('data-composer-draft', '');
    el.setAttribute('data-project-id', '42');
    el.setAttribute('data-conversation-id', '7');
    el.value = '고쳐줘';
    document.body.appendChild(el);

    stashComposerDraftFromDom(SETUP_DRAFT_TTL_MS);
    vi.advanceTimersByTime(DRAFT_TTL_MS + 60_000);
    expect(takeComposerDraft(HERE)).toBe('고쳐줘');
  });
});

describe('옛 형식', () => {
  /*
    지금 운영에 나가 있는 코드는 **문자열 하나**만 맡긴다. 그 값에는 어느 자리의 것인지가
    없어서 돌려줄 곳을 고를 수 없다 — 엉뚱한 대화에 붙이느니 버린다.
  */
  it('자리를 알 수 없는 옛 값은 버린다', () => {
    sessionStorage.setItem(DRAFT_STASH_KEY, '옛 형식으로 맡긴 말');
    expect(takeComposerDraft(HERE)).toBe('');
    expect(sessionStorage.getItem(DRAFT_STASH_KEY)).toBeNull();
  });
});

/*
  맡기는 쪽은 라우트 바깥(전역 배너·자동 새로고침)이라 React 로 자리를 알 수 없고, DOM 에
  적힌 표시를 읽는다. 그 이음새를 본다 — 여기가 어긋나면 **맡기기 자체가 조용히 안 된다.**
*/
describe('stashComposerDraftFromDom', () => {
  function putComposer(attrs: Record<string, string>, value: string) {
    document.body.innerHTML = '';
    const el = document.createElement('textarea');
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    el.value = value;
    document.body.appendChild(el);
    return el;
  }

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('입력창의 말을 그 자리와 함께 맡긴다', () => {
    putComposer(
      { 'data-composer-draft': '', 'data-project-id': '42', 'data-conversation-id': '7' },
      '로그인 화면을 고쳐줘',
    );
    stashComposerDraftFromDom();
    expect(takeComposerDraft({ projectId: 42, conversationId: 7 })).toBe('로그인 화면을 고쳐줘');
  });

  it('대화 id 가 비어 있으면 새 대화로 맡긴다', () => {
    putComposer(
      { 'data-composer-draft': '', 'data-project-id': '42', 'data-conversation-id': '' },
      '만들어줘',
    );
    stashComposerDraftFromDom();
    expect(takeComposerDraft({ projectId: 42, conversationId: null })).toBe('만들어줘');
  });

  /*
    예전에는 `document.querySelector('textarea')` 로 페이지의 첫 textarea 를 집었다.
    입력창이 아닌 textarea 가 먼저 있으면 엉뚱한 값을 맡는다.
  */
  it('표시가 없는 textarea 는 집지 않는다', () => {
    putComposer({}, '이건 입력창이 아니다');
    stashComposerDraftFromDom();
    expect(sessionStorage.getItem(DRAFT_STASH_KEY)).toBeNull();
  });

  it('자리를 모르면 맡지 않는다', () => {
    putComposer({ 'data-composer-draft': '' }, '고쳐줘');
    stashComposerDraftFromDom();
    expect(sessionStorage.getItem(DRAFT_STASH_KEY)).toBeNull();
  });

  it('입력창이 없어도 터지지 않는다', () => {
    expect(() => stashComposerDraftFromDom()).not.toThrow();
  });
});
