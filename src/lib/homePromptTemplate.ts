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

export function setHomePromptTemplate(template: HomePromptAttachedTemplate) {
  sessionStorage.setItem(HOME_PROMPT_TEMPLATE_KEY, JSON.stringify(template));
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
  sessionStorage.removeItem(HOME_PROMPT_TEMPLATE_KEY);
}
