import { Link } from '@tanstack/react-router';
import { ArrowLeft, Play, Settings } from 'lucide-react';

import { DEPLOY_STATUS_LABEL, type ProjectItem } from '@/mocks/projects/projectTypes';

const deployBadgeClass: Record<ProjectItem['deployStatus'], string> = {
  pending: 'bg-[#f1f5f9] text-[#64748b] border-[#e2e8f0]',
  deploying: 'bg-[#fef9c3] text-[#854d0e] border-[#fde68a]',
  deployed: 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]',
};

const recentHistory = [
  { label: '프리뷰 브랜치 빌드 성공', time: '10분 전', status: '미배포' },
  { label: '배포 승인 대기 (main merge 전)', time: '방금', status: '미배포' },
  { label: 'DNS 레코드 안내 발송', time: '1시간 전', status: '미배포' },
] as const;

type ProjectDetailPageProps = {
  project: ProjectItem;
};

function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const isPending = project.deployStatus === 'pending';

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#f8fafc]">
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-[960px]">
          {/* 프로젝트 헤더 */}
          <div className="mb-6">
            <Link
              to="/project"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#64748b] transition hover:text-[#0f172a]"
            >
              <ArrowLeft className="size-4" />
              프로젝트 목록으로 돌아가기
            </Link>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-[28px] font-bold tracking-tight text-[#0f172a]">
                  {project.slug}
                </h1>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[12px] font-semibold ${deployBadgeClass[project.deployStatus]}`}
                >
                  {DEPLOY_STATUS_LABEL[project.deployStatus]}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/project/$slug/agent"
                  params={{ slug: project.slug }}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#7c3aed] px-4 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(124,58,237,0.35)] transition hover:bg-[#6d28d9]"
                >
                  <Play className="size-4 fill-current" />
                  Open AI Agent
                </Link>
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                >
                  <Settings className="size-4" />
                  프로젝트 설정
                </button>
              </div>
            </div>
          </div>

          {/* 메인 카드 */}
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-12">
            {isPending ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div
                  className="size-28 rounded-full bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#6366f1] shadow-[0_20px_50px_rgba(124,58,237,0.35)]"
                  aria-hidden
                />
                <h2 className="mt-8 text-[18px] font-bold text-[#0f172a]">
                  아직 배포되지 않은 프로젝트입니다
                </h2>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#64748b]">
                  AI 에이전트와 대화하며 페이지를 만들고, 한 번에 배포까지 이어 가 보세요.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center py-10 text-center">
                <p className="text-[14px] text-[#64748b]">{project.subtitle}</p>
                <Link
                  to="/project/$slug/agent"
                  params={{ slug: project.slug }}
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-[#7c3aed] px-5 text-[13px] font-semibold text-white"
                >
                  <Play className="size-4 fill-current" />
                  Open AI Agent
                </Link>
              </div>
            )}
          </div>

          {/* 하단 정보 */}
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <section className="rounded-xl border border-[#e2e8f0] bg-white p-5 lg:col-span-2">
              <h3 className="text-[14px] font-bold text-[#0f172a]">현재 URL</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#64748b]">
                {project.deployStatus === 'deployed'
                  ? project.subtitle
                  : '프로젝트가 라이브되면 여기에 URL이 표시됩니다.'}
              </p>

              <h3 className="mt-6 text-[14px] font-bold text-[#0f172a]">최근 반영 이력</h3>
              <div className="mt-3 overflow-hidden rounded-lg border border-[#f1f5f9]">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-[#f8fafc] text-[12px] font-semibold text-[#64748b]">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">내용</th>
                      <th className="px-4 py-2.5 font-semibold">시간</th>
                      <th className="px-4 py-2.5 font-semibold">상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {recentHistory.map((row) => (
                      <tr key={row.label} className="text-[#334155]">
                        <td className="px-4 py-3">{row.label}</td>
                        <td className="px-4 py-3 text-[#64748b]">{row.time}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-medium text-[#64748b]">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="flex flex-col gap-5">
              <section className="rounded-xl border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-[14px] font-bold text-[#0f172a]">가장 최근 커밋</h3>
                <p className="mt-3 font-mono text-[13px] font-semibold text-[#7c3aed]">d524530</p>
                <p className="mt-1 text-[12px] text-[#94a3b8]">어제에 푸시됨</p>
              </section>

              <section className="rounded-xl border border-[#e2e8f0] bg-white p-5">
                <h3 className="text-[14px] font-bold text-[#0f172a]">트래픽 현황</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#94a3b8]">
                  GA4 연동 후 방문자·페이지뷰를 확인할 수 있습니다.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
