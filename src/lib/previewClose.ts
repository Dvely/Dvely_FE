/**
 * 프리뷰 닫기 버튼의 이름.
 *
 * 상한 안내(`PREVIEW_LIMIT_EXCEEDED`)가 이 버튼을 가리킨다. 이름을 두 곳에 따로 적으면 버튼만
 * 바뀌었을 때 안내가 **없는 버튼**을 가리키게 된다 — #163 의 안내가 그렇게 틀렸다(#184).
 */
const PREVIEW_CLOSE_LABEL = '프리뷰 닫기';

type PreviewCloseState =
  /** 닫아도 된다. warning 은 기본 확인 문구에 덧붙일 잃는 것 */
  | { kind: 'allowed'; warning: string | null }
  /** 지금은 닫으면 안 된다. reason 을 버튼 옆에 보여준다 */
  | { kind: 'blocked'; reason: string };

type DerivePreviewCloseStateInput = {
  /** 이 화면의 대화에서 에이전트 작업이 도는 중인가 */
  isAgentTaskActive: boolean;
  /** 이 프리뷰를 띄운 작업. 사용자가 직접 띄운 프로젝트 프리뷰면 없다 */
  previewTaskId: string | null;
  /** 그 작업의 상태. 아직 모르면 undefined */
  previewTaskStatus?: string;
};

const RUNNING_REASON =
  '에이전트 작업이 이 프리뷰의 컨테이너를 쓰고 있어, 작업이 끝난 뒤에 닫을 수 있습니다.';

/**
 * 프리뷰를 지금 닫아도 되는가(#184).
 *
 * 작업이 띄운 프리뷰는 **에이전트가 작업물을 쓰는 자리**이기도 하다. 닫는 API
 * (`DELETE /preview-sessions/{id}`)는 작업 상태를 보지 않고 컨테이너를 지우므로, 여기서 가른다.
 *
 * - **승인 대기(`WAITING_RESULT_APPROVAL`)는 잠근다.** 결과 승인과 저장소 연결 승인이 이 상태다.
 *   승인할 작업물은 아직 GitHub 에 올라가지 않아 이 컨테이너 안에만 있고, 서버는 승인을 반영할 때
 *   이 세션의 컨테이너를 요구한다. 닫으면 승인해도 반영할 것이 없고, 서버는 곧 그 작업을 버린다
 * - **끝난 작업(`DONE`·`CANCELLED`)은 닫을 수 있다.** 서버가 상한에 닿았을 때 스스로 닫는 것도
 *   이 둘뿐이다 — 같은 기준이다
 * - **실패한 작업(`FAILED`)은 닫을 수 있되 잃는 것을 덧붙인다.** 서버는 재시도가 이 컨테이너의
 *   작업물을 이어 쓴다고 보고 저절로 닫지 않는다. 잠가 버리면 상한에서 빠져나올 길이 다시 막힌다
 * - **그 밖의 상태와 모르는 값은 잠근다.** 닫고 나면 되돌릴 수 없으니 모를 때는 닫지 않는 쪽이다
 */
function derivePreviewCloseState({
  isAgentTaskActive,
  previewTaskId,
  previewTaskStatus,
}: DerivePreviewCloseStateInput): PreviewCloseState {
  if (isAgentTaskActive) return { kind: 'blocked', reason: RUNNING_REASON };
  if (!previewTaskId) return { kind: 'allowed', warning: null };

  switch (previewTaskStatus) {
    case 'DONE':
    case 'CANCELLED':
      return { kind: 'allowed', warning: null };
    case 'FAILED':
      return {
        kind: 'allowed',
        warning:
          '이 프리뷰를 띄운 작업은 실패한 상태입니다. 재시도는 이 컨테이너에 남은 작업물을 이어 쓰는데, 닫으면 그 작업물도 함께 사라집니다.',
      };
    case 'WAITING_RESULT_APPROVAL':
      return {
        kind: 'blocked',
        reason:
          '결정을 기다리는 작업물이 이 컨테이너 안에만 있습니다. 닫으면 승인해도 반영할 수 없으니, 먼저 승인하거나 거절해 주세요.',
      };
    case 'PENDING':
    case 'WAITING_APPROVAL':
    case 'QUEUED':
    case 'RETRY_WAIT':
    case 'RUNNING':
    case 'WAITING_INPUT':
      return { kind: 'blocked', reason: RUNNING_REASON };
    default:
      return {
        kind: 'blocked',
        reason: '이 프리뷰를 띄운 작업의 상태를 확인하지 못해 아직 닫을 수 없습니다.',
      };
  }
}

export { PREVIEW_CLOSE_LABEL, derivePreviewCloseState, type PreviewCloseState };
