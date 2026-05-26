import { createFileRoute } from '@tanstack/react-router';
import TaskPage from '@/components/layout/task/TaskPage';

export const Route = createFileRoute('/_authenticated/tasks')({
  component: TaskPage,
});
