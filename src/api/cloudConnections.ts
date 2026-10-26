import Http from '@/utils/httpClients';
import { useQuery } from '@tanstack/react-query';
import { errorResponse, succesResponse, unwrapApiData } from '@/utils/response';
import {
  getCloudConnectionDetailResSchema,
  getCloudConnectionHealthResSchema,
  getCloudConnectionListResSchema,
  getCloudConnectionVerificationJobResSchema,
  postCloudConnectionCreateReqSchema,
  putCloudConnectionCredentialsReqSchema,
  postCloudConnectionCreateResSchema,
  type GetCloudConnectionDetailResType,
  type GetCloudConnectionHealthResType,
  type GetCloudConnectionListResType,
  type GetCloudConnectionVerificationJobResType,
  type PostCloudConnectionCreateReqType,
  type PutCloudConnectionCredentialsReqType,
  type PostCloudConnectionCreateResType,
  getCloudRequirementsResSchema,
  type GetCloudRequirementsResType,
} from '@/types/cloudConnection.type';

const endpoint = '/cloud-connections';
/** 검증 Job 이 끝날 때까지만 두드린다 */
const VERIFICATION_JOB_POLL_MS = 2000;
const defaultQueryOptions = {
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** 클라우드 연결 목록 조회 API GET */
async function getCloudConnectionList() {
  return Http.instance
    .get<GetCloudConnectionListResType>(endpoint)
    .then((response) => {
      const body = succesResponse<GetCloudConnectionListResType>(response);
      return getCloudConnectionListResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** 클라우드 연결 등록 API POST */
async function postCloudConnectionCreate(params: PostCloudConnectionCreateReqType) {
  const payload = postCloudConnectionCreateReqSchema.parse(params);

  return Http.instance
    .post<PostCloudConnectionCreateResType>(endpoint, payload)
    .then((response) => {
      const body = succesResponse<PostCloudConnectionCreateResType>(response);
      return postCloudConnectionCreateResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/**
 * 클라우드 연결 자격 교체 API PUT.
 *
 * 자격이 만료된 연결을 **새로 만들지 않고** 고치는 길이다. 새 연결을 만들면 기존
 * 연결로 만든 DB·서버·CDN 을 지울 자격이 사라져 AWS 에 과금 자원으로 남는다.
 *
 * **빈 값은 보내지 않는다.** 생략이 "지금 방식 그대로" 라는 뜻이므로, 사용자가 바꾸지
 * 않은 것은 payload 에 넣지 않는다. 지금 서버는 '' 도 생략과 같게 읽지만(trimToNull),
 * 그건 서버 쪽 관용이라 거기 기대지 않는다.
 *
 * 202 로 검증 Job 을 돌려준다. 자격이 맞는지는 그 Job 이 끝나야 안다.
 */
async function putCloudConnectionCredentials(
  cloudConnectionId: number,
  params: PutCloudConnectionCredentialsReqType,
) {
  const parsed = putCloudConnectionCredentialsReqSchema.parse(params);
  const payload = Object.fromEntries(
    Object.entries(parsed).filter(([, value]) => value !== null && value !== ''),
  );

  return Http.instance
    .put<GetCloudConnectionVerificationJobResType>(
      `${endpoint}/${cloudConnectionId}/credentials`,
      payload,
    )
    .then((response) => {
      const body = succesResponse<GetCloudConnectionVerificationJobResType>(response);
      return getCloudConnectionVerificationJobResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** 클라우드 연결 상세 조회 API GET */
async function getCloudConnectionDetail(cloudConnectionId: number) {
  return Http.instance
    .get<GetCloudConnectionDetailResType>(`${endpoint}/${cloudConnectionId}`)
    .then((response) => {
      const body = succesResponse<GetCloudConnectionDetailResType>(response);
      return getCloudConnectionDetailResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** 클라우드 연결 해제 API DELETE */
async function deleteCloudConnection(cloudConnectionId: number) {
  return Http.instance
    .delete(`${endpoint}/${cloudConnectionId}`)
    .then(succesResponse)
    .catch(errorResponse());
}

/** 클라우드 연결 health 조회 API GET */
async function getCloudConnectionHealth(cloudConnectionId: number) {
  return Http.instance
    .get<GetCloudConnectionHealthResType>(`${endpoint}/${cloudConnectionId}/health`)
    .then((response) => {
      const body = succesResponse<GetCloudConnectionHealthResType>(response);
      return getCloudConnectionHealthResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** 클라우드 연결 재검증 요청 API POST */
async function postCloudConnectionVerificationJob(cloudConnectionId: number) {
  return Http.instance
    .post(`${endpoint}/${cloudConnectionId}/verification-jobs`)
    .then(succesResponse)
    .catch(errorResponse());
}

/** 클라우드 연결 검증 Job 조회 API GET */
async function getCloudConnectionVerificationJob(jobId: string) {
  return Http.instance
    .get<GetCloudConnectionVerificationJobResType>(`/cloud-connection-verification-jobs/${jobId}`)
    .then((response) => {
      const body = succesResponse<GetCloudConnectionVerificationJobResType>(response);
      return getCloudConnectionVerificationJobResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

function useCloudConnectionListQuery(queryKey: unknown) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['cloud-connection-list', queryKey],
    queryFn: getCloudConnectionList,
    ...defaultQueryOptions,
  });
}

/**
 * 연결에 무엇이 필요한지 조회 API GET.
 *
 * 방식을 바꾸면(역할 위임 ↔ 액세스 키) 필요한 값도 안내도 달라지므로 다시 묻는다.
 */
async function getCloudRequirements(provider: string, credentialType?: string | null) {
  return Http.instance
    .get<GetCloudRequirementsResType>(`${endpoint}/requirements`, {
      // 안 고른 상태면 아예 안 보낸다 — 무엇을 권할지는 서버가 정한다.
      // 화면이 기본값을 들고 있으면 서버가 그 방식을 접었을 때 어긋난다
      params: credentialType ? { provider, credentialType } : { provider },
    })
    .then((response) => {
      const body = succesResponse<GetCloudRequirementsResType>(response);
      return getCloudRequirementsResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/**
 * 연결 안내 조회 Query Hook.
 *
 * 열려 있을 때만 부른다 — 미리 받아 둘 이유가 없고, 서버 배포로만 바뀌는 내용이라
 * 폴링도 하지 않는다.
 *
 * 실패를 조용히 넘기지 않는다. 안내를 못 받으면 사용자가 무엇을 해야 할지 알 수 없어서,
 * 다른 조회들과 달리 화면이 그 실패를 말해 줘야 한다.
 */
function useCloudRequirementsQuery(
  queryKey: unknown,
  provider: string,
  credentialType: string | null,
  enabled: boolean,
) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['cloud-requirements', queryKey, provider, credentialType],
    queryFn: () => getCloudRequirements(provider, credentialType),
    enabled: enabled && !!provider,
    ...defaultQueryOptions,
  });
}

/**
 * 검증 Job 조회 Query Hook.
 *
 * 끝나면 멈춘다 — SUCCEEDED/FAILED 가 되면 더 두드릴 것이 없다.
 *
 * 탭이 백그라운드면 refetchInterval 이 기본적으로 멈춘다. 그래서 다른 탭을 보다 돌아오면
 * **진행이 멈춰 있던 것처럼 보이는데, 멈춘 것은 화면이지 서버가 아니다.** 돌아오는 순간
 * 다시 읽어서 따라잡으므로 그대로 둔다.
 */
function useCloudConnectionVerificationJobQuery(queryKey: unknown, jobId: string | null) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['cloud-verification-job', queryKey, jobId],
    queryFn: () => getCloudConnectionVerificationJob(jobId ?? ''),
    enabled: !!jobId,
    ...defaultQueryOptions,
    refetchInterval: (query) => {
      const job = query.state.data;
      if (!job) return VERIFICATION_JOB_POLL_MS;
      return job.status === 'PENDING' || job.status === 'RUNNING'
        ? VERIFICATION_JOB_POLL_MS
        : false;
    },
  });
}

export {
  getCloudConnectionList,
  postCloudConnectionCreate,
  putCloudConnectionCredentials,
  getCloudConnectionDetail,
  deleteCloudConnection,
  getCloudConnectionHealth,
  postCloudConnectionVerificationJob,
  getCloudConnectionVerificationJob,
  useCloudConnectionVerificationJobQuery,
  useCloudConnectionListQuery,
  getCloudRequirements,
  useCloudRequirementsQuery,
};
