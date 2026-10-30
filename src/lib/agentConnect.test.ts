import { describe, expect, it } from 'vitest';
import { LOGIN_COMMAND, buildExamplePrompts, buildRegisterCommand } from '@/lib/agentConnect';

/*
  사용자가 그대로 복사해 터미널에 붙이는 문자열이다. 기대값은 BE agent-tools/README.md 와
  `claude mcp add --help`·`codex mcp add --help` 에서 옮겼다 — 글자 하나만 달라도 명령이
  실패하거나, 더 나쁘게는 쓰기 도구가 켜진 줄 알았는데 꺼져 있다.
*/
describe('agentConnect 명령', () => {
  it('로그인은 웹에서 발급한 토큰을 붙여넣는 명령이다', () => {
    expect(LOGIN_COMMAND).toBe('npx @qeploy/cli login');
  });

  it('Claude Code 등록 명령', () => {
    expect(buildRegisterCommand('claude', false)).toBe(
      'claude mcp add qeploy -- npx -y @qeploy/mcp',
    );
    expect(buildRegisterCommand('claude', true)).toBe(
      'claude mcp add qeploy -e QEPLOY_ENABLE_WRITES=true -- npx -y @qeploy/mcp',
    );
  });

  /** codex 는 -e 를 받지 않는다. --env 다 */
  it('Codex 등록 명령', () => {
    expect(buildRegisterCommand('codex', false)).toBe('codex mcp add qeploy -- npx -y @qeploy/mcp');
    expect(buildRegisterCommand('codex', true)).toBe(
      'codex mcp add qeploy --env QEPLOY_ENABLE_WRITES=true -- npx -y @qeploy/mcp',
    );
  });

  it('어느 명령에도 토큰이나 주소를 적지 않는다', () => {
    const all = [
      LOGIN_COMMAND,
      buildRegisterCommand('claude', true),
      buildRegisterCommand('codex', true),
    ].join('\n');
    expect(all).not.toMatch(/qp_|QEPLOY_TOKEN|QEPLOY_API_URL|https?:\/\//);
  });
});

describe('buildExamplePrompts', () => {
  it('프로젝트 이름을 넣고, 쓰기가 필요한 요청을 표시한다', () => {
    const prompts = buildExamplePrompts('함께 할 일');
    expect(prompts[0].text).toBe('함께 할 일 배포 상태 알려줘');
    expect(prompts.filter((prompt) => prompt.needsWrites).map((prompt) => prompt.text)).toEqual([
      '최신 커밋으로 다시 배포해 줘',
    ]);
  });

  it('이름이 비면 "이 프로젝트" 로 적는다', () => {
    expect(buildExamplePrompts('  ')[0].text).toBe('이 프로젝트 배포 상태 알려줘');
  });
});
