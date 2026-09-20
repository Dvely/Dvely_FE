import { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

type ApiTokenRevealDialogProps = {
  /** 평문 토큰. 닫히는 순간 호출한 쪽이 버린다 */
  token: string;
  label: string | null;
  onClose: () => void;
};

/**
 * 발급 직후 평문을 한 번만 보여주는 자리.
 *
 * 서버가 해시만 저장하므로 재조회 경로가 없다. 여기서 놓치면 폐기하고 새로 발급하는
 * 것 외에 방법이 없다 — 그래서 토스트로 띄우고 사라지게 하면 안 되고, 전용 모달로
 * 두고 **복사를 확인한 뒤에** 닫는다.
 *
 * 바깥 클릭·ESC 로 닫히지 않는 것도 같은 이유다. 실수로 이탈하면 되돌릴 수 없다.
 */
function ApiTokenRevealDialog({ token, label, onClose }: ApiTokenRevealDialogProps) {
  const [copied, setCopied] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  // 이 모달은 ESC 로 닫지 않는다. 실수 한 번이 토큰을 잃게 하므로,
  // 닫는 길은 아래 확인 버튼 하나뿐이다.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setCopyError(null);
    } catch {
      // 클립보드가 막힌 환경(비보안 컨텍스트·권한 거부)이 있다. 직접 고르게 안내한다
      setCopyError('복사가 막혀 있습니다. 위 값을 직접 선택해 복사해 주세요.');
    }
  }, [token]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-[2px]" aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="api-token-reveal-title"
        className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.14)]"
      >
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#fffbeb] text-[#b45309]">
              <AlertTriangle className="size-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <h2
                id="api-token-reveal-title"
                className="text-[18px] font-semibold tracking-tight text-[#0f172a]"
              >
                토큰이 발급되었습니다
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-[#b45309]">
                <b className="font-semibold">이 값은 다시 볼 수 없습니다.</b> 지금 복사해서 안전한
                곳에 보관하세요. 놓치면 폐기하고 새로 발급해야 합니다.
              </p>
            </div>
          </div>

          {label ? <p className="mt-4 text-[12px] text-[#94a3b8]">{label}</p> : null}

          <div className="mt-2 flex items-stretch gap-2">
            <code className="min-w-0 flex-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2.5 font-mono text-[12px] break-all text-[#0f172a] select-all">
              {token}
            </code>
            <button
              type="button"
              onClick={() => void handleCopy()}
              className={cn(
                'flex w-[84px] shrink-0 items-center justify-center gap-1 rounded-lg text-[12px] font-semibold transition',
                copied
                  ? 'bg-[#f0fdf4] text-[#15803d] ring-1 ring-[#bbf7d0]'
                  : 'bg-[#7c3aed] text-white hover:bg-[#6d28d9]',
              )}
            >
              {copied ? (
                <>
                  <Check className="size-3.5" aria-hidden />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="size-3.5" aria-hidden />
                  복사
                </>
              )}
            </button>
          </div>

          {copyError ? (
            <p role="alert" className="mt-2 text-[12px] text-[#dc2626]">
              {copyError}
            </p>
          ) : null}

          <label className="mt-4 flex cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(event) => setAcknowledged(event.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-[#7c3aed]"
            />
            <span className="text-[13px] leading-relaxed text-[#334155]">
              토큰을 복사해 안전한 곳에 보관했습니다.
            </span>
          </label>
        </div>

        <div className="px-6 pb-5">
          <button
            type="button"
            disabled={!acknowledged}
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-xl bg-[#0f172a] py-3 text-[14px] font-semibold text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:bg-[#e2e8f0] disabled:text-[#94a3b8]"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApiTokenRevealDialog;
