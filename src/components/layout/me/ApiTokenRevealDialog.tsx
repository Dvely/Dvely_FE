import { useEffect, useState } from 'react';
import ApiTokenRevealBox from '@/components/layout/me/ApiTokenRevealBox';

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
  const [acknowledged, setAcknowledged] = useState(false);

  // 이 모달은 ESC 로 닫지 않는다. 실수 한 번이 토큰을 잃게 하므로,
  // 닫는 길은 아래 확인 버튼 하나뿐이다.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

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
          <ApiTokenRevealBox token={token} label={label} />

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
