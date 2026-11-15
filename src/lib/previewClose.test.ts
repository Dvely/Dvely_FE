import { describe, expect, it } from 'vitest';
import { API_ERROR_GUIDE } from '@/lib/apiErrorGuide';
import { PREVIEW_CLOSE_LABEL, derivePreviewCloseState } from '@/lib/previewClose';
import { PREVIEW_LIMIT_EXCEEDED_CODE } from '@/lib/runLimit';

/*
  #184. 프리뷰를 닫아도 되는지는 **그 컨테이너 안에 무엇이 남아 있는가**로 가른다.

  작업이 띄운 프리뷰는 에이전트가 작업물을 쓰는 자리이기도 하다. 결과·저장소 연결 승인을
  기다리는 작업물은 아직 GitHub 에 올라가지 않아 **그 컨테이너 안에만** 있고, 닫으면 승인해도
  반영할 것이 없다(BE 의 결과 승인 반영이 이 세션의 컨테이너를 요구한다). 그래서 잠근다.
*/
describe('프리뷰를 닫아도 되는가 (#184)', () => {
  it('사용자가 직접 띄운 프로젝트 프리뷰는 닫을 수 있다', () => {
    expect(derivePreviewCloseState({ isAgentTaskActive: false, previewTaskId: null })).toEqual({
      kind: 'allowed',
      warning: null,
    });
  });

  it('에이전트 작업이 도는 동안에는 작업이 띄운 것이 아니어도 잠근다', () => {
    expect(derivePreviewCloseState({ isAgentTaskActive: true, previewTaskId: null }).kind).toBe(
      'blocked',
    );
  });

  it.each(['DONE', 'CANCELLED'])('끝난 작업(%s)의 프리뷰는 닫을 수 있다', (status) => {
    expect(
      derivePreviewCloseState({
        isAgentTaskActive: false,
        previewTaskId: 'task-1',
        previewTaskStatus: status,
      }),
    ).toEqual({ kind: 'allowed', warning: null });
  });

  it('승인을 기다리는 작업의 프리뷰는 잠그고, 먼저 결정하라고 말한다', () => {
    const state = derivePreviewCloseState({
      isAgentTaskActive: false,
      previewTaskId: 'task-1',
      previewTaskStatus: 'WAITING_RESULT_APPROVAL',
    });

    expect(state.kind).toBe('blocked');
    expect(state.kind === 'blocked' && state.reason).toMatch(/승인하거나 거절/);
  });

  it.each(['PENDING', 'WAITING_APPROVAL', 'QUEUED', 'RETRY_WAIT', 'RUNNING', 'WAITING_INPUT'])(
    '아직 끝나지 않은 작업(%s)의 프리뷰는 잠근다',
    (status) => {
      expect(
        derivePreviewCloseState({
          isAgentTaskActive: false,
          previewTaskId: 'task-1',
          previewTaskStatus: status,
        }).kind,
      ).toBe('blocked');
    },
  );

  it('실패한 작업의 프리뷰는 닫을 수 있지만, 재시도에 쓰일 작업물이 사라진다고 덧붙인다', () => {
    const state = derivePreviewCloseState({
      isAgentTaskActive: false,
      previewTaskId: 'task-1',
      previewTaskStatus: 'FAILED',
    });

    expect(state.kind).toBe('allowed');
    expect(state.kind === 'allowed' && state.warning).toMatch(/재시도/);
  });

  it.each([undefined, '', 'SOMETHING_NEW'])(
    '작업 상태를 모르면(%s) 잠근다 — 닫고 나면 되돌릴 수 없다',
    (status) => {
      expect(
        derivePreviewCloseState({
          isAgentTaskActive: false,
          previewTaskId: 'task-1',
          previewTaskStatus: status,
        }).kind,
      ).toBe('blocked');
    },
  );
});

/*
  #163 의 안내가 **없는 버튼**을 가리켰다. 안내가 버튼 이름을 따로 적으면 같은 일이 또 난다 —
  버튼 이름이 바뀌어도 안내는 옛 이름을 말한다. 같은 상수를 쓰는지 본다.
*/
describe('상한 안내는 실제로 있는 닫기 버튼을 가리킨다 (#184)', () => {
  it('PREVIEW_LIMIT_EXCEEDED 안내에 닫기 버튼 이름이 들어 있다', () => {
    expect(API_ERROR_GUIDE[PREVIEW_LIMIT_EXCEEDED_CODE]?.hint).toContain(PREVIEW_CLOSE_LABEL);
  });
});
