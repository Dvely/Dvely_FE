import type { ProjectStartType } from '@/lib/userProjects';
import { dummyTemplates } from '@/templates';

export type HomeTemplateCategory = 'service' | 'church' | 'academy' | 'company' | 'politics';

export type HomeTemplateItem = {
  id: string;
  title: string;
  tags: string[];
  image: string;
  startType: ProjectStartType;
  category: HomeTemplateCategory;
  previewUrl?: string;
  thumbnailPreviewUrl?: string;
};

export const homeTemplates: HomeTemplateItem[] = dummyTemplates;

export const DEFAULT_TEMPLATE_ID = dummyTemplates[0]?.id ?? 'monoform';

export function getHomeTemplateById(id: string) {
  return homeTemplates.find((template) => template.id === id);
}

const DEFAULT_LANDING_PREVIEW_URL =
  'https://aih-b-image-service.cafe24.com/templates/professional/crimson/';

export function resolveHomeTemplatePreviewUrl(template: HomeTemplateItem): string {
  if (template.previewUrl) return template.previewUrl;
  if (template.startType === 'portfolio') return '/template/portfolio';
  return DEFAULT_LANDING_PREVIEW_URL;
}
