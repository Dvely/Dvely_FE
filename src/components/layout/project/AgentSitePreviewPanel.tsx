import { ExternalLink } from 'lucide-react';
import { extractApiErrorMessage } from '@/utils/response';
import type { AgentPreviewPhase } from '@/components/layout/project/agentPreview.utils';

type AgentSitePreviewPanelProps = {
  phase: AgentPreviewPhase;
  previewUrl: string;
  frameKey: number;
  isLoading: boolean;
  isProvisioning: boolean;
  failureReason: string;
  onLoadPreview: () => void;
};

function PreviewSkeleton() {
  return (
    <div aria-hidden="true" className="flex min-h-0 flex-1 flex-col bg-white">
      <div className="h-10 border-b border-[#e2e8f0] bg-[#f8fafc]" />
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-6">
        <div className="h-8 w-1/3 rounded-lg bg-[#e2e8f0]" />
        <div className="h-4 w-2/3 rounded bg-[#e2e8f0]" />
        <div className="h-4 w-1/2 rounded bg-[#e2e8f0]" />
        <div className="mt-4 min-h-0 flex-1 rounded-xl bg-[#f1f5f9]" />
      </div>
    </div>
  );
}

function AgentSitePreviewPanel({
  phase,
  previewUrl,
  frameKey,
  isLoading,
  isProvisioning,
  failureReason,
  onLoadPreview,
}: AgentSitePreviewPanelProps) {
  if (isLoading || isProvisioning) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <PreviewSkeleton />
        {isProvisioning ? (
          <p className="border-t border-[#e2e8f0] bg-white px-4 py-3 text-center text-[12px] text-[#64748b]">
            프리뷰 컨테이너를 준비하고 있습니다. 완료되면 자동으로 열립니다.
          </p>
        ) : null}
      </div>
    );
  }

  if (phase === 'ready') {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-end gap-2 border-b border-[#e2e8f0] bg-white px-4 py-2">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-1.5 text-[12px] font-medium text-[#334155] transition hover:bg-[#f8fafc]"
          >
            <ExternalLink className="size-3.5" />새 탭에서 보기
          </a>
        </div>
        <iframe
          key={frameKey}
          src={previewUrl}
          title="사이트 미리보기"
          className="min-h-0 flex-1 border-0 bg-white"
        />
      </div>
    );
  }

  const trimmedFailure = extractApiErrorMessage(failureReason) ?? failureReason.trim();

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="max-w-md text-center">
        <p className="text-[15px] font-semibold leading-relaxed text-[#334155]">
          {trimmedFailure ? trimmedFailure : '아직 띄워 둔 프리뷰가 없습니다.'}
        </p>
        {trimmedFailure ? null : (
          <p className="mt-2 text-[13px] leading-relaxed text-[#94a3b8]">
            미리보기 불러오기를 누르면 preview 브랜치를 컨테이너로 띄웁니다.
          </p>
        )}
        <button
          type="button"
          onClick={onLoadPreview}
          className="mt-4 inline-flex h-9 cursor-pointer items-center rounded-lg bg-[#0f172a] px-4 text-[13px] font-semibold text-white"
        >
          미리보기 불러오기
        </button>
      </div>
    </div>
  );
}

export default AgentSitePreviewPanel;
