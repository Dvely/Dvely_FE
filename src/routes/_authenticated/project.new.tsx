import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import ProjectCreatePage from '@/components/layout/project/ProjectCreatePage';

/*
  `templateId` 는 서버 카탈로그의 값이라 여기서 맞춰보지 않는다.

  예전에는 화면 안 더미 목록에서 찾아 없으면 첫 더미로 바꿔치기했다. 목록을 카탈로그로
  옮긴 뒤에는 **진짜 id 가 전부 "모르는 값"** 이 되어, 어떤 카드를 눌러도 같은 더미
  하나로 열렸다. 조용히 다른 것을 보여주는 쪽이 못 찾았다고 말하는 것보다 나쁘다.

  있는지 없는지는 카탈로그를 실제로 읽는 화면이 판단한다.
*/
const projectNewSearchSchema = z.object({
  type: z.enum(['landing', 'portfolio', 'blank']).default('landing'),
  templateId: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/project/new')({
  validateSearch: (search) => projectNewSearchSchema.parse(search),
  component: ProjectCreatePage,
});
