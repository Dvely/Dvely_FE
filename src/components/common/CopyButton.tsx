import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

type CopyButtonProps = {
  text: string;
  /** primary: 보라 채움(토큰처럼 꼭 복사해야 하는 값) · onDark: 어두운 명령 블록 위 */
  tone?: 'primary' | 'onDark';
  className?: string;
  demoId?: string;
};

/**
 * 누르면 클립보드에 넣는다. 됐는지 안 됐는지를 버튼 글자로 바로 말한다.
 *
 * 클립보드가 막힌 환경(비보안 컨텍스트·권한 거부)이 있다. 그때는 "복사 안 됨" 으로 바꿔
 * 직접 고르게 둔다 — 조용히 실패하면 사용자는 복사된 줄 알고 빈 값을 붙여넣는다.
 */
function CopyButton({ text, tone = 'primary', className, demoId }: CopyButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch {
      setState('failed');
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      data-demo={demoId}
      title={state === 'failed' ? '복사가 막혀 있습니다. 직접 선택해 복사해 주세요.' : undefined}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg font-semibold transition',
        tone === 'primary'
          ? state === 'copied'
            ? 'bg-[#f0fdf4] px-3 py-2 text-[12px] text-[#15803d] ring-1 ring-[#bbf7d0]'
            : 'bg-[#7c3aed] px-3 py-2 text-[12px] text-white hover:bg-[#6d28d9]'
          : state === 'copied'
            ? 'bg-[#14532d] px-2 py-1 text-[11px] text-[#bbf7d0]'
            : 'bg-white/10 px-2 py-1 text-[11px] text-[#e2e8f0] hover:bg-white/20',
        className,
      )}
    >
      {state === 'copied' ? (
        <>
          <Check className="size-3.5" aria-hidden />
          복사됨
        </>
      ) : (
        <>
          <Copy className="size-3.5" aria-hidden />
          {state === 'failed' ? '복사 안 됨' : '복사'}
        </>
      )}
    </button>
  );
}

export default CopyButton;
