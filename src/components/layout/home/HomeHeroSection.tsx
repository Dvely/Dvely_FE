import { Link } from '@tanstack/react-router';
import { Box, LayoutTemplate, Monitor, Upload } from 'lucide-react';

const startOptions = [
  {
    title: '랜딩페이지',
    description: '제품·서비스 소개에 맞춘 한 페이지',
    icon: Monitor,
    type: 'landing' as const,
  },
  {
    title: '포트폴리오',
    description: '작업물과 경력을 보여주는 사이트',
    icon: LayoutTemplate,
    type: 'portfolio' as const,
  },
  {
    title: '빈 페이지에서 시작',
    description: 'AI 프롬프트로 처음부터 구성',
    icon: Upload,
    type: 'blank' as const,
  },
] as const;

function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-gradient-to-br from-[#f8fafc] via-white to-[#eff6ff] p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-8 top-6 size-24 rotate-12 rounded-2xl border border-[#e2e8f0]/80 bg-white/60 shadow-sm" />
        <div className="absolute right-24 top-16 size-14 rounded-full border border-[#c7d2fe]/60 bg-[#eef2ff]/80" />
        <div className="absolute bottom-8 right-40 size-10 rotate-45 rounded-lg bg-[#ddd6fe]/40" />
        <Box className="absolute right-16 bottom-10 size-8 text-[#cbd5e1]/80" strokeWidth={1.25} />
        <Monitor className="absolute right-48 top-10 size-7 text-[#94a3b8]/50" strokeWidth={1.5} />
      </div>

      <div className="relative max-w-xl">
        <p className="text-[13px] font-semibold text-[#6366f1]">Devely AI</p>
        <h2 className="mt-1 text-[26px] font-bold leading-tight tracking-tight text-[#0f172a] sm:text-[30px]">
          어떤 웹페이지를 만들까요?
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-[#64748b]">
          랜딩페이지나 포트폴리오를 선택하고 AI가 초안을 만들어 드립니다.
        </p>
      </div>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
        {startOptions.map((option) => {
          const { title, description, icon: Icon, type } = option;

          return (
            <Link
              key={title}
              to="/project/new"
              search={{ type }}
              className="group flex flex-col rounded-xl border border-[#e2e8f0] bg-white/90 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-[#cbd5e1] hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#475569] transition group-hover:bg-[#eff6ff] group-hover:text-[#2563eb]">
                  <Icon className="size-4" />
                </span>
              </div>
              <p className="mt-3 text-[15px] font-semibold text-[#0f172a]">{title}</p>
              <p className="mt-1 text-[12px] leading-snug text-[#64748b]">{description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default HomeHeroSection;
