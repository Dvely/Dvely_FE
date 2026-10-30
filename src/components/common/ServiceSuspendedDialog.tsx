import { useEffect } from 'react';
import { CirclePause } from 'lucide-react';
import { SERVICE_SUSPENSION_NOTICE } from '@/constants/serviceStatus';
import {
  closeServiceSuspendedNotice,
  useServiceSuspendedNoticeOpen,
} from '@/lib/serviceSuspendedNotice';

/**
 * 로그인·워크스페이스로 가려던 사람에게 왜 못 가는지 말한다.
 *
 * 배너만으로는 모자라다. 배너는 닫을 수 있고 좁은 화면에서는 첫 문장만 남는데, 그 사람이
 * "시작하기" 를 눌렀을 때 아무 일도 안 일어나면 고장으로 읽힌다. 누른 그 자리에서 무엇이
 * 멈췄고 무엇은 볼 수 있는지까지 말한다.
 */
function ServiceSuspendedDialog() {
  const open = useServiceSuspendedNoticeOpen();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeServiceSuspendedNotice();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  const notice = SERVICE_SUSPENSION_NOTICE;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="안내 닫기"
        onClick={closeServiceSuspendedNotice}
        className="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-suspended-title"
        className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.12)]"
      >
        <div className="border-b border-[#f1f5f9] bg-[#fafafa] px-6 pb-5 pt-8 text-center">
          <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] ring-1 ring-[#e5e7eb]">
            <CirclePause className="size-5 text-[#0f172a]" strokeWidth={1.75} aria-hidden />
          </span>
          <h2
            id="service-suspended-title"
            className="mt-4 text-[20px] font-semibold tracking-tight text-[#0f172a]"
          >
            {notice.title}
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed break-keep text-[#64748b]">
            운영 서버 사정으로 {notice.since}부터 서비스를 일시 중단했습니다.
          </p>
        </div>

        <div className="grid gap-3 px-6 py-5 text-[14px] leading-relaxed break-keep">
          <p className="text-[#334155]">
            <b className="text-[#0f172a]">멈춘 기능</b> · {notice.unavailable}
          </p>
          <p className="text-[#334155]">
            <b className="text-[#0f172a]">볼 수 있는 것</b> · {notice.available}
          </p>
          <p className="text-[13px] text-[#64748b]">
            재개 일정은 정해지는 대로 이 페이지에서 알려 드리겠습니다.
          </p>
          <button
            type="button"
            autoFocus
            onClick={closeServiceSuspendedNotice}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#0f172a] py-3 text-[14px] font-semibold text-white transition hover:bg-[#1e293b]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceSuspendedDialog;
