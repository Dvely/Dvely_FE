import { useQuery } from '@tanstack/react-query';
import Http from '@/utils/httpClients';
import { ApiError, errorResponse, succesResponse, unwrapApiData } from '@/utils/response';
import {
  FEEDBACK_STATUSES,
  getShareFeedbackDetailResSchema,
  getShareFeedbackListResSchema,
  getShareFeedbackPromptResSchema,
  patchShareFeedbackReqSchema,
  postShareFeedbackFixedReqSchema,
  type GetShareFeedbackListResType,
  type ShareFeedbackDetail,
} from '@/types/shareFeedback.type';
const endpoint = '/device-share-feedback';

/** 살아 있는 공유가 있는 동안 다시 읽는 간격. 링크 목록(`DEVICE_SHARE_POLL_MS`)과 같다 */
const SHARE_FEEDBACK_POLL_MS = 10_000;

/** 한 번에 받는 개수. 서버 상한(50)과 같다 — 최근에 바뀐 것부터 온다 */
const SHARE_FEEDBACK_LIST_LIMIT = 50;

/**
 * 내 모든 공유의 피드백 GET. 상태를 쉼표로 다 달라고 해서 한 번에 받는다 — 탭마다 개수를 세고,
 * 링크마다 받기 전 개수를 보이려면 전부가 있어야 한다.
 */
async function getShareFeedbackList() {
  return Http.instance
    .get<GetShareFeedbackListResType>(endpoint, {
      params: { status: FEEDBACK_STATUSES.join(','), limit: SHARE_FEEDBACK_LIST_LIMIT },
    })
    .then((response) => {
      const body = succesResponse<GetShareFeedbackListResType>(response);
      return getShareFeedbackListResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/**
 * @param poll 살아 있는 공유가 있으면 링크 목록처럼 10초마다 다시 읽는다. 손님이 지금 짚고 있을
 *   수 있어서다. 없으면 멈춘다
 */
function useShareFeedbackListQuery({ poll }: { poll: boolean }) {
  return useQuery({
    queryKey: ['share-feedback-list'],
    queryFn: getShareFeedbackList,
    retry: false,
    refetchOnReconnect: false,
    refetchInterval: poll ? SHARE_FEEDBACK_POLL_MS : false,
  });
}

/** 상세 GET — 요소 기술(컴포넌트·소스 후보), 이어진 대화, 이미지가 있는지 */
async function getShareFeedbackDetail(feedbackId: number) {
  return Http.instance
    .get<ShareFeedbackDetail>(`${endpoint}/${feedbackId}`)
    .then((response) => {
      const body = succesResponse<ShareFeedbackDetail>(response);
      return getShareFeedbackDetailResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

function useShareFeedbackDetailQuery(feedbackId: number, enabled: boolean) {
  return useQuery({
    queryKey: ['share-feedback-detail', feedbackId],
    queryFn: () => getShareFeedbackDetail(feedbackId),
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

/** 에이전트용 프롬프트 GET. "프롬프트로 복사" 는 이 Markdown 을 그대로 복사한다(§14.5) */
async function getShareFeedbackPrompt(feedbackId: number) {
  return Http.instance
    .get(`${endpoint}/${feedbackId}/prompt`)
    .then((response) => {
      const body = succesResponse(response);
      return getShareFeedbackPromptResSchema.parse(unwrapApiData(body)).markdown;
    })
    .catch(errorResponse());
}

function useShareFeedbackPromptQuery(feedbackId: number, enabled: boolean) {
  return useQuery({
    queryKey: ['share-feedback-prompt', feedbackId],
    queryFn: () => getShareFeedbackPrompt(feedbackId),
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

/**
 * 이미지 GET(`image/jpeg`, 봉투 없음). 인증 헤더가 필요해 `<img src>` 로는 못 받는다 — 바이트로
 * 받아 data URL 로 바꾼다. blob URL 은 쓰지 않는다: 치우는 시점(effect 정리)이 개발 모드의 두 번
 * 실행·탭 전환과 엇갈려, 캐시에서 다시 그릴 때 이미 치운 URL 을 가리켰다. 잘라 낸 것은 수 KB,
 * 화면도 1MiB 이하라 문자열로 들고 있어도 된다.
 */
/** `annotated` 는 짚은 곳마다 번호를 그린 화면(여러 곳일 때). `mark` 는 ②부터의 잘라 낸 그림(`crop` 에만) */
type ShareFeedbackImageKind = 'crop' | 'screen' | 'annotated';

async function getShareFeedbackImage(
  feedbackId: number,
  kind: ShareFeedbackImageKind,
  mark?: number,
) {
  const params = kind === 'crop' && mark && mark > 1 ? { kind, mark } : { kind };
  return Http.instance
    .get<Blob>(`${endpoint}/${feedbackId}/image`, { params, responseType: 'blob' })
    .then((response) => {
      const blob = response.data;
      if (!(blob instanceof Blob) || !blob.type.startsWith('image/jpeg')) {
        throw new ApiError('이미지가 아닌 응답을 받았습니다.', 'BAD_RESPONSE');
      }
      return blobToDataUrl(blob);
    })
    .catch(errorResponse());
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error('이미지를 읽지 못했습니다.'));
    reader.readAsDataURL(blob);
  });
}

function useShareFeedbackImageQuery(
  feedbackId: number,
  kind: ShareFeedbackImageKind,
  enabled: boolean,
  mark?: number,
) {
  const n = kind === 'crop' && mark && mark > 1 ? mark : 1;
  return useQuery({
    queryKey: ['share-feedback-image', feedbackId, kind, n],
    queryFn: () => getShareFeedbackImage(feedbackId, kind, n),
    enabled,
    retry: false,
    // 한 번 저장된 이미지는 바뀌지 않는다
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

/** 받기·받지 않기·확인함으로 PATCH. 브라우저 로그인만 된다(개인 액세스 토큰은 막힌다) */
async function patchShareFeedbackStatus(
  feedbackId: number,
  status: 'ACCEPTED' | 'DISMISSED' | 'CONFIRMED',
) {
  const payload = patchShareFeedbackReqSchema.parse({ status });
  return Http.instance
    .patch(`${endpoint}/${feedbackId}`, payload)
    .then((response) => {
      const body = succesResponse(response);
      return getShareFeedbackDetailResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** 고쳤다고 표시 POST. 메모는 짚은 사람의 화면에 그대로 보인다 */
async function postShareFeedbackFixed(feedbackId: number, note?: string) {
  const payload = postShareFeedbackFixedReqSchema.parse(note?.trim() ? { note } : {});
  return Http.instance
    .post(`${endpoint}/${feedbackId}/fixed`, payload)
    .then((response) => {
      const body = succesResponse(response);
      return getShareFeedbackDetailResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

export {
  SHARE_FEEDBACK_LIST_LIMIT,
  SHARE_FEEDBACK_POLL_MS,
  getShareFeedbackDetail,
  getShareFeedbackImage,
  getShareFeedbackList,
  getShareFeedbackPrompt,
  patchShareFeedbackStatus,
  postShareFeedbackFixed,
  useShareFeedbackDetailQuery,
  useShareFeedbackImageQuery,
  useShareFeedbackListQuery,
  useShareFeedbackPromptQuery,
};
