import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Dialog } from 'radix-ui';
import { ArrowUp, X } from 'lucide-react';
import HeaderContainer from '@/components/layout/header/HeaderContainer';
import TemplateBrowseFilters from '@/components/layout/templates/TemplateBrowseFilters';
import { TEMPLATE_CATALOG_QUERY_KEY, useTemplateListQuery } from '@/api/templates';
import { toTemplateCard } from '@/lib/templateCatalog';
import { toSafeHttpUrl } from '@/lib/safeUrl';
import { TemplateCatalogError } from '@/components/common/TemplateCatalogError';
import {
  templateHasIndustry,
  type TemplateIndustryCategory,
  type TemplateSiteType,
} from '@/lib/templateCategories';

export default function TemplateGalleryPage() {
  const [category, setCategory] = useState<'all' | TemplateIndustryCategory>('all');
  const [siteType, setSiteType] = useState<'all' | TemplateSiteType>('all');

  /*
    로그인 전에도 열리는 화면이다. `GET /templates` 는 인증을 타지 않아서 그대로 쓴다.

    예전에는 화면 안 더미 목록을 봤고, 거기에 `isNew` 를 "배열 끝 세 개" 로 지어내고
    있었다. 카탈로그에 신규 개념이 없으므로 그 표시는 걷어냈다 — 서버가 모르는 것을
    화면이 지어내면, 읽는 사람은 그것이 사실인 줄 안다.
  */
  const {
    data: catalog,
    isLoading,
    isError,
    refetch,
  } = useTemplateListQuery(TEMPLATE_CATALOG_QUERY_KEY);

  const filtered = useMemo(() => {
    const cards = (catalog ?? []).map(toTemplateCard);
    return cards.filter((template) => {
      const matchesIndustry =
        category === 'all' || templateHasIndustry(template.industries, category);
      const matchesType = siteType === 'all' || template.siteType === siteType;
      return matchesIndustry && matchesType;
    });
  }, [catalog, category, siteType]);

  return (
    <div className="min-h-screen bg-[#f5f5fa] text-[#333]">
      <HeaderContainer />
      <main className="px-5 pb-24 pt-[130px] sm:px-8 lg:px-[5%]">
        <section aria-labelledby="template-heading" className="text-center">
          <h1
            id="template-heading"
            className="text-[26px] font-bold leading-[1.4] tracking-[-1px] sm:text-[32px]"
          >
            템플릿을 선택하여 사이트를 제작하세요!
          </h1>
          <p className="mt-6 text-[14px] leading-[25px] text-[#888]">
            모든 템플릿들은 20여 개 블럭들의 조합으로 구성되어 있습니다.
            <br />
            원하는 스타일의 템플릿을 선택하신 후, 필요 없는 블럭들은 삭제하고 다른 디자인의 블럭들을
            추가하면서
            <br className="hidden sm:block" />
            자신만의 개성 있는 사이트를 만들어보세요!
          </p>
        </section>

        <div className="relative z-20 mx-auto mb-[70px] mt-[50px] flex justify-center">
          <TemplateBrowseFilters
            align="center"
            typeValue={siteType}
            industryValue={category}
            onTypeChange={setSiteType}
            onIndustryChange={setCategory}
          />
        </div>

        <p role="status" className="sr-only">
          {isError
            ? '템플릿 목록을 불러오지 못했습니다'
            : isLoading
              ? '템플릿을 불러오는 중입니다'
              : `템플릿 ${filtered.length}개`}
        </p>
        <section
          aria-label="템플릿 목록"
          className="mx-auto grid max-w-[1600px] grid-cols-1 gap-x-[30px] gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* 못 받은 것을 "조건에 맞는 게 없다" 고 적으면 다시 시도할 생각을 못 한다 */}
          {isError ? (
            <TemplateCatalogError className="col-span-full" onRetry={() => void refetch()} />
          ) : isLoading ? (
            [0, 1, 2, 3, 4, 5].map((item) => (
              <div
                key={`template-skeleton-${item}`}
                className="aspect-16/10 animate-pulse bg-[#e9e9ef]"
              />
            ))
          ) : filtered.length > 0 ? (
            filtered.map((template, index) => {
              /*
                `demoUrl` 은 서버가 GH Pages 카탈로그를 그대로 통과시킨 값이다. 우리 서버가
                조립한 주소가 아니라 템플릿 저장소의 JSON 에 적힌 문자열이라, http(s) 인지
                여기서 확인한다 — `javascript:` 가 섞이면 iframe 이 부모 문서의 권한으로
                실행한다.
              */
              const demoHref = toSafeHttpUrl(template.demoUrl);

              return (
                <Dialog.Root key={template.templateId}>
                  <article className="min-w-0">
                    <Dialog.Trigger asChild>
                      <button
                        type="button"
                        aria-label={`${template.name} 미리보기`}
                        className="group block w-full cursor-pointer text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7396d3]"
                      >
                        <span className="relative block aspect-16/10 bg-[#e9e9ef] shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
                          {template.thumbnailUrl ? (
                            <img
                              src={template.thumbnailUrl}
                              alt={`${template.name} 템플릿 화면`}
                              loading={index < 6 ? 'eager' : 'lazy'}
                              decoding="async"
                              className="h-full w-full object-cover object-top"
                            />
                          ) : (
                            /* 템플릿 저장소 발행 전에는 서버가 그림을 안 준다. 이름만으로 그린다 */
                            <span className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#ede9fe] to-[#f1f5f9] px-4">
                              <span className="text-center text-[15px] font-semibold text-[#6d28d9]">
                                {template.name}
                              </span>
                            </span>
                          )}
                          <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                            <span className="rounded-full border border-white px-7 py-2.5 text-sm text-white">
                              미리보기
                            </span>
                          </span>
                        </span>
                        <span className="mt-3 flex items-center justify-center gap-1.5 text-[14px] leading-6 text-[#888]">
                          {template.name}
                        </span>
                      </button>
                    </Dialog.Trigger>
                  </article>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] flex h-[90dvh] w-[calc(100%-32px)] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
                      <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-6 py-4">
                        <div className="min-w-0">
                          <Dialog.Title className="font-semibold">{template.name}</Dialog.Title>
                          <Dialog.Description className="mt-1 truncate text-sm text-[#888]">
                            {template.description || '템플릿 미리보기'}
                          </Dialog.Description>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <Link
                            to="/project/new"
                            search={{ type: template.siteType, templateId: template.templateId }}
                            className="rounded-lg bg-[#7c3aed] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"
                          >
                            이 템플릿 쓰기
                          </Link>
                          <Dialog.Close
                            className="rounded-full p-2 hover:bg-gray-100"
                            aria-label="미리보기 닫기"
                          >
                            <X className="size-5" />
                          </Dialog.Close>
                        </div>
                      </div>
                      {/*
                      그림이 아니라 실제로 도는 데모를 띄운다. 예전에는 카드에 쓴 썸네일을
                      그대로 한 번 더 보여줬는데, 그러면 열어 볼 이유가 없었다 — 방금 누른
                      그림이 크게 나올 뿐이었다.

                      데모는 스크립트가 도는 진짜 페이지라 목록에서 여럿 띄우면 무겁다.
                      그래서 열린 하나에서만 띄운다(Dialog 가 닫히면 DOM 에서 빠진다).
                    */}
                      {demoHref ? (
                        <iframe
                          src={demoHref}
                          title={`${template.name} 미리보기`}
                          /*
                          다른 오리진이라 `allow-same-origin` 이 이 앱에 대한 권한을 주지
                          않는다 — 데모가 자기 오리진으로 동작하게 할 뿐이다. 대신 이 목록이
                          주지 않는 것이 중요하다: 상단 이동(데모가 부모 창을 딴 데로 보내는
                          것) · 폼 전송 · 팝업이 전부 막힌다.
                        */
                          sandbox="allow-scripts allow-same-origin"
                          referrerPolicy="no-referrer"
                          className="min-h-0 flex-1 border-0 bg-white"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex min-h-0 flex-1 items-center justify-center px-6 text-center">
                          <p className="text-[14px] text-[#94a3b8]">
                            이 템플릿은 미리 볼 주소가 없습니다.
                          </p>
                        </div>
                      )}
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              );
            })
          ) : (
            <p className="col-span-full py-16 text-center text-[14px] text-[#94a3b8]">
              해당 조건의 템플릿을 준비 중입니다.
            </p>
          )}
        </section>
      </main>
      <footer className="border-t border-black/5 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
          <Link to="/" className="text-[22px] font-extrabold tracking-tight text-black">
            Qeploy
          </Link>
          <p className="text-xs text-[#999]">© Qeploy. All rights reserved.</p>
        </div>
      </footer>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="맨 위로 이동"
        className="fixed bottom-6 right-6 rounded-full border border-[#e1e1e6] bg-white p-3 text-[#777] shadow-sm transition hover:text-black"
      >
        <ArrowUp className="size-5" />
      </button>
    </div>
  );
}
