import Http from '@/utils/httpClients';
import { useQuery } from '@tanstack/react-query';
import { errorResponse, succesResponse } from '@/utils/response';
import type { ApiResponse } from '@/types/response.type';
import {
  getResultScopeResSchema,
  type GetResultScopeResType,
  type RejectOption,
} from '@/types/resultScope.type';
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

/**
 * 결과 승인이 main 에 무엇을 반영하는지 묻는다.
 *
 * 승인 상세에 붙이지 않고 따로 부르는 이유: 서버가 GitHub 비교를 호출하므로 목록이
 * 느려진다. 카드를 열 때만 부른다.
 *
 * **재인증 모달을 띄우지 않게 막는다.** 이 호출이 403 재인증을 받으면 Http 인터셉터가
 * 앱 전역 모달을 띄우는데, 그 모달에는 닫기가 없다. 카드를 열었을 뿐인 사용자가 갇히고
 * 거절조차 못 하게 된다. 재인증 안내는 카드가 제 자리에서 한다.
 */
async function getApprovalResultScope(approvalId: number) {
  return Http.instance
    .get<ApiResponse<GetResultScopeResType>>(`/approvals/${approvalId}/result-scope`, {
      skipReauthPrompt: true,
    })
    .then((response) => {
      const body = succesResponse<ApiResponse<GetResultScopeResType>>(response);
      return getResultScopeResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/**
 * Agent 작업 거절 API POST.
 *
 * `option` 은 결과 승인에서만 쓴다. 생략하면 서버가 KEEP 으로 본다 — 기존 호출부가
 * 그대로 돌아가도록 서버가 그렇게 정했다.
 */
async function postApprovalReject(approvalId: number, option?: RejectOption['option']) {
  return Http.instance
    .post<ApiResponse<PostApprovalDecideResType>>(
      `/approvals/${approvalId}/reject`,
      option ? { option } : undefined,
    )
    .then((response) => {
      const body = succesResponse<ApiResponse<PostApprovalDecideResType>>(response);
      return postApprovalDecideResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/**
 * 이 대화에서 사람이 눌러야 할 승인이 생겼는지 계속 지켜본다.
 *
 * 화면은 태스크가 끝나는 순간 승인을 **한 번** 찾는다. 그런데 승인이 그보다 늦게
 * 생기는 흐름이 있고, 그러면 물어본 시점에는 없다가 잠시 뒤 나타난다. 한 번만 묻는
 * 구조로는 그 틈을 못 넘는다. 새로고침으로도 못 살린다 — 태스크가 이미 끝났으니
 * 되살릴 것을 찾는 조회가 빈손으로 돌아오고, 승인을 찾을 계기 자체가 없다.
 *
 * 그래서 계속 묻는다. 언제 생기든 다음 주기에 잡힌다 — 서버가 진실이고 화면은 물어볼
 * 뿐이라는 점에서 프리뷰 세션을 다시 확인하는 것과 같은 방식이다.
 *
 * **다만 이 대화에 매달린 승인만 잡는다.** 서버가 승인에 대화 ID 를 실어 줄 때만
 * 여기 걸린다. 화면 쪽에서 시작한 것(도메인 해제 등)은 그 값이 없어 안 잡히고, 그건
 * 승인 화면에서 눌러야 한다.
 *
 * 범위를 넓혀서 잡을 수도 있지만 그러지 않는다. 예전에 그렇게 했다가 **다른 대화의
 * 승인 카드가 뜨는** 문제가 있었고, 승인은 되돌리기 어려우므로 엉뚱한 것을 띄우느니
 * 아무것도 안 띄우는 편이 낫다.
 *
 * 배포 승인(DB·서버 생성)은 한동안 그 값이 비어 있어 안 잡혔는데, 서버가 실어 주도록
 * 바뀌었다. **아직 눈으로 확인하지는 못했다** — 확인하려면 실제 배포를 걸어야 한다.
 *
 * 새로고침으로 되살리는 것은 여전히 안 된다. 배포 태스크는 승인을 만들고 끝나므로
 * 되살릴 것을 찾는 조회가 빈손으로 돌아온다. 이 폴링이 떠 있는 동안에만 잡힌다.
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
    queryKey: [
      'project-approval-list',
      'conversation-pending',
      queryKey,
      projectId,
      conversationId,
    ],
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

/**
 * 결과 승인 카드를 열 때 반영 범위를 가져온다.
 *
 * `retry: false` — GitHub 비교가 실패하면 서버가 200 + `scopeState: UNAVAILABLE` 로
 * 내려 주므로, 여기서 재시도할 상황은 403·네트워크 끊김 정도다. 둘 다 다시 물어서
 * 풀리지 않는다.
 */
function useApprovalResultScopeQuery(approvalId: number | null) {
  return useQuery({
    queryKey: ['approval-result-scope', approvalId],
    queryFn: () => getApprovalResultScope(approvalId as number),
    enabled: Number.isInteger(approvalId) && (approvalId as number) > 0,
    ...defaultQueryOptions,
  });
}

export {
  getApprovalResultScope,
  getProjectApprovalList,
  getApprovalDetail,
  useApprovalDetailQuery,
  useApprovalResultScopeQuery,
  postApprovalApprove,
  postApprovalReject,
  useConversationPendingApprovalQuery,
  useProjectApprovalListQuery,
};
