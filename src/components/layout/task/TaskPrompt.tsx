import { useState } from 'react';
import {
  LayoutGrid,
  MessageSquare,
  Mic,
  Monitor,
  Palette,
  Plus,
  Presentation,
  SendHorizontal,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickActions = [
  { label: '슬라이드 제작', icon: Presentation },
  { label: '웹사이트 구축', icon: Monitor },
  { label: '데스크톱 앱 개발', icon: LayoutGrid },
  { label: '디자인', icon: Palette },
  { label: '더보기', icon: MoreHorizontal },
] as const;

export default function TaskPrompt() {
  const [promptText, setPromptText] = useState('');

  return (
    <section className="shrink-0 px-5 pb-2 pt-6 sm:px-6">
      <div className="mx-auto max-w-[720px] text-center">
        <h1 className="text-[40px] font-bold leading-[1.5] tracking-tight text-[#0f172a]">
          무엇을 도와드릴까요?
        </h1>
      </div>

      <div className="mx-auto mt-8 max-w-[720px]">
        <div className="rounded-[18px] border border-[#e2e8f0] bg-white shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
          <div className="px-[17px] pb-3 pt-4">
            <label htmlFor="task-prompt" className="sr-only">
              프롬프트 입력
            </label>
            <textarea
              id="task-prompt"
              rows={2}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="작업을 할당하거나 무엇이든 질문하세요"
              className="min-h-[44px] w-full resize-none bg-transparent text-[14px] font-semibold leading-normal text-[#0f172a] outline-none placeholder:font-semibold placeholder:text-[#94a3b8]"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-transparent px-[17px] pb-[13px] pt-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                className="flex size-[30px] items-center justify-center rounded-[9px] text-[#64748b] transition hover:bg-[#f8fafc]"
                aria-label="추가"
              >
                <Plus className="size-[18px]" />
              </button>
              <div className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-[11px] py-1.5">
                <LayoutGrid className="size-3.5 text-[#475569]" />
                <span
                  className="text-[12px] font-semibold text-[#475569]"
                  style={{ fontFamily: 'system-ui, Roboto, sans-serif' }}
                >
                  클라우드 컴퓨터
                </span>
                <span className="rounded-full bg-[rgba(91,33,182,0.11)] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-[#7c3aed]">
                  새로운
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="flex size-[30px] items-center justify-center rounded-[9px] text-[#64748b] transition hover:bg-[#f8fafc]"
                aria-label="채팅"
              >
                <MessageSquare className="size-[18px]" />
              </button>
              <button
                type="button"
                className="flex size-[30px] items-center justify-center rounded-[9px] text-[#64748b] transition hover:bg-[#f8fafc]"
                aria-label="음성"
              >
                <Mic className="size-[18px]" />
              </button>
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-2xl bg-[#0f172a] text-white transition hover:opacity-90"
                aria-label="전송"
              >
                <SendHorizontal className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {quickActions.map(({ label, icon: Icon }) => (
            <Button
              variant="outline"
              key={label}
              type="button"
              className="inline-flex items-end gap-1.5 rounded-full px-[15px] py-[10.5px] text-[13px] font-semibold text-[#334155]"
            >
              <Icon className="size-4 text-[#475569]" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
