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
  // 카탈로그의 한글 태그와 기존 영문 태그를 같은 업종으로 연결한다.
  기업: 'company',
  '공유 오피스': 'company',
  사무실: 'company',
  '업무 공간': 'company',
  스타트업: 'saas',
  saas: 'saas',
  쇼핑: 'store',
  쇼핑몰: 'store',
  소매점: 'store',
  편의점: 'store',
  서점: 'store',
  마켓: 'store',
  카페: 'cafe',
  커피: 'cafe',
  음식: 'cafe',
  식품: 'cafe',
  레시피: 'cafe',
  패션: 'beauty',
  뷰티: 'beauty',
  화장품: 'beauty',
  교육: 'edu',
  학원: 'edu',
  숙소: 'stay',
  숙박: 'stay',
  펜션: 'stay',
  인테리어: 'estate',
  부동산: 'estate',
  건축: 'estate',
  포트폴리오: 'studio',
  스튜디오: 'studio',
  갤러리: 'studio',
  개인: 'studio',
  문화: 'event',
  공연: 'event',
  전시: 'event',
  이벤트: 'event',
  여행: 'leisure',
  레저: 'leisure',
  스포츠: 'leisure',
  클럽: 'leisure',
  아쿠아리움: 'leisure',
  의원: 'medical',
  병원: 'medical',
  의료: 'medical',
  종교: 'nonprofit',
  단체: 'nonprofit',
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
const PORTFOLIO_TAGS = new Set(['portfolio', 'gallery', '포트폴리오', '갤러리']);

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

function toIndustries(tags: string[]): TemplateIndustryCategory[] {
  const found = new Set<TemplateIndustryCategory>();
  for (const tag of tags) {
    const industry = TAG_TO_INDUSTRY[normalizeTag(tag)];
    if (industry) found.add(industry);
  }
  return [...found];
}

function toSiteType(tags: string[]): TemplateSiteType {
  return tags.some((tag) => PORTFOLIO_TAGS.has(normalizeTag(tag))) ? 'portfolio' : 'landing';
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
