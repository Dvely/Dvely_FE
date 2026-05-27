import { createFileRoute } from '@tanstack/react-router';
import ProjectDetailPage from '@/components/layout/project/ProjectDetailPage';
import { Route as ProjectSlugRoute } from '@/routes/_authenticated/project.$slug';

export const Route = createFileRoute('/_authenticated/project/$slug/')({
  component: ProjectDetailRoute,
});

function ProjectDetailRoute() {
  const { project } = ProjectSlugRoute.useLoaderData();
  return <ProjectDetailPage project={project} />;
}
