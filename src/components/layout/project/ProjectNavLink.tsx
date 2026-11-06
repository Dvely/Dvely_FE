import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

type ProjectNavLinkProps = {
  projectId: number;
  className?: string;
  children: ReactNode;
};

function ProjectNavLink({ projectId, className, children }: ProjectNavLinkProps) {
  return (
    /*
      안에는 언제나 프로젝트 이름이 보인다(카드·목록 줄). 이름은 거두고, 무엇을 눌렀는지는
      고정 이름으로 남긴다
    */
    <Link
      to="/project/$slug"
      params={{ slug: String(projectId) }}
      className={className}
      data-ga-ignore
      data-ga-label="프로젝트 열기"
    >
      {children}
    </Link>
  );
}

export default ProjectNavLink;
