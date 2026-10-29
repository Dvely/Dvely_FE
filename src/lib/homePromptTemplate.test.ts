// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearHomePromptTemplate,
  readHomePromptTemplate,
  setHomePromptTemplate,
} from '@/lib/homePromptTemplate';

/*
  저장소 키 이름을 `dvely:` → `qeploy.` 로 바꿨다(#146). 이름만 바꾸면 **바꾸는 그 순간
  얹어 둔 템플릿이 사라진다** — 사용자가 템플릿을 고른 뒤 배포가 끼면 프로젝트를 만들 때
  그 템플릿이 없다. 그래서 읽을 때는 옛 키도 함께 본다.

  보정이 있는 동안 지우기는 **두 키를 다 지워야 한다.** 한쪽만 지우면 치웠는데도 옛 값이
  계속 읽혀 템플릿이 얹힌 채로 남는다 — 보정을 넣다가 새로 만들기 쉬운 버그라 묶어 둔다.
*/

const KEY = 'qeploy.home-prompt-template';
const LEGACY_KEY = 'dvely:home-prompt-template';

const template = {
  id: 'academy-home',
  title: '학원 홈',
  image: null,
  subtitle: '웹사이트 템플릿',
};

beforeEach(() => {
  sessionStorage.clear();
});

describe('readHomePromptTemplate', () => {
  it('새 키에 적은 값을 읽는다', () => {
    setHomePromptTemplate(template);
    expect(sessionStorage.getItem(KEY)).not.toBeNull();
    expect(readHomePromptTemplate()).toEqual(template);
  });

  /** 이름을 바꾸기 전에 얹어 둔 사람 — 보정이 없으면 여기서 템플릿을 잃는다 */
  it('옛 키에만 있어도 읽는다', () => {
    sessionStorage.setItem(LEGACY_KEY, JSON.stringify(template));
    expect(readHomePromptTemplate()).toEqual(template);
  });

  it('새 키가 있으면 그것을 쓴다', () => {
    sessionStorage.setItem(LEGACY_KEY, JSON.stringify({ ...template, title: '옛 것' }));
    setHomePromptTemplate(template);
    expect(readHomePromptTemplate()?.title).toBe('학원 홈');
  });

  it('아무것도 없으면 null', () => {
    expect(readHomePromptTemplate()).toBeNull();
  });
});

describe('clearHomePromptTemplate', () => {
  it('새 키를 지운다', () => {
    setHomePromptTemplate(template);
    clearHomePromptTemplate();
    expect(readHomePromptTemplate()).toBeNull();
  });

  /** 한쪽만 지우면 치웠는데도 옛 값이 되살아난다 */
  it('옛 키도 함께 지운다', () => {
    sessionStorage.setItem(LEGACY_KEY, JSON.stringify(template));
    clearHomePromptTemplate();
    expect(sessionStorage.getItem(LEGACY_KEY)).toBeNull();
    expect(readHomePromptTemplate()).toBeNull();
  });
});
