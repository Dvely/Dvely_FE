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

function useProjectDomainListQuery(queryKey: unknown, projectId: number) {
  if (!queryKey) throw new Error('queryKey is required');
  return useQuery({
    queryKey: ['project-domain-list', queryKey, projectId],
    queryFn: () => getProjectDomainList(projectId),
    enabled: !!projectId,
    ...defaultQueryOptions,
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
