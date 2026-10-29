import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import SideSheet from '@/components/common/SideSheet';
import AgentConnectSteps, {
  WritesToggle,
} from '@/components/layout/agentConnect/AgentConnectSteps';
import ApiTokenIssueForm from '@/components/layout/me/ApiTokenIssueForm';
import ApiTokenRevealBox from '@/components/layout/me/ApiTokenRevealBox';

type AgentConnectSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
};

/**
 * 이 프로젝트를 터미널의 코딩 에이전트(Claude Code·Codex)에서 이어서 다루게 잇는 안내.
 *
 * 한 화면에서 끝난다 — 무엇이 되는지 → 토큰 발급 → 명령 복사 → 시켜 볼 말. 예전에는 이
 * 길이 설정 깊숙한 "액세스 토큰" 한 곳뿐이라, 프로젝트를 보다가 터미널로 넘어가려는 사람이
 * 그 자리를 찾아야 했다.
 *
 * "배포까지 맡기기" 와 토큰 스코프는 한 값이다. 켜면 WRITE, 끄면 READ — 쓰기 도구를 켰는데
 * READ 토큰을 받으면 서버가 403 으로 막을 뿐이라, 둘을 따로 고르게 둘 이유가 없다.
 */
function AgentConnectSheet({ open, onOpenChange, projectName }: AgentConnectSheetProps) {
  const [enableWrites, setEnableWrites] = useState(false);
  /**
   * 발급 직후 평문. 이 시트 말고 어디에도 두지 않는다 — 시트를 닫는 순간 비운다.
   */
  const [issued, setIssued] = useState<{ token: string; label: string | null } | null>(null);

  const handleOpenChange = (next: boolean) => {
    if (!next) setIssued(null);
    onOpenChange(next);
  };

  return (
    <SideSheet
      open={open}
      onOpenChange={handleOpenChange}
      title="터미널·코딩 에이전트에서 이어서 하기"
      description="Claude Code·Codex 가 Qeploy 를 MCP 도구로 불러 이 프로젝트의 배포 상태·로그를 읽고, 원하면 배포까지 실행합니다."
      footer={
        <Link
          to="/settings"
          search={{ section: 'api-tokens' }}
          className="font-semibold text-[#334155] underline underline-offset-2 hover:text-[#0f172a]"
        >
          설정에서 토큰 관리하기
        </Link>
      }
    >
      <div data-demo="agent-connect-sheet" className="flex flex-col gap-5">
        <WritesToggle checked={enableWrites} onChange={setEnableWrites} />

        <section className="flex gap-2">
          <span className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#e2e8f0] text-[11px] font-semibold text-[#475569]">
            1
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-[#0f172a]">토큰을 발급합니다</p>
            <div className="mt-2">
              {issued ? (
                <ApiTokenRevealBox token={issued.token} label={issued.label} />
              ) : (
                <ApiTokenIssueForm
                  scope={enableWrites ? 'WRITE' : 'READ'}
                  onScopeChange={(scope) => setEnableWrites(scope === 'WRITE')}
                  onIssued={setIssued}
                  labelPlaceholder="터미널"
                />
              )}
            </div>
          </div>
        </section>

        <AgentConnectSteps
          enableWrites={enableWrites}
          firstStepNumber={2}
          projectName={projectName}
        />
      </div>
    </SideSheet>
  );
}

export default AgentConnectSheet;
