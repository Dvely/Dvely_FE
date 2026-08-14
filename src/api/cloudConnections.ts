import Http from '@/utils/httpClients';
import { useQuery } from '@tanstack/react-query';
import { errorResponse, succesResponse } from '@/utils/response';
import {
  getCloudConnectionDetailResSchema,
  getCloudConnectionHealthResSchema,
  getCloudConnectionListResSchema,
  getCloudConnectionVerificationJobResSchema,
  postCloudConnectionCreateReqSchema,
  postCloudConnectionCreateResSchema,
  type GetCloudConnectionDetailResType,
  type GetCloudConnectionHealthResType,
  type GetCloudConnectionListResType,
  type GetCloudConnectionVerificationJobResType,
  type PostCloudConnectionCreateReqType,
  type PostCloudConnectionCreateResType,
} from '@/types/cloudConnection.type';

const endpoint = '/cloud-connections';
const defaultQueryOptions = {
  gcTime: 0,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** 클라우드 연결 목록 조회 API GET */
async function getCloudConnectionList() {
  return Http.instance
    .get<GetCloudConnectionListResType>(endpoint)
    .then((response) => {
      const data = succesResponse<GetCloudConnectionListResType>(response);
      return getCloudConnectionListResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 클라우드 연결 등록 API POST */
async function postCloudConnectionCreate(params: PostCloudConnectionCreateReqType) {
  const payload = postCloudConnectionCreateReqSchema.parse(params);

  return Http.instance
    .post<PostCloudConnectionCreateResType>(endpoint, payload)
    .then((response) => {
      const data = succesResponse<PostCloudConnectionCreateResType>(response);
      return postCloudConnectionCreateResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 클라우드 연결 상세 조회 API GET */
async function getCloudConnectionDetail(cloudConnectionId: number) {
  return Http.instance
    .get<GetCloudConnectionDetailResType>(`${endpoint}/${cloudConnectionId}`)
    .then((response) => {
      const data = succesResponse<GetCloudConnectionDetailResType>(response);
      return getCloudConnectionDetailResSchema.parse(data);
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
      const data = succesResponse<GetCloudConnectionHealthResType>(response);
      return getCloudConnectionHealthResSchema.parse(data);
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
      const data = succesResponse<GetCloudConnectionVerificationJobResType>(response);
      return getCloudConnectionVerificationJobResSchema.parse(data);
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

export {
  getCloudConnectionList,
  postCloudConnectionCreate,
  getCloudConnectionDetail,
  deleteCloudConnection,
  getCloudConnectionHealth,
  postCloudConnectionVerificationJob,
  getCloudConnectionVerificationJob,
  useCloudConnectionListQuery,
};
