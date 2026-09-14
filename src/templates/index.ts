import type { HomeTemplateItem } from '@/mocks/home/homeTemplates';
import monoform from './assets/monoform.png';
import soluna from './assets/soluna.png';
import otherday from './assets/otherday.png';
import paperwave from './assets/paperwave.svg';
import axiom from './assets/axiom.svg';
import stillhouse from './assets/stillhouse.svg';

const sourceOrigin = 'https://figma-react-eight-plum.vercel.app';

/** Static demo catalog. These entries do not create or deploy a real project. */
const catalog = [
  {
    id: 'monoform',
    title: 'MONOFORM 스튜디오',
    tags: ['#크리에이티브', '#스튜디오'],
    image: monoform,
    startType: 'landing',
    category: 'company',
  },
  {
    id: 'soluna',
    title: 'SOLUNA 웰니스',
    tags: ['#웰니스', '#라이프스타일'],
    image: soluna,
    startType: 'landing',
    category: 'service',
  },
  {
    id: 'otherday',
    title: 'OTHERDAY 커피',
    tags: ['#커피', '#브랜드'],
    image: otherday,
    startType: 'landing',
    category: 'service',
  },
  {
    id: 'paperwave',
    title: 'PAPERWAVE 서점',
    tags: ['#북스토어', '#에디토리얼'],
    image: paperwave,
    startType: 'landing',
    category: 'service',
  },
  {
    id: 'axiom',
    title: 'AXIOM 데이터',
    tags: ['#SaaS', '#대시보드'],
    image: axiom,
    startType: 'landing',
    category: 'company',
  },
  {
    id: 'stillhouse',
    title: 'STILLHOUSE 공간',
    tags: ['#인테리어', '#포트폴리오'],
    image: stillhouse,
    startType: 'portfolio',
    category: 'company',
  },
] satisfies HomeTemplateItem[];

export const dummyTemplates: HomeTemplateItem[] = catalog.map((template) => ({
  ...template,
  previewUrl: `${sourceOrigin}/template/${template.id}`,
  thumbnailPreviewUrl: `${sourceOrigin}/template/${template.id}`,
}));
