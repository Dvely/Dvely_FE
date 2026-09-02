import Http from '@/utils/httpClients';
import { useQuery } from '@tanstack/react-query';
import { errorResponse, succesResponse, unwrapApiData } from '@/utils/response';
import type { ApiResponse } from '@/types/response.type';
import {
  getProjectServerListResSchema,
  postProjectServerReqSchema,
  postProjectServerResSchema,
  type GetProjectServerListResType,
  type PostProjectServerReqType,
  type PostProjectServerResType,
} from '@/types/server.type';

const defaultQueryOptions = {
  gcTime: 0,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** 서버가 스스로 다음 단계로 넘기는 중 — 빌드·인스턴스 생성·헬스체크가 수 분 걸린다 */
const BUILDING_SERVER_POLL_MS = 5000;
/** 승인 대기는 사람이 누르기를 기다리는 시간이라 자주 볼 이유가 없다 */
const AWAITING_APPROVAL_POLL_MS = 15000;

/** 워커가 알아서 다음 상태로 옮기는 중인 서버 */
const TRANSITIONAL_SERVER_STATUSES = new Set(['QUEUED', 'BUILDING', 'PROVISIONING']);

/** 프로젝트 EC2 서버 목록 조회 API GET */
async function getProjectServerList(projectId: number) {
  return Http.instance
    .get<ApiResponse<GetProjectServerListResType>>(`/projects/${projectId}/servers`)
    .then((response) => {
      const body = succesResponse<ApiResponse<GetProjectServerListResType>>(response);
      return getProjectServerListResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/**
 * 프로젝트 EC2 서버 생성 요청 API POST.
 * 과금 자원이라 서버가 대기 행과 승인만 만들고 끝난다 — 실제 빌드·인스턴스 생성은 승인 후 워커가 한다.
 */
async function postProjectServer(projectId: number, params: PostProjectServerReqType = {}) {
  const payload = postProjectServerReqSchema.parse(params);

  return Http.instance
    .post<ApiResponse<PostProjectServerResType>>(`/projects/${projectId}/servers`, payload)
    .then((response) => {
      const body = succesResponse<ApiResponse<PostProjectServerResType>>(response);
      return postProjectServerResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/**
 * EC2 서버 종료 API POST. 인스턴스를 끄고 부수 자원(SSM·S3)까지 정리한다.
 *
 * 경로에 projectId 가 없다 — 서버가 serverId 로 소유권을 확인한다.
 * 응답 본문이 없으므로 파싱하지 않는다. 멱등이라 이미 종료된 서버에도 안전하다.
 */
async function postServerTerminate(serverId: number) {
  return Http.instance
    .post<ApiResponse<null>>(`/servers/${serverId}/terminate`)
    .then(() => undefined)
    .catch(errorResponse());
}

/**
 * 프로젝트 EC2 서버 목록 조회 Query Hook.
 *
 * 빌드·인스턴스 생성이 수 분 걸리고 그동안 워커가 상태를 옮기므로, 폴링하지 않으면
 * 사용자가 새로고침할 때까지 BUILDING 에 멈춰 있다.
 *
 * 승인 대기(PENDING)도 계속 읽되 느리게 읽는다 — 승인은 채팅 탭에서 이뤄져서 이 화면이
 * 그 사실을 달리 알 방법이 없는데, 사람이 누르기를 기다리는 시간을 5초마다 두드릴 이유는 없다.
 *
 * 목록은 순수 DB 조회라 폴링 비용이 싸다(개요처럼 외부 API 를 때리지 않는다).
 */
function useProjectServerListQuery(queryKey: unknown, projectId: number) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['project-server-list', queryKey, projectId],
    queryFn: () => getProjectServerList(projectId),
    enabled: !!projectId,
    ...defaultQueryOptions,
    refetchInterval: (query) => {
      const servers = query.state.data;
      if (!servers?.length) return false;
      if (servers.some((server) => TRANSITIONAL_SERVER_STATUSES.has(server.status))) {
        return BUILDING_SERVER_POLL_MS;
      }
      if (servers.some((server) => server.status === 'PENDING')) return AWAITING_APPROVAL_POLL_MS;
      return false;
    },
  });
}

export { getProjectServerList, postProjectServer, postServerTerminate, useProjectServerListQuery };
