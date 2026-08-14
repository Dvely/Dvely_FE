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

export function errorResponse() {
  return (err: unknown) => {
    throw new Error(extractApiErrorMessage(err) ?? '요청 처리 중 오류가 발생했습니다.');
  };
}
