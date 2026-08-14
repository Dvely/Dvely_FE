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
  type GetPreviewSessionLogsResType,
  type GetPreviewSessionStatusResType,
  type GetProjectPreviewSessionResType,
  type PostProjectPreviewSessionResType,
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

/** Preview 프록시 URL */
function getPreviewProxyPath(sessionId: string, accessToken: string, subpath = '') {
  const normalized = subpath.replace(/^\//, '');
  const suffix = normalized ? `/${normalized}` : '';
  return `/previews/${sessionId}/${accessToken}${suffix}`;
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
  getPreviewProxyPath,
  getProjectPreviewSession,
  postProjectPreviewSession,
  useProjectPreviewQuery,
};
