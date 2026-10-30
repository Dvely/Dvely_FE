import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import CloudOnboardingGuide from '@/components/layout/onboarding/CloudOnboardingGuide';
import { toSafeReturnPath } from '@/lib/setupReturn';

/*
  프로젝트에서 "AWS가 처음이신가요?" 로 왔다면 돌아갈 자리를 들고 온다. 안내를 다 읽고
  연결을 등록하러 갈 때도 그대로 넘겨서, 등록을 마치면 처음 떠났던 프로젝트로 돌아간다.
*/
const onboardingSearchSchema = z.object({
  returnTo: z.string().optional().catch(undefined),
});

export const Route = createFileRoute('/_authenticated/onboarding/cloud')({
  validateSearch: (search) => onboardingSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const { returnTo } = Route.useSearch();
  return <CloudOnboardingGuide returnTo={toSafeReturnPath(returnTo)} />;
}
