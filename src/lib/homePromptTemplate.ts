import type { Template } from '@/types/template.type';
import { toTemplateCard } from '@/lib/templateCatalog';

/**
 * 프롬프트에 얹힌 템플릿.
 *
 * **`id` 는 서버 카탈로그의 `templateId` 다.** 프로젝트를 만들 때 `templateType` 으로
 * 그대로 보내는 값이라, 화면에서 만든 값이면 안 된다 — 카탈로그에 없는 값을 보내면
 * 서버가 400 을 낸다.
 *
 * 표시 이름(`학원 홈`)을 보내도 400 이다. 서버가 `[a-z0-9][a-z0-9_-]{0,49}` 만 받는다.
 */
export type HomePromptAttachedTemplate = {
  /** 카탈로그 templateId. 생성 요청의 templateType 으로 나간다 */
  id: string;
  title: string;
  /** 없을 수 있다 — 템플릿 저장소 발행 전에는 서버가 안 준다 */
  image: string | null;
  subtitle: string;
};

const HOME_PROMPT_TEMPLATE_KEY = 'dvely:home-prompt-template';

export function toHomePromptAttachedTemplate(template: Template): HomePromptAttachedTemplate {
  const card = toTemplateCard(template);
  return {
    id: card.templateId,
    title: card.name,
    image: card.thumbnailUrl,
    subtitle: card.siteType === 'portfolio' ? '포트폴리오 템플릿' : '웹사이트 템플릿',
  };
}

/**
 * 얹은 템플릿을 맡겨 둔다.
 *
 * **실패해도 던지지 않는다.** 읽는 쪽(`readHomePromptTemplate`)은 이미 try/catch 로
 * 감싸 두었는데 쓰는 쪽만 맨몸이었다. 저장이 막힌 브라우저에서는 `setItem` 이 던지고,
 * 호출부는 그 다음 줄에서 화면을 옮기거나(미리보기의 "템플릿 사용하기") 렌더 중인
 * 이펙트 안에 있다 — 앞에서는 버튼이 아무 일도 안 하고, 뒤에서는 화면이 통째로 죽는다.
 *
 * 맡기기는 편의다. 주소의 `templateId` 가 진짜 출처이고 이건 화면을 떠났다 돌아올 때를
 * 위한 사본이라, 못 맡겨도 흐름 자체는 그대로 굴러간다.
 */
export function setHomePromptTemplate(template: HomePromptAttachedTemplate) {
  try {
    sessionStorage.setItem(HOME_PROMPT_TEMPLATE_KEY, JSON.stringify(template));
  } catch {
    // 못 맡겼다. 주소에 templateId 가 남아 있으므로 이번 화면에서는 그대로 얹힌다
  }
}

export function readHomePromptTemplate(): HomePromptAttachedTemplate | null {
  try {
    const raw = sessionStorage.getItem(HOME_PROMPT_TEMPLATE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;

    const record = parsed as Partial<HomePromptAttachedTemplate>;
    if (
      typeof record.id !== 'string' ||
      typeof record.title !== 'string' ||
      typeof record.subtitle !== 'string' ||
      // 그림은 없을 수 있다. 나머지와 달리 null 을 정상으로 받는다
      (record.image != null && typeof record.image !== 'string')
    ) {
      return null;
    }

    return record as HomePromptAttachedTemplate;
  } catch {
    return null;
  }
}

export function clearHomePromptTemplate() {
  try {
    sessionStorage.removeItem(HOME_PROMPT_TEMPLATE_KEY);
  } catch {
    // 지우지 못했다. 맡긴 적이 없으면 지울 것도 없다
  }
}
