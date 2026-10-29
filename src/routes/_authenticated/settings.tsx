import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import MeSettingsPage from '@/components/layout/me/MeSettingsPage';
import { toSafeReturnPath } from '@/lib/setupReturn';

/*
  ?section= 으로 특정 절을 열 수 있다.

  오류 안내가 "설정 > AI API 키에서 등록하세요" 라고만 하면, 사용자는 설정에 도착한
  뒤 그 항목을 다시 찾아야 한다. 보내는 쪽이 어디로 보낼지 알고 있으므로 그대로
  열어 준다.
*/
const settingsSearchSchema = z.object({
  section: z.string().optional(),
  /*
    프로젝트에서 키·연결을 넣으러 왔다면 돌아갈 자리. 등록을 마치면 그리로 돌려보낸다.
    주소창 값이라 누구나 고쳐 만들 수 있다. 모양이 틀리면 화면을 깨지 말고 없던 것으로
    치고, 앱 안 경로인지는 쓰기 직전에 거른다(toSafeReturnPath).
  */
  returnTo: z.string().optional().catch(undefined),
});

export const Route = createFileRoute('/_authenticated/settings')({
  validateSearch: (search) => settingsSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const { section, returnTo } = Route.useSearch();
  return <MeSettingsPage initialSection={section} returnTo={toSafeReturnPath(returnTo)} />;
}
