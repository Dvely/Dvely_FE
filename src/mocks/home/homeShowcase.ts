import container1 from '@/assets/images/tasktemplate/container1.png';
import container2 from '@/assets/images/tasktemplate/container2.png';
import container3 from '@/assets/images/tasktemplate/container3.png';
import container4 from '@/assets/images/tasktemplate/container4.png';
import container5 from '@/assets/images/tasktemplate/container5.png';
import container6 from '@/assets/images/tasktemplate/container6.png';
import container7 from '@/assets/images/tasktemplate/container7.png';

export type HomeShowcaseItem = {
  id: string;
  title: string;
  image: string;
  category: 'landing' | 'portfolio';
};

export const homeFeaturedProjects: HomeShowcaseItem[] = [
  { id: '1', title: '스타트업 랜딩', image: container1, category: 'landing' },
  { id: '2', title: '제품 소개 페이지', image: container2, category: 'landing' },
  { id: '3', title: '이벤트 프로모션', image: container4, category: 'landing' },
  { id: '4', title: '디자이너 포트폴리오', image: container6, category: 'portfolio' },
  { id: '5', title: '개발자 포트폴리오', image: container7, category: 'portfolio' },
];

export const homeTutorials = [
  {
    id: 't1',
    title: 'AI로 랜딩페이지 만들기',
    subtitle: '5분 가이드',
    image: container3,
    accent: 'from-[#dbeafe] to-[#eff6ff]',
  },
  {
    id: 't2',
    title: '포트폴리오 섹션 구성',
    subtitle: '베스트 프랙티스',
    image: container5,
    accent: 'from-[#f3e8ff] to-[#faf5ff]',
  },
] as const;

export const homeLibrary = [
  {
    id: 'l1',
    title: '랜딩페이지 템플릿',
    subtitle: '12개 템플릿',
    image: container1,
    accent: 'from-[#dcfce7] to-[#f0fdf4]',
  },
  {
    id: 'l2',
    title: '포트폴리오 템플릿',
    subtitle: '8개 템플릿',
    image: container6,
    accent: 'from-[#ffedd5] to-[#fff7ed]',
  },
] as const;
