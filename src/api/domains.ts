import Http from '@/utils/httpClients';
import { useQuery } from '@tanstack/react-query';
import { errorResponse, succesResponse } from '@/utils/response';
import {
  domainBindingSubmissionSchema,
  domainSchema,
  getDomainSearchResSchema,
  getDomainVerificationGuideResSchema,
  getProjectDomainListResSchema,
  postProjectDomainBindReqSchema,
  type Domain,
  type DomainBindingSubmission,
  type GetDomainSearchResType,
  type GetDomainVerificationGuideResType,
  type GetProjectDomainListResType,
  type PostProjectDomainBindReqType,
} from '@/types/domain.type';

const defaultQueryOptions = {
  gcTime: 0,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** 프로젝트 도메인 목록 조회 API GET */
async function getProjectDomainList(projectId: number) {
  return Http.instance
    .get<GetProjectDomainListResType>(`/projects/${projectId}/domains`)
    .then((response) => {
      const data = succesResponse<GetProjectDomainListResType>(response);
      return getProjectDomainListResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 도메인 연결 요청 API POST */
async function postProjectDomainBind(projectId: number, params: PostProjectDomainBindReqType) {
  const payload = postProjectDomainBindReqSchema.parse(params);

  return Http.instance
    .post(`/projects/${projectId}/domains`, payload)
    .then((response) => {
      const data = succesResponse(response);
      if (data == null || data === '') return undefined;
      return domainBindingSubmissionSchema.parse(data) as DomainBindingSubmission;
    })
    .catch(errorResponse());
}

/** DNS 검증 재시도 API POST */
async function postDomainVerificationCheck(domainId: number) {
  return Http.instance
    .post<Domain>(`/domains/${domainId}/verification-checks`)
    .then((response) => {
      const data = succesResponse<Domain>(response);
      return domainSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 도메인 상태 조회 API GET */
async function getDomainDetail(domainId: number) {
  return Http.instance
    .get<Domain>(`/domains/${domainId}`)
    .then((response) => {
      const data = succesResponse<Domain>(response);
      return domainSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 도메인 연결 해제 API DELETE */
async function deleteDomain(domainId: number) {
  return Http.instance.delete(`/domains/${domainId}`).then(succesResponse).catch(errorResponse());
}

/** DNS 검증 가이드 조회 API GET */
async function getDomainVerificationGuide(domainId: number) {
  return Http.instance
    .get<GetDomainVerificationGuideResType>(`/domains/${domainId}/verification-guide`)
    .then((response) => {
      const data = succesResponse<GetDomainVerificationGuideResType>(response);
      return getDomainVerificationGuideResSchema.parse(data);
    })
    .catch(errorResponse());
}

/** 도메인 검색 API GET */
async function getDomainSearch(keyword: string) {
  return Http.instance
    .get<GetDomainSearchResType>('/domain-search', { params: { keyword } })
    .then((response) => {
      const data = succesResponse<GetDomainSearchResType>(response);
      return getDomainSearchResSchema.parse(data);
    })
    .catch(errorResponse());
}

const DOMAIN_POLL_MS = 10000;
/** 약 20분. 서버가 확정을 못 하는 경우가 있어 상한 없이는 폴링이 안 멈춘다 */
const MAX_DOMAIN_POLLS = 120;

/** 서버가 알아서 다음 상태로 옮기는 중인 도메인 */
const TRANSITIONAL_DOMAIN_STATUSES = new Set(['REQUESTED', 'PROVISIONING', 'VERIFYING']);

/**
 * 프로젝트 도메인 목록 조회 Query Hook.
 * 확정 대기 중인 도메인이 있으면 폴링한다 — 검증은 서버 워커가 1분마다 돌려 확정하므로,
 * 폴링하지 않으면 사용자가 새로고침할 때까지 화면이 VERIFYING 에 멈춰 있다.
 */
function useProjectDomainListQuery(queryKey: unknown, projectId: number) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['project-domain-list', queryKey, projectId],
    queryFn: () => getProjectDomainList(projectId),
    enabled: !!projectId,
    ...defaultQueryOptions,
    refetchInterval: (query) => {
      const domains = query.state.data;
      if (!domains?.some((domain) => TRANSITIONAL_DOMAIN_STATUSES.has(domain.status))) return false;
      if (query.state.dataUpdateCount > MAX_DOMAIN_POLLS) return false;
      return DOMAIN_POLL_MS;
    },
  });
}

export {
  getProjectDomainList,
  postProjectDomainBind,
  postDomainVerificationCheck,
  getDomainDetail,
  deleteDomain,
  getDomainVerificationGuide,
  getDomainSearch,
  useProjectDomainListQuery,
};
