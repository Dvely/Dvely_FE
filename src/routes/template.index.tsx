import { createFileRoute } from '@tanstack/react-router';
import TemplateGalleryPage from '@/components/layout/templates/TemplateGalleryPage';

export const Route = createFileRoute('/template/')({
  component: TemplateGalleryPage,
  head: () => ({ meta: [{ title: '템플릿 | Qeploy' }] }),
});
