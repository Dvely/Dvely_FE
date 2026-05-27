import { createFileRoute } from '@tanstack/react-router';
import HomePage from '@/components/layout/home/HomePage';

export const Route = createFileRoute('/_authenticated/home')({
  component: HomePage,
});
