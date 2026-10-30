import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import ProjectAgentPage from '@/components/layout/project/ProjectAgentPage';
import { Route as ProjectSlugRoute } from '@/routes/_authenticated/project.$slug';
import { useProjectDetailQuery } from '@/api/projects';

/*
  ?conversation= 은 설정에 다녀온 뒤 보던 대화로 돌아오는 자리다(agentReturnPath).

  대화는 원래 화면 상태에만 있어서, 화면을 떠났다 오면 가장 최근 대화가 열렸다. 새 대화를
  열어 적던 중이었다면 그 자리가 사라졌다. 모양이 틀린 값은 없던 것으로 친다 — 예전처럼
  최근 대화가 열린다.
*/
const agentSearchSchema = z.object({
  conversation: z
    .union([z.literal('new'), z.number().int().positive()])
    .optional()
    .catch(undefined),
});

export const Route = createFileRoute('/_authenticated/project/$slug/agent')({
  validateSearch: (search) => agentSearchSchema.parse(search),
  component: ProjectAgentRoute,
});

function ProjectAgentRoute() {
  const { slug } = ProjectSlugRoute.useParams();
  const { conversation } = Route.useSearch();
  const parsedProjectId = Number(slug);
  const { data: project, isLoading } = useProjectDetailQuery('project-agent-page', parsedProjectId);

  if (isLoading) {
    return <div className="p-6 text-sm text-[#94a3b8]">프로젝트 상세를 불러오는 중...</div>;
  }

  if (!project) {
    return <div className="p-6 text-sm text-[#94a3b8]">프로젝트 상세를 찾을 수 없습니다.</div>;
  }

  return (
    <ProjectAgentPage
      projectId={parsedProjectId}
      project={project}
      returnedConversation={conversation}
    />
  );
}
