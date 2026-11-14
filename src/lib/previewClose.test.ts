import { describe, expect, it } from 'vitest';
import ko from '@/locales/ko.json';
import { meSettingsNavGroups } from '@/components/layout/me/meSettingsNav';
import { API_ERROR_GUIDE, PREVIEW_IN_USE_CODE } from '@/lib/apiErrorGuide';
import {
  PREVIEW_CLOSE_LABEL,
  derivePreviewCloseState,
  previewCloseBlockedReasonText,
} from '@/lib/previewClose';
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

  it('승인을 기다리는 작업은 대화가 "도는 중" 으로 봐도, 먼저 결정하라는 이유를 보여 준다', () => {
    // 대화는 승인 대기 작업도 끝나지 않은 작업으로 센다. 그 이유가 "작업이 끝난 뒤에" 로 덮이면
    // 사용자는 해야 할 일(승인·거절)을 모른 채 기다린다 — 로컬 실측에서 그렇게 나왔다
    const state = derivePreviewCloseState({
      isAgentTaskActive: true,
      previewTaskId: 'task-1',
      previewTaskStatus: 'WAITING_RESULT_APPROVAL',
    });

    expect(state.kind === 'blocked' && state.reason).toMatch(/승인하거나 거절/);
  });

  it('끝난 작업의 프리뷰라도 대화에서 다른 작업이 도는 동안에는 잠근다', () => {
    expect(
      derivePreviewCloseState({
        isAgentTaskActive: true,
        previewTaskId: 'task-1',
        previewTaskStatus: 'DONE',
      }).kind,
    ).toBe('blocked');
  });

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

/*
  서버(BE #650)는 같은 규칙으로 닫기를 막는다 — 닫을 수 있는 작업 상태는 DONE·CANCELLED·FAILED 뿐이다.
  화면의 잠금이 서버와 어긋나면 누르면 409 가 나는 버튼을 열어 두거나, 닫을 수 있는 것을 잠근다.
*/
describe('화면의 잠금은 서버의 닫기 규칙과 같다 (BE #650)', () => {
  const TASK_STATUSES = [
    'PENDING',
    'WAITING_APPROVAL',
    'QUEUED',
    'RETRY_WAIT',
    'RUNNING',
    'WAITING_INPUT',
    'WAITING_RESULT_APPROVAL',
    'DONE',
    'FAILED',
    'CANCELLED',
  ];
  const SERVER_CLOSABLE = new Set(['DONE', 'CANCELLED', 'FAILED']);

  it.each(TASK_STATUSES)('%s', (status) => {
    const state = derivePreviewCloseState({
      isAgentTaskActive: false,
      previewTaskId: 'task-1',
      previewTaskStatus: status,
    });
    expect(state.kind === 'allowed').toBe(SERVER_CLOSABLE.has(status));
  });
});

/*
  내 프리뷰 목록(BE #651)은 닫을 수 없는 이유를 코드로 준다 — 막은 작업의 상태이거나 PROVISIONING.
  화면은 그 코드를 프로젝트 화면의 잠금과 같은 문장으로 옮긴다.
*/
describe('닫을 수 없는 이유를 문장으로 옮긴다 (#184)', () => {
  it('승인 대기는 먼저 결정하라고 말한다 — 프로젝트 화면의 잠금과 같은 문장', () => {
    const fromList = previewCloseBlockedReasonText('WAITING_RESULT_APPROVAL');
    const fromPanel = derivePreviewCloseState({
      isAgentTaskActive: false,
      previewTaskId: 'task-1',
      previewTaskStatus: 'WAITING_RESULT_APPROVAL',
    });

    expect(fromList).toMatch(/승인하거나 거절/);
    expect(fromPanel).toEqual({ kind: 'blocked', reason: fromList });
  });

  it('준비 중이면 다 뜬 뒤에 닫을 수 있다고 말한다', () => {
    expect(previewCloseBlockedReasonText('PROVISIONING')).toMatch(/준비 중/);
  });

  it.each(['PENDING', 'WAITING_APPROVAL', 'QUEUED', 'RETRY_WAIT', 'RUNNING', 'WAITING_INPUT'])(
    '진행 중(%s)이면 작업이 끝난 뒤에 닫을 수 있다고 말한다',
    (reason) => {
      expect(previewCloseBlockedReasonText(reason)).toMatch(/작업이 끝난 뒤/);
    },
  );

  it('처음 보는 이유도 닫을 수 없다는 문장으로 옮긴다', () => {
    expect(previewCloseBlockedReasonText('SOMETHING_NEW')).toMatch(/닫을 수 없습니다/);
  });
});

/*
  #184 완료 기준 2 — 상한에 걸린 사용자가 화면만 보고 빠져나올 수 있다. 안내가 가리키는 자리가
  실제로 있는 설정 절이고, 그 절의 이름이 안내 문구와 같은지 본다.
*/
describe('상한 안내는 내 프리뷰 목록으로 보낸다 (#184)', () => {
  const guide = API_ERROR_GUIDE[PREVIEW_LIMIT_EXCEEDED_CODE];

  it('설정 > 프리뷰로 가는 버튼을 단다', () => {
    expect(guide?.action).toEqual({
      kind: 'navigate',
      to: '/settings',
      search: { section: 'previews' },
      label: '떠 있는 프리뷰 보기',
    });
  });

  it('그 절은 설정에 실제로 있고, 안내가 부르는 이름과 같다', () => {
    const sections = meSettingsNavGroups.flatMap((group) => group.items.map((item) => item.id));
    expect(sections).toContain('previews');
    expect(guide?.hint).toContain(`설정 > ${ko.me.nav.items.previews}`);
  });
});

describe('409 PREVIEW_IN_USE 안내 (BE #650)', () => {
  it('서버 문장을 되풀이하지 않고, 아무것도 닫히지 않았다는 것만 덧붙인다', () => {
    const guide = API_ERROR_GUIDE[PREVIEW_IN_USE_CODE];
    expect(guide?.hint).toMatch(/아무것도 닫지 않았습니다/);
    expect(guide?.hint).not.toMatch(/결과 승인을 먼저/);
    expect(guide?.action).toBeUndefined();
  });
});
