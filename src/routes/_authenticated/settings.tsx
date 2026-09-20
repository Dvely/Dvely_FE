import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import MeSettingsPage from '@/components/layout/me/MeSettingsPage';

/*
  ?section= 으로 특정 절을 열 수 있다.

  오류 안내가 "설정 > AI API 키에서 등록하세요" 라고만 하면, 사용자는 설정에 도착한
  뒤 그 항목을 다시 찾아야 한다. 보내는 쪽이 어디로 보낼지 알고 있으므로 그대로
  열어 준다.
*/
const settingsSearchSchema = z.object({
  section: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/settings')({
  validateSearch: (search) => settingsSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const { section } = Route.useSearch();
  return <MeSettingsPage initialSection={section} />;
}
