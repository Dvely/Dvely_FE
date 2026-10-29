import type { ReactNode } from 'react';
import { Dialog } from 'radix-ui';
import { X } from 'lucide-react';

type SideSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** 시트 아래에 붙는 줄. 다른 화면으로 가는 대체 경로 같은 것 */
  footer?: ReactNode;
  children: ReactNode;
};

/**
 * 오른쪽에서 밀려 나오는 시트.
 *
 * 하던 화면을 떠나지 않고 잠깐 무언가를 마쳐야 할 때 쓴다(키 등록, 클라우드 연결).
 * 페이지를 통째로 옮기면 돌아올 때까지 맥락이 끊긴다 — 시트는 왼쪽의 대화가 그대로
 * 보이는 채로 열리고, 닫으면 그 자리다. 그래서 바탕을 어둡게 덮지 않고 살짝만 가린다.
 */
function SideSheet({ open, onOpenChange, title, description, footer, children }: SideSheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#0f172a]/15 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed top-0 right-0 z-50 flex h-full w-full max-w-[460px] flex-col border-l border-[#e2e8f0] bg-white shadow-[-12px_0_40px_rgba(15,23,42,0.12)] outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-300"
          data-demo="side-sheet"
          // 열자마자 첫 입력으로 포커스를 옮기면 모바일에서 키보드가 시트를 덮는다
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div className="flex items-start justify-between gap-3 border-b border-[#e2e8f0] px-5 py-4">
            <div className="min-w-0">
              <Dialog.Title className="text-[16px] font-bold tracking-tight text-[#0f172a]">
                {title}
              </Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-1 text-[12px] leading-relaxed text-[#64748b]">
                  {description}
                </Dialog.Description>
              ) : (
                <Dialog.Description className="sr-only">{title}</Dialog.Description>
              )}
            </div>
            <Dialog.Close
              aria-label="닫기"
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#94a3b8] transition hover:bg-[#f1f5f9] hover:text-[#334155]"
            >
              <X className="size-4" aria-hidden />
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
          {footer ? (
            <div className="border-t border-[#e2e8f0] px-5 py-3 text-[12px] text-[#64748b]">
              {footer}
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default SideSheet;
