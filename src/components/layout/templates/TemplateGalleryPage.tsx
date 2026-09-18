import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Dialog } from 'radix-ui';
import { ArrowUp, X } from 'lucide-react';
import HeaderContainer from '@/components/layout/header/HeaderContainer';
import { templates } from './templateCatalog';
import { TEMPLATE_INDUSTRY_CATEGORIES } from '@/lib/templateCategories';

const categories = [
  { id: 'all', label: '전체' },
  ...TEMPLATE_INDUSTRY_CATEGORIES,
] as const;

export default function TemplateGalleryPage() {
  const [category, setCategory] = useState<string>('all');
  const filtered =
    category === 'all'
      ? templates
      : templates.filter((template) => template.categories.includes(category));

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

        <nav
          aria-label="템플릿 카테고리"
          className="mx-auto mb-[70px] mt-[50px] flex max-w-[840px] flex-wrap justify-center gap-x-[14px] gap-y-[15px]"
        >
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
              className={`min-h-10 cursor-pointer rounded-full border bg-white px-4 py-2 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7396d3] ${category === item.id ? 'border-[#7396d3] text-[#7396d3]' : 'border-[#e1e1e6] text-[#333] hover:border-[#7396d3] hover:text-[#7396d3]'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <p role="status" className="sr-only">
          {categories.find((item) => item.id === category)?.label} 템플릿 {filtered.length}개
        </p>
        <section
          aria-label="템플릿 목록"
          className="mx-auto grid max-w-[1600px] grid-cols-1 gap-x-[30px] gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((template, index) => (
            <Dialog.Root key={template.id}>
              <article className="min-w-0">
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    aria-label={`${template.name} 미리보기`}
                    className="group block w-full cursor-pointer text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7396d3]"
                  >
                    <span className="relative block aspect-[1.75] bg-[#e9e9ef] shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
                      <img
                        src={template.image}
                        alt={`${template.name} 템플릿 화면`}
                        loading={index < 6 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-cover object-top"
                      />
                      {template.isNew && (
                        <span
                          className="pointer-events-none absolute -left-[7px] top-3 h-14 w-14 overflow-hidden"
                          aria-label="신규 템플릿"
                        >
                          <span className="absolute left-[-20px] top-[12px] w-[82px] -rotate-45 bg-[#e95172] py-0.5 text-xs text-white shadow-sm">
                            new
                          </span>
                        </span>
                      )}
                      <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="rounded-full border border-white px-7 py-2.5 text-sm text-white">
                          미리보기
                        </span>
                      </span>
                    </span>
                    <span className="mt-3 block text-[14px] leading-6 text-[#888]">
                      {template.name}
                    </span>
                  </button>
                </Dialog.Trigger>
              </article>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] max-h-[90dvh] w-[calc(100%-32px)] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-2xl">
                  <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
                    <div>
                      <Dialog.Title className="font-semibold">{template.name}</Dialog.Title>
                      <Dialog.Description className="mt-1 text-sm text-[#888]">
                        템플릿 디자인 미리보기
                      </Dialog.Description>
                    </div>
                    <Dialog.Close
                      className="rounded-full p-2 hover:bg-gray-100"
                      aria-label="미리보기 닫기"
                    >
                      <X className="size-5" />
                    </Dialog.Close>
                  </div>
                  <img
                    src={template.image}
                    alt={`${template.name} 템플릿 디자인 미리보기`}
                    className="w-full"
                  />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ))}
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
