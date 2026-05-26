import Http from '@/utils/httpClients';
import { errorResponse, succesResponse } from '@/utils/response';
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
export async function getConversationDetail(conversationId: number) {
  const { conversationId: id } = getConversationDetailParamsSchema.parse({
    conversationId,
  });

  return Http.instance
    .get<GetConversationDetailResType>(`${conversationsEndpoint}/${id}`)
    .then((response) => {
      const data = succesResponse<GetConversationDetailResType>(response);
      return getConversationDetailResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 대화 메시지 목록 조회 API GET */
export async function getConversationMessageList(conversationId: number) {
  const { conversationId: id } = getConversationMessageListParamsSchema.parse({
    conversationId,
  });

  return Http.instance
    .get<GetConversationMessageListResType>(
      `${conversationsEndpoint}/${id}/messages`,
    )
    .then((response) => {
      const data = succesResponse<GetConversationMessageListResType>(response);
      return getConversationMessageListResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 대화 메시지 생성 API POST */
export async function postConversationMessageCreate(
  conversationId: number,
  params: PostConversationMessageCreateReqType,
) {
  const { conversationId: id } = getConversationMessageListParamsSchema.parse({
    conversationId,
  });
  const payload = postConversationMessageCreateReqSchema.parse(params);

  return Http.instance
    .post<PostConversationMessageCreateResType>(
      `${conversationsEndpoint}/${id}/messages`,
      payload,
    )
    .then((response) => {
      const data = succesResponse<PostConversationMessageCreateResType>(response);
      return postConversationMessageCreateResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 대화 목록 조회 API GET */
export async function getProjectConversationList(projectId: number) {
  const params = getProjectConversationListParamsSchema.parse({ projectId });

  return Http.instance
    .get<GetProjectConversationListResType>(`${projectsEndpoint}/conversations`, {
      params,
    })
    .then((response) => {
      const data = succesResponse<GetProjectConversationListResType>(response);
      return getProjectConversationListResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 대화 생성 API POST */
export async function postProjectConversationCreate(projectId: number) {
  const { projectId: id } = postProjectConversationCreateParamsSchema.parse({
    projectId,
  });

  return Http.instance
    .post<PostProjectConversationCreateResType>(
      `${projectsEndpoint}/${id}/conversations`,
    )
    .then((response) => {
      const data = succesResponse<PostProjectConversationCreateResType>(response);
      return postProjectConversationCreateResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 대화 삭제 API DELETE */
export async function deleteConversation(conversationId: number) {
  const { conversationId: id } = deleteConversationParamsSchema.parse({
    conversationId,
  });

  return Http.instance
    .delete(`${conversationsEndpoint}/${id}`)
    .then(succesResponse)
    .catch(errorResponse());
}

/** 휴지통 대화 목록 조회 API GET */
export async function getTrashConversationList() {
  return Http.instance
    .get<GetTrashConversationListResType>(`${trashEndpoint}/conversations`)
    .then((response) => {
      const data = succesResponse<GetTrashConversationListResType>(response);
      return getTrashConversationListResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 휴지통 대화 복구 API POST */
export async function postTrashConversationRestore(conversationId: number) {
  const { conversationId: id } = postTrashConversationRestoreParamsSchema.parse({
    conversationId,
  });

  return Http.instance
    .post<PostTrashConversationRestoreResType>(
      `${trashEndpoint}/conversations/${id}/restore`,
    )
    .then((response) => {
      const data = succesResponse<PostTrashConversationRestoreResType>(response);
      return postTrashConversationRestoreResSchema.parse(data);
    })
    .catch(errorResponse());
}
