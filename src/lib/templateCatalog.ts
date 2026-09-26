import type { Template } from '@/types/template.type';
import type { TemplateIndustryCategory, TemplateSiteType } from '@/lib/templateCategories';

/**
 * 카탈로그를 화면이 쓰는 모양으로 옮긴다.
 *
 * 서버는 업종을 따로 주지 않는다 — `tags` 하나에 업종과 형태가 섞여 온다
 * (`["education", "academy", "one-page"]`). 별도 `categories` 필드를 요청할 수도 있었지만,
 * 같은 정보가 두 곳에 생기면 반드시 어긋난다. 태그를 화면 축으로 옮기는 표를 여기 한 곳에
 * 둔다.
 */

/**
 * 카탈로그 태그 → 화면의 업종.
 *
 * 여기 없는 태그는 그냥 무시된다. 표에 빠진 것이 카드를 사라지게 하면 안 되기 때문이다 —
 * 새 템플릿이 모르는 태그를 달고 와도 목록에는 나오고, 업종 필터에서만 안 걸린다.
 */
const TAG_TO_INDUSTRY: Record<string, TemplateIndustryCategory> = {
  education: 'edu',
  academy: 'edu',
  bookstore: 'store',
  culture: 'event',
  cafe: 'cafe',
  food: 'cafe',
  recipe: 'cafe',
  clinic: 'medical',
  care: 'medical',
  pet: 'medical',
  company: 'company',
  corporate: 'company',
  cowork: 'company',
  office: 'company',
  interior: 'estate',
  studio: 'studio',
  portfolio: 'studio',
  gallery: 'studio',
  personal: 'studio',
  landing: 'saas',
  product: 'saas',
  shop: 'store',
  commerce: 'store',
  fashion: 'beauty',
  salon: 'beauty',
  beauty: 'beauty',
  sports: 'leisure',
  club: 'leisure',
  travel: 'leisure',
  tour: 'leisure',
  stay: 'stay',
};

/**
 * 포트폴리오로 볼 태그.
 *
 * 나머지는 랜딩이다. 카탈로그에 그 구분이 따로 없어서 태그로 가른다 — 지금은
 * `portfolio-grid` 하나만 해당된다.
 */
const PORTFOLIO_TAGS = new Set(['portfolio', 'gallery']);

function toIndustries(tags: string[]): TemplateIndustryCategory[] {
  const found = new Set<TemplateIndustryCategory>();
  for (const tag of tags) {
    const industry = TAG_TO_INDUSTRY[tag];
    if (industry) found.add(industry);
  }
  return [...found];
}

function toSiteType(tags: string[]): TemplateSiteType {
  return tags.some((tag) => PORTFOLIO_TAGS.has(tag)) ? 'portfolio' : 'landing';
}

/** 화면이 쓰는 카드 하나 */
type TemplateCardItem = {
  /** 프로젝트를 만들 때 서버로 보내는 값이기도 하다 */
  templateId: string;
  name: string;
  description: string;
  /** 없을 수 있다 — 템플릿 저장소 발행 전에는 서버가 안 준다 */
  thumbnailUrl: string | null;
  demoUrl: string;
  industries: TemplateIndustryCategory[];
  siteType: TemplateSiteType;
  tags: string[];
};

function toTemplateCard(template: Template): TemplateCardItem {
  return {
    templateId: template.templateId,
    name: template.name,
    description: template.description ?? '',
    thumbnailUrl: template.thumbnailUrl,
    demoUrl: template.demoUrl,
    industries: toIndustries(template.tags),
    siteType: toSiteType(template.tags),
    tags: template.tags,
  };
}

export { toTemplateCard, toIndustries, toSiteType, TAG_TO_INDUSTRY, type TemplateCardItem };
