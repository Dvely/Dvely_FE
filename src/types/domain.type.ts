import { z } from 'zod';
import {
  certificateStatusSchema,
  domainStatusSchema,
  domainTypeSchema,
  hostingTargetSchema,
  verificationMethodSchema,
} from '@/types/common.enum';

/**
 * POST /projects/{projectId}/domains 도메인 연결 요청
 */
const postProjectDomainBindReqSchema = z.object({
  /** 도메인 유형 */
  type: domainTypeSchema,
  /** 서브도메인 라벨. 없으면 null */
  label: z.string().nullable().prefault(''),
  /** 호스트명. 없으면 null */
  hostname: z.string().nullable().prefault(''),
  /** DNS 검증 방식. 없으면 null */
  verificationMethod: verificationMethodSchema.nullable().prefault(null),
  /** 호스팅 대상. 없으면 null */
  hostingTarget: hostingTargetSchema.nullable().prefault(null),
});

const domainBindingSubmissionSchema = z.object({
  /** 태스크 ID */
  taskId: z.string().min(1, '태스크 ID가 없습니다.').prefault(''),
  /** 태스크 상태 */
  status: z.string().min(1, '상태가 없습니다.').prefault(''),
  /** 승인 ID 목록 */
  approvalIds: z.array(z.number().int()),
});

const domainSchema = z.object({
  /** 도메인 ID */
  domainId: z.number().int(),
  /** 프로젝트 ID */
  projectId: z.number().int(),
  /** 도메인 유형 */
  type: domainTypeSchema,
  /** 호스팅 대상 */
  hostingTarget: hostingTargetSchema,
  /** 호스트명 */
  hostname: z.string().min(1, '호스트명이 없습니다.').prefault(''),
  /** 도메인 상태 */
  status: domainStatusSchema,
  /** DNS 검증 방식. 없으면 null */
  verificationMethod: verificationMethodSchema.nullable().prefault(null),
  /** DNS 타깃. 없으면 null */
  dnsTarget: z.string().nullable().prefault(''),
  /** HTTPS 강제 여부 */
  httpsEnforced: z.boolean(),
  /** 인증서 상태. 없으면 null */
  certificateStatus: certificateStatusSchema.nullable().prefault(null),
  /** 인증서 만료 시각. 없으면 null */
  certificateExpiresAt: z.string().nullable().prefault(''),
  /** 마지막 확인 시각. 없으면 null */
  lastCheckedAt: z.string().nullable().prefault(''),
  /** 생성 시각 */
  createdAt: z.string().min(1, '생성 시각이 없습니다.').prefault(''),
  /** 수정 시각 */
  updatedAt: z.string().min(1, '수정 시각이 없습니다.').prefault(''),
});

const getProjectDomainListResSchema = z.array(domainSchema);

const dnsRecordSchema = z.object({
  /** 레코드 유형 */
  type: z.string().min(1, '레코드 유형이 없습니다.').prefault(''),
  /** 호스트 */
  host: z.string().min(1, '호스트가 없습니다.').prefault(''),
  /** 값 */
  value: z.string().min(1, '값이 없습니다.').prefault(''),
});

const getDomainVerificationGuideResSchema = z.object({
  /** 호스트명 */
  hostname: z.string().min(1, '호스트명이 없습니다.').prefault(''),
  /** DNS 검증 방식 */
  verificationMethod: verificationMethodSchema,
  /** DNS 레코드 목록 */
  records: z.array(dnsRecordSchema),
});

const domainSearchResultSchema = z.object({
  /** 도메인 유형 */
  type: domainTypeSchema,
  /** 호스트명 */
  hostname: z.string().min(1, '호스트명이 없습니다.').prefault(''),
  /** 사용 가능 여부 */
  available: z.boolean(),
  /** 가격. 없으면 null */
  price: z.number().nullable().prefault(null),
  /** 통화. 없으면 null */
  currency: z.string().nullable().prefault(''),
});

const getDomainSearchResSchema = z.object({
  /** 검색 키워드 */
  keyword: z.string().min(1, '검색 키워드가 없습니다.').prefault(''),
  /** 검색 결과 */
  results: z.array(domainSearchResultSchema),
});

type PostProjectDomainBindReqType = z.infer<typeof postProjectDomainBindReqSchema>;
type DomainBindingSubmission = z.infer<typeof domainBindingSubmissionSchema>;
type Domain = z.infer<typeof domainSchema>;
type GetProjectDomainListResType = z.infer<typeof getProjectDomainListResSchema>;
type GetDomainVerificationGuideResType = z.infer<typeof getDomainVerificationGuideResSchema>;
type GetDomainSearchResType = z.infer<typeof getDomainSearchResSchema>;

export {
  postProjectDomainBindReqSchema,
  domainBindingSubmissionSchema,
  domainSchema,
  getProjectDomainListResSchema,
  dnsRecordSchema,
  getDomainVerificationGuideResSchema,
  domainSearchResultSchema,
  getDomainSearchResSchema,
  type PostProjectDomainBindReqType,
  type DomainBindingSubmission,
  type Domain,
  type GetProjectDomainListResType,
  type GetDomainVerificationGuideResType,
  type GetDomainSearchResType,
};
