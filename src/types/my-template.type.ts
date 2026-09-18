import { z } from 'zod';
import {
  TEMPLATE_INDUSTRY_CATEGORIES,
  TEMPLATE_SITE_TYPES,
} from '@/lib/templateCategories';

const myTemplateIndustrySchema = z.enum(
  TEMPLATE_INDUSTRY_CATEGORIES.map((item) => item.id) as [
    (typeof TEMPLATE_INDUSTRY_CATEGORIES)[number]['id'],
    ...(typeof TEMPLATE_INDUSTRY_CATEGORIES)[number]['id'][],
  ],
);

const myTemplateSiteTypeSchema = z.enum(
  TEMPLATE_SITE_TYPES.map((item) => item.id) as [
    (typeof TEMPLATE_SITE_TYPES)[number]['id'],
    ...(typeof TEMPLATE_SITE_TYPES)[number]['id'][],
  ],
);

/**
 * 사용자가 ZIP으로 첨부한 내 템플릿
 */
const myTemplateItemSchema = z.object({
  /** 템플릿 식별자 */
  id: z.string().min(1, '템플릿 ID가 필요합니다.').prefault(''),
  /** 목록에 보여줄 이름 */
  name: z.string().min(1, '템플릿 이름을 입력해주세요.').prefault(''),
  /** 원본 ZIP 파일명 */
  fileName: z.string().min(1, 'ZIP 파일명이 필요합니다.').prefault(''),
  /** 파일 크기(byte) */
  size: z.number().int().nonnegative(),
  /** 사이트 유형 */
  siteType: myTemplateSiteTypeSchema.nullable().prefault(null),
  /** 업종 카테고리 */
  categories: z.array(myTemplateIndustrySchema).prefault([]),
  /** 첨부 시각 ISO 문자열 */
  addedAt: z.string().min(1, '첨부 시각이 필요합니다.').prefault(''),
});

const myTemplateListSchema = z.array(myTemplateItemSchema);

type MyTemplateItem = z.infer<typeof myTemplateItemSchema>;
type MyTemplateList = z.infer<typeof myTemplateListSchema>;
type MyTemplateIndustry = z.infer<typeof myTemplateIndustrySchema>;
type MyTemplateSiteType = z.infer<typeof myTemplateSiteTypeSchema>;

export {
  myTemplateIndustrySchema,
  myTemplateItemSchema,
  myTemplateListSchema,
  myTemplateSiteTypeSchema,
  type MyTemplateIndustry,
  type MyTemplateItem,
  type MyTemplateList,
  type MyTemplateSiteType,
};
