import Http from '@/utils/httpClients';
import { useQuery } from '@tanstack/react-query';
import { errorResponse, succesResponse } from '@/utils/response';
import type { ApiResponse } from '@/types/response.type';
import {
  getApprovalDetailResSchema,
  getProjectApprovalListResSchema,
  postApprovalDecideResSchema,
  type GetApprovalDetailResType,
  type GetProjectApprovalListResType,
  type PostApprovalDecideResType,
} from '@/types/approval.type';

function unwrapApiData<T>(body: T | ApiResponse<T>): T {
  if (body && typeof body === 'object' && 'data' in body && body.data != null) {
    return body.data;
  }
  return body as T;
}

const defaultQueryOptions = {
  gcTime: 0,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** 프로젝트 승인 목록 조회 API GET */
async function getProjectApprovalList(projectId: number) {
  return Http.instance
    .get<ApiResponse<GetProjectApprovalListResType>>(`/projects/${projectId}/approvals`)
    .then((response) => {
      const body = succesResponse<ApiResponse<GetProjectApprovalListResType>>(response);
      return getProjectApprovalListResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** 승인 상세 조회 API GET */
async function getApprovalDetail(approvalId: number) {
  return Http.instance
    .get<ApiResponse<GetApprovalDetailResType>>(`/approvals/${approvalId}`)
    .then((response) => {
      const body = succesResponse<ApiResponse<GetApprovalDetailResType>>(response);
      return getApprovalDetailResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/**
 * Agent 작업 승인 API POST.
 * payload는 승인 응답의 input 명세에 맞춘 `{ [input.field]: 값 }`.
 * 생략하거나 빈 값을 보내면 서버가 input.defaultValue를 쓴다.
 */
async function postApprovalApprove(approvalId: number, payload?: Record<string, string>) {
  return Http.instance
    .post<ApiResponse<PostApprovalDecideResType>>(`/approvals/${approvalId}/approve`, payload)
    .then((response) => {
      const body = succesResponse<ApiResponse<PostApprovalDecideResType>>(response);
      return postApprovalDecideResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** Agent 작업 거절 API POST */
async function postApprovalReject(approvalId: number) {
  return Http.instance
    .post<ApiResponse<PostApprovalDecideResType>>(`/approvals/${approvalId}/reject`)
    .then((response) => {
      const body = succesResponse<ApiResponse<PostApprovalDecideResType>>(response);
      return postApprovalDecideResSchema.parse(unwrapApiData(body));
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

/**
 * 대기 중인 승인 상세 조회 쿼리.
 * 승인 유형·입력 명세는 서버만 알고 있으므로, 화면은 채팅 본문이 아니라 이 응답으로 그린다.
 */
function useApprovalDetailQuery(queryKey: unknown, approvalId: number | null) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['approval-detail', queryKey, approvalId],
    queryFn: () => getApprovalDetail(approvalId as number),
    enabled: typeof approvalId === 'number' && approvalId > 0,
    ...defaultQueryOptions,
  });
}

export {
  getProjectApprovalList,
  getApprovalDetail,
  useApprovalDetailQuery,
  postApprovalApprove,
  postApprovalReject,
  useProjectApprovalListQuery,
};
