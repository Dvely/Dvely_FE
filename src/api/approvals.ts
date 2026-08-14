import Http from '@/utils/httpClients';
import { useQuery } from '@tanstack/react-query';
import { errorResponse, succesResponse } from '@/utils/response';
import {
  getApprovalDetailResSchema,
  getProjectApprovalListResSchema,
  postApprovalDecideResSchema,
  type GetApprovalDetailResType,
  type GetProjectApprovalListResType,
  type PostApprovalDecideResType,
} from '@/types/approval.type';

const defaultQueryOptions = {
  gcTime: 0,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** 프로젝트 승인 목록 조회 API GET */
async function getProjectApprovalList(projectId: number) {
  return Http.instance
    .get<GetProjectApprovalListResType>(`/projects/${projectId}/approvals`)
    .then((response) => {
      const data = succesResponse<GetProjectApprovalListResType>(response);
      return getProjectApprovalListResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 승인 상세 조회 API GET */
async function getApprovalDetail(approvalId: number) {
  return Http.instance
    .get<GetApprovalDetailResType>(`/approvals/${approvalId}`)
    .then((response) => {
      const data = succesResponse<GetApprovalDetailResType>(response);
      return getApprovalDetailResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** Agent 작업 승인 API POST */
async function postApprovalApprove(approvalId: number) {
  return Http.instance
    .post<PostApprovalDecideResType>(`/approvals/${approvalId}/approve`)
    .then((response) => {
      const data = succesResponse<PostApprovalDecideResType>(response);
      return postApprovalDecideResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** Agent 작업 거절 API POST */
async function postApprovalReject(approvalId: number) {
  return Http.instance
    .post<PostApprovalDecideResType>(`/approvals/${approvalId}/reject`)
    .then((response) => {
      const data = succesResponse<PostApprovalDecideResType>(response);
      return postApprovalDecideResSchema.parse(data);
    })
    .catch(errorResponse());
}

function useProjectApprovalListQuery(queryKey: unknown, projectId: number) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['project-approval-list', queryKey, projectId],
    queryFn: () => getProjectApprovalList(projectId),
    enabled: !!projectId,
    ...defaultQueryOptions,
  });
}

export {
  getProjectApprovalList,
  getApprovalDetail,
  postApprovalApprove,
  postApprovalReject,
  useProjectApprovalListQuery,
};
