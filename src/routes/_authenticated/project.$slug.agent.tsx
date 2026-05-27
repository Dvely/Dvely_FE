import { createFileRoute } from '@tanstack/react-router';
import ProjectAgentPage from '@/components/layout/project/ProjectAgentPage';
import { Route as ProjectSlugRoute } from '@/routes/_authenticated/project.$slug';

export const Route = createFileRoute('/_authenticated/project/$slug/agent')({
  component: ProjectAgentRoute,
});

function ProjectAgentRoute() {
  const { project } = ProjectSlugRoute.useLoaderData();
  return <ProjectAgentPage project={project} />;
}
