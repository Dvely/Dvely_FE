# Zod API 스키마 표준 (Dvely FE)

`src/types/*.type.ts` 및 API 연동용 Zod 스키마를 작성·수정할 때 **반드시** 따른다.  
Spec Kit 구현(`speckit-implement`) 단계에서 API 타입/스키마를 추가할 때 이 문서를 먼저 읽는다.

## 파일 구조

```text
src/types/{domain}.type.ts   # Zod 스키마 + z.infer 타입 (export는 파일 하단 일괄)
src/api/{domain}.ts          # Http 호출, 요청 parse / 응답 parse
```

- 스키마 상수는 `const`로 선언하고, `export { ... }`는 **파일 맨 하단 한 블록**에 모은다.
- 같은 `z.object` 안에서는 필드 사이 **빈 줄을 넣지 않는다** (주석 바로 다음 줄에 필드).
- 필드 설명은 `/** ... */` JSDoc으로 작성한다.

## Zod v4 체이닝 규칙

| 구분 | 규칙 | 예시 |
|------|------|------|
| 문자열 **필수** | `.min(1, '한국어 에러 메시지')` 후 `.prefault('')` (`.nullable()` 없음) | `z.string().min(1, '프로젝트 이름을 입력해주세요.').prefault('')` |
| 문자열 **비필수** | **반드시** `.nullable()` 후 `.prefault('')` (`.optional()` 지양) | `z.string().nullable().prefault('')` |
| enum **비필수** | `.nullable().prefault(null)` (`.optional()` 지양) | `statusSchema.nullable().prefault(null)` |
| 숫자·enum·boolean **필수** | `prefault('')` **사용하지 않음** | `z.number().int()`, `z.enum([...])` |
| 배열·객체 | 상위 스키마에서 정의, 문자열 규칙은 하위 필드에 적용 | `z.array(itemSchema)` |

> **주의**: `prefault`는 `default`와 달리 파싱 **전** 입력을 보정한다. 체이닝 순서는 항상  
> `z.string().min(1, '메시지').prefault('')` 또는 `z.string().nullable().prefault('')` 이다.  
> `prefault` 뒤에 `.min()`을 붙이지 않는다.

## 요청 / 응답 스키마 네이밍

| 용도 | 스키마 이름 | 타입 이름 |
|------|-------------|-----------|
| GET 응답 | `get{Resource}{Action}ResSchema` | `Get{Resource}{Action}ResType` |
| POST 요청 | `post{Resource}{Action}ReqSchema` | `Post{Resource}{Action}ReqType` |
| POST 응답 | `post{Resource}{Action}ResSchema` | `Post{Resource}{Action}ResType` |

공통 enum은 `const` 스키마로 분리해 재사용한다 (예: `projectStatusSchema`).

## API 함수 (`src/api/*.ts`)

- `Http` · `succesResponse` · `errorResponse` 패턴 유지.
- **요청**: `const payload = reqSchema.parse(params)` 후 전송.
- **응답**: `resSchema.parse(succesResponse(response))` 로 검증.
- 함수 위에 `/** ... API GET/POST */` 주석.

## 예시

```typescript
import { z } from 'zod';

const itemSchema = z.object({
  /** 항목 ID */
  id: z.number().int(),
  /** 표시 이름 */
  name: z.string().min(1, '이름을 입력해주세요.').prefault(''),
  /** 비고. 없으면 null */
  note: z.string().nullable().prefault(''),
  /** 태그. 미입력·미사용 시 null */
  tag: z.string().nullable().prefault(''),
});

const getItemListResSchema = z.array(itemSchema);

type GetItemListResType = z.infer<typeof getItemListResSchema>;

export {
  itemSchema,
  getItemListResSchema,
  type GetItemListResType,
};
```

## 체크리스트 (구현 완료 전)

- [ ] 필수 문자열에 `.min(1, '...')` + `.prefault('')` 적용 (nullable 없음)
- [ ] 비필수 문자열·enum에 `.nullable()` 적용 (문자열은 `.prefault('')` 병행)
- [ ] export가 파일 하단에만 있는지
- [ ] `api/*.ts`에서 요청·응답 parse 호출 여부
