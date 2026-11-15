import { z } from 'zod';

/**
 * 내 프리뷰 목록(BE #651, `GET /preview-sessions`).
 *
 * 동시에 띄울 수 있는 프리뷰에는 상한(기본 3)이 있고, 다른 프로젝트의 것도 함께 센다. 상한에
 * 걸린 사용자가 **어느 프로젝트에 무엇이 떠 있는지** 보고 닫을 수 있게 하는 목록이다(#184).
 *
 * 열 주소(`publicUrl`·토큰)는 오지 않는다. 프리뷰는 각 프로젝트 화면에서 연다.
 */

const previewSessionItemSchema = z.object({
  sessionId: z.string().prefault(''),
  /** `ACTIVE` 또는 `PROVISIONING`. 둘 다 상한을 차지한다 */
  status: z.string().prefault(''),
  projectId: z.number().nullable().prefault(null),
  /** 프로젝트가 지워졌거나 내 것이 아니면 null */
  projectName: z.string().nullable().prefault(null),
  /** 에이전트 작업이 띄운 프리뷰면 그 작업. 사용자가 직접 띄운 프로젝트 프리뷰면 null */
  taskId: z.string().nullable().prefault(null),
  /** 그 작업의 상태. 작업이 없거나 기록이 사라졌으면 null */
  taskStatus: z.string().nullable().prefault(null),
  /** 지금 `DELETE /preview-sessions/{id}` 로 닫히는가. 서버의 닫기 판정과 같다 */
  closable: z.boolean().prefault(false),
  /** 닫을 수 없는 이유. 막은 작업의 상태이거나 `PROVISIONING` */
  closeBlockedReason: z.string().nullable().prefault(null),
  lastAccessedAt: z.string().nullable().prefault(null),
  /** 이때까지 아무도 보지 않으면 서버가 저절로 닫는다. 보면 늘어난다 */
  expiresAt: z.string().nullable().prefault(null),
  createdAt: z.string().nullable().prefault(null),
});

const getPreviewSessionListResSchema = z.object({
  /** 서버 설정의 동시 프리뷰 상한 */
  maxLivePreviews: z.number().prefault(3),
  /** 오래 안 본 것부터. 상한에서 서버가 스스로 닫을 때 고르는 순서와 같다 */
  items: z.array(previewSessionItemSchema).prefault([]),
});

/** 작업이 쓰고 있어 닫지 않은 프리뷰(BE #650). 409 의 `data.blocked` 와 모두 닫기의 `kept` */
const inUsePreviewSchema = z.object({
  sessionId: z.string().prefault(''),
  projectId: z.number().nullable().prefault(null),
  taskId: z.string().nullable().prefault(null),
  taskStatus: z.string().nullable().prefault(null),
});

/** `DELETE /agent/session` — 닫을 수 있는 것을 모두 닫는다. 작업이 쓰는 것은 남긴다 */
const closeAllPreviewSessionsResSchema = z.object({
  closed: z.number().prefault(0),
  kept: z.array(inUsePreviewSchema).prefault([]),
});

type PreviewSessionItem = z.infer<typeof previewSessionItemSchema>;
type GetPreviewSessionListResType = z.infer<typeof getPreviewSessionListResSchema>;
type CloseAllPreviewSessionsResType = z.infer<typeof closeAllPreviewSessionsResSchema>;

export {
  closeAllPreviewSessionsResSchema,
  getPreviewSessionListResSchema,
  inUsePreviewSchema,
  previewSessionItemSchema,
  type CloseAllPreviewSessionsResType,
  type GetPreviewSessionListResType,
  type PreviewSessionItem,
};
