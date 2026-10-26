import type { PolicyModule } from '@/types/cloudConnection.type';

/**
 * 사용자가 고른 권한 묶음을 IAM 정책 한 장으로 합친다.
 *
 * 문장 내용은 **전부 서버가 준다.** 여기서 하는 일은 고른 묶음들의 문장을 이어 붙이고
 * 봉투를 씌우는 것뿐이다. 정책 내용을 화면에 적어 두면 서버가 요구하는 권한이 바뀔
 * 때마다 배포해야 하고, 잊으면 화면이 낡은 정책을 안내한다.
 */

const POLICY_VERSION = '2012-10-17';

/** 키 순서가 달라도 같은 문장으로 보도록 정규화한다 */
function canonicalize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value) ?? 'null';
}

function readSid(statement: unknown): string | null {
  if (!statement || typeof statement !== 'object') return null;
  const sid = (statement as { Sid?: unknown }).Sid;
  if (typeof sid !== 'string') return null;
  const trimmed = sid.trim();
  return trimmed ? trimmed : null;
}

type CombinedPolicy = {
  /** 복사할 정책 전문 */
  body: string;
  /**
   * 같은 Sid 인데 내용이 다른 것들. 비어 있지 않으면 **복사하게 두면 안 된다.**
   *
   * 합치지 않는 이유: 먼저 만난 쪽만 남기면 나머지 권한이 조용히 빠진다. 사용자는
   * 정책을 등록했다고 믿는데 배포가 한참 뒤에 권한 오류로 멈춘다. 둘 다 남겨도
   * IAM 이 Sid 중복을 거절하므로, 붙여넣고 실패하는 것보다 여기서 멈추는 쪽이 낫다.
   *
   * BE 가 테스트로 "같은 Sid 면 내용 동일" 을 고정해 뒀으니 실제로는 안 뜰 경로다.
   * 그래도 비워 두지 않는다 — 고정이 깨지는 날 조용히 틀리는 것이 가장 나쁘다.
   */
  conflictingSids: string[];
};

function combinePolicyModules(modules: PolicyModule[]): CombinedPolicy {
  const statements: unknown[] = [];
  const shapeBySid = new Map<string, string>();
  const conflictingSids: string[] = [];

  for (const module of modules) {
    for (const statement of module.statements) {
      const sid = readSid(statement);
      // Sid 가 없으면 같은 문장인지 가릴 방법이 없다. 빼지 않고 그대로 둔다
      if (!sid) {
        statements.push(statement);
        continue;
      }

      const shape = canonicalize(statement);
      const seen = shapeBySid.get(sid);
      if (seen === undefined) {
        shapeBySid.set(sid, shape);
        statements.push(statement);
        continue;
      }
      // 두 묶음에 같은 문장이 들어 있는 경우. 하나만 남긴다
      if (seen === shape) continue;

      if (!conflictingSids.includes(sid)) conflictingSids.push(sid);
    }
  }

  return {
    body: JSON.stringify({ Version: POLICY_VERSION, Statement: statements }, null, 2),
    conflictingSids,
  };
}

/**
 * 정책 객체를 복사해 붙일 수 있는 문자열로.
 *
 * 서버가 임의 구조로 주므로 그대로 받아 여기서 문자열로 만든다. 두 화면(연결 가이드 ·
 * 온보딩)이 같은 일을 하므로 한 곳에 둔다.
 */
function stringifyPolicy(policy: unknown): string {
  if (policy == null) return '';
  if (typeof policy === 'string') return policy;
  try {
    return JSON.stringify(policy, null, 2);
  } catch {
    return '';
  }
}

export { combinePolicyModules, stringifyPolicy, type CombinedPolicy };
