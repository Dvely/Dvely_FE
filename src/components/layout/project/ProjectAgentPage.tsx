import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  RefreshCw,
  RotateCcw,
  SendHorizontal,
  Share2,
} from 'lucide-react';
import type { GetProjectDetailResType } from '@/types/projects.type';

const suggestedPrompts = [
  { label: 'UI 수정 요청', prompt: '히어로 섹션 CTA를 더 눈에 띄게 수정해줘' },
  { label: '도메인 & 배포 요청', prompt: '커스텀 도메인 연결하고 프로덕션에 배포해줘' },
] as const;

type ProjectAgentPageProps = {
  projectId: number;
  project: GetProjectDetailResType;
};

function ProjectAgentPage({ projectId, project }: ProjectAgentPageProps) {
  const [input, setInput] = useState('');

  return (
    <div className="flex h-[calc(100vh)] min-h-0 w-full overflow-hidden bg-[#f4f5f7]">
      <section className="flex w-[min(420px,36vw)] shrink-0 flex-col border-r border-[#e2e8f0] bg-white">
        <header className="flex items-center justify-between border-b border-[#f1f5f9] px-4 py-3">
          <h1 className="text-[14px] font-bold text-[#0f172a]">SYS.AI Agent</h1>
          <button type="button" className="text-[12px] font-medium text-[#7c3aed] hover:underline">
            도움말 보기
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4">
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-3 text-[13px] leading-relaxed text-[#475569]">
            안녕하세요! <span className="font-semibold text-[#0f172a]">{project.name}</span>{' '}
            워크스페이스입니다. 추천 프롬프트를 눌러 보면 수정과 배포가 어떻게 이루어지는지 데모로
            확인할 수 있어요.
          </div>
        </div>

        <footer className="border-t border-[#f1f5f9] p-3">
          <div className="mb-2 flex flex-wrap gap-2">
            {suggestedPrompts.map(({ label, prompt }) => (
              <button
                key={label}
                type="button"
                onClick={() => setInput(prompt)}
                className="rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#475569] transition hover:border-[#c4b5fd] hover:text-[#7c3aed]"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 focus-within:border-[#a5b4fc] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#6366f1]/15">
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="직접 입력하거나 위 추천 버튼을 누르세요"
              className="min-h-[40px] flex-1 resize-none bg-transparent text-[13px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
            />
            <button
              type="button"
              disabled={!input.trim()}
              className="mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#2563eb] text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="전송"
            >
              <SendHorizontal className="size-4" />
            </button>
          </div>
        </footer>
      </section>

      <section className="flex min-w-0 flex-1 flex-col bg-[#ececee]">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2e8f0] bg-white px-4 py-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Link
              to="/project/$slug"
              params={{ slug: String(projectId) }}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#64748b] transition hover:bg-[#f8fafc]"
              aria-label="프로젝트 상세로"
            >
              <ChevronLeft className="size-4" />
            </Link>
            <div className="flex min-w-0 items-center gap-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-1">
              <button type="button" className="rounded p-1.5 text-[#94a3b8] hover:bg-white">
                <ChevronLeft className="size-3.5" />
              </button>
              <button type="button" className="rounded p-1.5 text-[#94a3b8] hover:bg-white">
                <ChevronRight className="size-3.5" />
              </button>
              <button type="button" className="rounded p-1.5 text-[#94a3b8] hover:bg-white">
                <RotateCcw className="size-3.5" />
              </button>
            </div>
            <div className="flex min-w-0 flex-1 items-center rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1.5">
              <span className="truncate text-[12px] text-[#64748b]">/</span>
            </div>
            <span className="hidden shrink-0 rounded-full bg-[#ede9fe] px-2 py-0.5 text-[10px] font-semibold text-[#7c3aed] sm:inline">
              preview branch
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-semibold text-[#334155]"
            >
              <Share2 className="size-3.5" />
              Share
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center rounded-lg bg-[#0f172a] px-3 text-[12px] font-semibold text-white"
            >
              게시
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-semibold text-[#334155]"
            >
              <Pencil className="size-3.5" />
              편집
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b]"
              aria-label="새로고침"
            >
              <RefreshCw className="size-3.5" />
            </button>
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center p-8">
          <div className="max-w-md text-center">
            <p className="mt-6 text-[15px] font-semibold leading-relaxed text-[#334155]">
              Devely가 사이트를 구축 중입니다.
              <br />
              잠시 기다려 주세요!
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#94a3b8]">
              앱을 다운로드하면 준비가 완료될 때 알림을 받을 수 있어요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectAgentPage;
