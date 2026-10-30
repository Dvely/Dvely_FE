import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { SERVICE_SUSPENDED } from '@/constants/serviceStatus';
import { toSafeHttpUrl } from '@/lib/safeUrl';
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

/**
 * 카탈로그를 읽는 화면들이 함께 쓰는 키 조각.
 *
 * 이 저장소의 훅은 호출부가 `queryKey` 조각을 넘기는 규칙인데, 화면마다 다른 값을 넘기면
 * **같은 카탈로그가 캐시에 여러 벌** 생기고 화면을 옮길 때마다 한 번씩 다시 받는다.
 * 카탈로그는 배포해야 바뀌는 값이라 화면별로 나눠 둘 이유가 없다 — 한 벌만 둔다.
 */
const TEMPLATE_CATALOG_QUERY_KEY = 'template-catalog';

const defaultQueryOptions = {
  staleTime: CATALOG_STALE_MS,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;

/**
 * 일시 중단 중에는 서버를 거치지 않고 템플릿 저장소의 카탈로그를 바로 읽는다.
 *
 * 서버는 이 파일을 거의 그대로 넘기는 중계였다 — 바꾸는 것은 `id` 를 `templateId` 로
 * 부르는 것 하나다(`PagesTemplateCatalogClient`). 서버가 없다고 랜딩의 제작 사례와 템플릿
 * 화면까지 비울 이유는 없다. Pages 가 CORS 를 열어 두어 브라우저에서 바로 읽힌다.
 *
 * 서버가 하던 URL 스킴 검사(`TemplateCatalogUrlPolicy`)는 여기서 대신한다. 서버는 어긴
 * 템플릿이 있으면 직전 목록을 지키며 문서를 거부했지만, 여기에는 지킬 직전 목록이 없다.
 * 그래서 어긴 값만 지운다 — demoUrl 은 갤러리가 이미 `toSafeHttpUrl` 로 한 번 더 거른다.
 */
const PAGES_CATALOG_URL = 'https://dvely.github.io/qeploy-templates/catalog.json';

const pagesCatalogSchema = z.object({
  templates: z.array(z.looseObject({ id: z.string() })),
});

async function getPagesCatalog(): Promise<GetTemplateListResType> {
  const response = await fetch(PAGES_CATALOG_URL);
  if (!response.ok) {
    throw new Error(`템플릿 카탈로그를 불러오지 못했습니다. (${response.status})`);
  }
  const { templates } = pagesCatalogSchema.parse(await response.json());
  return getTemplateListResSchema.parse(
    templates.map(({ id, demoUrl, thumbnailUrl, ...rest }) => ({
      ...rest,
      templateId: id,
      demoUrl: toSafeHttpUrl(typeof demoUrl === 'string' ? demoUrl : null) ?? '',
      thumbnailUrl: toSafeHttpUrl(typeof thumbnailUrl === 'string' ? thumbnailUrl : null) ?? null,
    })),
  );
}

/** 템플릿 카탈로그 조회 GET */
async function getTemplateList() {
  if (SERVICE_SUSPENDED) return getPagesCatalog();

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
  if (SERVICE_SUSPENDED) {
    const template = (await getPagesCatalog()).find((item) => item.templateId === templateId);
    if (!template) throw new Error('템플릿을 찾을 수 없습니다.');
    return template;
  }

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

export {
  getTemplateList,
  getTemplateDetail,
  useTemplateListQuery,
  useTemplateDetailQuery,
  TEMPLATE_CATALOG_QUERY_KEY,
};
