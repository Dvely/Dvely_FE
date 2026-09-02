import { z } from 'zod';
import { agentTaskStatusSchema, agentTypeSchema, aiProviderSchema } from '@/types/common.enum';

const agentStepSchema = z.object({
  /** 에이전트 작업 유형 */
  agentType: agentTypeSchema,
  /** 단계 파라미터 */
  parameters: z.record(z.string(), z.unknown()),
});

/**
 * POST /agent/decision 에이전트 요청 제출 요청
 */
const postAgentDecisionReqSchema = z.object({
  /** 사용자 요청 본문 */
  content: z.string().min(1, '요청 본문을 입력해주세요.').prefault(''),
  /** AI 제공자 */
  aiProvider: aiProviderSchema,
  /** 대상 프로젝트 ID. 없으면 null */
  projectId: z.number().int().nullable().prefault(null),
  /** 대상 대화 ID. 없으면 null */
  conversationId: z.number().int().nullable().prefault(null),
});

/**
 * POST /agent/decision 에이전트 요청 제출 응답
 */
const postAgentDecisionResSchema = z.object({
  /** 실행 단계 */
  steps: z.array(agentStepSchema),
  /** 판단 근거 */
  reasoning: z.string().nullable().prefault(''),
  /** AI 제공자 */
  aiProvider: aiProviderSchema,
  /** 태스크 ID */
  taskId: z.string().prefault(''),
  /** 태스크 상태 */
  status: z.string().prefault(''),
  /** 생성된 승인 ID 목록 */
  approvalIds: z.array(z.number().int()),
});

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
  taskId: z.string().prefault(''),
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

const getAgentTaskStatusResSchema = getAgentTaskResSchema;

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
  taskId: z.string().prefault(''),
  /** 이벤트 타입 (CREATED, STARTED, COMPLETED 등) */
  type: z.string().prefault(''),
  /** 이벤트 시점의 태스크 상태 */
  status: agentTaskStatusSchema,
  /** 진행 메시지 */
  message: z.string().nullable().prefault(''),
  /** 이벤트 생성 시각 (ISO 8601 date-time) */
  createdAt: z.string().prefault(''),
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
/** GET /agent/tasks/{taskId} 태스크 상태 조회 응답 */
type GetAgentTaskStatusResType = GetAgentTaskResType;
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
type AgentStep = z.infer<typeof agentStepSchema>;
type PostAgentDecisionReqType = z.infer<typeof postAgentDecisionReqSchema>;
type PostAgentDecisionResType = z.infer<typeof postAgentDecisionResSchema>;

export {
  agentStepSchema,
  postAgentDecisionReqSchema,
  postAgentDecisionResSchema,
  getAgentTaskParamsSchema,
  getAgentTaskResSchema,
  getAgentTaskStatusResSchema,
  getAgentTaskEventListParamsSchema,
  agentTaskEventSchema,
  getAgentTaskEventListResSchema,
  getAgentTaskEventStreamParamsSchema,
  postAgentTaskInputParamsSchema,
  postAgentTaskInputReqSchema,
  type AgentStep,
  type PostAgentDecisionReqType,
  type PostAgentDecisionResType,
  type AgentTaskStatus,
  type GetAgentTaskParamsType,
  type GetAgentTaskResType,
  type GetAgentTaskStatusResType,
  type GetAgentTaskEventListParamsType,
  type AgentTaskEvent,
  type GetAgentTaskEventListResType,
  type GetAgentTaskEventStreamParamsType,
  type PostAgentTaskInputParamsType,
  type PostAgentTaskInputReqType,
};
