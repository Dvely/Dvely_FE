import ProjectCard from './ProjectCard';
import { useProjectListQuery } from '@/api/projects';
import type { ProjectItem } from '@/mocks/projects/projectTypes';
import type { DeployStatus } from '@/types/common.enum';

function toProjectCardItem(project: {
  projectId: number;
  name: string;
  deployStatus: DeployStatus;
  currentUrl: string | null;
  updatedAtRelativeText: string;
}): ProjectItem {
  const deployStatusMap: Record<DeployStatus, ProjectItem['deployStatus']> = {
    DRAFT: 'pending',
    IN_PROGRESS: 'deploying',
    PREVIEW_READY: 'deploying',
    LIVE: 'deployed',
    FAILED: 'pending',
  };

  return {
    id: String(project.projectId),
    slug: project.name,
    deployStatus: deployStatusMap[project.deployStatus],
    category: 'landing',
    subtitle: project.currentUrl ?? '배포되지 않음',
    updatedAt: project.updatedAtRelativeText,
    preview: 'landing',
  };
}

function ProjectsView() {
  const { data: projects = [], isLoading } = useProjectListQuery('projects-view');
  const projectItems = projects.map(toProjectCardItem);
  const skeletonItems = Array.from({ length: 6 }, (_, index) => `project-skeleton-${index}`);
  const isEmpty = !isLoading && projectItems.length === 0;

  return (
    <section className="flex-1 overflow-y-auto px-7 pb-10 pt-0">
      {isEmpty ? (
        <div className="flex min-h-[calc(100vh-220px)] items-center justify-center">
          <p className="text-sm text-[#94a3b8]">생성 된 프로젝트가 없습니다.</p>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? skeletonItems.map((key) => (
              <div key={key} className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
                <div className="h-[140px] animate-pulse bg-[#f1f5f9]" />
                <div className="space-y-3 px-5 py-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#e2e8f0]" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#e2e8f0]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#f1f5f9]" />
                </div>
                <div className="border-t border-[#f1f5f9] px-6 py-4">
                  <div className="ml-auto h-3 w-16 animate-pulse rounded bg-[#e2e8f0]" />
                </div>
              </div>
            ))
          : isEmpty
            ? null
            : projectItems.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  );
}

export default ProjectsView;
