import { useQuery } from '@tanstack/react-query';
import Http from '@/utils/httpClients';
import { errorResponse, succesResponse, unwrapApiData } from '@/utils/response';
import {
  getAiCredentialListResSchema,
  putAiCredentialReqSchema,
  putAiCredentialResSchema,
  type GetAiCredentialListResType,
  type PutAiCredentialReqType,
  type PutAiCredentialResType,
} from '@/types/aiCredential.type';

const endpoint = '/ai-credentials';

const defaultQueryOptions = {
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** 본인 AI 키 목록 조회 GET */
async function getAiCredentialList() {
  return Http.instance
    .get<GetAiCredentialListResType>(endpoint)
    .then((response) => {
      const body = succesResponse<GetAiCredentialListResType>(response);
      return getAiCredentialListResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

function useAiCredentialListQuery(queryKey: unknown) {
  return useQuery({
    queryKey: ['ai-credential-list', queryKey],
    queryFn: getAiCredentialList,
    ...defaultQueryOptions,
  });
}

/**
 * 키 등록·교체 PUT.
 *
 * 등록과 교체가 같은 호출이다. 벤더당 키가 하나이므로 "이미 등록됨" 409 같은 것이
 * 없다 — 유출 직후 교체가 한 번의 호출로 끝나야 하기 때문이다.
 */
async function putAiCredential(provider: string, params: PutAiCredentialReqType) {
  const payload = putAiCredentialReqSchema.parse(params);

  return Http.instance
    .put<PutAiCredentialResType>(`${endpoint}/${provider}`, payload)
    .then((response) => {
      const body = succesResponse<PutAiCredentialResType>(response);
      return putAiCredentialResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** 키 삭제 DELETE. 등록돼 있지 않으면 404 */
async function deleteAiCredential(provider: string) {
  return Http.instance
    .delete(`${endpoint}/${provider}`)
    .then(() => true)
    .catch(errorResponse());
}

export { getAiCredentialList, useAiCredentialListQuery, putAiCredential, deleteAiCredential };
