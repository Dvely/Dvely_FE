import type { ProjectStartType } from '@/lib/userProjects';
import type { TemplateIndustryCategory } from '@/lib/templateCategories';
import { dummyTemplates } from '@/templates';

export type HomeTemplateCategory = TemplateIndustryCategory;

export type HomeTemplateItem = {
  id: string;
  title: string;
  tags: string[];
  image: string;
  startType: ProjectStartType;
  categories: TemplateIndustryCategory[];
  previewUrl?: string;
  thumbnailPreviewUrl?: string;
};

export const homeTemplates: HomeTemplateItem[] = dummyTemplates;

export const DEFAULT_TEMPLATE_ID = dummyTemplates[0]?.id ?? 'monoform';

export function getHomeTemplateById(id: string) {
  return homeTemplates.find((template) => template.id === id);
}

export function resolveHomeTemplatePreviewUrl(template: HomeTemplateItem): string {
  if (template.previewUrl) return template.previewUrl;
  if (template.startType === 'portfolio') return '/template/portfolio';
  return '/template/portfolio';
}
