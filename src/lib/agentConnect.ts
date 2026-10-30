/**
 * Claude Code·Codex 를 Qeploy 에 잇는 명령.
 *
 * **글자 하나까지 실제 패키지와 같아야 한다.** 사용자가 그대로 복사해 터미널에 붙인다.
 * 근거는 BE `agent-tools/README.md`(@qeploy/cli 0.1.3 · @qeploy/mcp 0.1.2)와 각 에이전트
 * CLI 의 도움말이다 — `claude mcp add` 는 환경변수를 `-e KEY=value` 로, `codex mcp add` 는
 * `--env KEY=VALUE` 로 받는다.
 *
 * **토큰은 어느 명령에도 끼우지 않는다.** `login` 이 저장한 파일(0600)을 MCP 서버가 같은
 * 함수로 읽는다. 명령에 토큰을 적으면 셸 기록과 에이전트 설정 파일로 퍼진다.
 *
 * **주소도 적지 않는다.** 클라이언트가 `/api/v1` 을 스스로 붙이고 기본값이 https://qeploy.com 이다.
 */

export type AgentClient = 'claude' | 'codex';

export const AGENT_CLIENTS: { id: AgentClient; label: string }[] = [
  { id: 'claude', label: 'Claude Code' },
  { id: 'codex', label: 'Codex' },
];

/** 웹에서 발급한 토큰을 붙여넣어 기기에 저장한다. CLI 와 MCP 서버가 같은 파일을 읽는다 */
export const LOGIN_COMMAND = 'npx @qeploy/cli login';

/** 로그인을 못 하는 환경(CI)용. 환경변수가 저장된 토큰을 이긴다 */
export const CI_TOKEN_COMMAND = 'export QEPLOY_TOKEN=qp_...';

/** 쓰기 도구(배포·환경변수·도메인 연결)를 켜는 환경변수. 기본은 꺼져 있다 */
export const ENABLE_WRITES_ENV = 'QEPLOY_ENABLE_WRITES=true';

const MCP_SERVER_COMMAND = 'npx -y @qeploy/mcp';

/** 에이전트에 MCP 서버로 등록하는 명령. `enableWrites` 면 쓰기 도구를 켜는 환경변수가 붙는다 */
export function buildRegisterCommand(client: AgentClient, enableWrites: boolean): string {
  if (client === 'claude') {
    return enableWrites
      ? `claude mcp add qeploy -e ${ENABLE_WRITES_ENV} -- ${MCP_SERVER_COMMAND}`
      : `claude mcp add qeploy -- ${MCP_SERVER_COMMAND}`;
  }
  return enableWrites
    ? `codex mcp add qeploy --env ${ENABLE_WRITES_ENV} -- ${MCP_SERVER_COMMAND}`
    : `codex mcp add qeploy -- ${MCP_SERVER_COMMAND}`;
}

/**
 * 연결한 뒤 에이전트에게 시켜 볼 말.
 *
 * MCP 도구 17개(조회 11 · 쓰기 6) 안에서 되는 것만 적는다 — 배포 상태·로그 조회, 실패 원인
 * 분석, 다시 배포. 쓰기는 "배포까지 맡기기"를 켰을 때만 된다(`needsWrites`).
 */
export function buildExamplePrompts(projectName: string) {
  const name = projectName.trim() || '이 프로젝트';
  return [
    { text: `${name} 배포 상태 알려줘`, needsWrites: false },
    { text: '마지막 배포가 실패했다면 원인을 찾아 줘', needsWrites: false },
    { text: '최신 커밋으로 다시 배포해 줘', needsWrites: true },
  ];
}
