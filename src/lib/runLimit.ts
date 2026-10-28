import { extractApiErrorCode } from '@/utils/response';

/**
 * 동시 실행 상한에 걸린 요청을 알아본다.
 *
 * 한 사용자가 동시에 돌릴 수 있는 작업과 띄워 둘 수 있는 프리뷰에 상한이 있다
 * (기본: 작업 2, 프리뷰 3). 넘으면 서버가 429 와 함께 아래 코드를 준다.
 *
 * **HTTP 상태로 가르지 않는 이유**: API 계층이 모든 실패를 `ApiError(message, code)` 로
 * 감싸므로(`src/utils/response.ts`) 화면에 닿을 때 상태 코드는 이미 없다. 코드가 계약이고,
 * 같은 429 에 다른 뜻(`AI_PROVIDER_RATE_LIMITED`)이 섞여 있어서 상태로 가르면 오히려
 * 틀린다 — 그쪽은 기다리면 풀리지만 이쪽은 **진행 중인 것이 끝나야** 풀린다.
 *
 * 이 둘을 따로 알아봐야 하는 까닭은 **아무것도 반영되지 않았다**는 점이다. 보통의 실패는
 * 서버에 흔적이 남았을 수 있어 화면이 조심스럽게 물러나지만, 이 코드가 오면 요청이 없던
 * 일이 된 것이 확실하다 — 그래서 사용자가 적은 말을 돌려주고, 누른 버튼을 되살려야 한다.
 */
const ACTIVE_RUN_LIMIT_EXCEEDED_CODE = 'ACTIVE_RUN_LIMIT_EXCEEDED';
const PREVIEW_LIMIT_EXCEEDED_CODE = 'PREVIEW_LIMIT_EXCEEDED';

/** 동시에 돌릴 수 있는 작업 수를 넘겼다. 메시지 전송·재시도·되묻기 답·계획 승인에서 온다 */
function isActiveRunLimitError(error: unknown): boolean {
  return extractApiErrorCode(error) === ACTIVE_RUN_LIMIT_EXCEEDED_CODE;
}

/** 띄워 둘 수 있는 프리뷰 수를 넘겼다. 프리뷰 띄우기에서 온다 */
function isPreviewLimitError(error: unknown): boolean {
  return extractApiErrorCode(error) === PREVIEW_LIMIT_EXCEEDED_CODE;
}

/**
 * 보내기가 실패했을 때 사용자가 적은 말을 입력창에 돌려줄까.
 *
 * 기본은 **돌려주지 않는다** — 이미 저장된 대화에서는 메시지가 서버에 저장된 뒤 폴링
 * 단계에서 깨졌을 수 있고, 그때 입력을 되돌리면 사용자가 같은 말을 두 번 보내게 된다.
 * 새 대화는 반대다. 대화 자체가 안 만들어졌으면 적은 말이 갈 곳이 없으므로 돌려준다.
 *
 * 동시 실행 상한은 그 추측이 필요 없는 유일한 경우다. 서버가 **아무것도 받지 않았다**고
 * 코드로 알려주므로, 저장된 대화에서도 돌려주는 것이 맞다. 돌려주지 않으면 사용자가 적은
 * 말은 사라지고 저장도 안 된 말풍선만 남는다 — 화면만 보면 보낸 것 같은데 서버에는 없다.
 */
function shouldReturnInputToUser(error: unknown, hasSavedConversation: boolean): boolean {
  if (isActiveRunLimitError(error)) return true;
  return !hasSavedConversation;
}

/**
 * 되묻기 답이 실패했을 때 같은 내용을 평범한 메시지로 다시 보낼까.
 *
 * 기본은 **보낸다.** 태스크가 더 이상 입력을 기다리지 않으면(취소됐거나 만료) 서버가
 * 400·404 를 주는데, 그때 답이 갈 곳이 없어졌다고 사용자에게 되돌려주면 같은 말을 두 번
 * 적게 된다. 새 메시지로 보내면 뜻이 전달된다.
 *
 * 동시 실행 상한에서는 보내면 안 된다. 그 메시지도 같은 상한에 막혀 **오류가 두 번** 나고,
 * 그 과정에서 되묻기 폼이 닫혀 **답을 보낼 자리마저 사라진다** — 질문은 아직 살아 있는데
 * 답할 길이 없어진다.
 */
function shouldResendClarificationAsMessage(error: unknown): boolean {
  return !isActiveRunLimitError(error);
}

export {
  ACTIVE_RUN_LIMIT_EXCEEDED_CODE,
  PREVIEW_LIMIT_EXCEEDED_CODE,
  isActiveRunLimitError,
  isPreviewLimitError,
  shouldResendClarificationAsMessage,
  shouldReturnInputToUser,
};
