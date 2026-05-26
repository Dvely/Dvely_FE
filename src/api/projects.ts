import Http from '@/utils/httpClients';
import { errorResponse, succesResponse } from '@/utils/response';
import {
  deleteProjectParamsSchema,
  getProjectDetailParamsSchema,
  getProjectDetailResSchema,
  getProjectListResSchema,
  getGithubRepositoryListResSchema,
  getProjectActivityLogListResSchema,
  getProjectCommitListResSchema,
  getProjectOverviewResSchema,
  getProjectRepositoryHealthResSchema,
  patchProjectReqSchema,
  postProjectCreateReqSchema,
  postProjectCreateResSchema,
  postProjectRepositoryReqSchema,
  postProjectRepositoryResSchema,
  type DeleteProjectParamsType,
  type GetProjectDetailResType,
  type GetProjectListResType,
  type GetGithubRepositoryListResType,
  type GetProjectActivityLogListResType,
  type GetProjectCommitListResType,
  type GetProjectOverviewResType,
  type GetProjectRepositoryHealthResType,
  type PatchProjectReqType,
  type PostProjectCreateReqType,
  type PostProjectCreateResType,
  type PostProjectRepositoryReqType,
  type PostProjectRepositoryResType,
} from '@/types/projects.type';

const endpoint = '/projects';

/** GitHub 저장소 목록 조회 API GET */
export async function getGithubRepositoryList() {
  return Http.instance
    .get<GetGithubRepositoryListResType>(`${endpoint}/github/repositories`)
    .then((response) => {
      const data = succesResponse<GetGithubRepositoryListResType>(response);
      return getGithubRepositoryListResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 목록 조회 API GET */
export async function getProjectList() {
  return Http.instance
    .get<GetProjectListResType>(endpoint)
    .then((response) => {
      const data = succesResponse<GetProjectListResType>(response);
      return getProjectListResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 상세 조회 API GET */
export async function getProjectDetail(projectId: number) {
  const { projectId: id } = getProjectDetailParamsSchema.parse({ projectId });

  return Http.instance
    .get<GetProjectDetailResType>(`${endpoint}/${id}`)
    .then((response) => {
      const data = succesResponse<GetProjectDetailResType>(response);
      return getProjectDetailResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 생성 API POST */
export async function postProjectCreate(params: PostProjectCreateReqType) {
  const payload = postProjectCreateReqSchema.parse(params);

  return Http.instance
    .post<PostProjectCreateResType>(endpoint, payload)
    .then((response) => {
      const data = succesResponse<PostProjectCreateResType>(response);
      return postProjectCreateResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 활동 로그 조회 API GET */
export async function getProjectActivityLogList(projectId: number) {
  const { projectId: id } = getProjectDetailParamsSchema.parse({ projectId });

  return Http.instance
    .get<GetProjectActivityLogListResType>(`${endpoint}/${id}/activity-logs`)
    .then((response) => {
      const data = succesResponse<GetProjectActivityLogListResType>(response);
      return getProjectActivityLogListResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 커밋 목록 조회 API GET */
export async function getProjectCommitList(projectId: number) {
  const { projectId: id } = getProjectDetailParamsSchema.parse({ projectId });

  return Http.instance
    .get<GetProjectCommitListResType>(`${endpoint}/${id}/commit`)
    .then((response) => {
      const data = succesResponse<GetProjectCommitListResType>(response);
      return getProjectCommitListResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 개요 조회 API GET */
export async function getProjectOverview(projectId: number) {
  const { projectId: id } = getProjectDetailParamsSchema.parse({ projectId });

  return Http.instance
    .get<GetProjectOverviewResType>(`${endpoint}/${id}/overview`)
    .then((response) => {
      const data = succesResponse<GetProjectOverviewResType>(response);
      return getProjectOverviewResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 저장소 health 확인 API GET */
export async function getProjectRepositoryHealth(projectId: number) {
  const { projectId: id } = getProjectDetailParamsSchema.parse({ projectId });

  return Http.instance
    .get<GetProjectRepositoryHealthResType>(`${endpoint}/${id}/repository-healty`)
    .then((response) => {
      const data = succesResponse<GetProjectRepositoryHealthResType>(response);
      return getProjectRepositoryHealthResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 GitHub 저장소 연결 API POST */
export async function postProjectRepository(
  projectId: number,
  params: PostProjectRepositoryReqType,
) {
  const payload = postProjectRepositoryReqSchema.parse(params);

  return Http.instance
    .post<PostProjectRepositoryResType>(`${endpoint}/${projectId}/repository`, payload)
    .then((response) => {
      const data = succesResponse<PostProjectRepositoryResType>(response);
      return postProjectRepositoryResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 수정 API PATCH */
export async function patchProject(projectId: number, params: PatchProjectReqType) {
  const { projectId: id } = getProjectDetailParamsSchema.parse({ projectId });
  const payload = patchProjectReqSchema.parse(params);

  return Http.instance
    .patch<GetProjectDetailResType>(`${endpoint}/${id}`, payload)
    .then((response) => {
      const data = succesResponse<GetProjectDetailResType>(response);
      return getProjectDetailResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 프로젝트 삭제 API DELETE */
export async function deleteProject(params: DeleteProjectParamsType) {
  const { projectId, deleteMode } = deleteProjectParamsSchema.parse(params);
  const query = deleteMode != null ? { deleteMode } : undefined;

  return Http.instance
    .delete(`${endpoint}/${projectId}`, { params: query })
    .then(succesResponse)
    .catch(errorResponse());
}
