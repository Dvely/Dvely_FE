import type { ConversationMessage } from '@/types/chat.type';
import type { ProjectPreviewSessionStatus } from '@/types/preview.type';

export type AgentPreviewPhase = 'empty' | 'building' | 'ready' | 'unavailable';

export function deriveAgentPreviewUrl(taskPreviewUrl?: string | null): string {
  const raw = taskPreviewUrl?.trim() ?? '';
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
