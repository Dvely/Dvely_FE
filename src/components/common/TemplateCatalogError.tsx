import { RotateCcw } from 'lucide-react';

/**
 * 템플릿 목록을 못 받았을 때.
 *
 * **"템플릿이 없습니다" 와 반드시 구분한다.** 둘 다 화면에는 빈 자리로 나타나지만
 * 사용자가 할 일이 정반대다 — 없는 것이면 다른 조건을 고르면 되고, 못 받은 것이면
 * 기다렸다 다시 시도해야 한다. 없다고 말해 버리면 다시 시도할 생각을 못 한다.
 *
 * 카탈로그 조회는 `retry: false` 라 한 번 실패하면 그대로 끝난다. 그래서 다시 받을
 * 길을 사용자에게 준다 — 새로고침하면 다른 것까지 다시 받으므로 이 조회만 다시 건다.
 */
type TemplateCatalogErrorProps = {
  onRetry: () => void;
  /** 이 화면에서 무엇이 안 되는지. 없으면 목록만 이야기한다 */
  description?: string;
  className?: string;
};

function TemplateCatalogError({ onRetry, description, className }: TemplateCatalogErrorProps) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center gap-3 py-16 text-center ${className ?? ''}`}
    >
      <div>
        <p className="text-[15px] font-semibold text-[#0f172a]">
          템플릿 목록을 불러오지 못했습니다.
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#64748b]">
          {description ?? '잠시 후 다시 시도해 주세요.'}
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
      >
        <RotateCcw className="size-3.5" strokeWidth={2} aria-hidden />
        다시 시도
      </button>
    </div>
  );
}

export { TemplateCatalogError };
