import type { HomeTemplateItem } from '@/mocks/home/homeTemplates';
import monoform from './assets/monoform.png';
import soluna from './assets/soluna.png';
import otherday from './assets/otherday.png';
import paperwave from './assets/paperwave.svg';
import axiom from './assets/axiom.svg';
import stillhouse from './assets/stillhouse.svg';
import offgrid from './assets/offgrid.svg';
import indexfolio from './assets/indexfolio.svg';
import relay from './assets/relay.svg';
import maru from './assets/maru.svg';
import kiln from './assets/kiln.svg';
import noctua from './assets/noctua.svg';

const sourceOrigin = 'https://figma-react-eight-plum.vercel.app';

const catalog = [
  {
    id: 'monoform',
    title: 'MONOFORM 스튜디오',
    tags: ['#크리에이티브', '#스튜디오'],
    image: monoform,
    startType: 'landing',
    categories: ['studio', 'company'],
  },
  {
    id: 'soluna',
    title: 'SOLUNA 웰니스',
    tags: ['#웰니스', '#라이프스타일'],
    image: soluna,
    startType: 'landing',
    categories: ['beauty', 'leisure'],
  },
  {
    id: 'otherday',
    title: 'OTHERDAY 커피',
    tags: ['#커피', '#브랜드'],
    image: otherday,
    startType: 'landing',
    categories: ['cafe'],
  },
  {
    id: 'paperwave',
    title: 'PAPERWAVE 서점',
    tags: ['#북스토어', '#에디토리얼'],
    image: paperwave,
    startType: 'landing',
    categories: ['store'],
  },
  {
    id: 'axiom',
    title: 'AXIOM 데이터',
    tags: ['#SaaS', '#대시보드'],
    image: axiom,
    startType: 'landing',
    categories: ['saas', 'company'],
  },
  {
    id: 'stillhouse',
    title: 'STILLHOUSE 공간',
    tags: ['#인테리어', '#포트폴리오'],
    image: stillhouse,
    startType: 'portfolio',
    categories: ['estate', 'studio'],
  },
  {
    id: 'offgrid',
    title: 'OFFGRID 페스티벌',
    tags: ['#페스티벌', '#타이포그래피'],
    image: offgrid,
    startType: 'landing',
    categories: ['event', 'leisure'],
  },
  {
    id: 'indexfolio',
    title: 'INDEX 디자이너',
    tags: ['#포트폴리오', '#스위스디자인'],
    image: indexfolio,
    startType: 'portfolio',
    categories: ['studio'],
  },
  {
    id: 'relay',
    title: 'RELAY 팀 워크스페이스',
    tags: ['#협업툴', '#칸반보드'],
    image: relay,
    startType: 'landing',
    categories: ['saas', 'company'],
  },
  {
    id: 'maru',
    title: 'MARU 한옥 스테이',
    tags: ['#한옥', '#스테이'],
    image: maru,
    startType: 'landing',
    categories: ['stay'],
    previewUrl: '/template/maru',
    thumbnailPreviewUrl: '/template/maru',
  },
  {
    id: 'kiln',
    title: 'KILN 도예 공방',
    tags: ['#도예', '#공방'],
    image: kiln,
    startType: 'landing',
    categories: ['edu'],
    previewUrl: '/template/kiln',
    thumbnailPreviewUrl: '/template/kiln',
  },
  {
    id: 'noctua',
    title: 'NOCTUA 독립 영화관',
    tags: ['#시네마', '#독립영화'],
    image: noctua,
    startType: 'landing',
    categories: ['event'],
    previewUrl: '/template/noctua',
    thumbnailPreviewUrl: '/template/noctua',
  },
] satisfies HomeTemplateItem[];

export const dummyTemplates: HomeTemplateItem[] = catalog.map((template) => ({
  ...template,
  previewUrl: template.previewUrl ?? `${sourceOrigin}/template/${template.id}`,
  thumbnailPreviewUrl:
    template.thumbnailPreviewUrl ?? `${sourceOrigin}/template/${template.id}`,
}));
