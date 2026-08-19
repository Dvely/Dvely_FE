import { z } from 'zod';
import { deployTargetTypeSchema } from '@/types/common.enum';

/**
 * POST /projects/{projectId}/deployments 배포 요청
 */
const postProjectDeploymentCreateReqSchema = z.object({
  /** 배포 대상 유형 */
  deployTargetType: deployTargetTypeSchema,
  /** 버전 이름. LATEST면 null */
  versionName: z.string().nullable().prefault(''),
});

const deployResponseSchema = z.object({
  /** 배포 ID */
  deploymentId: z.number().int(),
  /** 프로젝트 ID */
  projectId: z.number().int(),
  /** 배포 대상 유형 */
  deployTargetType: z.string().min(1, '배포 대상 유형이 없습니다.').prefault(''),
  /** 버전 이름. 없으면 null */
  versionName: z.string().nullable().prefault(''),
  /** 배포 상태 */
  status: z.string().min(1, '배포 상태가 없습니다.').prefault(''),
  /** GitHub Pages URL. 없으면 null */
  pagesUrl: z.string().nullable().prefault(''),
  /** 생성 시각 */
  createdAt: z.string().min(1, '생성 시각이 없습니다.').prefault(''),
});

const deploymentHistorySchema = z.object({
  /** 배포 이력 ID */
  historyId: z.number().int(),
  /** 프로젝트 ID */
  projectId: z.number().int(),
  /** 배포 대상 유형 */
  deployTargetType: z.string().min(1, '배포 대상 유형이 없습니다.').prefault(''),
  /** 버전 라벨. 없으면 null */
  versionLabel: z.string().nullable().prefault(''),
  /** 배포 URL. 없으면 null */
  deployedUrl: z.string().nullable().prefault(''),
  /** 배포 상태 */
  status: z.string().min(1, '배포 상태가 없습니다.').prefault(''),
  /** 트리거 시각 */
  triggeredAt: z.string().min(1, '트리거 시각이 없습니다.').prefault(''),
  /** 수정 시각 */
  updatedAt: z.string().min(1, '수정 시각이 없습니다.').prefault(''),
  /** 재시도 원본 이력 ID. 없으면 null */
  retriedFromHistoryId: z.number().int().nullable().prefault(null),
  /**
   * 실패 분류. 성공·진행 중이면 null.
   * 분류가 붙기 전에 닫힌 옛 이력도 null 이라, errorMessage 만 있는 경우가 있다.
   * 열린 문자열로 받는다 — 화면은 아는 값만 문구로 바꾸고 모르는 값은 상세로 넘긴다.
   */
  errorCode: z.string().nullable().prefault(null),
  /** 실패 상세. 서버 문구 그대로 온다. 성공·진행 중이면 null */
  errorMessage: z.string().nullable().prefault(null),
});

const getProjectDeploymentListResSchema = z.array(deploymentHistorySchema);

const deploymentFailureAnalysisSchema = z.object({
  /** 배포 ID */
  deploymentId: z.number().int(),
  /** 실패 요약. 없으면 null */
  summary: z.string().nullable().prefault(''),
  /** 로그 발췌. 없으면 null */
  logExcerpt: z.string().nullable().prefault(''),
  /** 권장 수정. 없으면 null */
  suggestedFix: z.string().nullable().prefault(''),
  /** 분석 출처. 없으면 null */
  analysisSource: z.string().nullable().prefault(''),
  /** 분석 시각. 없으면 null */
  analyzedAt: z.string().nullable().prefault(''),
});

const versionDetailSchema = z.object({
  /** 버전 ID */
  versionId: z.number().int(),
  /** 버전 이름 */
  versionName: z.string().min(1, '버전 이름이 없습니다.').prefault(''),
  /** 커밋 SHA. 없으면 null */
  commitSha: z.string().nullable().prefault(''),
  /** 제목. 없으면 null */
  title: z.string().nullable().prefault(''),
  /** 설명. 없으면 null */
  description: z.string().nullable().prefault(''),
  /** 배포 상태. 없으면 null */
  deployStatus: z.string().nullable().prefault(''),
  /** 배포 URL. 없으면 null */
  deployedUrl: z.string().nullable().prefault(''),
  /** 머지한 사용자. 없으면 null */
  mergedBy: z.string().nullable().prefault(''),
  /** 머지한 사용자 아바타. 없으면 null */
  mergedByAvatarUrl: z.string().nullable().prefault(''),
  /** PR 번호. 없으면 null */
  prNumber: z.number().int().nullable().prefault(null),
  /** 머지 시각. 없으면 null */
  mergedAt: z.string().nullable().prefault(''),
});

const versionSummarySchema = z.object({
  /** 버전 ID */
  versionId: z.number().int(),
  /** 버전 이름 */
  versionName: z.string().min(1, '버전 이름이 없습니다.').prefault(''),
  /** 커밋 SHA. 없으면 null */
  commitSha: z.string().nullable().prefault(''),
  /** 제목. 없으면 null */
  title: z.string().nullable().prefault(''),
  /** 배포 상태. 없으면 null */
  deployStatus: z.string().nullable().prefault(''),
  /** 머지 시각. 없으면 null */
  mergedAt: z.string().nullable().prefault(''),
});

const getProjectVersionListResSchema = z.array(versionSummarySchema);

const deploymentCandidateSchema = z.object({
  /** 버전 ID */
  versionId: z.number().int(),
  /** 버전 이름 */
  versionName: z.string().min(1, '버전 이름이 없습니다.').prefault(''),
  /** 커밋 SHA. 없으면 null */
  commitSha: z.string().nullable().prefault(''),
  /** 제목. 없으면 null */
  title: z.string().nullable().prefault(''),
  /** 배포 상태. 없으면 null */
  deployStatus: z.string().nullable().prefault(''),
  /** 배포 URL. 없으면 null */
  deployedUrl: z.string().nullable().prefault(''),
  /** 배포 시각. 없으면 null */
  deployedAt: z.string().nullable().prefault(''),
});

const getProjectDeploymentCandidateListResSchema = z.array(deploymentCandidateSchema);

const deploymentStatusSchema = z.object({
  /** 배포 이력 ID */
  historyId: z.number().int(),
  /** 프로젝트 ID */
  projectId: z.number().int(),
  /** 배포 대상 유형 */
  deployTargetType: z.string().min(1, '배포 대상 유형이 없습니다.').prefault(''),
  /** 버전 라벨. 없으면 null */
  versionLabel: z.string().nullable().prefault(''),
  /** 배포 URL. 없으면 null */
  deployedUrl: z.string().nullable().prefault(''),
  /** 배포 상태 */
  status: z.string().min(1, '배포 상태가 없습니다.').prefault(''),
  /** 빌드 상태. 없으면 null */
  buildStatus: z.string().nullable().prefault(''),
  /** 빌드 결과. 없으면 null */
  buildConclusion: z.string().nullable().prefault(''),
  /** 트리거 시각 */
  triggeredAt: z.string().min(1, '트리거 시각이 없습니다.').prefault(''),
  /** 수정 시각 */
  updatedAt: z.string().min(1, '수정 시각이 없습니다.').prefault(''),
});

const deploymentStepSchema = z.object({
  /** 스텝 번호 */
  number: z.number().int(),
  /** 스텝 이름 */
  name: z.string().min(1, '스텝 이름이 없습니다.').prefault(''),
  /** 상태. 없으면 null */
  status: z.string().nullable().prefault(''),
  /** 결과. 없으면 null */
  conclusion: z.string().nullable().prefault(''),
});

const deploymentJobSchema = z.object({
  /** Job ID */
  jobId: z.number().int(),
  /** Job 이름 */
  name: z.string().min(1, 'Job 이름이 없습니다.').prefault(''),
  /** 상태. 없으면 null */
  status: z.string().nullable().prefault(''),
  /** 결과. 없으면 null */
  conclusion: z.string().nullable().prefault(''),
  /** 스텝 목록 */
  steps: z.array(deploymentStepSchema),
});

const deploymentLogsSchema = z.object({
  /** 배포 이력 ID */
  historyId: z.number().int(),
  /** 워크플로 런 ID. 없으면 null */
  workflowRunId: z.number().int().nullable().prefault(null),
  /** Job 목록 */
  jobs: z.array(deploymentJobSchema),
  /** 로그 텍스트. 없으면 null */
  logText: z.string().nullable().prefault(''),
});

type PostProjectDeploymentCreateReqType = z.infer<typeof postProjectDeploymentCreateReqSchema>;
type DeployResponse = z.infer<typeof deployResponseSchema>;
type GetProjectDeploymentListResType = z.infer<typeof getProjectDeploymentListResSchema>;
type DeploymentFailureAnalysis = z.infer<typeof deploymentFailureAnalysisSchema>;
type VersionDetail = z.infer<typeof versionDetailSchema>;
type GetProjectVersionListResType = z.infer<typeof getProjectVersionListResSchema>;
type GetProjectDeploymentCandidateListResType = z.infer<
  typeof getProjectDeploymentCandidateListResSchema
>;
type DeploymentStatus = z.infer<typeof deploymentStatusSchema>;
type DeploymentLogs = z.infer<typeof deploymentLogsSchema>;

export {
  postProjectDeploymentCreateReqSchema,
  deployResponseSchema,
  deploymentHistorySchema,
  getProjectDeploymentListResSchema,
  deploymentFailureAnalysisSchema,
  versionDetailSchema,
  versionSummarySchema,
  getProjectVersionListResSchema,
  deploymentCandidateSchema,
  getProjectDeploymentCandidateListResSchema,
  deploymentStatusSchema,
  deploymentLogsSchema,
  type PostProjectDeploymentCreateReqType,
  type DeployResponse,
  type GetProjectDeploymentListResType,
  type DeploymentFailureAnalysis,
  type VersionDetail,
  type GetProjectVersionListResType,
  type GetProjectDeploymentCandidateListResType,
  type DeploymentStatus,
  type DeploymentLogs,
};
