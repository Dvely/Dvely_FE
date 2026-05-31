import type { ProjectStartType } from '@/lib/userProjects';
import container1 from '@/assets/images/tasktemplate/container1.png';
import container2 from '@/assets/images/tasktemplate/container2.png';
import container3 from '@/assets/images/tasktemplate/container3.png';
import container4 from '@/assets/images/tasktemplate/container4.png';
import container5 from '@/assets/images/tasktemplate/container5.png';
import container6 from '@/assets/images/tasktemplate/container6.png';
import container7 from '@/assets/images/tasktemplate/container7.png';

export type HomeTemplateCategory = 'service' | 'church' | 'academy' | 'company' | 'politics';

export type HomeTemplateItem = {
  id: string;
  title: string;
  tags: string[];
  image: string;
  startType: ProjectStartType;
  category: HomeTemplateCategory;
};

function resolveStartType(tags: string[]): ProjectStartType {
  if (tags.some((tag) => tag.includes('포트폴리오'))) return 'portfolio';
  return 'landing';
}

export const homeTemplates: HomeTemplateItem[] = [
  {
    id: '1',
    title: '세움 세무법인',
    tags: ['#회계', '#원페이지'],
    image: container2,
    startType: 'landing',
    category: 'service',
  },
  {
    id: '2',
    title: 'Crimson',
    tags: ['#포트폴리오', '#애니메이션'],
    image: container1,
    startType: resolveStartType(['#포트폴리오', '#애니메이션']),
    category: 'service',
  },
  {
    id: '3',
    title: 'Aqualine Villas',
    tags: ['#빌라', '#풀빌라'],
    image: container3,
    startType: 'landing',
    category: 'academy',
  },
  {
    id: '4',
    title: '비트팩토리 아카데미',
    tags: ['#음악학원', '#사이트브랜딩'],
    image: container4,
    startType: 'landing',
    category: 'academy',
  },
  {
    id: '5',
    title: '블랑뷰티살롱',
    tags: ['#뷰티', '#헤어샵'],
    image: container5,
    startType: 'landing',
    category: 'service',
  },
  {
    id: '6',
    title: '박도안 단체장',
    tags: ['#인사말', '#활동뉴스'],
    image: container6,
    startType: 'landing',
    category: 'politics',
  },
  {
    id: '7',
    title: '새물교회',
    tags: ['#교회', '#사역소개'],
    image: container7,
    startType: 'landing',
    category: 'church',
  },
  {
    id: '8',
    title: '라운지스테이',
    tags: ['#게스트하우스', '#숙박'],
    image: container1,
    startType: 'landing',
    category: 'academy',
  },
];

export const DEFAULT_TEMPLATE_ID = '2';

export function getHomeTemplateById(templateId: string): HomeTemplateItem | undefined {
  return homeTemplates.find((t) => t.id === templateId);
}
