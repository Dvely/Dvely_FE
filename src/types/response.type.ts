import { z } from 'zod';

/**
 * API 에러 본문
 */
const apiErrorBodySchema = z.object({
  /** 서버 에러 메시지 */
  message: z.string().min(1, '에러 메시지가 없습니다.').prefault(''),
});

/** API 에러 본문 */
type ApiErrorBody = z.infer<typeof apiErrorBodySchema>;

type ApiResponse<T> = {
  status: number;
  code: string;
  message: string;
  data?: T;
};

export { apiErrorBodySchema, type ApiErrorBody, type ApiResponse };
