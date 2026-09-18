export const TEMPLATE_INDUSTRY_CATEGORIES = [
  { id: 'company', label: '기업/회사소개' },
  { id: 'saas', label: '스타트업/SaaS' },
  { id: 'store', label: '쇼핑몰' },
  { id: 'cafe', label: '카페/음식점' },
  { id: 'beauty', label: '패션/뷰티' },
  { id: 'edu', label: '학원/교육' },
  { id: 'stay', label: '숙박/펜션' },
  { id: 'estate', label: '부동산/인테리어' },
  { id: 'studio', label: '포트폴리오/스튜디오' },
  { id: 'event', label: '공연/전시/이벤트' },
  { id: 'leisure', label: '여행/레저/스포츠' },
  { id: 'medical', label: '병원/의료' },
  { id: 'nonprofit', label: '종교/단체' },
] as const;

export type TemplateIndustryCategory = (typeof TEMPLATE_INDUSTRY_CATEGORIES)[number]['id'];

export const TEMPLATE_INDUSTRY_LABEL = Object.fromEntries(
  TEMPLATE_INDUSTRY_CATEGORIES.map((item) => [item.id, item.label]),
) as Record<TemplateIndustryCategory, string>;

export const TEMPLATE_SITE_TYPES = [
  { id: 'landing', label: '랜딩' },
  { id: 'portfolio', label: '포트폴리오' },
] as const;

export type TemplateSiteType = (typeof TEMPLATE_SITE_TYPES)[number]['id'];

export function templateHasIndustry(
  categories: TemplateIndustryCategory[],
  industry: TemplateIndustryCategory,
) {
  return categories.includes(industry);
}
