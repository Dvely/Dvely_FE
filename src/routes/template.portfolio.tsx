import { createFileRoute } from '@tanstack/react-router';
import PortfolioTemplate from '@/components/layout/template/portfolio/PortfolioTemplate';

export const Route = createFileRoute('/template/portfolio')({
  component: RouteComponent,
});

function RouteComponent() {
  return <PortfolioTemplate />;
}
