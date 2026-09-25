import { useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { ChevronLeft, ExternalLink, Monitor, Smartphone } from 'lucide-react';
import { setHomePromptTemplate, toHomePromptAttachedTemplate } from '@/lib/homePromptTemplate';
import { toSafeHttpUrl } from '@/lib/safeUrl';

import { TEMPLATE_CATALOG_QUERY_KEY, useTemplateListQuery } from '@/api/templates';

function ProjectCreatePage() {
  const navigate = useNavigate();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const search = useSearch({ from: '/_authenticated/project/new' });
  const { data: catalog, isLoading } = useTemplateListQuery(TEMPLATE_CATALOG_QUERY_KEY);

  /*
    주소로 들어온 id 를 카탈로그에서 찾는다. 목록에 이미 같은 값이 다 들어 있어서
    단건 조회를 따로 하지 않는다 — 한 번 덜 묻는다.
  */
  const template = (catalog ?? []).find((item) => item.templateId === search.templateId) ?? null;

  /*
    `demoUrl` 은 서버가 GH Pages 카탈로그를 그대로 통과시킨 값이다. 우리 서버가 조립한
    주소가 아니라 템플릿 저장소의 JSON 에 적힌 문자열이라, http(s) 인지 여기서 확인한다 —
    `javascript:` 가 섞이면 iframe 도 `window.open` 도 이 문서의 권한으로 실행한다.
  */
  const demoHref = toSafeHttpUrl(template?.demoUrl);

  const handleUseTemplate = () => {
    if (!template) return;
    setHomePromptTemplate(toHomePromptAttachedTemplate(template));
    void navigate({ to: '/home', search: { templateId: template.templateId } });
  };

  if (isLoading) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-[#f8fafc]">
        <div className="h-4 w-40 animate-pulse rounded bg-[#e2e8f0]" />
      </div>
    );
  }

  /*
    카탈로그에 없는 id 로 들어왔다. 주소를 직접 친 경우이거나 템플릿이 내려간 경우다.
    빈 iframe 을 띄우느니 왜 못 보여주는지 말하고 돌아갈 길을 준다.
  */
  if (!template) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-[#f8fafc] px-6 text-center">
        <p className="text-[15px] font-semibold text-[#0f172a]">템플릿을 찾을 수 없습니다.</p>
        <p className="text-[13px] text-[#64748b]">
          주소가 바뀌었거나 더 이상 제공되지 않는 템플릿입니다.
        </p>
        <Link
          to="/home"
          className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-[#0f172a] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#1e293b]"
        >
          템플릿 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#f8fafc] lg:h-screen">
      <div className="flex min-h-0 flex-1">
        <section className="flex min-h-0 w-full shrink-0 flex-col bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e8f0] px-4 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <div className="flex min-w-0 flex-wrap items-center gap-2 justify-self-start">
              <Link
                to="/home"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-1.5 text-[13px] font-medium text-[#334155] transition hover:bg-[#f8fafc]"
              >
                <ChevronLeft className="size-3.5" strokeWidth={2} />
                템플릿 뒤로가기
              </Link>
              {demoHref ? (
                <a
                  href={demoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-1.5 text-[13px] font-medium text-[#334155] transition hover:bg-[#f8fafc]"
                >
                  <ExternalLink className="size-3.5" />새 탭에서 보기
                </a>
              ) : null}
            </div>

            <div className="inline-flex justify-self-center rounded-lg border border-[#e2e8f0] bg-[#f1f5f9] p-0.5">
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

            <div className="flex justify-self-end">
              <button
                type="button"
                onClick={handleUseTemplate}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#7c3aed] px-4 text-[13px] font-semibold text-white transition hover:bg-[#6d28d9]"
              >
                템플릿 사용하기
              </button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
            <div
              className={`relative size-full min-h-0 ${
                previewDevice === 'mobile'
                  ? 'mx-auto h-full w-full max-w-[390px] border-x border-[#e2e8f0] shadow-[0_0_0_1px_rgba(15,23,42,0.06)]'
                  : ''
              }`}
            >
              {/*
                실제로 도는 데모다. 사용자가 클릭·스크롤로 직접 만져볼 수 있어야 한다는
                요구사항이 여기서 충족된다 — 목록에서는 썸네일만 받고 이 한 자리에서만
                띄운다. 데모는 스크립트가 도는 진짜 페이지라 여럿을 동시에 띄우면 무겁다.
              */}
              {demoHref ? (
                <iframe
                  src={demoHref}
                  title={`${template.name} 미리보기`}
                  /*
                    다른 오리진이라 `allow-same-origin` 이 이 앱에 대한 권한을 주지 않는다 —
                    데모가 자기 오리진으로 동작하게 할 뿐이다. 대신 상단 이동(데모가 이 창을
                    딴 데로 보내는 것) · 폼 전송 · 팝업이 막힌다.
                  */
                  sandbox="allow-scripts allow-same-origin"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 block size-full border-0 bg-white"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                  <p className="text-[14px] text-[#94a3b8]">이 템플릿은 미리 볼 주소가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProjectCreatePage;
