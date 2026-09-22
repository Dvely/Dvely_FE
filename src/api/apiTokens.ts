import { useQuery } from '@tanstack/react-query';
import Http from '@/utils/httpClients';
import { errorResponse, succesResponse, unwrapApiData } from '@/utils/response';
import {
  getApiTokenListResSchema,
  postApiTokenReqSchema,
  postApiTokenResSchema,
  type GetApiTokenListResType,
  type PostApiTokenReqType,
  type PostApiTokenResType,
} from '@/types/apiToken.type';

const endpoint = '/api-tokens';

const defaultQueryOptions = {
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** 발급한 토큰 목록 GET. 평문은 담기지 않는다 — 앞부분(tokenPrefix)만 온다 */
async function getApiTokenList() {
  return Http.instance
    .get<GetApiTokenListResType>(endpoint)
    .then((response) => {
      const body = succesResponse<GetApiTokenListResType>(response);
      return getApiTokenListResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

function useApiTokenListQuery(queryKey: unknown) {
  return useQuery({
    queryKey: ['api-token-list', queryKey],
    queryFn: getApiTokenList,
    ...defaultQueryOptions,
  });
}

/**
 * 토큰 발급 POST.
 *
 * **응답의 token 이 평문을 볼 수 있는 유일한 자리다.** 서버가 해시만 저장하므로
 * 재조회 경로가 없다. 호출한 쪽은 이 값을 화면에 한 번 보여주고, 사용자가 복사한
 * 것을 확인한 뒤 버려야 한다 — 상태에 남겨두거나 저장소에 넣지 말 것.
 */
async function postApiToken(params: PostApiTokenReqType) {
  const payload = postApiTokenReqSchema.parse(params);

  return Http.instance
    .post<PostApiTokenResType>(endpoint, payload)
    .then((response) => {
      const body = succesResponse<PostApiTokenResType>(response);
      return postApiTokenResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** 토큰 폐기 DELETE. 즉시 무효화된다 */
async function deleteApiToken(apiTokenId: number) {
  return Http.instance
    .delete(`${endpoint}/${apiTokenId}`)
    .then(() => true)
    .catch(errorResponse());
}

export { getApiTokenList, useApiTokenListQuery, postApiToken, deleteApiToken };
