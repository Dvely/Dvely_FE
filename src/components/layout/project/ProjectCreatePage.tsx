import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import {
  ArrowRight,
  Check,
  ExternalLink,
  Monitor,
  RefreshCw,
  Smartphone,
  ThumbsUp,
} from 'lucide-react';
import HomeStepProgress from '@/components/layout/home/HomeStepProgress';
import {
  DEFAULT_TEMPLATE_ID,
  getHomeTemplateById,
  homeTemplates,
} from '@/mocks/home/homeTemplates';
import { postProjectCreate } from '@/api/projects';
import type { ProjectStartType } from '@/lib/userProjects';

export type OperationMode = 'agency' | 'direct';

const operationOptions: {
  id: OperationMode;
  title: string;
  description: string;
  recommended?: boolean;
  bullets: string[];
  bulletTone: 'blue' | 'green';
  featureBoxClass: string;
  footerTags: string[];
  priceLabel?: string;
  priceValue?: string;
}[] = [
  {
    id: 'agency',
    title: '광고대행 서비스',
    description: '광고는 Dvely 마케팅센터에서 운영해 드립니다',
    recommended: true,
    bullets: [
      '업종별 맞춤 광고 전략 수립',
      '네이버·카카오·메타·구글·틱톡 등 주요 매체 운영',
      '성과 분석 리포트 제공',
    ],
    bulletTone: 'blue',
    featureBoxClass: 'bg-[#eff6ff] border border-[#dbeafe]',
    footerTags: ['대행 선택 시 솔루션 무료', 'Dvely 마케터 운영'],
  },
];

function buildProjectCreatePayload(
  name: string,
  startType: ProjectStartType,
  templateId: string,
  operation: OperationMode,
) {
  if (startType === 'blank') {
    return {
      name,
      startMode: 'blank' as const,
      templateType: null,
      draftMode: 'fast',
    };
  }

  return {
    name,
    startMode: 'template' as const,
    templateType: `${templateId}:${operation}`,
    draftMode: 'fast',
  };
}

function ProjectCreatePage() {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [operationMode, setOperationMode] = useState<OperationMode>('agency');
  const [projectName, setProjectName] = useState(
    () =>
      getHomeTemplateById(DEFAULT_TEMPLATE_ID)?.title ?? homeTemplates[0]?.title ?? '새 프로젝트',
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const search = useSearch({ from: '/_authenticated/project/new' });
  const navigate = useNavigate();
  const wixPreviewUrl = 'https://aih-b-image-service.cafe24.com/templates/professional/crimson/';
  const templateId = search.templateId ?? DEFAULT_TEMPLATE_ID;
  const startType = search.type;
  const template =
    getHomeTemplateById(templateId) ?? getHomeTemplateById(DEFAULT_TEMPLATE_ID) ?? homeTemplates[0];
  const trimmedName = projectName.trim();
  const isNameValid = trimmedName.length >= 2;
  const nextLabel = operationMode === 'agency' ? '다음' : '다음: 프로젝트 만들기';

  const handleNext = async () => {
    if (isSubmitting || !template || !isNameValid) return;

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const project = await postProjectCreate(
        buildProjectCreatePayload(trimmedName, startType, template.id, operationMode),
      );
      const projectSlug = String(project.projectId);

      if (startType === 'blank') {
        navigate({ to: '/project/$slug/agent', params: { slug: projectSlug } });
        return;
      }

      navigate({ to: '/project/$slug', params: { slug: projectSlug } });
    } catch {
      setErrorMessage('프로젝트 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setProjectName(template?.title ?? '새 프로젝트');
  }, [templateId, template?.title]);

  return (
    <div className="flex h-screen min-h-0 flex-col bg-[#f8fafc]">
      <HomeStepProgress currentStep={2} />

      <div className="flex min-h-0 flex-1">
        {/* 왼쪽: 템플릿 미리보기 */}
        <section className="flex min-h-0 w-[1000px] shrink-0 flex-col bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e8f0] px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/home"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-1.5 text-[13px] font-medium text-[#334155] transition hover:bg-[#f8fafc]"
              >
                <RefreshCw className="size-3.5" />
                템플릿 변경
              </Link>
              <button
                type="button"
                onClick={() => window.open(template.image, '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-1.5 text-[13px] font-medium text-[#334155] transition hover:bg-[#f8fafc]"
              >
                <ExternalLink className="size-3.5" />새 탭에서 보기
              </button>
            </div>

            <div className="inline-flex rounded-lg border border-[#e2e8f0] bg-[#f1f5f9] p-0.5">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition ${
                  previewDevice === 'desktop'
                    ? 'bg-white text-[#0f172a] shadow-sm'
                    : 'text-[#64748b] hover:text-[#334155]'
                }`}
              >
                <Monitor className="size-3.5" />
                PC
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition ${
                  previewDevice === 'mobile'
                    ? 'bg-white text-[#0f172a] shadow-sm'
                    : 'text-[#64748b] hover:text-[#334155]'
                }`}
              >
                <Smartphone className="size-3.5" />
                모바일
              </button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
            <div
              className={`relative size-full min-h-0 ${
                previewDevice === 'mobile'
                  ? 'mx-auto h-full w-[390px] border-x border-[#e2e8f0] shadow-[0_0_0_1px_rgba(15,23,42,0.06)]'
                  : ''
              }`}
            >
              <iframe
                src={wixPreviewUrl}
                title={`${template.title} 미리보기`}
                className="absolute inset-0 block size-full border-0 bg-white"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* 오른쪽: 운영 방식 선택 */}
        <section className="flex w-full flex-col overflow-y-auto px-6 py-6">
          <h1 className="text-[22px] font-bold tracking-tight text-[#0f172a]">
            프로젝트를 생성해주세요
          </h1>
          <p className="mt-1 text-[14px] text-[#64748b]">선택한 방식에 따라 다음 단계가 달라져요</p>

          <div className="mt-5 rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm">
            <label htmlFor="project-name" className="text-[14px] font-semibold text-[#334155]">
              프로젝트 이름 <span className="text-[#ef4444]">*</span>
            </label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="예: 카페 랜딩, 디자이너 포트폴리오"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl border border-[#dbe3ef] bg-[#fbfdff] px-4 py-3 text-[15px] text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#93c5fd] focus:ring-2 focus:ring-[#dbeafe] disabled:cursor-not-allowed disabled:opacity-60"
            />
            <p className="mt-2 text-[12px] text-[#94a3b8]">
              {isNameValid ? (
                <>
                  선택 템플릿: <span className="font-medium text-[#64748b]">{template?.title}</span>
                </>
              ) : (
                '프로젝트 이름은 2자 이상 입력해 주세요.'
              )}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {operationOptions.map((option) => {
              const checkColor = option.bulletTone === 'blue' ? 'text-[#2563eb]' : 'text-[#22c55e]';

              return (
                <div
                  key={option.id}
                  onClick={() => setOperationMode(option.id)}
                  className="relative w-full rounded-2xl border-2 p-4 text-left transition border-[#2563eb] bg-white shadow-[0_4px_16px_rgba(37,99,235,0.1)]"
                >
                  {option.recommended ? (
                    <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-md bg-[#2563eb] px-2 py-0.5 text-[11px] font-bold text-white">
                      <ThumbsUp className="size-3" />
                      추천
                    </span>
                  ) : null}

                  <p className="pr-8 text-[16px] font-bold text-[#0f172a]">{option.title}</p>
                  <p className="mt-1 text-[13px] text-[#64748b]">{option.description}</p>

                  <div className={`mt-3 rounded-xl px-3 py-2.5 ${option.featureBoxClass}`}>
                    <ul className="space-y-1.5">
                      {option.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-[13px] text-[#334155]"
                        >
                          <Check
                            className={`mt-0.5 size-3.5 shrink-0 ${checkColor}`}
                            strokeWidth={2.5}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {option.footerTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-medium text-[#64748b]"
                      >
                        {tag}
                      </span>
                    ))}
                    {option.priceLabel && option.priceValue ? (
                      <div className="ml-auto flex items-baseline gap-2 text-[12px]">
                        <span className="text-[#94a3b8]">{option.priceLabel}</span>
                        <span className="font-bold text-[#0f172a]">{option.priceValue}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => void handleNext()}
            disabled={isSubmitting || !isNameValid}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? '처리 중...' : nextLabel}
            <ArrowRight className="size-4" />
          </button>

          {errorMessage ? (
            <p className="mt-4 rounded-xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-[13px] text-[#b91c1c]">
              {errorMessage}
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}

export default ProjectCreatePage;
