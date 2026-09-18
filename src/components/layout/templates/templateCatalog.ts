import { dummyTemplates } from '@/templates';

export type Template = {
  id: string;
  name: string;
  categories: string[];
  image: string;
  isNew: boolean;
};

const galleryCategories: Record<string, string[]> = {
  monoform: ['studio', 'company'],
  soluna: ['beauty', 'sports'],
  otherday: ['cafe'],
  paperwave: ['shopping', 'culture'],
  axiom: ['company'],
  stillhouse: ['construct', 'studio'],
  offgrid: ['culture'],
  indexfolio: ['studio'],
  relay: ['company'],
  maru: ['sports'],
  kiln: ['edu', 'product'],
  noctua: ['culture'],
};

export const templates: Template[] = dummyTemplates.map((template, index) => ({
  id: template.id,
  name: template.title,
  categories: galleryCategories[template.id] ?? ['company'],
  image: template.image,
  isNew: index >= dummyTemplates.length - 3,
}));
