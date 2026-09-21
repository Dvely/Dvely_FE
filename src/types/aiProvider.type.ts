import { z } from 'zod';

/**
 * 호출한 사용자가 쓸 수 있는 AI 제공자.
 *
 * **본인이 키를 등록한 것만 담겨 온다**(BE #364, 운영 릴리스 #366). 배포에는 벤더 키가
 * 없고 키를 읽는 갈래가 `UserAiKeyResolver` 하나뿐이라, 목록에 온 것은 전부 본인 키로
 * 도는 것이다 — 화면은 이 목록을 그대로 그리면 되고, "고를 수는 있는데 누르면 실패하는"
 * 항목이 생기지 않는다. 하나도 등록하지 않았으면 빈 배열이다.
 *
 * 값을 여기 나열하지 않는 이유가 그것이다. 제공자를 늘리는 것은 서버 설정이라, FE 가
 * 목록을 들고 있으면 늘 때마다 배포가 한 번 더 필요해진다.
 */
const aiProviderInfoSchema = z.object({
  /** 제공자 식별자. 이 값을 메시지 요청의 aiProvider 로 보낸다 */
  provider: z.string().prefault(''),
  /** model 을 안 보내면 서버가 쓰는 값 */
  defaultModel: z.string().nullable().prefault(null),
  /** 지정할 수 있는 모델 전체. 지금은 제공자당 하나씩이다 */
  models: z.array(z.string()).prefault([]),
  /**
   * thinking 파라미터를 받는 모델.
   *
   * 비어 있으면 그 제공자는 thinking 을 지원하지 않는다 — 그런데도 보내면 서버가 400 을
   * 낸다. 화면이 먼저 막아야 하는 조합이다.
   */
  thinkingModels: z.array(z.string()).prefault([]),
});

/** GET /agent/ai-providers 응답 */
const getAiProviderListResSchema = z.object({
  providers: z.array(aiProviderInfoSchema).prefault([]),
});

/**
 * 셀렉트에 보일 이름.
 *
 * 응답의 provider 는 서버 enum 값(`CLAUDE_CODE`)이라 그대로 두면 대문자 식별자가
 * 화면에 노출된다. 벤더 키 하나를 등록하면 벤더와 코딩 에이전트가 함께 내려오므로
 * (`ANTHROPIC` → `ANTHROPIC` + `CLAUDE_CODE`) 둘이 나란히 놓이는데, 식별자 그대로면
 * 무엇이 다른지 읽히지 않는다.
 *
 * **모르는 값은 그대로 보여준다.** 제공자가 느는 것은 서버 설정이라, 이 표에 없다고
 * 항목을 지우면 쓸 수 있는 것을 못 고르게 된다 — #101 에서 겪은 그대로다.
 */
const AI_PROVIDER_LABELS: Record<string, string> = {
  ANTHROPIC: 'Anthropic',
  OPENAI: 'OpenAI',
  GLM: 'GLM',
  CLAUDE_CODE: 'Claude Code',
  CODEX: 'Codex',
};

function aiProviderLabel(provider: string) {
  return AI_PROVIDER_LABELS[provider] ?? provider;
}

/**
 * 코딩 에이전트(벤더 CLI 실행) 인가.
 *
 * 모델 목록이 비어 있는 것이 신호다 — 코드 생성 단계의 모델을 CLI 가 정하므로 고를
 * 것이 없다. 이름을 하드코딩하지 않으려고 이 모양을 쓴다.
 *
 * **이 조건을 목록 필터로 쓰지 말 것.** 예전에 서버 키 벤더를 걸러내는 데 썼다가,
 * 코딩 에이전트가 없는 GLM 만 등록한 사용자가 아무것도 못 쓰게 됐다(#101).
 * 지금은 기본 선택과 model·thinking UI 노출을 정하는 데만 쓴다.
 */
function isCodingAgentProvider(info: AiProviderInfo) {
  return info.models.length === 0 && info.defaultModel === null;
}

type AiProviderInfo = z.infer<typeof aiProviderInfoSchema>;
type GetAiProviderListResType = z.infer<typeof getAiProviderListResSchema>;

export {
  aiProviderInfoSchema,
  aiProviderLabel,
  getAiProviderListResSchema,
  isCodingAgentProvider,
  type AiProviderInfo,
  type GetAiProviderListResType,
};
