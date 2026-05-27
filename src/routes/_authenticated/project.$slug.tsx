import { createFileRoute, notFound, Outlet } from '@tanstack/react-router';
import { getProjectBySlug } from '@/mocks/projects/projectTypes';

export const Route = createFileRoute('/_authenticated/project/$slug')({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectSlugLayout,
});

function ProjectSlugLayout() {
  return <Outlet />;
}
