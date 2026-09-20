import { z } from 'zod';

/**
 * 개인 액세스 토큰(PAT).
 *
 * 사용자의 Claude Code · Codex 가 Qeploy 를 MCP 도구로 호출할 때 쓰는 자격증명이다.
 * 브라우저 JWT 는 수명이 1시간이라 헤드리스 클라이언트가 쓸 수 없어 따로 둔다.
 *
 * **서버는 해시만 저장한다.** 복호화할 일이 없고 비교만 하므로 해시로 충분하고,
 * DB 를 잃어도 동작하는 토큰이 함께 새지 않는다. 대신 재조회 경로가 존재하지 않는다 —
 * 발급 응답의 평문을 놓치면 폐기하고 새로 발급하는 것 외에 방법이 없다.
 */

const API_TOKEN_SCOPES = ['READ', 'WRITE'] as const;

type ApiTokenScope = (typeof API_TOKEN_SCOPES)[number];

/**
 * 스코프별 만료 한도.
 *
 * WRITE 가 짧은 이유는 유출됐을 때 할 수 있는 일이 다르기 때문이다 — 배포하고
 * 환경변수를 바꾸고 도메인을 붙이며, 그것도 아무도 화면을 보고 있지 않은
 * 헤드리스 클라이언트에서 일어난다(보안 감사, 2026-09-11).
 */
const API_TOKEN_EXPIRY_LIMITS: Record<ApiTokenScope, { default: number; max: number }> = {
  READ: { default: 90, max: 365 },
  WRITE: { default: 30, max: 90 },
};

const apiTokenInfoSchema = z.object({
  apiTokenId: z.number().prefault(0),
  /** 앞부분만. 평문은 어디에도 없다 */
  tokenPrefix: z.string().prefault(''),
  /** 열린 문자열로 받는다 — 서버가 스코프를 늘려도 목록 전체가 깨지지 않게 */
  scope: z.string().prefault(''),
  label: z.string().nullable().prefault(null),
  expiresAt: z.string().nullable().prefault(null),
  /**
   * 마지막 사용 시각. **1시간 스로틀로 갱신된다** — 매 요청 UPDATE 를 인증 경로에
   * 얹지 않기 위해서다. 방금 쓴 토큰이 "1시간 전" 으로 보일 수 있으므로 실시간
   * 활동처럼 표현하지 말 것.
   */
  lastUsedAt: z.string().nullable().prefault(null),
  createdAt: z.string().prefault(''),
});

/** GET /api-tokens — 본인 것만 온다 */
const getApiTokenListResSchema = z.array(apiTokenInfoSchema).prefault([]);

const postApiTokenReqSchema = z.object({
  scope: z.enum(API_TOKEN_SCOPES),
  label: z.string().max(64).nullable().optional(),
  /** 생략 시 스코프별 기본값. 범위를 벗어나면 400 */
  expiresInDays: z.number().int().positive().optional(),
});

/** POST /api-tokens — token 은 **이 응답에서만** 온다 */
const postApiTokenResSchema = z.object({
  token: z.string().prefault(''),
  info: apiTokenInfoSchema,
});

type ApiTokenInfo = z.infer<typeof apiTokenInfoSchema>;
type GetApiTokenListResType = z.infer<typeof getApiTokenListResSchema>;
type PostApiTokenReqType = z.infer<typeof postApiTokenReqSchema>;
type PostApiTokenResType = z.infer<typeof postApiTokenResSchema>;

/** expiresAt 이 과거면 만료다. 서버가 목록에서 걸러주지 않으므로 화면이 구분한다 */
function isApiTokenExpired(token: ApiTokenInfo, now = Date.now()) {
  if (!token.expiresAt) return false;
  const expiry = new Date(token.expiresAt).getTime();
  return Number.isFinite(expiry) && expiry <= now;
}

export {
  API_TOKEN_EXPIRY_LIMITS,
  API_TOKEN_SCOPES,
  apiTokenInfoSchema,
  getApiTokenListResSchema,
  isApiTokenExpired,
  postApiTokenReqSchema,
  postApiTokenResSchema,
  type ApiTokenInfo,
  type ApiTokenScope,
  type GetApiTokenListResType,
  type PostApiTokenReqType,
  type PostApiTokenResType,
};
