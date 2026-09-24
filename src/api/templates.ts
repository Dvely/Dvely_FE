import { useQuery } from '@tanstack/react-query';
import Http from '@/utils/httpClients';
import { errorResponse, succesResponse, unwrapApiData } from '@/utils/response';
import {
  getTemplateDetailResSchema,
  getTemplateListResSchema,
  type GetTemplateDetailResType,
  type GetTemplateListResType,
} from '@/types/template.type';

const endpoint = '/templates';

/**
 * 카탈로그는 배포해야 바뀐다.
 *
 * 서버가 GH Pages 의 카탈로그를 통과시키는 구조라, 템플릿을 새로 발행하지 않는 한
 * 같은 값이 온다. 화면을 옮길 때마다 다시 물을 이유가 없어서 길게 신선한 것으로 둔다.
 */
const CATALOG_STALE_MS = 60 * 60 * 1000;

const defaultQueryOptions = {
  staleTime: CATALOG_STALE_MS,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/** 템플릿 카탈로그 조회 GET */
async function getTemplateList() {
  return Http.instance
    .get<GetTemplateListResType>(endpoint)
    .then((response) => {
      const body = succesResponse<GetTemplateListResType>(response);
      return getTemplateListResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

/** 템플릿 단건 조회 GET */
async function getTemplateDetail(templateId: string) {
  return Http.instance
    .get<GetTemplateDetailResType>(`${endpoint}/${templateId}`)
    .then((response) => {
      const body = succesResponse<GetTemplateDetailResType>(response);
      return getTemplateDetailResSchema.parse(unwrapApiData(body));
    })
    .catch(errorResponse());
}

function useTemplateListQuery(queryKey: unknown) {
  if (!queryKey) throw new Error('queryKey is required');

  return useQuery({
    queryKey: ['template-list', queryKey],
    queryFn: getTemplateList,
    ...defaultQueryOptions,
  });
}

/**
 * 단건 조회.
 *
 * 목록에 이미 같은 값이 다 들어 있어서 대개 필요 없다 — 목록에서 찾아 쓰면 한 번 덜
 * 묻는다. 목록을 거치지 않고 바로 들어온 경우(주소로 열었을 때)를 위해 둔다.
 */
function useTemplateDetailQuery(queryKey: unknown, templateId: string | null) {
  if (!queryKey) throw new Error('queryKey is required');

  return useQuery({
    queryKey: ['template-detail', queryKey, templateId],
    queryFn: () => getTemplateDetail(templateId as string),
    enabled: typeof templateId === 'string' && templateId.length > 0,
    ...defaultQueryOptions,
  });
}

export { getTemplateList, getTemplateDetail, useTemplateListQuery, useTemplateDetailQuery };
