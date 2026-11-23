import { describe, expect, it } from 'vitest';
import { postProjectServerReqSchema } from '@/types/server.type';

/*
  이 스키마는 보내기 직전에 `parse` 를 거친다(src/api/servers.ts). zod 객체는 기본이
  strip 이라 **스키마에 없는 키는 오류 없이 사라진다** — 화면이 고른 값이 서버에 닿지
  않고, 서버는 기본값으로 자원을 만든다.

  그래서 "필드가 살아서 나가는지" 가 이 스키마의 계약이다. 타입만으로는 잡히지 않는다:
  필드를 지워도 `postProjectServer(projectId, { deployMode: 'DOCKER' })` 는 타입 오류가
  나지만, 객체를 변수에 담아 넘기는 호출 경로에서는 조용히 통과한다.
*/
describe('postProjectServerReqSchema', () => {
  it('배포 방식을 떨어뜨리지 않고 그대로 싣는다', () => {
    expect(postProjectServerReqSchema.parse({ deployMode: 'DOCKER' })).toEqual({
      deployMode: 'DOCKER',
    });
  });

  it('번들 DB 엔진을 떨어뜨리지 않고 그대로 싣는다', () => {
    expect(
      postProjectServerReqSchema.parse({
        instanceType: 't3.small',
        deployMode: 'DOCKER',
        bundledDbEngine: 'MYSQL',
      }),
    ).toEqual({ instanceType: 't3.small', deployMode: 'DOCKER', bundledDbEngine: 'MYSQL' });
  });

  /*
    서버가 모르는 값은 400 으로 돌아온다. 과금 자원을 만드는 요청이라 왕복 한 번과
    사용자의 기다림을 빼기 위해 여기서 먼저 걸린다.
  */
  it('계약에 없는 값은 보내기 전에 막는다', () => {
    expect(() => postProjectServerReqSchema.parse({ deployMode: 'KANIKO' })).toThrow();
    expect(() => postProjectServerReqSchema.parse({ bundledDbEngine: 'SQLITE' })).toThrow();
  });

  /** 빈 요청은 그대로 유효하다 — 서버가 t3.micro · NATIVE 로 만든다 */
  it('아무것도 고르지 않은 요청을 막지 않는다', () => {
    expect(postProjectServerReqSchema.parse({})).toEqual({});
  });
});
