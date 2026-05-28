import Http from '@/utils/httpClients';
import { errorResponse, succesResponse } from '@/utils/response';
import type { ApiResponse } from '@/types/response.type';
import type { User } from '@/types/user.type';
import { useQuery } from '@tanstack/react-query';
const endpoint = '/users';

/** 1) GET /users/me — 현재 사용자 정보 조회 */
export async function getUserInfo() {
  return Http.instance
    .get<ApiResponse<User>>(`${endpoint}/me`)
    .then((response) => {
      return succesResponse<ApiResponse<User>>(response);
    })
    .catch(errorResponse());
}


function useUserInfoQuery(queryKey: unknown) {
    if (!queryKey) throw new Error('queryKey is required');
    return useQuery({
      queryKey: ['user-info', queryKey],
      queryFn: () => getUserInfo(),
    });
  }

export { useUserInfoQuery };