import Http from '@/utils/httpClients';
import { useQuery } from '@tanstack/react-query';
import { errorResponse, succesResponse } from '@/utils/response';
import type { ApiResponse } from '@/types/response.type';
import {
  deleteConversationParamsSchema,
  getConversationDetailParamsSchema,
  getConversationDetailResSchema,
  getConversationMessageListParamsSchema,
  getConversationMessageListResSchema,
  postConversationMessageCreateReqSchema,
  postConversationMessageCreateResSchema,
  getProjectConversationListParamsSchema,
  getProjectConversationListResSchema,
  postProjectConversationCreateParamsSchema,
  postProjectConversationCreateResSchema,
  getTrashConversationListResSchema,
  deleteTrashConversationParamsSchema,
  postTrashConversationRestoreParamsSchema,
  postTrashConversationRestoreResSchema,
  type GetConversationDetailResType,
  type GetTrashConversationListResType,
  type GetConversationMessageListResType,
  type PostConversationMessageCreateReqType,
  type PostConversationMessageCreateResType,
  type GetProjectConversationListResType,
  type PostProjectConversationCreateResType,
  type PostTrashConversationRestoreResType,
} from '@/types/chat.type';

const projectsEndpoint = '/projects';
const conversationsEndpoint = '/conversations';
const trashEndpoint = '/trash';

/** 대화 상세 조회 API GET */
async function getConversationDetail(conversationId: number) {
  const { conversationId: id } = getConversationDetailParamsSchema.parse({
    conversationId,
  });

  return Http.instance
    .get<ApiResponse<GetConversationDetailResType>>(`${conversationsEndpoint}/${id}`)
    .then((response) => {
      const body = succesResponse<ApiResponse<GetConversationDetailResType>>(response);
      return getConversationDetailResSchema.parse(body.data);
    })
    .catch(errorResponse());
}

/**
 * 서버가 다음 페이지 커서를 싣는 헤더.
 *
 * 본문이 아니라 헤더로 오고, 없으면 마지막 페이지다. 백엔드가 CORS
 * exposedHeaders 에 넣어 두어 브라우저 JS 가 읽을 수 있다.
 */
const NEXT_CURSOR_HEADER = 'x-qeploy-next-cursor';

/**
 * 한 번에 받을 최대 행 수.
 *
 * 서버 상한과 같은 값이다. 기본값(500)으로 두고 그냥 부르면 **오래된 것부터 500건만**
 * 오는데, 메시지는 요청 1회에 5~9행씩 쌓여 사용자 턴 55~100 회면 그 선에 닿는다.
 * 그 뒤로는 방금 보낸 메시지가 응답에 없어 화면에서 사라진다 — 오류도 로딩도 없이.
 */
const MESSAGE_PAGE_SIZE = 1000;

/**
 * 한 대화가 넘길 수 있는 페이지 수.
 *
 * 커서가 끝나지 않는 상황(서버 버그·잘못된 커서 순환)에서 무한 루프로 브라우저를
 * 멈추게 하지 않기 위한 안전선이다. 1000 × 50 = 50,000 행이면 어떤 대화든 덮는다.
 */
const MESSAGE_PAGE_LIMIT = 50;

/**
 * 응답 헤더 한 줄을 읽는다.
 *
 * axios 는 헤더를 AxiosHeaders 로 감싸는데, 버전과 어댑터에 따라 평범한 객체로
 * 오기도 한다. 둘 다 받아 둔다 — 여기서 못 읽으면 다음 페이지가 있는데도 마지막으로
 * 판단해 조용히 잘린다.
 */
function readHeader(headers: unknown, name: string): string | null {
  if (!headers || typeof headers !== 'object') return null;

  const bag = headers as Record<string, unknown> & { get?: (key: string) => unknown };
  const value = typeof bag.get === 'function' ? bag.get(name) : bag[name];
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * 대화 메시지 목록 조회 API GET.
 *
 * 커서가 끝날 때까지 이어 받는다. 서버는 오름차순을 유지하므로 받은 순서대로 이으면
 * 그대로 시간순이고, 화면은 지금까지와 같은 구조를 쓴다 — 이 함수가 하는 일은
 * "잘린 뒤를 마저 가져오는 것" 뿐이다.
 */
async function getConversationMessageList(conversationId: number) {
  const { conversationId: id } = getConversationMessageListParamsSchema.parse({
    conversationId,
  });

  const messages: GetConversationMessageListResType = [];
  let after: string | null = null;

  for (let page = 0; page < MESSAGE_PAGE_LIMIT; page += 1) {
    // 기존 호출들과 같은 모양으로 둔다 — then 에서 꺼내고 catch 로 ApiError 를 던진다
    const {
      rows,
      nextCursor,
    }: { rows: GetConversationMessageListResType; nextCursor: string | null } = await Http.instance
      .get<ApiResponse<GetConversationMessageListResType>>(
        `${conversationsEndpoint}/${id}/messages`,
        { params: { limit: MESSAGE_PAGE_SIZE, ...(after ? { after } : {}) } },
      )
      .then((response) => {
        const body = succesResponse<ApiResponse<GetConversationMessageListResType>>(response);
        return {
          rows: getConversationMessageListResSchema.parse(body.data),
          nextCursor: readHeader(response.headers, NEXT_CURSOR_HEADER),
        };
      })
      .catch(errorResponse());

    messages.push(...rows);

    // 헤더가 없으면 마지막 페이지다
    if (!nextCursor) break;
    after = nextCursor;
  }

  return messages;
}

/** 대화 메시지 생성 API POST */
async function postConversationMessageCreate(
  conversationId: number,
  params: PostConversationMessageCreateReqType,
) {
  const { conversationId: id } = getConversationMessageListParamsSchema.parse({
    conversationId,
  });
  const payload = postConversationMessageCreateReqSchema.parse(params);

  return Http.instance
    .post<ApiResponse<PostConversationMessageCreateResType>>(
      `${conversationsEndpoint}/${id}/messages`,
      payload,
    )
    .then((response) => {
      const body = succesResponse<ApiResponse<PostConversationMessageCreateResType>>(response);
      return postConversationMessageCreateResSchema.parse(body.data);
    })
    .catch(errorResponse());
}

/** 프로젝트 대화 목록 조회 API GET */
async function getProjectConversationList(projectId: number) {
  const { projectId: id } = getProjectConversationListParamsSchema.parse({ projectId });

  return Http.instance
    .get<ApiResponse<GetProjectConversationListResType>>(`${projectsEndpoint}/${id}/conversations`)
    .then((response) => {
      const body = succesResponse<ApiResponse<GetProjectConversationListResType>>(response);
      return getProjectConversationListResSchema.parse(body.data);
    })
    .catch(errorResponse());
}

/** 프로젝트 대화 생성 API POST */
async function postProjectConversationCreate(projectId: number) {
  const { projectId: id } = postProjectConversationCreateParamsSchema.parse({
    projectId,
  });

  return Http.instance
    .post<ApiResponse<PostProjectConversationCreateResType>>(
      `${projectsEndpoint}/${id}/conversations`,
    )
    .then((response) => {
      const body = succesResponse<ApiResponse<PostProjectConversationCreateResType>>(response);
      return postProjectConversationCreateResSchema.parse(body.data);
    })
    .catch(errorResponse());
}

/** 대화 삭제 API DELETE */
async function deleteConversation(conversationId: number) {
  const { conversationId: id } = deleteConversationParamsSchema.parse({
    conversationId,
  });

  return Http.instance
    .delete(`${conversationsEndpoint}/${id}`)
    .then(succesResponse)
    .catch(errorResponse());
}

/** 휴지통 대화 목록 조회 API GET */
async function getTrashConversationList() {
  return Http.instance
    .get<ApiResponse<GetTrashConversationListResType>>(`${trashEndpoint}/conversations`)
    .then((response) => {
      const body = succesResponse<ApiResponse<GetTrashConversationListResType>>(response);
      return getTrashConversationListResSchema.parse(body.data);
    })
    .catch(errorResponse());
}

/** 휴지통 대화 복구 API POST */
async function postTrashConversationRestore(conversationId: number) {
  const { conversationId: id } = postTrashConversationRestoreParamsSchema.parse({
    conversationId,
  });

  return Http.instance
    .post<ApiResponse<PostTrashConversationRestoreResType>>(
      `${trashEndpoint}/conversations/${id}/restore`,
    )
    .then((response) => {
      const body = succesResponse<ApiResponse<PostTrashConversationRestoreResType>>(response);
      return postTrashConversationRestoreResSchema.parse(body.data);
    })
    .catch(errorResponse());
}

/** 휴지통 대화 영구 삭제 API DELETE */
async function deleteTrashConversation(conversationId: number) {
  const { conversationId: id } = deleteTrashConversationParamsSchema.parse({
    conversationId,
  });

  return Http.instance
    .delete(`${trashEndpoint}/conversations/${id}`)
    .then(succesResponse)
    .catch(errorResponse());
}

/** 대화 상세 조회 Query Hook */
function useConversationDetailQuery(queryKey: unknown, conversationId: number) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['conversation-detail', queryKey, conversationId],
    queryFn: () => getConversationDetail(conversationId),
    enabled: Number.isInteger(conversationId) && conversationId > 0,
    gcTime: 0,
  });
}

/** 대화 메시지 목록 조회 Query Hook */
const AWAITING_SERVER_MESSAGE_POLL_MS = 5000;
const BASELINE_MESSAGE_POLL_MS = 15000;

/**
 * 대화 메시지 조회 Query Hook.
 *
 * 서버는 사용자 행동과 무관한 시점에 메시지를 덧붙인다 — 배포 완료 안내가 대표적으로,
 * 태스크가 끝난 한참 뒤 GitHub 웹훅으로 추가된다. 그래서 대화를 열어 둔 동안에는
 * 항상 낮은 빈도로 다시 읽는다.
 *
 * "덧붙을 시점을 감지해서 그때만 폴링"은 두 번 실패했다. 전이를 잡아야 하는데 그 전이가
 * 화면 밖에서 일어나기 때문이다(배포 태스크는 접수만 하고 끝나고, 실제 배포는 그 뒤
 * 워커가 돈다). 감지 조건을 넓히는 대신 상시 폴링으로 바꿔 조건 자체를 없앤다.
 *
 * refetchInterval 은 탭이 백그라운드면 기본적으로 멈추므로(refetchIntervalInBackground
 * 기본값 false) 보고 있지 않은 탭이 계속 때리지는 않는다.
 */
function useConversationMessageListQuery(
  queryKey: unknown,
  conversationId: number,
  isAwaitingServerMessage = false,
) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['conversation-message-list', queryKey, conversationId],
    queryFn: () => getConversationMessageList(conversationId),
    enabled: Number.isInteger(conversationId) && conversationId > 0,
    gcTime: 0,
    refetchInterval: isAwaitingServerMessage
      ? AWAITING_SERVER_MESSAGE_POLL_MS
      : BASELINE_MESSAGE_POLL_MS,
  });
}

/** 프로젝트 대화 목록 조회 Query Hook */
function useProjectConversationListQuery(queryKey: unknown, projectId: number) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['project-conversation-list', queryKey, projectId],
    queryFn: () => getProjectConversationList(projectId),
    enabled: Number.isInteger(projectId),
    gcTime: 0,
  });
}

/** 휴지통 대화 목록 조회 Query Hook */
function useTrashConversationListQuery(queryKey: unknown, enabled = true) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['trash-conversation-list', queryKey],
    queryFn: getTrashConversationList,
    enabled,
    gcTime: 0,
  });
}

export {
  getConversationDetail,
  getConversationMessageList,
  postConversationMessageCreate,
  getProjectConversationList,
  postProjectConversationCreate,
  deleteConversation,
  getTrashConversationList,
  postTrashConversationRestore,
  deleteTrashConversation,
  useConversationDetailQuery,
  useConversationMessageListQuery,
  useProjectConversationListQuery,
  useTrashConversationListQuery,
};
