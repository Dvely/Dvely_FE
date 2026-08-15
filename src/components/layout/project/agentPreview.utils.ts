import type { ConversationMessage } from '@/types/chat.type';
import type { ProjectPreviewSessionStatus } from '@/types/preview.type';

export type AgentPreviewPhase = 'empty' | 'building' | 'ready' | 'unavailable';

/**
 * 열람 권한 발급(POST /preview-sessions/{id}/access) 응답의 previewUrl을 iframe에 넣을 절대 주소로 바꾼다.
 * Agent 태스크 응답의 previewUrl이 아니다 — 그쪽은 토큰이 회전되어 이미 무효일 수 있다.
 */
export function resolvePreviewFrameUrl(accessPreviewUrl?: string | null): string {
  const raw = accessPreviewUrl?.trim() ?? '';
  if (!raw) return '';
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;

  const apiBase = import.meta.env.VITE_API_URL as string;
  try {
    const origin = new URL(apiBase, window.location.origin).origin;
    return raw.startsWith('/') ? `${origin}${raw}` : `${apiBase.replace(/\/$/, '')}/${raw}`;
  } catch {
    return raw;
  }
}

type DeriveAgentPreviewPhaseInput = {
  previewUrl: string;
  sessionStatus?: ProjectPreviewSessionStatus | null;
  messages?: ConversationMessage[];
};

export function deriveAgentPreviewPhase({
  previewUrl,
  sessionStatus,
}: DeriveAgentPreviewPhaseInput): AgentPreviewPhase {
  if (sessionStatus === 'ACTIVE' && previewUrl.trim()) return 'ready';
  if (sessionStatus === 'PROVISIONING') return 'building';
  if (sessionStatus === 'FAILED') return 'unavailable';
  return 'empty';
}
