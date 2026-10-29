import { useRouter } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { returnLabel } from '@/lib/setupReturn';

type SetupReturnBarProps = {
  /** toSafeReturnPath 를 거친 앱 안 경로 */
  returnTo: string;
  message: string;
};

/**
 * 프로젝트에서 설정으로 나왔을 때 맨 위에 두는 띠.
 *
 * 등록을 마치면 자동으로 돌아가지만, 그 전에 그만두고 싶을 수도 있다(키를 아직 못
 * 받았다든지). 그때 사이드바에서 프로젝트를 다시 찾지 않게 돌아갈 길을 늘 보이는 곳에
 * 둔다.
 *
 * 스크롤해도 위에 붙어 있다. 클라우드 연결 폼은 길어서 등록 버튼까지 내려가면 띠가 화면
 * 밖으로 나가는데, "돌아갑니다" 라는 말이 바로 그때 이 띠에 뜬다.
 */
function SetupReturnBar({ returnTo, message }: SetupReturnBarProps) {
  const router = useRouter();

  return (
    <div
      role="status"
      className="sticky top-2 z-10 mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl border border-[#ddd6fe] bg-[#faf5ff] px-4 py-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.06)]"
    >
      <p className="text-[13px] leading-relaxed text-[#5b21b6]">{message}</p>
      {/*
        링크로 둔다 — 가운데 클릭으로 새 탭에 여는 것도 되게. 누르면 앱 안에서 옮긴다.
        경로에 search 가 섞여 있어서 Link 의 to 로는 넘길 수 없다
      */}
      <a
        href={returnTo}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
          event.preventDefault();
          router.history.push(returnTo);
        }}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#7c3aed] px-3 text-[12px] font-semibold text-white transition hover:bg-[#6d28d9]"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        {returnLabel(returnTo)}
      </a>
    </div>
  );
}

export default SetupReturnBar;
