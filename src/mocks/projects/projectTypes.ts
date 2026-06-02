export type DeployStatus = 'pending' | 'deploying' | 'deployed';
export type ProjectCategory = 'landing' | 'portfolio' | 'business';
export type PreviewVariant = 'landing' | 'portfolio' | 'business';

export type ProjectItem = {
  id: string;
  slug: string;
  deployStatus: DeployStatus;
  category: ProjectCategory;
  hasTemplate: boolean;
  subtitle: string;
  updatedAt: string;
  preview: PreviewVariant;
};

export const TEMPLATE_UNCONFIGURED_LABEL = '템플릿 미설정';

export const TEMPLATE_UNCONFIGURED_SUBTITLE = '홈에서 템플릿을 골라 주세요';

export const TEMPLATE_UNCONFIGURED_HINT = '빈 템플릿';

export const DEPLOY_STATUS_LABEL: Record<DeployStatus, string> = {
  pending: '배포 전',
  deploying: '배포 중',
  deployed: '배포 완료',
};

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  landing: '랜딩 페이지',
  portfolio: '포트폴리오 페이지',
  business: '비즈니스 페이지',
};

export const DEMO_PROJECTS: ProjectItem[] = [
  {
    id: '1',
    slug: 'cafe-landing-page',
    deployStatus: 'pending',
    category: 'landing',
    hasTemplate: true,
    subtitle: '배포되지 않음',
    updatedAt: 'Mar 5 04:25',
    preview: 'landing',
  },
  {
    id: '2',
    slug: 'portfolio-2024',
    deployStatus: 'deploying',
    category: 'portfolio',
    hasTemplate: true,
    subtitle: '프로덕션 배포 진행 중',
    updatedAt: 'Jun 23 14:31',
    preview: 'portfolio',
  },
  {
    id: '3',
    slug: 'saas-intro-site',
    deployStatus: 'deployed',
    category: 'business',
    hasTemplate: true,
    subtitle: 'https://intro.example.com',
    updatedAt: 'Apr 11 18:30',
    preview: 'business',
  },
  {
    id: '4',
    slug: 'event-spring-sale',
    deployStatus: 'pending',
    category: 'landing',
    hasTemplate: true,
    subtitle: '배포되지 않음',
    updatedAt: 'Feb 2 09:15',
    preview: 'landing',
  },
  {
    id: '5',
    slug: 'designer-showcase',
    deployStatus: 'deployed',
    category: 'portfolio',
    hasTemplate: true,
    subtitle: 'https://folio.example.com',
    updatedAt: 'Jan 18 22:04',
    preview: 'portfolio',
  },
  {
    id: '6',
    slug: 'brand-refresh-draft',
    deployStatus: 'deploying',
    category: 'landing',
    hasTemplate: true,
    subtitle: '스테이징 검증 중',
    updatedAt: 'Mar 12 16:55',
    preview: 'landing',
  },
  {
    id: '7',
    slug: 'newsletter-signup',
    deployStatus: 'deployed',
    category: 'landing',
    hasTemplate: true,
    subtitle: 'https://news.example.com',
    updatedAt: 'May 2 08:11',
    preview: 'landing',
  },
  {
    id: '8',
    slug: 'corp-pr-page',
    deployStatus: 'deploying',
    category: 'business',
    hasTemplate: true,
    subtitle: '스테이징 검증 중',
    updatedAt: 'Mar 28 11:42',
    preview: 'business',
  },
  {
    id: '9',
    slug: 'recruit-2026',
    deployStatus: 'deploying',
    category: 'landing',
    hasTemplate: true,
    subtitle: 'DNS 전파 대기',
    updatedAt: 'Apr 1 13:07',
    preview: 'landing',
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return DEMO_PROJECTS.find((project) => project.slug === slug);
}
