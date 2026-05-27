import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import ProjectCreatePage from '@/components/layout/project/ProjectCreatePage';

const projectNewSearchSchema = z.object({
  type: z.enum(['landing', 'portfolio', 'blank']).default('landing'),
});

export const Route = createFileRoute('/_authenticated/project/new')({
  validateSearch: projectNewSearchSchema,
  component: ProjectCreatePage,
});
