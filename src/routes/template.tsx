import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/template')({
  component: TemplateLayout,
});

function TemplateLayout() {
  return <Outlet />;
}
