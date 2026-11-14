import { useQuery } from '@tanstack/react-query';
import Http from '@/utils/httpClients';
import { errorResponse, succesResponse, unwrapApiData } from '@/utils/response';
import {
  getDeviceShareListResSchema,
  splitDeviceShares,
  type GetDeviceShareListResType,
} from '@/types/deviceShare.type';

const endpoint = '/device-shares';

/**
 * 살아 있는 링크가 있는 동안 다시 읽는 간격.
 *
 * 기기 연결과 보는 사람 수는 서버 메모리에만 있어 목록을 다시 읽어야 바뀐다. 남이 링크를 열거나
 * 터미널이 끊긴 것을 1분씩 늦게 알면 화면이 거짓말을 한다. 10초면 충분하고, 살아 있는 링크가
 * 없으면 멈춘다. 탭이 뒤에 있으면 react-query 가 알아서 쉰다.
 */
const DEVICE_SHARE_POLL_MS = 10_000;

/** 내 공유 목록 GET. 링크 주소(평문 토큰)는 담기지 않는다 */
async function getDeviceShareList() {
  return Http.instance
    .get<GetDeviceShareListResType>(endpoint)
    .then((response) => {
      const body = succesResponse<GetDeviceShareListResType>(response);
      return getDeviceShareListResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

function useDeviceShareListQuery() {
  return useQuery({
    queryKey: ['device-share-list'],
    queryFn: getDeviceShareList,
    retry: false,
    refetchOnReconnect: false,
    refetchInterval: (query) =>
      splitDeviceShares(query.state.data ?? []).live.length > 0 ? DEVICE_SHARE_POLL_MS : false,
  });
}

/**
 * 공유 끝내기 DELETE. 링크가 바로 무효가 되고, 보는 사람과 기기(CLI) 연결이 모두 끊긴다.
 * 터미널의 `qeploy share` 도 "링크가 회수됐다" 를 받고 멈춘다. 이미 끝난 것도 204 다.
 */
async function deleteDeviceShare(shareId: number) {
  return Http.instance
    .delete(`${endpoint}/${shareId}`)
    .then(() => true)
    .catch(errorResponse());
}

export { DEVICE_SHARE_POLL_MS, deleteDeviceShare, getDeviceShareList, useDeviceShareListQuery };
