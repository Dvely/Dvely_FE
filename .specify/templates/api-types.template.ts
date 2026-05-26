/**
 * Spec Kit API 타입 템플릿
 * 복사 후 {domain} 치환. 규칙: .specify/standards/zod-api-schema.md
 */
import { z } from 'zod';

/**
 * {설명}
 * @example "{예시값}"
 */
const exampleStatusSchema = z.enum(['DRAFT']);

/**
 * {HTTP_METHOD} {path} {설명} 요청
 */
const postExampleReqSchema = z.object({
  /** {필드 설명} */
  name: z.string().min(1, '{필드}을(를) 입력해주세요.').prefault(''),
  /** {비필수 필드 설명} */
  optionalNote: z.string().nullable().prefault(''),
  /** {null 허용 필드 설명} */
  nullableUrl: z.string().nullable().prefault(''),
});

/**
 * {HTTP_METHOD} {path} {설명} 응답
 */
const postExampleResSchema = z.object({
  /** {필드 설명} */
  id: z.number().int(),
  name: z.string().min(1, '{필드}이(가) 없습니다.').prefault(''),
  status: exampleStatusSchema,
});

/** {타입 설명} */
type ExampleStatus = z.infer<typeof exampleStatusSchema>;
/** {HTTP_METHOD} {path} {설명} 요청 */
type PostExampleReqType = z.infer<typeof postExampleReqSchema>;
/** {HTTP_METHOD} {path} {설명} 응답 */
type PostExampleResType = z.infer<typeof postExampleResSchema>;

export {
  exampleStatusSchema,
  postExampleReqSchema,
  postExampleResSchema,
  type ExampleStatus,
  type PostExampleReqType,
  type PostExampleResType,
};
