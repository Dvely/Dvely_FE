import { useEffect, useState } from 'react';
import { ListChecks } from 'lucide-react';
import GettingStartedChecklist from '@/components/common/GettingStartedChecklist';
import { useGettingStarted, useGettingStartedHidden } from '@/hooks/useGettingStarted';
import { cn } from '@/lib/utils';

/**
 * 사이드바 아래의 시작하기. 홈을 떠나 프로젝트 안에 있어도 다음 할 일을 열어 볼 수 있다.
 *
 * 진행 수(3/7)는 늘 보인다 — 단계를 하나 마칠 때마다 숫자가 차는 것이 곧 안내다. 넓은
 * 화면에서만 둔다. 좁은 화면의 하단 탭바는 자리가 모자라고, 홈 카드가 같은 일을 한다.
 */
function SidebarGettingStarted({ collapsed }: { collapsed: boolean }) {
  const [hidden, setHidden] = useGettingStartedHidden();
  const { doneCount, total } = useGettingStarted();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  if (hidden) return null;

  return (
    <div className={cn('hidden pb-4 lg:block', collapsed ? 'px-2' : 'px-3')}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        data-demo="guide-open"
        aria-label={`시작하기 ${doneCount}/${total} 완료`}
        title={collapsed ? '시작하기' : undefined}
        className={cn(
          'flex w-full cursor-pointer items-center rounded-xl text-[#34322D] transition hover:bg-[#E4E4E4]',
          collapsed ? 'flex-col gap-1 py-2' : 'gap-3 px-3 py-2.5 text-[13px] font-medium',
          open && 'bg-[#E4E4E4]',
        )}
      >
        <ListChecks className="size-[18px] shrink-0 opacity-90" strokeWidth={1.75} />
        {collapsed ? null : <span className="flex-1 text-left">시작하기</span>}
        <span className="rounded-full bg-[#7c3aed] px-1.5 py-0.5 text-[10px] leading-none font-bold tabular-nums text-white">
          {doneCount}/{total}
        </span>
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="시작하기 닫기"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-label="시작하기"
            className={cn(
              'fixed bottom-4 z-50 max-h-[calc(100vh-2rem)] w-[340px] overflow-y-auto rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.16)]',
              collapsed ? 'left-[84px]' : 'left-[268px]',
            )}
          >
            <GettingStartedChecklist
              onNavigate={() => setOpen(false)}
              footer={
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setHidden(true);
                  }}
                  className="cursor-pointer font-semibold underline underline-offset-2 hover:text-[#334155]"
                >
                  가이드 숨기기 (도움말에서 다시 켤 수 있습니다)
                </button>
              }
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SidebarGettingStarted;
