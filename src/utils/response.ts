import { AxiosError, type AxiosResponse } from 'axios';

export function succesResponse<T>(res: AxiosResponse<T>) {
  return res.data;
}

/** API envelope의 message 필드만 꺼낸다. JSON 전체는 노출하지 않는다. */
export function extractApiErrorMessage(error: unknown) {
  return readMessageField(asErrorPayload(error));
}

function asErrorPayload(error: unknown): unknown {
  if (error instanceof AxiosError) return error.response?.data ?? error.message;
  if (error instanceof Error) return error.message;
  return error;
}

function readMessageField(value: unknown): string | null {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        return readMessageField(JSON.parse(trimmed) as unknown);
      } catch {
        return trimmed;
      }
    }

    return trimmed;
  }

  if (value && typeof value === 'object' && 'message' in value) {
    return readMessageField((value as { message: unknown }).message);
  }

  return null;
}

/**
 * API 봉투(`{status, code, message, data}`)에서 data 를 꺼낸다.
 * 봉투 없이 본문만 오는 응답도 있어 그 경우는 그대로 돌려준다.
 *
 * `data` 키가 있으면 값이 null 이어도 벗긴다. 예전에는 `data != null` 을 함께 봤는데,
 * 그러면 "선택된 연결 없음" 처럼 서버가 `data: null` 을 주는 정상 응답에서 봉투가 그대로
 * 스키마로 넘어갔다. 봉투의 status 는 HTTP 코드(200)라 enum 자리에 숫자가 들어가고,
 * 원인과 무관한 곳에서 파싱이 터진다.
 */
export function unwrapApiData<T>(body: T | { data?: T }): T {
  if (body && typeof body === 'object' && 'data' in body) {
    return (body as { data?: T }).data as T;
  }
  return body as T;
}

/**
 * 서버는 200 을 주는데 zod 파싱이 실패하면 여기로 온다. 그 실패가 조용히 삼켜져
 * 화면만 비는 사고가 반복돼서(도메인 목록·프로젝트 개요·활동 이력) 개발 모드에서는
 * 흔적을 남긴다. 사용자에게 보이는 메시지는 그대로 둔다.
 */
export function errorResponse() {
  return (err: unknown) => {
    if (import.meta.env.DEV && !(err instanceof AxiosError)) {
      console.warn('[api] 응답 처리 실패 — 스키마 불일치일 수 있습니다', err);
    }
    throw new Error(extractApiErrorMessage(err) ?? '요청 처리 중 오류가 발생했습니다.');
  };
}
