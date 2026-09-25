import { useEffect, useMemo, useState } from 'react';
import { ArrowUp, Laptop, Mic, Plus, SlidersHorizontal } from 'lucide-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useProjectListQuery } from '@/api/projects';
import { TEMPLATE_CATALOG_QUERY_KEY, useTemplateListQuery } from '@/api/templates';
import {
  formatProjectDisplayName,
  setPendingHomeAgentPrompt,
} from '@/components/layout/project/agentChat.utils';
import HomeProjectListPopover from '@/components/layout/home/HomeProjectListPopover';
import HomePromptTemplateChip from '@/components/layout/home/HomePromptTemplateChip';
import ProjectCreateDialog from '@/components/layout/project/ProjectCreateDialog';
import {
  clearHomePromptTemplate,
  readHomePromptTemplate,
  setHomePromptTemplate,
  toHomePromptAttachedTemplate,
  type HomePromptAttachedTemplate,
} from '@/lib/homePromptTemplate';
import { cn } from '@/lib/utils';

/** 템플릿이 얹혔을 때 기존 프로젝트를 고를 수 없는 이유 */
const PROJECT_LOCK_REASON = '템플릿은 새 프로젝트에만 적용됩니다.';

const quickActions = [
  { emoji: '💻', label: '슬라이드 제작' },
  { emoji: '<>', label: '웹사이트 구축' },
  { emoji: '🖥️', label: '데스크톱 앱 개발' },
  { emoji: '🎨', label: '디자인' },
] as const;

function HomePromptHero() {
  const navigate = useNavigate();
  const { templateId: templateIdFromSearch } = useSearch({ from: '/_authenticated/home' });

  const [prompt, setPrompt] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [projectPickerOpen, setProjectPickerOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null);
  /*
    이 화면을 떠났다 돌아왔을 때를 위해 맡겨 둔 값. 주소에 templateId 가 있으면 그쪽이 이긴다.
  */
  const [storedTemplate, setStoredTemplate] = useState<HomePromptAttachedTemplate | null>(() =>
    readHomePromptTemplate(),
  );
  /** 보내기를 눌렀고, 이제 새 프로젝트 이름을 받는 중 */
  const [isNamingProject, setIsNamingProject] = useState(false);

  const { data: projects = [], isLoading: isProjectsLoading } = useProjectListQuery('home-prompt');
  const { data: catalog } = useTemplateListQuery(TEMPLATE_CATALOG_QUERY_KEY);

  /*
    주소로 들어온 템플릿.

    **카탈로그에 없는 id 면 아무것도 얹지 않는다.** 그 값은 프로젝트를 만들 때 서버로
    그대로 나가는데, 서버가 모르는 값이면 400 이다 — 여기서 걸러야 생성까지 가서 터지지
    않는다. 카탈로그가 아직 안 왔으면 null 이고, 오면 다시 계산된다.
  */
  const templateFromSearch = useMemo(() => {
    if (!templateIdFromSearch || !catalog) return null;
    const found = catalog.find((item) => item.templateId === templateIdFromSearch);
    return found ? toHomePromptAttachedTemplate(found) : null;
  }, [catalog, templateIdFromSearch]);

  const attachedTemplate = templateFromSearch ?? storedTemplate;

  /*
    주소로 얹힌 것을 맡겨 둔다. 상태를 건드리지 않고 저장소만 갱신한다 — 화면이 읽는 값은
    위에서 주소·저장소로 이미 계산돼 있다.
  */
  useEffect(() => {
    if (!templateFromSearch) return;
    setHomePromptTemplate(templateFromSearch);
  }, [templateFromSearch]);

  const latestProjectId = useMemo(() => {
    if (projects.length === 0) return null;
    const sorted = [...projects].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
    return sorted[0].projectId;
  }, [projects]);

  const targetProjectId = selectedProjectId ?? latestProjectId;

  const handleRemoveTemplate = () => {
    clearHomePromptTemplate();
    setStoredTemplate(null);
    // 주소에 남아 있으면 지운 것이 새로고침에 되살아난다
    if (templateIdFromSearch) {
      void navigate({ to: '/home', search: {}, replace: true });
    }
  };

  /** 대화로 보낼 문장. 템플릿이 얹혀 있으면 무엇을 깔았는지 앞에 적어 준다 */
  const buildMessage = (trimmed: string) =>
    attachedTemplate ? `[${attachedTemplate.title} 템플릿] ${trimmed}` : trimmed;

  const handleSubmit = () => {
    const trimmed = prompt.trim();
    if (!trimmed || isProjectsLoading) return;

    setSubmitError(null);

    /*
      템플릿이 얹혀 있으면 **반드시 새 프로젝트를 만든다.**

      서버가 `templateType` 을 `POST /projects` 에서만 받는다. 이미 있는 프로젝트에
      템플릿을 얹을 길이 없어서, 여기서 기존 프로젝트로 보내면 템플릿이 조용히 빠진
      채로 대화만 시작된다. 이름만 받고 바로 만든다.
    */
    if (attachedTemplate) {
      setIsNamingProject(true);
      return;
    }

    if (targetProjectId == null) {
      setSubmitError('먼저 프로젝트를 생성해 주세요.');
      return;
    }

    setPendingHomeAgentPrompt(buildMessage(trimmed));
    void navigate({
      to: '/project/$slug/agent',
      params: { slug: String(targetProjectId) },
    });
  };

  const handleProjectCreated = (created: { projectId: number }) => {
    const trimmed = prompt.trim();
    if (trimmed) setPendingHomeAgentPrompt(buildMessage(trimmed));

    clearHomePromptTemplate();
    setStoredTemplate(null);
    void navigate({
      to: '/project/$slug/agent',
      params: { slug: String(created.projectId) },
    });
  };

  const isProjectLocked = attachedTemplate != null;

  const cloudButtonLabel =
    selectedProjectId != null && selectedProjectName
      ? formatProjectDisplayName(selectedProjectName, selectedProjectId)
      : '프로젝트 선택';

  const promptPlaceholder = attachedTemplate
    ? '이 템플릿으로 만들 내용과 요구사항을 입력하세요'
    : '작업을 할당하거나 무엇이든 질문하세요';

  return (
    <section
      className={cn(
        'relative flex flex-col items-center pt-10 pb-8',
        projectPickerOpen ? 'z-50' : 'z-10',
      )}
    >
      <h1 className="text-center text-[32px] font-semibold tracking-tight text-[#0f172a] sm:text-[36px]">
        무엇을 도와드릴까요?
      </h1>

      <div className="mt-8 w-full max-w-[720px]">
        <div className="overflow-visible rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          {attachedTemplate ? (
            <div className="px-5 pt-5">
              <HomePromptTemplateChip template={attachedTemplate} onRemove={handleRemoveTemplate} />
              <p className="mt-2 text-[12px] leading-relaxed text-[#94a3b8]">
                {PROJECT_LOCK_REASON}
              </p>
            </div>
          ) : null}

          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            rows={attachedTemplate ? 2 : 3}
            placeholder={promptPlaceholder}
            className={cn(
              'block w-full resize-none bg-transparent px-5 pb-2 text-[15px] leading-relaxed text-[#0f172a] outline-none placeholder:text-[#94a3b8]',
              attachedTemplate ? 'pt-4' : 'pt-5',
            )}
          />

          <div className="flex flex-wrap items-center justify-between gap-2 px-4 pb-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* 첨부·설정은 아직 동작이 없다. 눌리지 않는 것을 커서로도 알린다 */}
              <button
                type="button"
                disabled
                title="첨부는 준비 중입니다"
                className="flex size-8 cursor-default items-center justify-center rounded-lg text-[#cbd5e1]"
                aria-label="첨부 (준비 중)"
              >
                <Plus className="size-[18px]" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                disabled
                title="설정은 준비 중입니다"
                className="flex size-8 cursor-default items-center justify-center rounded-lg text-[#cbd5e1]"
                aria-label="설정 (준비 중)"
              >
                <SlidersHorizontal className="size-[18px]" strokeWidth={1.75} />
              </button>
              {/*
                템플릿이 얹히면 고를 수 없다. 템플릿은 새 프로젝트를 만들 때만 정해지므로
                기존 프로젝트를 골라 봐야 무시된다 — 고를 수 있게 두면 고른 대로 될 줄 알고
                누른다. 왜 못 고르는지 버튼 옆에 적는다.
              */}
              {isProjectLocked ? (
                <span
                  className="inline-flex h-8 max-w-[260px] items-center gap-1.5 rounded-lg border border-dashed border-[#e2e8f0] bg-[#f8fafc] px-2.5 text-[12px] font-medium text-[#94a3b8]"
                  title={PROJECT_LOCK_REASON}
                >
                  <Laptop className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                  <span className="truncate">새 프로젝트</span>
                </span>
              ) : (
                <HomeProjectListPopover
                  open={projectPickerOpen}
                  onOpenChange={setProjectPickerOpen}
                  selectedProjectId={selectedProjectId}
                  onSelect={(project) => {
                    setSelectedProjectId(project.projectId);
                    setSelectedProjectName(project.name);
                  }}
                  trigger={
                    <button
                      type="button"
                      onClick={() => setProjectPickerOpen((prev) => !prev)}
                      aria-expanded={projectPickerOpen}
                      aria-haspopup="listbox"
                      title={cloudButtonLabel}
                      className={cn(
                        'inline-flex h-8 max-w-[220px] items-center gap-1.5 rounded-lg border px-2.5 text-[12px] font-medium transition cursor-pointer',
                        projectPickerOpen
                          ? 'border-[#0f172a] bg-white ring-2 ring-[#0f172a]/10 text-[#0f172a]'
                          : 'border-[#e5e7eb] bg-[#f8fafc] text-[#334155] hover:bg-[#f1f5f9]',
                      )}
                    >
                      <Laptop className="size-3.5 shrink-0 text-[#64748b]" strokeWidth={1.75} />
                      <span className="truncate">{cloudButtonLabel}</span>
                    </button>
                  }
                />
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                title="음성 입력은 준비 중입니다"
                className="flex size-8 cursor-default items-center justify-center rounded-lg text-[#cbd5e1]"
                aria-label="음성 입력 (준비 중)"
              >
                <Mic className="size-[18px]" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                disabled={!prompt.trim()}
                onClick={handleSubmit}
                className="flex size-9 items-center justify-center rounded-full bg-[#0f172a] text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:bg-[#cbd5e1]"
                aria-label="전송"
              >
                <ArrowUp className="size-[18px]" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {submitError ? (
        <p className="mt-3 text-center text-[13px] text-red-600" role="alert">
          {submitError}
        </p>
      ) : null}

      <ProjectCreateDialog
        open={isNamingProject}
        onOpenChange={setIsNamingProject}
        template={attachedTemplate}
        onCreated={handleProjectCreated}
      />

      <div className="mt-5 flex max-w-[720px] flex-wrap justify-center gap-2">
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() =>
              setPrompt((prev) => (prev ? prev : `${action.label} 관련 작업을 도와주세요`))
            }
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white px-3.5 py-2 text-[13px] font-medium text-[#334155] shadow-sm transition hover:border-[#cbd5e1] hover:bg-[#f8fafc] cursor-pointer"
          >
            {'emoji' in action && action.emoji ? (
              <span className="text-[14px] leading-none" aria-hidden>
                {action.emoji}
              </span>
            ) : null}
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default HomePromptHero;
