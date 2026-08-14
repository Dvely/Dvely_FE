import Http from '@/utils/httpClients';
import { useQuery } from '@tanstack/react-query';
import { errorResponse, succesResponse } from '@/utils/response';
import type { ApiResponse } from '@/types/response.type';
import {
  getPreviewSessionLogsResSchema,
  getPreviewSessionStatusResSchema,
  getProjectPreviewSessionParamsSchema,
  getProjectPreviewSessionResSchema,
  postProjectPreviewSessionResSchema,
  postPreviewAccessResSchema,
  type GetPreviewSessionLogsResType,
  type GetPreviewSessionStatusResType,
  type GetProjectPreviewSessionResType,
  type PostProjectPreviewSessionResType,
  type PostPreviewAccessResType,
} from '@/types/preview.type';

const PROJECT_PREVIEW_POLL_MS = 4000;

function unwrapApiData<T>(body: T | ApiResponse<T>): T {
  if (body && typeof body === 'object' && 'data' in body && body.data != null) {
    return body.data;
  }
  return body as T;
}

function emptyProjectPreviewSession(projectId: number): GetProjectPreviewSessionResType {
  return getProjectPreviewSessionResSchema.parse({
    sessionId: '',
    projectId,
    taskId: null,
    status: null,
    previewUrl: '',
    expiresAt: '',
    failureReason: '',
  });
}

/** Preview 세션 종료 API DELETE */
async function deletePreviewSession(sessionId: string) {
  return Http.instance
    .delete(`/preview-sessions/${sessionId}`)
    .then(succesResponse)
    .catch(errorResponse());
}

/** Preview 세션 상태 조회 API GET */
async function getPreviewSessionStatus(sessionId: string) {
  return Http.instance
    .get<GetPreviewSessionStatusResType>(`/preview-sessions/${sessionId}/status`)
    .then((response) => {
      const data = succesResponse<GetPreviewSessionStatusResType>(response);
      return getPreviewSessionStatusResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** Preview 세션 로그 조회 API GET */
async function getPreviewSessionLogs(sessionId: string) {
  return Http.instance
    .get<GetPreviewSessionLogsResType>(`/preview-sessions/${sessionId}/logs`)
    .then((response) => {
      const data = succesResponse<GetPreviewSessionLogsResType>(response);
      return getPreviewSessionLogsResSchema.parse(data);
    })
    .catch(errorResponse());
}

/**
 * 프리뷰 열람 권한 발급 API POST. iframe 표시 직전에 호출한다.
 * accessToken이 회전되므로 응답의 previewUrl만 유효하고, 이전에 받은 주소는 즉시 404가 된다.
 * 소유권 쿠키(HttpOnly)는 withCredentials로 브라우저가 자동 보관한다.
 */
async function postPreviewSessionAccess(sessionId: string) {
  return Http.instance
    .post<ApiResponse<PostPreviewAccessResType>>(`/preview-sessions/${sessionId}/access`)
    .then((response) => {
      const body = succesResponse<ApiResponse<PostPreviewAccessResType>>(response);
      return postPreviewAccessResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** 프로젝트의 현재 프리뷰 조회 API GET. 세션이 없으면 204 → 빈 세션 */
async function getProjectPreviewSession(projectId: number) {
  const { projectId: id } = getProjectPreviewSessionParamsSchema.parse({ projectId });

  return Http.instance
    .get<ApiResponse<GetProjectPreviewSessionResType>>(`/projects/${id}/preview-session`, {
      validateStatus: (status) => status === 200 || status === 204,
    })
    .then((response) => {
      const body = response.data as ApiResponse<GetProjectPreviewSessionResType> | '' | null | undefined;
      if (response.status === 204 || body == null || body === '') {
        return emptyProjectPreviewSession(id);
      }

      return getProjectPreviewSessionResSchema.parse({
        ...emptyProjectPreviewSession(id),
        ...unwrapApiData(body),
      });
    })
    .catch(errorResponse());
}

/** 프로젝트 프리뷰 띄우기 API POST. 200 즉시 활성, 202 준비 중 */
async function postProjectPreviewSession(projectId: number) {
  const { projectId: id } = getProjectPreviewSessionParamsSchema.parse({ projectId });

  return Http.instance
    .post<ApiResponse<PostProjectPreviewSessionResType>>(`/projects/${id}/preview-session`, undefined, {
      validateStatus: (status) => status === 200 || status === 202,
    })
    .then((response) => {
      const body = succesResponse<ApiResponse<PostProjectPreviewSessionResType>>(response);
      return postProjectPreviewSessionResSchema.parse({
        ...emptyProjectPreviewSession(id),
        ...unwrapApiData(body),
      });
    })
    .catch(errorResponse());
}

/**
 * ACTIVE 세션의 열람 권한 발급 쿼리. frameKey가 바뀌면(새로고침) 재발급한다.
 * 발급마다 토큰이 회전되므로 자동 refetch는 모두 끈다 — 회전되면 떠 있는 iframe의 주소가 무효가 된다.
 */
function usePreviewAccessQuery(queryKey: unknown, sessionId: string | null, frameKey: number) {
  if (!queryKey) throw new Error('queryKey is required');

  return useQuery({
    queryKey: ['preview-access', queryKey, sessionId, frameKey],
    queryFn: () => postPreviewSessionAccess(sessionId as string),
    enabled: typeof sessionId === 'string' && sessionId.length > 0,
    gcTime: 0,
    staleTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

function useProjectPreviewQuery(queryKey: unknown, projectId: number) {
  if (!queryKey) throw new Error('queryKey is required');

  return useQuery({
    queryKey: ['project-preview-session', queryKey, projectId],
    queryFn: () => getProjectPreviewSession(projectId),
    enabled: Number.isInteger(projectId) && projectId > 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: (query) => {
      if (query.state.data?.status === 'PROVISIONING') return PROJECT_PREVIEW_POLL_MS;
      return false;
    },
  });
}

export {
  deletePreviewSession,
  getPreviewSessionStatus,
  getPreviewSessionLogs,
  getProjectPreviewSession,
  postProjectPreviewSession,
  postPreviewSessionAccess,
  usePreviewAccessQuery,
  useProjectPreviewQuery,
};
