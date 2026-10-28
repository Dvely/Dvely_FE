import { Link } from '@tanstack/react-router';

/**
 * 무언가 잘못돼 화면을 그리지 못했을 때 대신 세우는 자리.
 *
 * 라우터 기본 화면은 `Something went wrong!` 이라는 영문 한 줄과 오류 원문을 펼치는
 * 버튼이다. 한국어 서비스에서 영문이 나오는 것도 문제지만, 더 큰 문제는 **그 화면이
 * 사용자에게 할 일을 주지 않는다**는 것이다. 무엇이 잘못됐는지 알려줄 수 없는 자리라면
 * 적어도 **여기서 나갈 길**은 있어야 한다.
 *
 * 그래서 둘을 준다 — 같은 자리에서 다시 해보기, 그리고 홈으로 나가기.
 *
 * 오류 원문은 접어 둔다. 사용자에게는 쓸모가 없지만 제보를 받을 때는 그 한 줄이
 * 전부이기 때문이다. 펼치기 전에는 보이지 않으므로 평소 화면을 어지럽히지 않는다.
 */

type AppErrorScreenProps = {
  title: string;
  description: string;
  /** 같은 자리에서 다시 시도. 라우터가 주는 reset 이 있으면 그걸 쓴다 */
  onRetry?: () => void;
  /** 접어 둘 오류 원문. 개발 중이 아니어도 제보용으로 남긴다 */
  detail?: string | null;
};

function AppErrorScreen({ title, description, onRetry, detail }: AppErrorScreenProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6 py-12 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-[18px] font-semibold tracking-tight text-[#0f172a]">{title}</h1>
        <p className="max-w-[420px] whitespace-pre-line text-[13px] leading-relaxed text-[#64748b]">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="h-10 rounded-xl bg-[#0f172a] px-4 text-[14px] font-semibold text-white transition hover:bg-[#1e293b]"
          >
            다시 시도
          </button>
        ) : null}
        <Link
          to="/"
          className="flex h-10 items-center rounded-xl border border-[#e2e8f0] bg-white px-4 text-[14px] font-semibold text-[#0f172a] transition hover:bg-[#f8fafc]"
        >
          홈으로
        </Link>
      </div>

      {detail ? (
        <details className="mt-1 max-w-[520px] text-left">
          <summary className="cursor-pointer text-[12px] text-[#94a3b8]">오류 정보 보기</summary>
          <pre className="mt-2 max-h-40 overflow-auto rounded-lg bg-[#f8fafc] p-3 text-[11px] leading-relaxed whitespace-pre-wrap break-all text-[#475569]">
            {detail}
          </pre>
        </details>
      ) : null}
    </div>
  );
}

export default AppErrorScreen;
