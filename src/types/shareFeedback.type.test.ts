import { describe, expect, it } from 'vitest';
import {
  FIXED_NOTE_MAX,
  agentCanRead,
  authorLabel,
  countFeedback,
  feedbackActions,
  feedbackStatusLabel,
  getShareFeedbackDetailResSchema,
  getShareFeedbackListResSchema,
  markNumber,
  noteLabel,
  postShareFeedbackFixedReqSchema,
} from '@/types/shareFeedback.type';

/*
  짚기 피드백(#210, BE #681). 서버 응답을 그대로 읽고, 상태마다 누를 수 있는 버튼이 서버의 바뀌는
  길(§14.2)과 같은지 본다 — 다르면 버튼이 409 를 부른다.
*/
describe('짚기 피드백 응답', () => {
  it('목록 한 줄을 읽고, 모르는 상태·빠진 값에도 깨지지 않는다', () => {
    const [item, odd] = getShareFeedbackListResSchema.parse([
      {
        feedbackId: 21,
        shareId: 7,
        kind: 'WEB',
        status: 'NEW',
        authorRole: 'GUEST',
        authorName: '민지',
        screenLabel: '/settings',
        label: '<button> "저장"',
        component: 'SaveButton',
        body: '더 크게',
        createdAt: '2026-11-17T07:19:34.888894',
        updatedAt: '2026-11-17T07:19:34.888894',
      },
      { feedbackId: 22, status: 'SOMETHING_NEW', body: '글', label: null, component: null },
    ]);
    expect(item.label).toBe('<button> "저장"');
    expect(odd.status).toBe('SOMETHING_NEW');
    expect(odd.authorName).toBeNull();
    expect(feedbackStatusLabel(odd.status)).toBe('SOMETHING_NEW');
  });

  it('상세의 요소 기술에서 컴포넌트·소스 후보만 읽고 나머지는 버린다', () => {
    const detail = getShareFeedbackDetailResSchema.parse({
      feedback: { feedbackId: 21, status: 'ACCEPTED', body: '더 크게' },
      element: {
        ok: true,
        screen: { label: '/settings' },
        point: { x: 0.5, y: 0.5 },
        element: { type: 'button', text: '저장', selector: 'form > button.save' },
        components: [
          { name: 'SaveButton', file: 'src/components/SaveButton.tsx', line: 12 },
          { name: 'ProfileForm' },
        ],
        sourceHints: [{ file: 'src/components/SaveButton.tsx', line: 12, reason: 'COMPONENT' }],
      },
      notes: [
        { noteId: 1, authorRole: 'AGENT', kind: 'FIXED', body: '패딩을 늘렸습니다', createdAt: '' },
      ],
      hasCrop: true,
      hasScreen: false,
    });
    expect(detail.element?.components?.[0]).toEqual({
      name: 'SaveButton',
      file: 'src/components/SaveButton.tsx',
      line: 12,
    });
    expect(detail.element?.sourceHints?.[0].reason).toBe('COMPONENT');
    expect(detail.element && 'point' in detail.element).toBe(false);
    expect(noteLabel(detail.notes[0])).toBe('고침(에이전트)');
  });

  it('요소를 못 찾은 피드백은 요소 기술이 비어도 읽는다', () => {
    const detail = getShareFeedbackDetailResSchema.parse({
      feedback: { feedbackId: 3 },
      element: null,
    });
    expect(detail.element).toBeNull();
    expect(detail.notes).toEqual([]);
    // 여러 곳(#694 PR-5)을 모르는 옛 서버의 응답도 한 곳짜리로 읽는다
    expect(detail.marks).toEqual([]);
    expect(detail.hasAnnotated).toBe(false);
  });

  it('여러 곳 ①② 의 짚은 곳 목록과 번호 그린 화면 여부를 읽는다', () => {
    const detail = getShareFeedbackDetailResSchema.parse({
      feedback: { feedbackId: 30, label: '① <button> "저장" 외 1곳' },
      element: null,
      hasCrop: true,
      hasScreen: true,
      hasAnnotated: true,
      marks: [
        { n: 1, label: '<button> "저장"', hasCrop: true },
        { n: 2, label: '컴포넌트 ProfileForm', hasCrop: false, extra: 'x' },
      ],
    });
    expect(detail.hasAnnotated).toBe(true);
    expect(detail.marks).toEqual([
      { n: 1, label: '<button> "저장"', hasCrop: true },
      { n: 2, label: '컴포넌트 ProfileForm', hasCrop: false },
    ]);
  });

  it('곳 번호는 프롬프트와 같은 글자(①~⑳)로 쓴다', () => {
    expect(markNumber(1)).toBe('①');
    expect(markNumber(5)).toBe('⑤');
    expect(markNumber(20)).toBe('⑳');
    expect(markNumber(21)).toBe('21');
  });
});

describe('상태마다 할 수 있는 것', () => {
  it('서버의 바뀌는 길과 같다', () => {
    expect(feedbackActions('NEW')).toEqual(['accept', 'dismiss']);
    expect(feedbackActions('ACCEPTED')).toEqual(['fixed', 'dismiss']);
    expect(feedbackActions('DISMISSED')).toEqual(['accept']);
    expect(feedbackActions('FIXED')).toEqual(['confirm', 'accept']);
    expect(feedbackActions('CONFIRMED')).toEqual([]);
    expect(feedbackActions('UNKNOWN')).toEqual([]);
  });

  it('에이전트는 받은 뒤의 것만 읽는다', () => {
    expect(['NEW', 'DISMISSED'].map(agentCanRead)).toEqual([false, false]);
    expect(['ACCEPTED', 'FIXED', 'CONFIRMED'].map(agentCanRead)).toEqual([true, true, true]);
  });

  it('상태별로 세고, 링크마다 받기 전을 센다', () => {
    const { byStatus, newByShare } = countFeedback(
      getShareFeedbackListResSchema.parse([
        { feedbackId: 1, shareId: 7, status: 'NEW' },
        { feedbackId: 2, shareId: 7, status: 'NEW' },
        { feedbackId: 3, shareId: 8, status: 'NEW' },
        { feedbackId: 4, shareId: 7, status: 'ACCEPTED' },
      ]),
    );
    expect(byStatus).toEqual({ NEW: 3, ACCEPTED: 1 });
    expect(newByShare).toEqual({ 7: 2, 8: 1 });
  });

  it('남긴 사람과 고침 메모 길이', () => {
    expect(authorLabel({ authorRole: 'OWNER', authorName: '주인' })).toBe('나');
    expect(authorLabel({ authorRole: 'GUEST', authorName: ' 민지 ' })).toBe('손님 민지');
    expect(authorLabel({ authorRole: 'GUEST', authorName: null })).toBe('손님');
    expect(
      postShareFeedbackFixedReqSchema.safeParse({ note: '가'.repeat(FIXED_NOTE_MAX) }).success,
    ).toBe(true);
    expect(
      postShareFeedbackFixedReqSchema.safeParse({ note: '가'.repeat(FIXED_NOTE_MAX + 1) }).success,
    ).toBe(false);
  });
});
