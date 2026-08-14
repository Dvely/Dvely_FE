import { z } from 'zod';
import { approvalStatusSchema, approvalTypeSchema } from '@/types/common.enum';

const approvalSchema = z.object({
  /** 승인 ID */
  approvalId: z.number().int(),
  /** 프로젝트 ID */
  projectId: z.number().int(),
  /** 대화 ID. 없으면 null */
  conversationId: z.number().int().nullable().prefault(null),
  /** 태스크 ID. 없으면 null */
  taskId: z.string().nullable().prefault(''),
  /** 승인 유형 */
  type: approvalTypeSchema,
  /** 승인 상태 */
  status: approvalStatusSchema,
  /** 요약. 없으면 null */
  summary: z.string().nullable().prefault(''),
  /** 생성 시각 */
  createdAt: z.string().min(1, '생성 시각이 없습니다.').prefault(''),
  /** 결정 시각. 없으면 null */
  decidedAt: z.string().nullable().prefault(''),
});

const getProjectApprovalListResSchema = z.array(approvalSchema);
const getApprovalDetailResSchema = approvalSchema;
const postApprovalDecideResSchema = approvalSchema;

type Approval = z.infer<typeof approvalSchema>;
type GetProjectApprovalListResType = z.infer<typeof getProjectApprovalListResSchema>;
type GetApprovalDetailResType = z.infer<typeof getApprovalDetailResSchema>;
type PostApprovalDecideResType = z.infer<typeof postApprovalDecideResSchema>;

export {
  approvalSchema,
  getProjectApprovalListResSchema,
  getApprovalDetailResSchema,
  postApprovalDecideResSchema,
  type Approval,
  type GetProjectApprovalListResType,
  type GetApprovalDetailResType,
  type PostApprovalDecideResType,
};
