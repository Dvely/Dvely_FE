import { z } from 'zod';

/**
 * GET /users/me 현재 사용자 정보
 */
const userSchema = z.object({
  /** 사용자 ID */
  id: z.number().int(),
  /** GitHub 사용자명 */
  username: z.string().min(1, '사용자명이 없습니다.').prefault(''),
  /** 프로필 이미지 URL */
  avatarUrl: z.string().nullable().prefault(''),
  /** GitHub App 설치 여부 */
  githubAppInstalled: z.boolean(),
  /** GitHub App 토큰 연동 여부 */
  githubAppTokenLinked: z.boolean(),
  /** GitHub App 토큰 만료 여부 */
  githubAppTokenExpired: z.boolean(),
  /** GitHub App access token 만료 시각 */
  githubAppAccessTokenExpiresAt: z
    .union([z.boolean(), z.string(), z.null()])
    .nullable()
    .prefault(null),
  /** GitHub App refresh token 만료 시각 */
  githubAppRefreshTokenExpiresAt: z
    .union([z.boolean(), z.string(), z.null()])
    .nullable()
    .prefault(null),
});

/**
 * GET /users/me 응답
 */
const getUserMeResSchema = z.object({
  status: z.number().int(),
  code: z.string().prefault(''),
  message: z.string().prefault(''),
  data: userSchema.optional(),
});

type User = z.infer<typeof userSchema>;
type GetUserMeResType = z.infer<typeof getUserMeResSchema>;

export { userSchema, getUserMeResSchema, type User, type GetUserMeResType };
