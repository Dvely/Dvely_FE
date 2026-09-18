import { z } from 'zod';

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
  /** 첨부 시각 ISO 문자열 */
  addedAt: z.string().min(1, '첨부 시각이 필요합니다.').prefault(''),
});

const myTemplateListSchema = z.array(myTemplateItemSchema);

type MyTemplateItem = z.infer<typeof myTemplateItemSchema>;

export { myTemplateItemSchema, myTemplateListSchema };
export type { MyTemplateItem };
