import GettingStartedChecklist from '@/components/common/GettingStartedChecklist';
import { useGettingStartedHidden } from '@/hooks/useGettingStarted';

/**
 * 홈의 시작하기 카드. 처음 들어온 사람이 무엇부터 할지 보이는 자리다.
 *
 * 숨기면 홈과 사이드바에서 함께 사라진다. 도움말에서 다시 켤 수 있다 — 숨기기가 되돌릴 수
 * 없는 일이면 사람들이 누르기를 망설인다.
 */
function HomeGettingStartedCard() {
  const [hidden, setHidden] = useGettingStartedHidden();
  if (hidden) return null;

  return (
    <section
      aria-label="시작하기"
      className="mx-auto mt-6 w-full max-w-[780px] rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
    >
      <GettingStartedChecklist
        footer={
          <span className="flex flex-wrap items-center justify-between gap-2">
            <span>진행 상태는 실제로 마친 일에서 계산됩니다.</span>
            <button
              type="button"
              onClick={() => setHidden(true)}
              className="cursor-pointer font-semibold text-[#64748b] underline underline-offset-2 hover:text-[#334155]"
            >
              가이드 숨기기
            </button>
          </span>
        }
      />
    </section>
  );
}

export default HomeGettingStartedCard;
