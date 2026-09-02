import { z } from 'zod';

/**
 * EC2 백엔드 서버 프로비저닝 상태.
 * 알려진 값: PENDING(승인 대기) · QUEUED(승인됨, 워커 대기) · BUILDING(빌드 중) ·
 * PROVISIONING(인스턴스 생성됨, 헬스체크 대기) · RUNNING · FAILED · TERMINATED.
 *
 * DB 와 같은 이유로 열린 문자열이다 — 배포 파이프라인 단계는 늘어나기 쉽고(빌드가
 * 쪼개지거나 롤백 단계가 붙는 식), 닫아두면 값이 하나 늘 때마다 목록 전체가 파싱에
 * 실패해 화면이 통째로 빈다. 화면은 아는 값만 라벨로 바꾸고 모르는 값은 그대로 보여준다.
 */
const serverStatusSchema = z.string().min(1, '서버 상태가 없습니다.').prefault('');

/**
 * 프로비저닝된 EC2 백엔드 서버. 서버가 비밀값(키페어·SSM 파라미터)은 싣지 않는다.
 */
const provisionedServerSchema = z.object({
  /** 서버 ID */
  serverId: z.number().int(),
  /** 프로젝트 ID */
  projectId: z.number().int(),
  /** 프로비저닝 상태 */
  status: serverStatusSchema,
  /** 인스턴스 티어. 예: t3.micro */
  instanceType: z.string().nullable().prefault(null),
  /** 퍼블릭 호스트. 인스턴스가 뜨기 전이면 null */
  host: z.string().nullable().prefault(null),
  /** 앱 포트. 백엔드 규약상 8080 고정이지만 서버가 주는 값을 쓴다 */
  port: z.number().int().nullable().prefault(null),
  /** RUNNING 일 때만 접속 URL, 아니면 null */
  url: z.string().nullable().prefault(null),
  /** EC2 인스턴스 ID. 생성 전이면 null */
  instanceId: z.string().nullable().prefault(null),
  /** 실패 분류. 성공·진행 중이면 null. 사용자 거부도 null(=거부됨) */
  errorCode: z.string().nullable().prefault(null),
  /** 실패 상세. 서버 문구 그대로 */
  errorMessage: z.string().nullable().prefault(null),
  /** 생성 시각 */
  createdAt: z.string().nullable().prefault(null),
  /** 수정 시각 */
  updatedAt: z.string().nullable().prefault(null),
});

/** GET /projects/{projectId}/servers 응답 */
const getProjectServerListResSchema = z.array(provisionedServerSchema);

/** POST /projects/{projectId}/servers 요청. instanceType 을 비우면 서버가 t3.micro 를 쓴다 */
const postProjectServerReqSchema = z.object({
  instanceType: z.string().optional(),
});

/**
 * POST /projects/{projectId}/servers 응답.
 *
 * 과금 자원이라 서버는 항상 승인 대기로 돌려준다(requiresApproval=true). 그래도 값을
 * 그대로 읽어 화면을 가른다 — "항상 true" 를 FE 가 가정해 버리면 나중에 정책이 바뀌었을 때
 * 화면만 조용히 틀린 안내를 계속하게 된다.
 */
const postProjectServerResSchema = z.object({
  /** 승인이 필요한지 */
  requiresApproval: z.boolean(),
  /** 생성 대기 행의 ID */
  serverId: z.number().int().nullable().prefault(null),
  /** 생성된 승인 ID 목록 */
  approvalIds: z.array(z.number().int()).prefault([]),
});

type ServerStatus = z.infer<typeof serverStatusSchema>;
type ProvisionedServer = z.infer<typeof provisionedServerSchema>;
type GetProjectServerListResType = z.infer<typeof getProjectServerListResSchema>;
type PostProjectServerReqType = z.infer<typeof postProjectServerReqSchema>;
type PostProjectServerResType = z.infer<typeof postProjectServerResSchema>;

export {
  serverStatusSchema,
  provisionedServerSchema,
  getProjectServerListResSchema,
  postProjectServerReqSchema,
  postProjectServerResSchema,
  type ServerStatus,
  type ProvisionedServer,
  type GetProjectServerListResType,
  type PostProjectServerReqType,
  type PostProjectServerResType,
};
