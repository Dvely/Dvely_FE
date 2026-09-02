import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/* Project                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * 프로젝트 상태
 * @example "DRAFT"
 */
const projectStatusSchema = z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED']);

/**
 * 배포 상태
 * @example "DRAFT"
 */
const deployStatusSchema = z.enum([
  'DRAFT',
  'PENDING',
  'IN_PROGRESS',
  'PREVIEW_READY',
  'LIVE',
  'FAILED',
]);

/**
 * 저장소 공개 범위
 * @example "PRIVATE"
 */
const repositoryVisibilitySchema = z.enum(['PUBLIC', 'PRIVATE']);

/**
 * 저장소 연결 상태
 * @example "BOUND"
 */
const repositoryBindingStatusSchema = z.enum(['NOT_BOUND', 'BOUND']);

/**
 * 저장소 health 상태
 * @example "HEALTHY"
 */
const repositoryHealthStatusSchema = z.enum([
  'HEALTHY',
  'REPOSITORY_NOT_FOUND',
  'ACCESS_DENIED',
  'PERMISSION_MISMATCH',
  'UNKNOWN_ERROR',
]);

/**
 * 프로젝트 삭제 범위
 * @example "PROJECT_ONLY"
 */
const projectDeleteModeSchema = z.enum(['PROJECT_ONLY', 'PROJECT_AND_REPOSITORY']);

/**
 * 프로젝트 시작 방식
 * @example "blank"
 */
const startModeSchema = z.enum(['blank', 'template']);

/**
 * 저장소 연결 방식
 * @example "create"
 */
const repositoryModeSchema = z.enum(['create', 'existing']);

/* -------------------------------------------------------------------------- */
/* Deployment                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * 배포 대상 유형
 * @example "LATEST"
 */
const deployTargetTypeSchema = z.enum(['LATEST', 'VERSION']);

/**
 * 빌드 상태
 * @example "queued"
 */
const buildStatusSchema = z.enum(['queued', 'in_progress', 'completed']);

/**
 * 빌드 결과. 값이 없으면 null
 * @example "success"
 */
const buildConclusionSchema = z.enum(['success', 'failure', 'cancelled']).nullable().prefault(null);

/* -------------------------------------------------------------------------- */
/* CloudConnection                                                            */
/* -------------------------------------------------------------------------- */

/**
 * 클라우드 제공자
 * @example "AWS"
 */
const cloudProviderSchema = z.enum(['AWS', 'GCP']);

/**
 * AWS 자격 증명 유형
 * @example "ACCESS_KEY"
 */
const awsCredentialTypeSchema = z.enum(['ACCESS_KEY', 'ROLE_ARN']);

/**
 * GCP 자격 증명 유형
 * @example "SERVICE_ACCOUNT_KEY"
 */
const gcpCredentialTypeSchema = z.enum(['SERVICE_ACCOUNT_KEY', 'SERVICE_ACCOUNT_EMAIL']);

/**
 * 클라우드 연결 상태
 * @example "CONNECTED"
 */
const cloudConnectionStatusSchema = z.enum([
  'VALIDATED',
  'VERIFYING',
  'CHECKING',
  'CONNECTED',
  'PERMISSION_MISSING',
  'BILLING_DISABLED',
  'REGION_UNSUPPORTED',
  'INVALID_CREDENTIAL',
  'UNKNOWN_ERROR',
]);

/**
 * 클라우드 검증 Job 상태
 * @example "SUCCEEDED"
 */
const cloudVerificationJobStatusSchema = z.enum(['PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED']);

/* -------------------------------------------------------------------------- */
/* Domain                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * 도메인 유형
 * @example "managed_subdomain"
 */
const domainTypeSchema = z.enum(['managed_subdomain', 'purchasable_domain', 'custom_domain']);

/**
 * 도메인 상태
 * @example "REQUESTED"
 */
const domainStatusSchema = z.enum([
  'REQUESTED',
  'PROVISIONING',
  'VERIFYING',
  'CONNECTED',
  'FAILED',
]);

/**
 * 도메인 검증 방식
 * @example "CNAME"
 */
const verificationMethodSchema = z.enum(['CNAME', 'A']);

/**
 * 도메인 호스팅 대상
 * @example "GITHUB_PAGES"
 */
const hostingTargetSchema = z.enum(['GITHUB_PAGES', 'AWS', 'GCP']);

/**
 * 인증서 상태
 * @example "ACTIVE"
 */
const certificateStatusSchema = z.enum(['PENDING', 'PROVISIONING', 'ACTIVE', 'FAILED']);

/* -------------------------------------------------------------------------- */
/* Chat                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * 채팅 메시지 역할
 * @example "user"
 */
const chatRoleSchema = z.enum(['user', 'assistant', 'system']);

/**
 * 환경변수 적용 범위
 * @example "PREVIEW"
 */
const environmentVariableScopeSchema = z.enum(['PREVIEW', 'PRODUCTION']);

/**
 * AI 제공자
 * @example "ANTHROPIC"
 */
const aiProviderSchema = z.enum(['ANTHROPIC', 'OPENAI']);

/**
 * 에이전트 단계 유형.
 * 열린 문자열로 받는다 — 계획에 새 단계가 생길 때마다 값이 늘고(RUNTIME_SETUP 이 그 예),
 * 화면은 이 값으로 분기하지 않는다. 닫아두면 값 하나 때문에 계획 응답 전체가 파싱에
 * 실패해 사용자가 요청을 보내도 아무 일도 안 일어난 것처럼 보인다.
 * 알려진 값: CHAT · CODE · DEPLOY · DOMAIN_BIND · INFRA_OPERATE · RUNTIME_SETUP
 */
const agentTypeSchema = z.string().min(1, '에이전트 유형이 없습니다.').prefault('');

/**
 * 에이전트 태스크 상태
 * @example "RUNNING"
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
 * 승인 유형
 * @example "CHANGE"
 */
/**
 * 승인 유형. 알려진 값: CHANGE · DEPLOYMENT · DOMAIN_BINDING · INFRA_OPERATION ·
 * REPOSITORY_BINDING · RESULT · SERVER_PROVISION.
 *
 * 열린 문자열로 받는다. 화면은 이 값으로 문구를 고르지만 모르는 값이면 기본 문구로
 * 떨어지면 그만이다. 반면 닫아두면 서버가 유형을 하나 늘릴 때 승인 조회가 통째로
 * 파싱에 실패하고, 그러면 승인 카드가 아예 안 떠서 사용자가 결정할 방법이 사라진다 —
 * REPOSITORY_BINDING 이 추가됐을 때 실제로 그렇게 막혔다.
 */
const approvalTypeSchema = z.string().min(1, '승인 유형이 없습니다.').prefault('');

/**
 * 승인 상태
 * @example "PENDING"
 */
const approvalStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);

/**
 * Change 상태
 * @example "PREVIEW_READY"
 */
const changeStatusSchema = z.enum(['PREVIEW_READY', 'MERGED', 'REJECTED', 'DEPLOYED']);

/**
 * 인프라 배포 아키텍처
 * @example "SERVERLESS"
 */
const deploymentArchitectureSchema = z.enum(['SERVER', 'CONTAINER', 'SERVERLESS']);

/**
 * 인프라 컴퓨팅 티어
 * @example "SMALL"
 */
const computeTierSchema = z.enum(['MICRO', 'SMALL', 'MEDIUM', 'LARGE']);

/**
 * 인프라 스토리지 유형
 * @example "NONE"
 */
const storageTypeSchema = z.enum(['NONE', 'OBJECT_STORAGE']);

/**
 * 인프라 네트워크 접근
 * @example "PUBLIC"
 */
const networkAccessSchema = z.enum(['PUBLIC', 'PRIVATE']);

/**
 * 예산 상태
 * @example "WITHIN_BUDGET"
 */
const budgetStatusSchema = z.enum(['NO_BUDGET', 'WITHIN_BUDGET', 'OVER_BUDGET', 'NOT_EVALUABLE']);

/** @deprecated deployStatusSchema 사용 */
const projectDeployStatusSchema = deployStatusSchema;

/** @deprecated repositoryHealthStatusSchema 사용 */
const repositoryHealthSchema = repositoryHealthStatusSchema;

/** 프로젝트 상태 */
type ProjectStatus = z.infer<typeof projectStatusSchema>;
/** 배포 상태 */
type DeployStatus = z.infer<typeof deployStatusSchema>;
/** 저장소 공개 범위 */
type RepositoryVisibility = z.infer<typeof repositoryVisibilitySchema>;
/** 저장소 연결 상태 */
type RepositoryBindingStatus = z.infer<typeof repositoryBindingStatusSchema>;
/** 저장소 health 상태 */
type RepositoryHealthStatus = z.infer<typeof repositoryHealthStatusSchema>;
/** 프로젝트 삭제 범위 */
type ProjectDeleteMode = z.infer<typeof projectDeleteModeSchema>;
/** 프로젝트 시작 방식 */
type StartMode = z.infer<typeof startModeSchema>;
/** 저장소 연결 방식 */
type RepositoryMode = z.infer<typeof repositoryModeSchema>;
/** 배포 대상 유형 */
type DeployTargetType = z.infer<typeof deployTargetTypeSchema>;
/** 빌드 상태 */
type BuildStatus = z.infer<typeof buildStatusSchema>;
/** 빌드 결과 */
type BuildConclusion = z.infer<typeof buildConclusionSchema>;
/** 클라우드 제공자 */
type CloudProvider = z.infer<typeof cloudProviderSchema>;
/** AWS 자격 증명 유형 */
type AwsCredentialType = z.infer<typeof awsCredentialTypeSchema>;
/** GCP 자격 증명 유형 */
type GcpCredentialType = z.infer<typeof gcpCredentialTypeSchema>;
/** 클라우드 연결 상태 */
type CloudConnectionStatus = z.infer<typeof cloudConnectionStatusSchema>;
/** 도메인 유형 */
type DomainType = z.infer<typeof domainTypeSchema>;
/** 도메인 상태 */
type DomainStatus = z.infer<typeof domainStatusSchema>;
/** 도메인 검증 방식 */
type VerificationMethod = z.infer<typeof verificationMethodSchema>;
/** 채팅 메시지 역할 */
type ChatRole = z.infer<typeof chatRoleSchema>;
/** 환경변수 적용 범위 */
type EnvironmentVariableScope = z.infer<typeof environmentVariableScopeSchema>;
/** AI 제공자 */
type AiProvider = z.infer<typeof aiProviderSchema>;
/** 에이전트 작업 유형 */
type AgentType = z.infer<typeof agentTypeSchema>;
/** 에이전트 태스크 상태 */
type AgentTaskStatus = z.infer<typeof agentTaskStatusSchema>;
/** 승인 유형 */
type ApprovalType = z.infer<typeof approvalTypeSchema>;
/** 승인 상태 */
type ApprovalStatus = z.infer<typeof approvalStatusSchema>;
/** Change 상태 */
type ChangeStatus = z.infer<typeof changeStatusSchema>;
/** 인프라 배포 아키텍처 */
type DeploymentArchitecture = z.infer<typeof deploymentArchitectureSchema>;
/** 인프라 컴퓨팅 티어 */
type ComputeTier = z.infer<typeof computeTierSchema>;
/** 인프라 스토리지 유형 */
type StorageType = z.infer<typeof storageTypeSchema>;
/** 인프라 네트워크 접근 */
type NetworkAccess = z.infer<typeof networkAccessSchema>;
/** 예산 상태 */
type BudgetStatus = z.infer<typeof budgetStatusSchema>;
/** 클라우드 검증 Job 상태 */
type CloudVerificationJobStatus = z.infer<typeof cloudVerificationJobStatusSchema>;
/** 도메인 호스팅 대상 */
type HostingTarget = z.infer<typeof hostingTargetSchema>;
/** 인증서 상태 */
type CertificateStatus = z.infer<typeof certificateStatusSchema>;

export {
  projectStatusSchema,
  deployStatusSchema,
  repositoryVisibilitySchema,
  repositoryBindingStatusSchema,
  repositoryHealthStatusSchema,
  projectDeleteModeSchema,
  startModeSchema,
  repositoryModeSchema,
  deployTargetTypeSchema,
  buildStatusSchema,
  buildConclusionSchema,
  cloudProviderSchema,
  awsCredentialTypeSchema,
  gcpCredentialTypeSchema,
  cloudConnectionStatusSchema,
  cloudVerificationJobStatusSchema,
  domainTypeSchema,
  domainStatusSchema,
  verificationMethodSchema,
  hostingTargetSchema,
  certificateStatusSchema,
  chatRoleSchema,
  environmentVariableScopeSchema,
  aiProviderSchema,
  agentTypeSchema,
  agentTaskStatusSchema,
  approvalTypeSchema,
  approvalStatusSchema,
  changeStatusSchema,
  deploymentArchitectureSchema,
  computeTierSchema,
  storageTypeSchema,
  networkAccessSchema,
  budgetStatusSchema,
  projectDeployStatusSchema,
  repositoryHealthSchema,
  type ProjectStatus,
  type DeployStatus,
  type RepositoryVisibility,
  type RepositoryBindingStatus,
  type RepositoryHealthStatus,
  type ProjectDeleteMode,
  type StartMode,
  type RepositoryMode,
  type DeployTargetType,
  type BuildStatus,
  type BuildConclusion,
  type CloudProvider,
  type AwsCredentialType,
  type GcpCredentialType,
  type CloudConnectionStatus,
  type CloudVerificationJobStatus,
  type DomainType,
  type DomainStatus,
  type VerificationMethod,
  type HostingTarget,
  type CertificateStatus,
  type ChatRole,
  type EnvironmentVariableScope,
  type AiProvider,
  type AgentType,
  type AgentTaskStatus,
  type ApprovalType,
  type ApprovalStatus,
  type ChangeStatus,
  type DeploymentArchitecture,
  type ComputeTier,
  type StorageType,
  type NetworkAccess,
  type BudgetStatus,
};
