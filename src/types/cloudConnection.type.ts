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
 * PUT /cloud-connections/{id}/credentials 자격 교체 요청.
 *
 * **새 연결을 만드는 길과 혼동하면 안 된다.** 자격이 만료됐을 때 새 연결을 만들면,
 * 기존 연결로 만든 DB·서버·CDN 을 지울 자격이 사라져 AWS 에 과금 자원으로 남는다.
 * 이 API 는 연결 id 와 리전을 그대로 두고 자격만 갈아 끼운다.
 *
 * sessionToken 이 없다 — 서버가 임시 자격을 받지 않는다. 생략한 필드는 "지금 방식
 * 그대로" 를 뜻하므로, 빈 문자열을 채워 보내지 않고 **아예 빼서** 보낸다.
 */
const putCloudConnectionCredentialsReqSchema = z.object({
  /** 생략하면 현재 방식을 유지한다 */
  awsCredentialType: awsCredentialTypeSchema.nullable().prefault(null),
  accountId: z.string().nullable().prefault(''),
  roleArn: z.string().nullable().prefault(''),
  accessKeyId: z.string().nullable().prefault(''),
  secretAccessKey: z.string().nullable().prefault(''),
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
  status: z.string().prefault(''),
  /** 검증 Job ID */
  jobId: z.string().prefault(''),
});

const cloudConnectionSchema = z.object({
  /** 클라우드 연결 ID */
  cloudConnectionId: z.number().int(),
  /** 클라우드 제공자 */
  provider: cloudProviderSchema,
  /** 연결 표시 이름 */
  displayName: z.string().prefault(''),
  /** 계정 ID. 없으면 null */
  accountId: z.string().nullable().prefault(''),
  /** 리전 */
  region: z.string().prefault(''),
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
  status: z.string().prefault(''),
  /** 마지막 확인 시각. 없으면 null */
  lastCheckedAt: z.string().nullable().prefault(''),
  /** 생성 시각 */
  createdAt: z.string().prefault(''),
  /** 수정 시각 */
  updatedAt: z.string().prefault(''),
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
  status: z.string().prefault(''),
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
  jobId: z.string().prefault(''),
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
  createdAt: z.string().prefault(''),
  /** 시작 시각. 없으면 null */
  startedAt: z.string().nullable().prefault(''),
  /** 완료 시각. 없으면 null */
  completedAt: z.string().nullable().prefault(''),
});

type PostCloudConnectionCreateReqType = z.infer<typeof postCloudConnectionCreateReqSchema>;
type PutCloudConnectionCredentialsReqType = z.infer<typeof putCloudConnectionCredentialsReqSchema>;
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
  putCloudConnectionCredentialsReqSchema,
  postCloudConnectionCreateResSchema,
  cloudConnectionSchema,
  getCloudConnectionListResSchema,
  getCloudConnectionDetailResSchema,
  getCloudConnectionHealthResSchema,
  getCloudConnectionVerificationJobResSchema,
  type PostCloudConnectionCreateReqType,
  type PutCloudConnectionCredentialsReqType,
  type PostCloudConnectionCreateResType,
  type CloudConnection,
  type GetCloudConnectionListResType,
  type GetCloudConnectionDetailResType,
  type GetCloudConnectionHealthResType,
  type GetCloudConnectionVerificationJobResType,
};

/**
 * 연결에 무엇이 필요한지 서버가 알려 주는 내용.
 *
 * 지금까지 이 안내는 화면이 들고 있었다 — IAM 정책 전문이 컴포넌트 안에 문자열로 박혀
 * 있었고 이번 주에만 다섯 번 고쳤다. 서버가 요구하는 권한이 바뀌면 화면을 다시 배포해야
 * 하고, 잊으면 **화면이 낡은 정책을 안내한다.** 사용자는 그대로 붙였다가 나중에 권한
 * 부족으로 막힌다. 무엇이 필요한지 아는 쪽은 서버다.
 */

/** 자격 방식 하나(역할 위임·액세스 키 등) */
const credentialOptionSchema = z.object({
  /** 이 값을 재조회의 credentialType 으로 보낸다 */
  type: z.string().prefault(''),
  label: z.string().prefault(''),
  /** 서버가 미는 방식. 하나만 true 인 것을 전제하지 않는다 */
  recommended: z.boolean().nullable().prefault(false),
  summary: z.string().nullable().prefault(''),
});

/** 사용자가 채워야 할 입력 한 칸 */
const requirementFieldSchema = z.object({
  key: z.string().prefault(''),
  label: z.string().prefault(''),
  description: z.string().nullable().prefault(''),
  /** 이 값을 콘솔 어디서 가져오는지 */
  whereToFind: z.string().nullable().prefault(''),
  example: z.string().nullable().prefault(''),
  required: z.boolean().nullable().prefault(true),
  /** 화면에 그대로 보여주면 안 되는 값 */
  secret: z.boolean().nullable().prefault(false),
});

/** 연결 전에 콘솔에서 밟아야 하는 단계 */
const requirementStepSchema = z.object({
  order: z.number().int().nullable().prefault(null),
  title: z.string().prefault(''),
  detail: z.string().nullable().prefault(''),
});

/**
 * 자격 종류 카드 하나.
 *
 * `type` 은 **enum 이 아니라 문자열**이다 — 운영 OpenAPI 에서도 그렇다. 그래서 값 목록을
 * 화면에 적어 두지 않는다. 모르는 값이 와도 카드는 그대로 그려진다. 값 목록을 닫아 두면
 * BE 가 종류를 늘릴 때마다 FE 를 배포해야 하고, 잊으면 **화면에서 그 종류가 사라진다.**
 */
const credentialCaseSchema = z.object({
  type: z.string().prefault(''),
  label: z.string().prefault(''),
  /** "12시간" 처럼 수명을 사람 말로 적은 것 */
  lifetime: z.string().nullable().prefault(''),
  /** 받지 않는 종류는 false 로 온다 — 임시 자격이 그렇다 */
  supported: z.boolean().nullable().prefault(false),
  /** 정확히 하나만 true 이고, 그것은 항상 supported 다 */
  recommended: z.boolean().nullable().prefault(false),
  summary: z.string().nullable().prefault(''),
  howToGet: z.array(z.string()).prefault([]),
  /** 안 받는 이유나 대안 */
  caution: z.string().nullable().prefault(''),
});

/**
 * 권한 묶음 하나. 체크박스 한 칸이 된다.
 *
 * `statements` 는 IAM 문장이라 **그대로 받아 그대로 합친다.** 내용을 화면에 적어 두면
 * 서버가 요구하는 권한이 바뀔 때마다 배포해야 하고, 잊으면 낡은 정책을 안내한다 —
 * 이 파일 아래 주석이 말하는 그 사고가 정확히 그것이었다.
 */
const policyModuleSchema = z.object({
  key: z.string().prefault(''),
  label: z.string().prefault(''),
  description: z.string().nullable().prefault(''),
  /** 해제할 수 없는 묶음 */
  required: z.boolean().nullable().prefault(false),
  defaultSelected: z.boolean().nullable().prefault(false),
  statements: z.array(z.unknown()).prefault([]),
});

/**
 * GET /cloud-connections/requirements 응답.
 *
 * 정책은 **전체본**으로 온다. 조각으로 나눠 보여주면 사용자가 이어 붙이다 틀리고, 그
 * 틀림은 한참 뒤 권한 오류로만 드러난다. 통째로 주고 복사하게 한다.
 */
const getCloudRequirementsResSchema = z.object({
  provider: z.string().prefault(''),
  credentialType: z.string().prefault(''),
  recommendedCredentialType: z.string().nullable().prefault(''),
  credentialOptions: z.array(credentialOptionSchema).prefault([]),
  fields: z.array(requirementFieldSchema).prefault([]),
  steps: z.array(requirementStepSchema).prefault([]),
  policyName: z.string().nullable().prefault(''),
  roleName: z.string().nullable().prefault(''),
  /** 권한 정책 전문. 임의 구조라 그대로 받아 화면에서 문자열로 만든다 */
  recommendedPolicy: z.unknown().nullable().prefault(null),
  /** 신뢰 정책. 역할 위임에만 있고 액세스 키면 null 이라 그때는 자리를 감춘다 */
  trustPolicy: z.unknown().nullable().prefault(null),
  /** 주의 사항. "검증은 권한을 확인하지 않는다" 같은 것이 여기 온다 */
  notes: z.array(z.string()).prefault([]),
  /** 자격 종류 카드. 서버가 이 목록을 안 주면 아래 credentialOptions 로 돌아간다 */
  credentialCases: z.array(credentialCaseSchema).prefault([]),
  /** 권한 체크박스. 안 주면 recommendedPolicy 전체본을 그대로 보여준다 */
  policyModules: z.array(policyModuleSchema).prefault([]),
});

type CredentialCase = z.infer<typeof credentialCaseSchema>;
type PolicyModule = z.infer<typeof policyModuleSchema>;
type CredentialOption = z.infer<typeof credentialOptionSchema>;
type RequirementField = z.infer<typeof requirementFieldSchema>;
type RequirementStep = z.infer<typeof requirementStepSchema>;
type GetCloudRequirementsResType = z.infer<typeof getCloudRequirementsResSchema>;

export {
  credentialCaseSchema,
  policyModuleSchema,
  credentialOptionSchema,
  requirementFieldSchema,
  requirementStepSchema,
  getCloudRequirementsResSchema,
  type CredentialCase,
  type PolicyModule,
  type CredentialOption,
  type RequirementField,
  type RequirementStep,
  type GetCloudRequirementsResType,
};
