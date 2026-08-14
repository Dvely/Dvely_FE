import { z } from 'zod';

const previewResourceUsageSchema = z.object({
  /** 메모리 사용량(byte). 없으면 null */
  memoryUsageBytes: z.number().int().nullable().prefault(null),
  /** 메모리 한도(byte). 없으면 null */
  memoryLimitBytes: z.number().int().nullable().prefault(null),
  /** 메모리 사용률. 없으면 null */
  memoryUsagePercent: z.number().nullable().prefault(null),
  /** CPU 사용률. 없으면 null */
  cpuPercent: z.number().nullable().prefault(null),
});

/**
 * GET /preview-sessions/{sessionId}/status Preview 세션 상태 응답
 */
const getPreviewSessionStatusResSchema = z.object({
  /** 세션 ID */
  sessionId: z.string().min(1, '세션 ID가 없습니다.').prefault(''),
  /** 프로젝트 ID */
  projectId: z.number().int(),
  /** 태스크 ID. 없으면 null */
  taskId: z.string().nullable().prefault(''),
  /** 세션 상태 */
  sessionStatus: z.string().min(1, '세션 상태가 없습니다.').prefault(''),
  /** 컨테이너 실행 여부 */
  containerRunning: z.boolean(),
  /** OOM 종료 여부 */
  oomKilled: z.boolean(),
  /** 종료 코드. 없으면 null */
  exitCode: z.number().int().nullable().prefault(null),
  /** 시작 시각. 없으면 null */
  startedAt: z.string().nullable().prefault(''),
  /** 만료 시각. 없으면 null */
  expiresAt: z.string().nullable().prefault(''),
  /** 리소스 사용량. 없으면 null */
  resources: previewResourceUsageSchema.nullable().prefault(null),
});

/**
 * GET /preview-sessions/{sessionId}/logs Preview 세션 로그 응답
 */
const getPreviewSessionLogsResSchema = z.object({
  /** 세션 ID */
  sessionId: z.string().min(1, '세션 ID가 없습니다.').prefault(''),
  /** 컨테이너 실행 여부 */
  containerRunning: z.boolean(),
  /** 로그 텍스트. 없으면 null */
  logText: z.string().nullable().prefault(''),
});

type GetPreviewSessionStatusResType = z.infer<typeof getPreviewSessionStatusResSchema>;
type GetPreviewSessionLogsResType = z.infer<typeof getPreviewSessionLogsResSchema>;

export {
  previewResourceUsageSchema,
  getPreviewSessionStatusResSchema,
  getPreviewSessionLogsResSchema,
  type GetPreviewSessionStatusResType,
  type GetPreviewSessionLogsResType,
};
