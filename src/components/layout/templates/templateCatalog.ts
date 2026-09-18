import { dummyTemplates } from '@/templates';

export type Template = {
  id: string;
  name: string;
  categories: string[];
  image: string;
  isNew: boolean;
};

export const templates: Template[] = dummyTemplates.map((template, index) => ({
  id: template.id,
  name: template.title,
  categories: template.categories,
  image: template.image,
  isNew: index >= dummyTemplates.length - 3,
}));
