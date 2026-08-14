import { z } from 'zod';
import {
  awsCredentialTypeSchema,
  cloudProviderSchema,
  cloudVerificationJobStatusSchema,
  gcpCredentialTypeSchema,
} from '@/types/common.enum';

/**
 * POST /cloud-connections 클라우드 연결 등록 요청
 */
const postCloudConnectionCreateReqSchema = z.object({
  /** 클라우드 제공자 */
  provider: cloudProviderSchema,
  /** 연결 표시 이름 */
  displayName: z.string().min(1, '표시 이름을 입력해주세요.').prefault(''),
  /** 계정 ID. 없으면 null */
  accountId: z.string().nullable().prefault(''),
  /** 리전 */
  region: z.string().min(1, '리전을 입력해주세요.').prefault(''),
  /** AWS Role ARN. 없으면 null */
  roleArn: z.string().nullable().prefault(''),
  /** AWS 자격 증명 유형. 없으면 null */
  awsCredentialType: awsCredentialTypeSchema.nullable().prefault(null),
  /** AWS Access Key ID. 없으면 null */
  accessKeyId: z.string().nullable().prefault(''),
  /** AWS Secret Access Key. 없으면 null */
  secretAccessKey: z.string().nullable().prefault(''),
  /** AWS 세션 토큰. 없으면 null */
  sessionToken: z.string().nullable().prefault(''),
  /** GCP 자격 증명 유형. 없으면 null */
  gcpCredentialType: gcpCredentialTypeSchema.nullable().prefault(null),
  /** GCP 서비스 계정 키 JSON. 없으면 null */
  serviceAccountKeyJson: z.string().nullable().prefault(''),
  /** GCP 프로젝트 ID. 없으면 null */
  projectId: z.string().nullable().prefault(''),
  /** GCP 서비스 계정 이메일. 없으면 null */
  serviceAccountEmail: z.string().nullable().prefault(''),
});

/**
 * POST /cloud-connections 클라우드 연결 등록 응답
 */
const postCloudConnectionCreateResSchema = z.object({
  /** 클라우드 연결 ID */
  cloudConnectionId: z.number().int(),
  /** 클라우드 제공자 */
  provider: cloudProviderSchema,
  /** 연결 상태 */
  status: z.string().min(1, '연결 상태가 없습니다.').prefault(''),
  /** 검증 Job ID */
  jobId: z.string().min(1, 'Job ID가 없습니다.').prefault(''),
});

const cloudConnectionSchema = z.object({
  /** 클라우드 연결 ID */
  cloudConnectionId: z.number().int(),
  /** 클라우드 제공자 */
  provider: cloudProviderSchema,
  /** 연결 표시 이름 */
  displayName: z.string().min(1, '표시 이름이 없습니다.').prefault(''),
  /** 계정 ID. 없으면 null */
  accountId: z.string().nullable().prefault(''),
  /** 리전 */
  region: z.string().min(1, '리전이 없습니다.').prefault(''),
  /** AWS Role ARN. 없으면 null */
  roleArn: z.string().nullable().prefault(''),
  /** AWS 자격 증명 유형. 없으면 null */
  awsCredentialType: awsCredentialTypeSchema.nullable().prefault(null),
  /** AWS Access Key ID. 없으면 null */
  accessKeyId: z.string().nullable().prefault(''),
  /** Secret Access Key 설정 여부 */
  secretAccessKeyConfigured: z.boolean(),
  /** 세션 토큰 설정 여부 */
  sessionTokenConfigured: z.boolean(),
  /** GCP 자격 증명 유형. 없으면 null */
  gcpCredentialType: gcpCredentialTypeSchema.nullable().prefault(null),
  /** 서비스 계정 키 설정 여부 */
  serviceAccountKeyConfigured: z.boolean(),
  /** GCP 프로젝트 ID. 없으면 null */
  projectId: z.string().nullable().prefault(''),
  /** GCP 서비스 계정 이메일. 없으면 null */
  serviceAccountEmail: z.string().nullable().prefault(''),
  /** 연결 상태 */
  status: z.string().min(1, '연결 상태가 없습니다.').prefault(''),
  /** 마지막 확인 시각. 없으면 null */
  lastCheckedAt: z.string().nullable().prefault(''),
  /** 생성 시각 */
  createdAt: z.string().min(1, '생성 시각이 없습니다.').prefault(''),
  /** 수정 시각 */
  updatedAt: z.string().min(1, '수정 시각이 없습니다.').prefault(''),
});

const getCloudConnectionListResSchema = z.array(cloudConnectionSchema);
const getCloudConnectionDetailResSchema = cloudConnectionSchema;

/**
 * GET /cloud-connections/{id}/health 클라우드 연결 health 응답
 */
const getCloudConnectionHealthResSchema = z.object({
  /** 클라우드 연결 ID */
  cloudConnectionId: z.number().int(),
  /** 클라우드 제공자 */
  provider: cloudProviderSchema,
  /** 연결 상태 */
  status: z.string().min(1, '연결 상태가 없습니다.').prefault(''),
  /** 상태 메시지. 없으면 null */
  message: z.string().nullable().prefault(''),
  /** 확인 시각. 없으면 null */
  checkedAt: z.string().nullable().prefault(''),
});

/**
 * GET /cloud-connection-verification-jobs/{jobId} 검증 Job 조회 응답
 */
const getCloudConnectionVerificationJobResSchema = z.object({
  /** Job ID */
  jobId: z.string().min(1, 'Job ID가 없습니다.').prefault(''),
  /** 클라우드 연결 ID */
  cloudConnectionId: z.number().int(),
  /** Job 상태 */
  status: cloudVerificationJobStatusSchema,
  /** 연결 상태. 없으면 null */
  connectionStatus: z.string().nullable().prefault(''),
  /** 상태 메시지. 없으면 null */
  message: z.string().nullable().prefault(''),
  /** 시도 횟수 */
  attempt: z.number().int(),
  /** 생성 시각 */
  createdAt: z.string().min(1, '생성 시각이 없습니다.').prefault(''),
  /** 시작 시각. 없으면 null */
  startedAt: z.string().nullable().prefault(''),
  /** 완료 시각. 없으면 null */
  completedAt: z.string().nullable().prefault(''),
});

type PostCloudConnectionCreateReqType = z.infer<typeof postCloudConnectionCreateReqSchema>;
type PostCloudConnectionCreateResType = z.infer<typeof postCloudConnectionCreateResSchema>;
type CloudConnection = z.infer<typeof cloudConnectionSchema>;
type GetCloudConnectionListResType = z.infer<typeof getCloudConnectionListResSchema>;
type GetCloudConnectionDetailResType = z.infer<typeof getCloudConnectionDetailResSchema>;
type GetCloudConnectionHealthResType = z.infer<typeof getCloudConnectionHealthResSchema>;
type GetCloudConnectionVerificationJobResType = z.infer<
  typeof getCloudConnectionVerificationJobResSchema
>;

export {
  postCloudConnectionCreateReqSchema,
  postCloudConnectionCreateResSchema,
  cloudConnectionSchema,
  getCloudConnectionListResSchema,
  getCloudConnectionDetailResSchema,
  getCloudConnectionHealthResSchema,
  getCloudConnectionVerificationJobResSchema,
  type PostCloudConnectionCreateReqType,
  type PostCloudConnectionCreateResType,
  type CloudConnection,
  type GetCloudConnectionListResType,
  type GetCloudConnectionDetailResType,
  type GetCloudConnectionHealthResType,
  type GetCloudConnectionVerificationJobResType,
};
