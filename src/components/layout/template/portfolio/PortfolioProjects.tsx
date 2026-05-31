import { useState } from 'react';
import { X } from 'lucide-react';
import {
  PORTFOLIO_TOY_PROJECTS,
  PORTFOLIO_WORK_PROJECTS,
  type PortfolioProject,
} from './portfolioContent';
import PortfolioSectionTitle from './PortfolioSectionTitle';

type ProjectGroupProps = {
  title: string;
  subtitle: string;
  projects: PortfolioProject[];
  onSelect: (project: PortfolioProject) => void;
};

function ProjectGroup({ title, subtitle, projects, onSelect }: ProjectGroupProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-[#1e293b] dark:text-[#f8f8f8]">{title}</h3>
      <p className="mt-2 text-sm text-[#64748b] dark:text-[#9ca3af]">{subtitle}</p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <button
            key={project.title}
            type="button"
            onClick={() => onSelect(project)}
            className="group overflow-hidden rounded-xl border border-[#e2e8f0] bg-white text-left transition hover:border-[#3b82f6] dark:border-[#2f2f2f] dark:bg-[#1e1e1e] dark:hover:border-[#c6a664]"
          >
            <div className="flex h-40 items-center justify-center bg-[#f3f4f6] text-sm text-[#64748b] dark:bg-[#2a2a2a] dark:text-[#9ca3af]">
              이미지가 없는 프로젝트입니다
            </div>
            <div className="p-5">
              <h4 className="text-base font-semibold text-[#1e293b] group-hover:text-[#3b82f6] dark:text-[#f8f8f8] dark:group-hover:text-[#c6a664]">
                {project.title}
              </h4>
              {project.period ? (
                <p className="mt-1 font-mono text-xs text-[#3b82f6] dark:text-[#c6a664]">
                  {project.period}
                </p>
              ) : null}
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#64748b] dark:text-[#9ca3af]">
                {project.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

type ProjectModalProps = {
  project: PortfolioProject;
  onClose: () => void;
};

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#e2e8f0] bg-white p-6 dark:border-[#2f2f2f] dark:bg-[#1e1e1e]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              id="project-modal-title"
              className="text-xl font-semibold text-[#1e293b] dark:text-[#f8f8f8]"
            >
              {project.title}
            </h3>
            {project.period ? (
              <p className="mt-1 font-mono text-xs text-[#3b82f6] dark:text-[#c6a664]">
                {project.period}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-[#64748b] hover:bg-[#f3f4f6] dark:text-[#9ca3af] dark:hover:bg-[#2a2a2a]"
          >
            <X className="size-5" />
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#64748b] dark:text-[#9ca3af]">
          {project.description}
        </p>
        {project.details?.length ? (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#64748b] dark:text-[#9ca3af]">
            {project.details.map((detail) => (
              <li key={detail.slice(0, 24)}>{detail}</li>
            ))}
          </ul>
        ) : null}
        {project.stacks?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stacks.map((stack) => (
              <span
                key={stack}
                className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-medium text-[#1e293b] dark:bg-[#2a2a2a] dark:text-[#f8f8f8]"
              >
                {stack}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PortfolioProjects() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  return (
    <section id="projects" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <PortfolioSectionTitle>Projects</PortfolioSectionTitle>
        <div className="mt-16 flex flex-col gap-16">
          <ProjectGroup
            title="Work Projects"
            subtitle="실무 환경에서 참여한 프로젝트"
            projects={PORTFOLIO_WORK_PROJECTS}
            onSelect={setSelectedProject}
          />
          <ProjectGroup
            title="Toy Projects"
            subtitle="개인적으로 기획·구현한 프로젝트"
            projects={PORTFOLIO_TOY_PROJECTS}
            onSelect={setSelectedProject}
          />
        </div>
      </div>
      {selectedProject ? (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      ) : null}
    </section>
  );
}

export default PortfolioProjects;
