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

/**
 * 이 대화에서 사람이 눌러야 할 승인이 생겼는지 계속 지켜본다.
 *
 * 화면은 태스크가 끝나는 순간 승인을 **한 번** 찾는데, 배포는 승인을 만들기 직전에
 * 태스크를 끝낸다 — 실제 프로비저닝을 워커에 넘기기 때문이다. 그래서 물어본 시점에는
 * 아직 없고, 잠시 뒤 생긴다. 한 번만 묻는 구조로는 그 틈을 못 넘는다.
 *
 * 새로고침으로도 못 살린다. 태스크가 이미 끝났으니 되살릴 것을 찾는 조회가 빈손으로
 * 돌아오고, 그러면 승인을 찾을 계기 자체가 없다.
 *
 * 그래서 계속 묻는다. 언제 생기든 다음 주기에 잡힌다 — 서버가 진실이고 화면은 물어볼
 * 뿐이라는 점에서 프리뷰 세션을 다시 확인하는 것과 같은 방식이다.
 *
 * 서버가 배포 승인 동안 태스크를 살려 두게 바뀌면 이 폴링은 필요 없어진다. 그때는
 * 태스크가 승인을 안고 기다리므로 원래의 한 번 조회로 충분하다.
 */
const PENDING_APPROVAL_POLL_MS = 10_000;

function useConversationPendingApprovalQuery(
  queryKey: unknown,
  projectId: number,
  conversationId: number | null,
) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    // 접두사를 맞춰 둔다 — 승인을 결정할 때 도는 무효화가 이 조회도 같이 걷어간다
    queryKey: ['project-approval-list', 'conversation-pending', queryKey, projectId, conversationId],
    queryFn: async () => {
      const approvals = await getProjectApprovalList(projectId);
      const pending = approvals.find(
        (approval) => approval.status === 'PENDING' && approval.conversationId === conversationId,
      );
      return pending?.approvalId ?? null;
    },
    enabled: !!projectId && conversationId != null,
    refetchInterval: PENDING_APPROVAL_POLL_MS,
    ...defaultQueryOptions,
  });
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
  useConversationPendingApprovalQuery,
  useProjectApprovalListQuery,
};
