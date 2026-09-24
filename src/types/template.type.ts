import { z } from 'zod';

/**
 * 템플릿 하나를 고쳐 쓰는 방법.
 *
 * 서버가 "어느 파일의 무엇을 바꾸면 되는지" 를 미리 정리해 준다. 사용자가 템플릿을
 * 고른 뒤 무엇부터 손대야 하는지 묻지 않아도 되게 하는 값이다.
 */
const templateContentHintSchema = z.object({
  /** 바꿀 것의 이름. `brand` · `hero` 처럼 짧다 */
  key: z.string().prefault(''),
  /** 어느 파일에 있는지 */
  where: z.string().prefault(''),
  /** 무엇인지 사람 말로 */
  desc: z.string().prefault(''),
});

/**
 * 카탈로그의 템플릿 하나.
 *
 * 서버가 GH Pages 의 카탈로그를 그대로 통과시킨다. 그래서 **필드가 늘거나 비어 올 수
 * 있다** — 템플릿 저장소가 먼저 발행되거나 API 가 먼저 나가는 순서에 따라 달라진다.
 * 필수로 잡으면 그 순서 하나에 템플릿 조회 전체가 파싱에서 죽는다.
 */
const templateSchema = z.object({
  /** 프로젝트 생성 때 `templateType` 으로 보내는 값 */
  templateId: z.string().prefault(''),
  name: z.string().prefault(''),
  description: z.string().nullable().prefault(''),
  /**
   * 업종과 형태가 섞여 있다 — `["education", "academy", "one-page"]` 처럼.
   * 화면은 앞쪽 업종 태그로 거른다.
   */
  tags: z.array(z.string()).prefault([]),
  /** 지금은 전부 `vanilla` 다. 열어 둔다 — 늘어날 때 조회가 죽으면 안 된다 */
  stack: z.string().prefault(''),
  /** GH Pages 에 실제로 떠 있는 데모. iframe 으로 그대로 띄울 수 있다 */
  demoUrl: z.string().prefault(''),
  /**
   * 목록 카드에 쓸 그림.
   *
   * **없을 수 있다.** 카탈로그가 Pages 에서 실시간으로 오므로 템플릿 저장소 발행 전에는
   * 이 필드가 아예 없다. 서버도 nullable 로 두었고 화면도 없으면 글자 카드로 떨어진다 —
   * 필수로 잡으면 발행 순서에 따라 템플릿 목록이 통째로 안 뜬다.
   *
   * 주소를 직접 만들지 않는다. 규칙(`t/<id>/thumbnail.jpg`)은 템플릿 저장소의 빌드
   * 스크립트 하나가 갖고 있어야 카탈로그와 실물이 안 어긋난다.
   */
  thumbnailUrl: z.string().nullable().prefault(null),
  /** 고친 뒤 무엇부터 손댈지. 없을 수도 있다 */
  contentHints: z.array(templateContentHintSchema).nullable().prefault([]),
});

/** GET /templates 응답 */
const getTemplateListResSchema = z.array(templateSchema);
/** GET /templates/{templateId} 응답 */
const getTemplateDetailResSchema = templateSchema;

type TemplateContentHint = z.infer<typeof templateContentHintSchema>;
type Template = z.infer<typeof templateSchema>;
type GetTemplateListResType = z.infer<typeof getTemplateListResSchema>;
type GetTemplateDetailResType = z.infer<typeof getTemplateDetailResSchema>;

export {
  templateContentHintSchema,
  templateSchema,
  getTemplateListResSchema,
  getTemplateDetailResSchema,
  type TemplateContentHint,
  type Template,
  type GetTemplateListResType,
  type GetTemplateDetailResType,
};
