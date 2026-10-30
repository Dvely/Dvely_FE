import { AlertTriangle } from 'lucide-react';
import CopyButton from '@/components/common/CopyButton';

type ApiTokenRevealBoxProps = {
  /** 평문 토큰. 이 상자를 띄운 쪽이 들고 있다가 닫을 때 버린다 */
  token: string;
  label: string | null;
};

/**
 * 발급 직후 평문을 한 번만 보여주는 상자. 설정의 확인 모달과 연결 안내 시트가 같이 쓴다.
 *
 * 서버가 해시만 저장하므로 재조회 경로가 없다. 여기서 놓치면 폐기하고 새로 발급하는 것
 * 외에 방법이 없다 — 그 사실을 값 바로 위에 적는다.
 */
function ApiTokenRevealBox({ token, label }: ApiTokenRevealBoxProps) {
  return (
    <div>
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#fffbeb] text-[#b45309]">
          <AlertTriangle className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p
            id="api-token-reveal-title"
            className="text-[16px] font-semibold tracking-tight text-[#0f172a]"
          >
            토큰이 발급되었습니다
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-[#b45309]">
            <b className="font-semibold">이 값은 다시 볼 수 없습니다.</b> 지금 복사해서 안전한 곳에
            보관하세요. 놓치면 폐기하고 새로 발급해야 합니다.
          </p>
        </div>
      </div>

      {label ? <p className="mt-3 text-[12px] text-[#94a3b8]">{label}</p> : null}

      <div className="mt-2 flex items-stretch gap-2">
        <code
          data-demo="api-token-value"
          className="min-w-0 flex-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2.5 font-mono text-[12px] break-all text-[#0f172a] select-all"
        >
          {token}
        </code>
        <CopyButton text={token} className="w-[84px]" demoId="api-token-copy" />
      </div>
    </div>
  );
}

export default ApiTokenRevealBox;
