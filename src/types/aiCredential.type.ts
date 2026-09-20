import { z } from 'zod';

/**
 * 사용자 본인 AI API 키(BYOK).
 *
 * 등록한 키로 코딩 에이전트(CLAUDE_CODE · CODEX)가 격리 컨테이너에서 돌고,
 * **사용량은 사용자 계정으로 직접 청구된다.** 서버가 운영자 키로 대신 채워 주는
 * 경로는 없다 — 제공사 약관이 사용자를 대신한 결제·중개를 금지한다.
 */

/**
 * 키를 등록할 수 있는 벤더.
 *
 * 실행 모드(CLAUDE_CODE · CODEX)로는 등록할 수 없다. Claude Code 는 Anthropic 키를,
 * Codex 는 OpenAI 키를 쓰므로 **사용자는 벤더당 키를 한 번만 넣으면 된다.** 실행
 * 모드로 PUT 하면 400 이고, 응답이 어느 벤더로 등록해야 하는지 알려준다.
 */
const AI_CREDENTIAL_VENDORS = ['ANTHROPIC', 'OPENAI', 'GLM'] as const;

type AiCredentialVendor = (typeof AI_CREDENTIAL_VENDORS)[number];

/**
 * 응답의 provider 는 열린 문자열로 받는다.
 *
 * 벤더가 늘면 그 값이 실린 응답이 통째로 파싱에 실패하는 것을 막는다 — 목록 한
 * 줄 때문에 화면 전체가 비는 것이 모르는 값을 그대로 그리는 것보다 나쁘다.
 * 등록 폼이 고르게 하는 값은 위 AI_CREDENTIAL_VENDORS 로 따로 닫아 둔다.
 */
const aiCredentialSchema = z.object({
  aiProviderCredentialId: z.number().prefault(0),
  provider: z.string().prefault(''),
  /**
   * 마스킹된 키. **앞 6자만 남는다**(`sk-ant****`).
   *
   * 뒤 4자를 보여주는 흔한 관례와 반대인데, 꼬리가 실제 키 엔트로피라 의도적으로
   * 가린 것이다. 그대로 표시하면 된다 — 화면에서 다시 자르지 말 것.
   */
  maskedApiKey: z.string().prefault(''),
  label: z.string().nullable().prefault(null),
  createdAt: z.string().prefault(''),
  updatedAt: z.string().prefault(''),
});

/** GET /ai-credentials — 본인이 등록한 것만 온다(소유자는 토큰에서만 결정된다) */
const getAiCredentialListResSchema = z.array(aiCredentialSchema).prefault([]);

/** PUT /ai-credentials/{provider} — 등록과 교체가 같은 동작이다 */
const putAiCredentialReqSchema = z.object({
  apiKey: z.string().min(1),
  /** 선택. 최대 64자 */
  label: z.string().max(64).nullable().optional(),
});

const putAiCredentialResSchema = aiCredentialSchema;

type AiCredential = z.infer<typeof aiCredentialSchema>;
type GetAiCredentialListResType = z.infer<typeof getAiCredentialListResSchema>;
type PutAiCredentialReqType = z.infer<typeof putAiCredentialReqSchema>;
type PutAiCredentialResType = z.infer<typeof putAiCredentialResSchema>;

export {
  AI_CREDENTIAL_VENDORS,
  aiCredentialSchema,
  getAiCredentialListResSchema,
  putAiCredentialReqSchema,
  putAiCredentialResSchema,
  type AiCredential,
  type AiCredentialVendor,
  type GetAiCredentialListResType,
  type PutAiCredentialReqType,
  type PutAiCredentialResType,
};
