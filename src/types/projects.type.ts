import { z } from 'zod';

/** GET /projects — deployStatus enum */
export const projectDeployStatusSchema = z.enum(['DRAFT']);

/** 프로젝트 목록 항목 */
export const projectListItemSchema = z.object({
  projectId: z.number().int(),
  name: z.string(),
  deployStatus: projectDeployStatusSchema,
  currentUrl: z.string().nullable(),
  updatedAt: z.string(),
  updatedAtRelativeText: z.string(),
});

/** 프로젝트 목록 조회 응답 */
export const getProjectListResSchema = z.array(projectListItemSchema);

export type ProjectDeployStatus = z.infer<typeof projectDeployStatusSchema>;
export type ProjectListItem = z.infer<typeof projectListItemSchema>;
export type GetProjectListResType = z.infer<typeof getProjectListResSchema>;
