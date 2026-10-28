import { z } from 'zod';
import { approvalStatusSchema } from '@/types/common.enum';

/**
 * 결과 승인이 main 에 무엇을 반영하는지.
 *
 * 승인하면 **preview 상태 전체**가 main 에 들어간다. 그런데 카드는 에이전트가 이번에 한
 * 일만 보여줬다. 둘이 어긋날 때 사용자는 자기가 무엇을 승인하는지 몰랐다 — 거절해 둔
 * 변경이 다음 승인에 섞여 들어가는 것도 그래서 드러나지 않았다. (#156, BE #532)
 *
 * 화면에 나가는 문장(`notice`, `label`, `description`, `unavailableReason`)은 **전부 서버가
 * 만든다.** FE 가 따로 쓰면 두 벌이 되고, 서버가 문구를 고칠 때 화면만 옛말을 한다.
 */

/**
 * 이 변경이 누구 것인지.
 *
 * `PREVIOUSLY_REJECTED` 가 이 기능의 핵심이다 — 사용자가 거절했는데도 preview 에 남아
 * 다음 승인에 묻어 들어가는 것들이다.
 */
const resultScopeOriginSchema = z.enum([
  /** 이번 작업 */
  'THIS_TASK',
  /** 이전에 거절된 결과의 작업 */
  'PREVIOUSLY_REJECTED',
  /** 다른 작업. 아직 결정되지 않았거나 기록이 없다 */
  'OTHER',
  /** 작업을 알 수 없다. 사람이 직접 push 했거나 예전 경로로 만들어진 커밋 */
  'UNKNOWN',
]);

const resultScopeFileSchema = z.object({
  path: z.string(),
  status: z.enum(['added', 'modified', 'removed', 'renamed']),
  /** 바이너리 등 GitHub 가 세어주지 않는 파일은 null */
  additions: z.number().int().nullable(),
  deletions: z.number().int().nullable(),
  /** renamed 일 때만 */
  previousPath: z.string().nullable(),
  /**
   * 이 파일을 건드린 커넷들의 origin 집합.
   *
   * 배열인 이유: 한 파일을 이번 작업과 거절된 작업이 함께 바꿨을 수 있다. 대표값
   * 하나를 고르게 하면 FE 가 임의로 해석하게 된다.
   */
  origins: z.array(resultScopeOriginSchema),
});

const resultScopeCommitSchema = z.object({
  sha: z.string(),
  taskId: z.string().nullable(),
  origin: resultScopeOriginSchema,
  decision: z.object({ approvalId: z.number().int(), status: approvalStatusSchema }).nullable(),
});

const resultScopeDetailSchema = z.object({
  /** #527 로 .github 변경이 있어 push 를 승인 뒤로 미룬 경우 */
  pendingPush: z.boolean(),
  files: z.array(resultScopeFileSchema),
  /** truncated 면 null — 일부만 센 숫자를 사용자에게 말하지 않기 위해서다 */
  totals: z
    .object({
      files: z.number().int(),
      additions: z.number().int(),
      deletions: z.number().int(),
    })
    .nullable(),
  commits: z.array(resultScopeCommitSchema),
  includesOtherWork: z.boolean(),
  includesRejected: z.boolean(),
  /** GitHub 비교 상한(파일 300·커밋 250)에 걸려 목록이 잘렸다 */
  truncated: z.boolean(),
});

const rejectOptionSchema = z.object({
  option: z.enum(['KEEP', 'REVERT']),
  label: z.string(),
  description: z.string(),
  available: z.boolean(),
  default: z.boolean(),
  unavailableReason: z.string().nullable(),
});

const resultScopeDecidedSchema = z.object({
  /** REJECTED 일 때만. APPROVED·CANCELLED 는 null */
  option: z.enum(['KEEP', 'REVERT']).nullable(),
  /**
   * 결정 시각. **KST 오프셋이 붙어서 온다** — `2026-09-08T01:51:33+09:00`.
   * 실제 응답으로 확인했다(`/projects/{id}/approvals` 의 `createdAt`·`decidedAt`).
   * 소수초는 자릿수가 일정하지 않고 0이면 아예 없다.
   *
   * 그래서 `new Date()` 로 읽어도 된다 — 오프셋이 있으니 보는 사람의 시간대와
   * 무관하게 같은 순간으로 해석된다.
   *
   * 다만 `z.string().datetime()` 은 쓰지 않는다. 기본값이 `Z` 만 허용해서 깨진다.
   * 굳이 조이려면 `datetime({ offset: true })` 여야 하는데, 서버 직렬화 설정이
   * 바뀌면 화면이 통째로 멈추는 쪽이라 `z.string()` 으로 느슨하게 받는다.
   */
  decidedAt: z.string(),
  notice: z.string(),
  /** 결정 당시 계산에 실패했으면 null */
  scope: resultScopeDetailSchema.nullable(),
});

const resultScopeBaseShape = {
  approvalId: z.number().int(),
  base: z.string(),
  head: z.string(),
  status: approvalStatusSchema,
  /** 항상 있다. 서버가 만든 한 줄 */
  notice: z.string(),
  /** PENDING 일 때만 채워진다. 그 외에는 빈 배열 */
  rejectOptions: z.array(rejectOptionSchema),
};

/**
 * `scopeState` 로 가른다.
 *
 * BE 는 최상위를 한 모양으로 고정하고 `scope`·`decidedSnapshot` 을 nullable 로 줬다.
 * 그대로 `z.object` 로 받으면 **둘 다 null 일 수 있는 타입**이 되어, 화면이 매번 null
 * 검사를 하고 그중 한 군데를 빠뜨리면 조용히 빈 카드가 된다.
 *
 * 판별 유니온으로 받으면 `scopeState === 'READY'` 하나로 `scope` 가 non-null 로 좁혀진다.
 * 들어오는 JSON 은 똑같고, 타입만 사실에 맞게 조인다.
 */
const getResultScopeResSchema = z.discriminatedUnion('scopeState', [
  z.object({
    ...resultScopeBaseShape,
    scopeState: z.literal('READY'),
    scope: resultScopeDetailSchema,
    decidedSnapshot: z.null(),
  }),
  z.object({
    ...resultScopeBaseShape,
    scopeState: z.literal('UNAVAILABLE'),
    /** 범위를 못 구했다. 승인·거절은 막지 않는다 — notice 가 그 사실을 말한다 */
    scope: z.null(),
    decidedSnapshot: z.null(),
  }),
  z.object({
    ...resultScopeBaseShape,
    scopeState: z.literal('DECIDED'),
    scope: z.null(),
    decidedSnapshot: resultScopeDecidedSchema,
  }),
]);

type GetResultScopeResType = z.infer<typeof getResultScopeResSchema>;
type ResultScopeOrigin = z.infer<typeof resultScopeOriginSchema>;
type ResultScopeFile = z.infer<typeof resultScopeFileSchema>;
type ResultScopeDetail = z.infer<typeof resultScopeDetailSchema>;
type RejectOption = z.infer<typeof rejectOptionSchema>;

export {
  getResultScopeResSchema,
  rejectOptionSchema,
  resultScopeDetailSchema,
  resultScopeOriginSchema,
  type GetResultScopeResType,
  type RejectOption,
  type ResultScopeDetail,
  type ResultScopeFile,
  type ResultScopeOrigin,
};
