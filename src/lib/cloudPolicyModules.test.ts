import { describe, expect, it } from 'vitest';
import type { PolicyModule } from '@/types/cloudConnection.type';
import { combinePolicyModules, stringifyPolicy } from '@/lib/cloudPolicyModules';

/*
  사용자가 고른 권한 묶음을 IAM 정책 한 장으로 합친다. 틀리면 사용자는 정책을 등록했다고
  믿는데 **배포가 한참 뒤에 권한 오류로 멈춘다** — 그래서 조용히 틀리는 길을 막는 게
  이 함수의 요점이다.
*/

function mod(statements: unknown[]): PolicyModule {
  return { statements } as PolicyModule;
}

const parse = (body: string) => JSON.parse(body) as { Version: string; Statement: unknown[] };

describe('combinePolicyModules', () => {
  it('봉투를 씌우고 문장을 이어 붙인다', () => {
    const result = combinePolicyModules([
      mod([{ Sid: 'A', Action: 's3:GetObject' }]),
      mod([{ Sid: 'B', Action: 'ec2:DescribeInstances' }]),
    ]);

    const policy = parse(result.body);
    expect(policy.Version).toBe('2012-10-17');
    expect(policy.Statement).toHaveLength(2);
    expect(result.conflictingSids).toEqual([]);
  });

  it('두 묶음에 같은 문장이 들어 있으면 하나만 남긴다', () => {
    const statement = { Sid: 'Shared', Action: 's3:GetObject' };
    const result = combinePolicyModules([mod([statement]), mod([{ ...statement }])]);

    expect(parse(result.body).Statement).toHaveLength(1);
    expect(result.conflictingSids).toEqual([]);
  });

  it('키 순서만 다른 같은 문장도 하나로 본다', () => {
    // 서버가 키 순서를 보장하지 않으므로, 순서로 다르다고 판단하면 중복이 새어 나간다
    const result = combinePolicyModules([
      mod([{ Sid: 'Same', Action: 's3:GetObject', Effect: 'Allow' }]),
      mod([{ Effect: 'Allow', Sid: 'Same', Action: 's3:GetObject' }]),
    ]);

    expect(parse(result.body).Statement).toHaveLength(1);
    expect(result.conflictingSids).toEqual([]);
  });

  it('같은 Sid 인데 내용이 다르면 충돌로 알린다 — 조용히 합치지 않는다', () => {
    /*
      먼저 만난 쪽만 남기면 나머지 권한이 조용히 빠진다. 둘 다 남겨도 IAM 이 Sid 중복을
      거절하므로, 붙여넣고 실패하는 것보다 여기서 멈추는 쪽이 낫다.
    */
    const result = combinePolicyModules([
      mod([{ Sid: 'Clash', Action: 's3:GetObject' }]),
      mod([{ Sid: 'Clash', Action: 's3:PutObject' }]),
    ]);

    expect(result.conflictingSids).toEqual(['Clash']);
  });

  it('같은 Sid 가 세 번 부딪혀도 한 번만 알린다', () => {
    const result = combinePolicyModules([
      mod([{ Sid: 'Clash', Action: 'a' }]),
      mod([{ Sid: 'Clash', Action: 'b' }]),
      mod([{ Sid: 'Clash', Action: 'c' }]),
    ]);

    expect(result.conflictingSids).toEqual(['Clash']);
  });

  it('Sid 가 없는 문장은 가릴 수 없으므로 그대로 둔다', () => {
    const result = combinePolicyModules([
      mod([{ Action: 's3:GetObject' }]),
      mod([{ Action: 's3:GetObject' }]),
    ]);

    expect(parse(result.body).Statement).toHaveLength(2);
    expect(result.conflictingSids).toEqual([]);
  });

  it('Sid 가 공백뿐이면 없는 것으로 본다', () => {
    const result = combinePolicyModules([
      mod([{ Sid: '   ', Action: 'a' }]),
      mod([{ Sid: '   ', Action: 'b' }]),
    ]);

    expect(parse(result.body).Statement).toHaveLength(2);
    expect(result.conflictingSids).toEqual([]);
  });

  it('고른 묶음이 없으면 빈 정책', () => {
    const result = combinePolicyModules([]);

    expect(parse(result.body).Statement).toEqual([]);
    expect(result.conflictingSids).toEqual([]);
  });
});

describe('stringifyPolicy', () => {
  it('문자열은 그대로 돌려준다', () => {
    expect(stringifyPolicy('{"a":1}')).toBe('{"a":1}');
  });

  it('객체는 보기 좋게 찍는다', () => {
    expect(stringifyPolicy({ a: 1 })).toBe('{\n  "a": 1\n}');
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
  ])('%s 은 빈 문자열', (_label, value) => {
    expect(stringifyPolicy(value)).toBe('');
  });

  it('순환 참조라도 터지지 않는다', () => {
    // 서버가 임의 구조를 주므로 JSON.stringify 가 실패할 여지를 남겨 두지 않는다
    const circular: Record<string, unknown> = {};
    circular.self = circular;

    expect(() => stringifyPolicy(circular)).not.toThrow();
  });
});
