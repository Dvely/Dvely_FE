import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SETUP_RETURN_NOTICE_EVENT } from '@/lib/setupReturn';

/** 읽을 만큼만 두고 걷는다 */
const VISIBLE_MS = 4500;

/**
 * 설정에서 등록을 마치고 돌아온 화면 위에 잠깐 뜨는 한 줄.
 *
 * 화면이 통째로 바뀌면 왜 바뀌었는지가 끊긴다. 돌아온 화면이 "키를 등록했습니다 — 이어서
 * 진행하세요" 라고 받아 주면 하던 일로 이어진다. 로그인 뒤 모든 화면을 감싸는 자리에 있어서
 * 화면을 옮겨도 떠 있다.
 */
function SetupReturnToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const onNotice = (event: Event) => {
      const detail = (event as CustomEvent<unknown>).detail;
      if (typeof detail === 'string' && detail) setMessage(detail);
    };
    window.addEventListener(SETUP_RETURN_NOTICE_EVENT, onNotice);
    return () => window.removeEventListener(SETUP_RETURN_NOTICE_EVENT, onNotice);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center px-4"
    >
      <p className="flex items-center gap-2 rounded-full border border-[#bbf7d0] bg-white px-4 py-2 text-[13px] font-semibold text-[#15803d] shadow-[0_6px_24px_rgba(15,23,42,0.12)]">
        <CheckCircle2 className="size-4 shrink-0" aria-hidden />
        {message}
      </p>
    </div>
  );
}

export default SetupReturnToast;
