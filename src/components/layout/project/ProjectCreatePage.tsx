import { useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { ArrowLeft, CheckCircle2, LayoutTemplate, Monitor, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  createUserProject,
  START_TYPE_DESCRIPTION,
  START_TYPE_LABEL,
  type ProjectStartType,
} from '@/lib/userProjects';

const typeIcons: Record<ProjectStartType, typeof Monitor> = {
  landing: Monitor,
  portfolio: LayoutTemplate,
  blank: Upload,
};

const defaultNames: Record<ProjectStartType, string> = {
  landing: '새 랜딩페이지',
  portfolio: '새 포트폴리오',
  blank: '새 프로젝트',
};

const goalSuggestions: Record<ProjectStartType, string[]> = {
  landing: ['전환율 높이기', '서비스 소개', '문의 유도'],
  portfolio: ['작업물 정리', '채용 어필', '클라이언트 확보'],
  blank: ['빠른 MVP 제작', 'AI 초안 생성', '직접 커스터마이징'],
};

function ProjectCreatePage() {
  const { type: startType } = useSearch({ from: '/_authenticated/project/new' });
  const navigate = useNavigate();
  const Icon = typeIcons[startType];

  const [name, setName] = useState(defaultNames[startType]);

  const isValid = name.trim().length >= 2;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    const project = createUserProject({
      name,
      startType,
    });

    if (startType === 'blank') {
      navigate({ to: '/project/$slug/agent', params: { slug: project.slug } });
      return;
    }

    navigate({ to: '/project/$slug', params: { slug: project.slug } });
  };

  return (
    <div className="min-h-full bg-[#f8fafc] px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-[700px]">
        <Link
          to="/home"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#64748b] transition hover:text-[#0f172a]"
        >
          <ArrowLeft className="size-4" />
          홈으로
        </Link>

        <div className="mt-7 rounded-3xl border border-[#dbe3ef] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[13px] font-semibold text-[#64748b]">새 프로젝트</p>
          </div>
          <div className="mt-4 flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f8fafc] text-[#2563eb] shadow-sm ring-1 ring-[#e2e8f0]">
              <Icon className="size-5" />
            </span>
            <div>
              <h1 className="text-[24px] font-bold tracking-tight text-[#0f172a]">
                {START_TYPE_LABEL[startType]} 만들기
              </h1>
              <p className="mt-1 text-[14px] text-[#64748b]">
                {START_TYPE_DESCRIPTION[startType]} 프로젝트를 생성합니다.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {goalSuggestions[startType].map((goal) => (
              <span
                key={goal}
                className="rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1 text-[12px] font-medium text-[#475569]"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-5 rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
        >
          <div className="grid gap-5 sm:grid-cols-[1.8fr_1fr]">
            <div>
              <label htmlFor="project-name" className="text-[14px] font-semibold text-[#334155]">
                프로젝트 이름 <span className="text-[#ef4444]">*</span>
              </label>
              <input
                id="project-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 카페 랜딩, 디자이너 포트폴리오"
                className="mt-2 w-full rounded-xl border border-[#dbe3ef] bg-[#fbfdff] px-4 py-3 text-[15px] text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#93c5fd] focus:ring-2 focus:ring-[#dbeafe]"
                autoFocus
              />
            </div>

            <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3">
              <p className="text-[12px] font-semibold text-[#64748b]">생성 후 이동</p>
              <p className="mt-1 text-[14px] font-semibold text-[#0f172a]">
                {startType === 'blank' ? 'AI 에이전트' : '프로젝트 상세'}
              </p>
              <p className="mt-2 text-[12px] text-[#94a3b8]">프로젝트가 즉시 목록에 추가됩니다.</p>
            </div>
          </div>

          {startType === 'blank' ? (
            <p className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[13px] leading-relaxed text-[#64748b]">
              생성 후 작업 화면으로 이동합니다.
            </p>
          ) : null}

          <ul className="space-y-1.5 rounded-xl bg-[#f8fafc] px-4 py-3 text-[13px] text-[#64748b]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-[#22c55e]" />
              1분 안에 프로젝트를 만들고 바로 편집 시작
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-[#22c55e]" />
              생성된 프로젝트는 프로젝트 목록에 자동 저장
            </li>
          </ul>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" className="h-11 rounded-xl" asChild>
              <Link to="/home">취소</Link>
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="h-11 rounded-xl border-[#2563eb] bg-[#2563eb] px-6 text-white shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:bg-[#1d4ed8]"
            >
              프로젝트 만들기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectCreatePage;
