import { describe, expect, it } from 'vitest';
import { agentReturnPath, returnLabel, toSafeReturnPath } from '@/lib/setupReturn';

/*
  returnTo 는 주소창 값이다. 누구나 `?returnTo=` 를 고쳐 링크를 만들 수 있으므로, 앱 밖으로
  나가는 모든 모양을 막는지 본다. 키를 막 넣은 사람을 가짜 화면으로 보내기 좋은 자리다.

  "막는다" 를 더 꼼꼼히 본다. 통과시켜야 할 것을 막으면 돌아가기가 안 될 뿐이지만, 막아야
  할 것을 통과시키면 우리 도메인을 거쳐 남의 사이트로 보내는 길이 된다.
*/

describe('앱 안 경로는 통과시킨다', () => {
  it.each([
    ['/project/42/agent', '/project/42/agent'],
    ['/project/42/agent?conversation=7', '/project/42/agent?conversation=7'],
    ['/project/42/agent?conversation=new', '/project/42/agent?conversation=new'],
    ['/project/42/infra', '/project/42/infra'],
    ['/project/42/infra#server', '/project/42/infra#server'],
  ])('%s', (raw, expected) => {
    expect(toSafeReturnPath(raw)).toBe(expected);
  });

  /** 돌려주는 값은 풀어 본 쪽이다. 다시 검사한 의미가 있게 정리된 모양을 돌려준다 */
  it('점 경로는 정리해서 돌려준다', () => {
    expect(toSafeReturnPath('/project/./42/../42/agent')).toBe('/project/42/agent');
  });
});

describe('앱 밖으로 나가는 모양은 막는다', () => {
  it.each([
    // 스킴
    'https://evil.example',
    'http://evil.example/project/42/agent',
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    // 스킴 없이 호스트로 가는 모양
    '//evil.example',
    '//evil.example/project/42/agent',
    '///evil.example',
    // 브라우저가 역슬래시를 / 로 읽는다
    '/\\evil.example',
    '\\\\evil.example',
    '/project/42\\..\\..\\\\evil.example',
    // 브라우저가 탭·개행을 지우고 읽는다
    '/\t/evil.example',
    '/\n/evil.example',
    '/\r/evil.example',
    // 정리하면 // 가 되는 모양
    '/.//evil.example',
    '/./..//evil.example',
    // 상대 경로
    'project/42/agent',
    'evil.example',
    '',
  ])('%j', (raw) => {
    expect(toSafeReturnPath(raw)).toBeNull();
  });

  it('지나치게 긴 값은 받지 않는다', () => {
    expect(toSafeReturnPath(`/project/42/agent?pad=${'a'.repeat(4096)}`)).toBeNull();
  });

  it.each([undefined, null, 42, ['/project/42/agent'], { path: '/project/42/agent' }])(
    '문자열이 아니면 받지 않는다: %j',
    (raw) => {
      expect(toSafeReturnPath(raw)).toBeNull();
    },
  );

  /** 퍼센트 인코딩된 // 는 경로 한 칸으로 남는다 — 다른 호스트로 풀리지 않는다 */
  it('인코딩된 슬래시는 앱 안 경로로 남는다', () => {
    const path = toSafeReturnPath('/%2F%2Fevil.example');
    expect(path).toBe('/%2F%2Fevil.example');
    expect(new URL(path ?? '', 'https://qeploy.com').host).toBe('qeploy.com');
  });
});

describe('agentReturnPath', () => {
  it('보던 대화를 적는다', () => {
    expect(agentReturnPath(42, 7, false)).toBe('/project/42/agent?conversation=7');
  });

  /** 새 대화를 열어 적던 중이었다면 돌아와서도 새 대화여야 한다. 최근 대화가 열리면 안 된다 */
  it('새 대화였으면 새 대화로 돌아온다', () => {
    expect(agentReturnPath(42, null, true)).toBe('/project/42/agent?conversation=new');
  });

  it('대화가 아직 없으면 프로젝트 에이전트 화면으로 돌아온다', () => {
    expect(agentReturnPath(42, null, false)).toBe('/project/42/agent');
  });

  it('만든 경로는 그대로 통과한다', () => {
    for (const path of [
      agentReturnPath(42, 7, false),
      agentReturnPath(42, null, true),
      agentReturnPath(42, null, false),
    ]) {
      expect(toSafeReturnPath(path)).toBe(path);
    }
  });
});

describe('returnLabel', () => {
  it('프로젝트에서 왔으면 그렇게 말한다', () => {
    expect(returnLabel('/project/42/agent?conversation=7')).toBe('프로젝트로 돌아가기');
  });

  it('아니면 이전 화면이라고 말한다', () => {
    expect(returnLabel('/templates')).toBe('이전 화면으로 돌아가기');
  });
});
