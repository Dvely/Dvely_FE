import { describe, expect, it } from 'vitest';
import { AxiosError } from 'axios';
import {
  isActiveRunLimitError,
  isPreviewLimitError,
  shouldResendClarificationAsMessage,
  shouldReturnInputToUser,
} from '@/lib/runLimit';
import { ApiError } from '@/utils/response';

/**
 * 화면에 닿는 오류는 API 계층이 감싼 `ApiError` 다 — HTTP 상태는 그 과정에서 사라지고
 * 코드만 남는다. 테스트도 같은 모양으로 만든다.
 */
function apiError(code: string | null, message = '서버 문구') {
  return new ApiError(message, code);
}

/** 봉투를 거치지 않은 축 날것의 429. 상태만 보고 가르면 이쪽에 걸린다 */
function raw429(code: string) {
  const error = new AxiosError('Too Many Requests');
  error.response = {
    status: 429,
    statusText: 'Too Many Requests',
    headers: {},
    config: { headers: {} } as never,
    data: { status: 429, code, message: '동시에 2개까지 실행할 수 있습니다.' },
  };
  return error;
}

describe('isActiveRunLimitError', () => {
  it('동시 실행 상한 코드를 알아본다', () => {
    expect(isActiveRunLimitError(apiError('ACTIVE_RUN_LIMIT_EXCEEDED'))).toBe(true);
    expect(isActiveRunLimitError(raw429('ACTIVE_RUN_LIMIT_EXCEEDED'))).toBe(true);
  });

  /*
    같은 429 에 다른 뜻이 섞여 있다. `AI_PROVIDER_RATE_LIMITED` 는 **기다리면 풀리고**
    재시도 버튼을 주는 쪽이라, 상태 코드로 갈랐다면 둘을 한 덩어리로 다뤄 틀렸을 것이다.
  */
  it('같은 429 라도 제공자 쪽 한도와 구분한다', () => {
    expect(isActiveRunLimitError(apiError('AI_PROVIDER_RATE_LIMITED'))).toBe(false);
    expect(isActiveRunLimitError(raw429('AI_PROVIDER_RATE_LIMITED'))).toBe(false);
  });

  it('프리뷰 상한과 서로 섞이지 않는다', () => {
    expect(isActiveRunLimitError(apiError('PREVIEW_LIMIT_EXCEEDED'))).toBe(false);
    expect(isPreviewLimitError(apiError('PREVIEW_LIMIT_EXCEEDED'))).toBe(true);
    expect(isPreviewLimitError(apiError('ACTIVE_RUN_LIMIT_EXCEEDED'))).toBe(false);
  });

  /** 서버가 분류하지 않은 실패(네트워크·스키마)는 코드가 없다 */
  it('코드가 없는 실패를 상한으로 보지 않는다', () => {
    expect(isActiveRunLimitError(apiError(null))).toBe(false);
    expect(isActiveRunLimitError(new Error('Network Error'))).toBe(false);
    expect(isActiveRunLimitError(undefined)).toBe(false);
  });
});

describe('shouldReturnInputToUser', () => {
  const runLimit = apiError('ACTIVE_RUN_LIMIT_EXCEEDED');
  const unknownFailure = apiError('INTERNAL_ERROR');

  /*
    이것이 이 PR 의 본론이다. 기존 대화에서 상한에 걸리면, 메시지는 저장되지 않았는데
    입력창은 비워진 상태로 남았다 — 사용자가 적은 말이 사라졌다.
  */
  it('저장된 대화에서도 상한이면 적은 말을 돌려준다', () => {
    expect(shouldReturnInputToUser(runLimit, true)).toBe(true);
  });

  /*
    상한이 아닌 실패는 돌려주지 않는다. 메시지가 저장된 뒤 폴링에서 깨졌을 수 있고,
    그때 돌려주면 사용자가 같은 말을 두 번 보낸다.
  */
  it('저장된 대화에서 그 밖의 실패는 돌려주지 않는다', () => {
    expect(shouldReturnInputToUser(unknownFailure, true)).toBe(false);
  });

  /** 새 대화는 대화 자체가 안 만들어졌으므로 원인과 무관하게 돌려준다 */
  it('새 대화면 원인과 무관하게 돌려준다', () => {
    expect(shouldReturnInputToUser(unknownFailure, false)).toBe(true);
    expect(shouldReturnInputToUser(runLimit, false)).toBe(true);
  });
});

describe('shouldResendClarificationAsMessage', () => {
  /*
    태스크가 더 이상 입력을 기다리지 않으면(취소·만료) 서버가 400·404 를 준다. 그때는
    답이 갈 곳이 없어졌으므로 평범한 메시지로 다시 보내 뜻을 전달한다 — 기존 동작이다.
  */
  it('답이 갈 곳이 없어진 실패는 메시지로 다시 보낸다', () => {
    expect(shouldResendClarificationAsMessage(apiError('NOT_FOUND'))).toBe(true);
    expect(shouldResendClarificationAsMessage(apiError(null))).toBe(true);
  });

  /*
    상한에서 다시 보내면 그 메시지도 같은 상한에 막혀 오류가 두 번 나고, 그 사이
    되묻기 폼이 닫혀 답을 보낼 자리마저 사라진다.
  */
  it('상한이면 다시 보내지 않는다', () => {
    expect(shouldResendClarificationAsMessage(apiError('ACTIVE_RUN_LIMIT_EXCEEDED'))).toBe(false);
  });
});
