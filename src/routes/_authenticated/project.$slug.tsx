import { createFileRoute, notFound } from '@tanstack/react-router';
import ProjectDetailPage from '@/components/layout/project/ProjectDetailPage';
import { getProjectBySlug } from '@/mocks/projects/projectTypes';

export const Route = createFileRoute('/_authenticated/project/$slug')({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetailRoute,
});

function ProjectDetailRoute() {
  const { project } = Route.useLoaderData();
  return <ProjectDetailPage project={project} />;
}
