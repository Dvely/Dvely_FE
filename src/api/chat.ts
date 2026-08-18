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

/** 대화 메시지 목록 조회 API GET */
async function getConversationMessageList(conversationId: number) {
  const { conversationId: id } = getConversationMessageListParamsSchema.parse({
    conversationId,
  });

  return Http.instance
    .get<ApiResponse<GetConversationMessageListResType>>(`${conversationsEndpoint}/${id}/messages`)
    .then((response) => {
      const body = succesResponse<ApiResponse<GetConversationMessageListResType>>(response);
      return getConversationMessageListResSchema.parse(body.data);
    })
    .catch(errorResponse());
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
/** 약 10분. 서버가 배포 완료를 영영 못 받는 경우가 있어 상한 없이는 폴링이 안 멈춘다 */
const MAX_AWAITING_SERVER_MESSAGE_POLLS = 120;

/**
 * 대화 메시지 조회 Query Hook.
 * isAwaitingServerMessage는 사용자의 행동 없이 서버가 메시지를 덧붙일 예정인 구간인지다.
 * 배포 완료 안내가 그런 경우로, 태스크가 끝난 한참 뒤 GitHub 웹훅으로 추가된다.
 * 그 구간에 폴링하지 않으면 새로고침해야만 보인다.
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
    refetchInterval: (query) => {
      if (!isAwaitingServerMessage) return false;
      if (query.state.dataUpdateCount > MAX_AWAITING_SERVER_MESSAGE_POLLS) return false;
      return AWAITING_SERVER_MESSAGE_POLL_MS;
    },
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
