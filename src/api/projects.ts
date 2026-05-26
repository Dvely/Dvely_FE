import Http from '@/utils/httpClients';
import { errorResponse, succesResponse } from '@/utils/response';
import {
  getProjectListResSchema,
  type GetProjectListResType,
} from '@/types/projects.type';

const endpoint = '/projects';

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
