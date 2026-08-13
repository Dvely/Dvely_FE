import { z } from 'zod';

/**
 * 에이전트 태스크 상태
 * @example "DONE"
 */
const agentTaskStatusSchema = z.enum([
  'PENDING',
  'WAITING_APPROVAL',
  'QUEUED',
  'RETRY_WAIT',
  'RUNNING',
  'WAITING_INPUT',
  'WAITING_RESULT_APPROVAL',
  'DONE',
  'FAILED',
  'CANCELLED',
]);

/**
 * GET /agent/tasks/{taskId} 태스크 상태 조회 요청 (path)
 */
const getAgentTaskParamsSchema = z.object({
  /** 조회할 에이전트 태스크 ID */
  taskId: z.string().min(1, '태스크 ID가 없습니다.').prefault(''),
});

/**
 * GET /agent/tasks/{taskId} 태스크 상태 조회 응답
 */
const getAgentTaskResSchema = z.object({
  /** 태스크 ID */
  taskId: z.string().min(1, '태스크 ID가 없습니다.').prefault(''),
  /** 태스크 상태 */
  status: agentTaskStatusSchema,
  /** 토큰 기반 프리뷰 gateway URL. CODE 스텝 완료 시에만 설정됨 */
  previewUrl: z.string().nullable().prefault(''),
  /** 작업 완료 요약. 배포 URL, 도메인 연결 결과 등 포함 */
  summary: z.string().nullable().prefault(''),
  /** 실패 원인 메시지. status가 FAILED일 때 설정됨 */
  error: z.string().nullable().prefault(''),
  /** 에이전트가 사용자에게 묻는 질문. WAITING_INPUT일 때 설정됨 */
  question: z.string().nullable().prefault(''),
  /** 실패 로그의 마지막 일부 */
  failureLog: z.string().nullable().prefault(''),
  /** 사용자에게 제안하는 최선의 수정안 */
  suggestedFix: z.string().nullable().prefault(''),
  /** 현재 재시도 횟수 */
  attempt: z.number().int().nullable().prefault(null),
  /** 최대 재시도 횟수 */
  maxAttempts: z.number().int().nullable().prefault(null),
  /** POST /tasks/{taskId}/retry 호출이 실제로 성공할지 여부 */
  retryable: z.boolean().nullable().prefault(null),
  /** PENDING 승인 ID. 없으면 null */
  pendingApprovalId: z.number().int().nullable().prefault(null),
});

/**
 * GET /agent/tasks/{taskId}/events 태스크 이벤트 조회 요청 (path + query)
 */
const getAgentTaskEventListParamsSchema = z.object({
  /** 조회할 에이전트 태스크 ID */
  taskId: z.string().min(1, '태스크 ID가 없습니다.').prefault(''),
  /** 마지막으로 받은 event ID. 이 값 이후 이벤트만 반환 */
  afterEventId: z.number().int().nullable().prefault(null),
});

/**
 * GET /agent/tasks/{taskId}/events 태스크 이벤트 항목
 */
const agentTaskEventSchema = z.object({
  /** 이벤트 ID */
  eventId: z.number().int(),
  /** 태스크 ID */
  taskId: z.string().min(1, '태스크 ID가 없습니다.').prefault(''),
  /** 이벤트 타입 (CREATED, STARTED, COMPLETED 등) */
  type: z.string().min(1, '이벤트 타입이 없습니다.').prefault(''),
  /** 이벤트 시점의 태스크 상태 */
  status: agentTaskStatusSchema,
  /** 진행 메시지 */
  message: z.string().nullable().prefault(''),
  /** 이벤트 생성 시각 (ISO 8601 date-time) */
  createdAt: z.string().min(1, '생성 시각이 없습니다.').prefault(''),
});

/**
 * GET /agent/tasks/{taskId}/events 태스크 이벤트 목록 응답
 */
const getAgentTaskEventListResSchema = z.array(agentTaskEventSchema);

/**
 * GET /agent/tasks/{taskId}/events/stream 태스크 이벤트 스트림 요청 (path + query)
 */
const getAgentTaskEventStreamParamsSchema = getAgentTaskEventListParamsSchema;

/**
 * POST /agent/tasks/{taskId}/input 사용자 입력 제출 요청 (path)
 */
const postAgentTaskInputParamsSchema = z.object({
  /** 입력을 제출할 에이전트 태스크 ID */
  taskId: z.string().min(1, '태스크 ID가 없습니다.').prefault(''),
});

/**
 * POST /agent/tasks/{taskId}/input 사용자 입력 제출 요청 body
 */
const postAgentTaskInputReqSchema = z.object({
  /** 에이전트 질문에 대한 사용자 응답값 */
  value: z.string().min(1, '입력값을 입력해주세요.').prefault(''),
});

/** 에이전트 태스크 상태 */
type AgentTaskStatus = z.infer<typeof agentTaskStatusSchema>;
/** GET /agent/tasks/{taskId} 태스크 상태 조회 요청 (path) */
type GetAgentTaskParamsType = z.infer<typeof getAgentTaskParamsSchema>;
/** GET /agent/tasks/{taskId} 태스크 상태 조회 응답 */
type GetAgentTaskResType = z.infer<typeof getAgentTaskResSchema>;
/** GET /agent/tasks/{taskId}/events 태스크 이벤트 조회 요청 (path + query) */
type GetAgentTaskEventListParamsType = z.infer<typeof getAgentTaskEventListParamsSchema>;
/** GET /agent/tasks/{taskId}/events 태스크 이벤트 항목 */
type AgentTaskEvent = z.infer<typeof agentTaskEventSchema>;
/** GET /agent/tasks/{taskId}/events 태스크 이벤트 목록 응답 */
type GetAgentTaskEventListResType = z.infer<typeof getAgentTaskEventListResSchema>;
/** GET /agent/tasks/{taskId}/events/stream 태스크 이벤트 스트림 요청 (path + query) */
type GetAgentTaskEventStreamParamsType = z.infer<typeof getAgentTaskEventStreamParamsSchema>;
/** POST /agent/tasks/{taskId}/input 사용자 입력 제출 요청 (path) */
type PostAgentTaskInputParamsType = z.infer<typeof postAgentTaskInputParamsSchema>;
/** POST /agent/tasks/{taskId}/input 사용자 입력 제출 요청 body */
type PostAgentTaskInputReqType = z.infer<typeof postAgentTaskInputReqSchema>;

export {
  agentTaskStatusSchema,
  getAgentTaskParamsSchema,
  getAgentTaskResSchema,
  getAgentTaskEventListParamsSchema,
  agentTaskEventSchema,
  getAgentTaskEventListResSchema,
  getAgentTaskEventStreamParamsSchema,
  postAgentTaskInputParamsSchema,
  postAgentTaskInputReqSchema,
  type AgentTaskStatus,
  type GetAgentTaskParamsType,
  type GetAgentTaskResType,
  type GetAgentTaskEventListParamsType,
  type AgentTaskEvent,
  type GetAgentTaskEventListResType,
  type GetAgentTaskEventStreamParamsType,
  type PostAgentTaskInputParamsType,
  type PostAgentTaskInputReqType,
};
