import { describe, expect, it } from 'vitest';
import { resolveProjectTemplateState } from '@/lib/projectTemplate';
import { getProjectListResSchema } from '@/types/projects.type';

/*
  운영에서 실제로 벌어진 일을 그대로 재현한다.

  서버 목록 응답(`ProjectSummaryResponse`)에는 `templateType`·`startMode` 가 **없다.**
  스키마가 `.prefault(null)` 이던 동안에는 zod 가 조용히 null 을 채웠고, 화면은 그것을
  "템플릿 없음" 으로 읽어 **템플릿으로 만든 프로젝트에도 "템플릿 미설정" 이라고 적었다.**

  그래서 이 테스트의 핵심은 "있다/없다" 가 아니라 **"모른다를 없다로 바꾸지 않는가"** 다.
*/

/** 지금 운영 목록 응답의 실제 모양 — 두 필드가 아예 없다 */
const SERVER_ITEM_WITHOUT_TEMPLATE_FIELDS = {
  projectId: 17,
  name: '카페 소개 페이지',
  deployStatus: 'DRAFT',
  currentUrl: null,
  updatedAt: '2026-10-29T11:00:00+09:00',
  updatedAtRelativeText: '방금 전',
};

describe('resolveProjectTemplateState', () => {
  it('서버가 두 필드를 주지 않으면 모른다고 한다', () => {
    expect(resolveProjectTemplateState({})).toBe('unknown');
  });

  it('서버가 없다고 말하면 없다고 한다', () => {
    expect(resolveProjectTemplateState({ templateType: null, startMode: null })).toBe('none');
  });

  it('템플릿 값이 있으면 있다고 한다', () => {
    expect(resolveProjectTemplateState({ templateType: 'craft-roast', startMode: 'template' })).toBe(
      'has',
    );
  });

  it('startMode 만으로도 알아본다', () => {
    expect(resolveProjectTemplateState({ templateType: null, startMode: 'template' })).toBe('has');
  });

  /** 서버가 한쪽만 채워 보내기 시작해도 화면이 멈추지 않아야 한다 */
  it('한쪽만 와도 그것으로 가른다', () => {
    expect(resolveProjectTemplateState({ templateType: 'craft-roast' })).toBe('has');
    expect(resolveProjectTemplateState({ startMode: 'blank' })).toBe('none');
  });

  it('빈 문자열은 값으로 치지 않는다', () => {
    expect(resolveProjectTemplateState({ templateType: '  ', startMode: null })).toBe('none');
  });
});

describe('목록 스키마가 없는 필드를 null 로 바꾸지 않는다', () => {
  /*
    이것이 이 PR 의 본론이다. `.prefault(null)` 이면 아래 두 값이 `null` 로 나오고,
    화면은 그것을 "없다" 로 읽어 틀린 배지를 단다.
  */
  it('응답에 없는 필드는 undefined 로 남는다', () => {
    const [item] = getProjectListResSchema.parse([SERVER_ITEM_WITHOUT_TEMPLATE_FIELDS]);

    expect(item.templateType).toBeUndefined();
    expect(item.startMode).toBeUndefined();
    expect(resolveProjectTemplateState(item)).toBe('unknown');
  });

  it('서버가 실제로 null 을 주면 null 로 남는다', () => {
    const [item] = getProjectListResSchema.parse([
      { ...SERVER_ITEM_WITHOUT_TEMPLATE_FIELDS, templateType: null, startMode: null },
    ]);

    expect(item.templateType).toBeNull();
    expect(resolveProjectTemplateState(item)).toBe('none');
  });

  /** BE 가 필드를 실어주기 시작하면 화면이 저절로 맞아야 한다 — 그때도 손댈 것이 없어야 한다 */
  it('BE 가 필드를 보내기 시작하면 그대로 알아본다', () => {
    const [item] = getProjectListResSchema.parse([
      { ...SERVER_ITEM_WITHOUT_TEMPLATE_FIELDS, templateType: 'craft-roast', startMode: 'template' },
    ]);

    expect(resolveProjectTemplateState(item)).toBe('has');
  });
});
