import type { PreviewVariant } from '@/types/project-card.type';

type ProjectTemplateFields = {
  templateType?: string | null;
  startMode?: string | null;
};

/**
 * 이 프로젝트가 템플릿을 쓰는가 — **모른다는 답을 포함한다.**
 *
 * `unknown` 이 따로 있는 이유: 목록 응답에 이 필드들이 없을 수 있다. 예전에는 그것을
 * `none` 과 구분하지 않아서, **템플릿으로 만든 프로젝트에도 "템플릿 미설정" 이라고**
 * 적었다. 틀린 안내였을 뿐 아니라 "홈에서 템플릿을 골라 주세요" 라며 **할 수 없는 일**을
 * 시켰다 — 템플릿은 만들 때 한 번만 정하고 나중에 얹을 길이 없다.
 *
 * 모를 때는 아무 말도 하지 않는 것이 맞다. 없다고 단정하는 것보다 낫다.
 */
export type ProjectTemplateState = 'has' | 'none' | 'unknown';

export function resolveProjectTemplateState(project: ProjectTemplateFields): ProjectTemplateState {
  const knowsTemplateType = project.templateType !== undefined;
  const knowsStartMode = project.startMode !== undefined;

  // 둘 다 안 왔으면 판단할 근거가 없다. 하나라도 왔으면 그걸로 가른다 —
  // 서버가 한쪽만 채워 보내기 시작해도 화면이 멈추지 않게 둔다
  if (!knowsTemplateType && !knowsStartMode) return 'unknown';

  if (project.templateType?.trim()) return 'has';
  if (project.startMode === 'template') return 'has';
  return 'none';
}

export function templateTypeToPreviewVariant(templateType: string | null): PreviewVariant {
  const normalized = templateType?.trim().toLowerCase() ?? '';

  if (normalized.includes('portfolio')) return 'portfolio';
  if (normalized.includes('business')) return 'business';
  return 'landing';
}
