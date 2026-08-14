import Http from '@/utils/httpClients';
import { errorResponse, succesResponse } from '@/utils/response';
import {
  getPreviewSessionLogsResSchema,
  getPreviewSessionStatusResSchema,
  type GetPreviewSessionLogsResType,
  type GetPreviewSessionStatusResType,
} from '@/types/preview.type';

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

export {
  deletePreviewSession,
  getPreviewSessionStatus,
  getPreviewSessionLogs,
  getPreviewProxyPath,
};
