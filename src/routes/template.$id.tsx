import { createFileRoute } from '@tanstack/react-router';
import NotFoundPage from '@/components/layout/NotFoundPage';
import { localDummyTemplatePages } from '@/templates/pages';
import '@/templates/pages/dummy-templates.css';

export const Route = createFileRoute('/template/$id')({
  component: DummyTemplateRoute,
  notFoundComponent: NotFoundPage,
  head: ({ params }) => ({
    meta: [{ title: localDummyTemplatePages[params.id]?.title ?? '템플릿 | Qeploy' }],
  }),
});

function DummyTemplateRoute() {
  const { id } = Route.useParams();
  const entry = localDummyTemplatePages[id];

  if (!entry) return <NotFoundPage />;

  const { Page } = entry;
  return <Page />;
}
