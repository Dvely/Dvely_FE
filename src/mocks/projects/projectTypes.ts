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
