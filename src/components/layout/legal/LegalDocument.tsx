import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import HeaderContainer from '@/components/layout/header/HeaderContainer';
import Footer from '@/components/layout/footer/Footer';

/*
  이용약관·개인정보 처리방침이 같이 쓰는 틀.

  두 문서는 서버 없이도 열려야 한다(서비스가 멈춰 있어도 약관과 처리방침은 공개돼 있어야
  한다). 그래서 본문은 전부 이 저장소 안의 정적 내용이고, API 를 부르지 않는다.

  조항마다 id 를 달아 `/privacy#cookies` 처럼 바로 걸 수 있게 한다. 푸터의 "쿠키 정책" 이
  별도 페이지 대신 처리방침의 해당 절을 가리키는 것도 이 덕분이다.
*/

export interface LegalSection {
  /** URL 조각(#id)으로 쓰인다. 바꾸면 밖에서 걸어 둔 링크가 깨진다 */
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalDocumentProps {
  title: string;
  /** 예: '2026년 11월 5일' */
  effectiveDate: string;
  intro: ReactNode;
  sections: LegalSection[];
  /** 문서 끝의 개정 이력 등 */
  appendix?: ReactNode;
  /** 다른 법적 문서로 가는 링크 */
  related: { to: '/terms' | '/privacy'; label: string };
}

export default function LegalDocument({
  title,
  effectiveDate,
  intro,
  sections,
  appendix,
  related,
}: LegalDocumentProps) {
  return (
    <div className="min-h-screen bg-white text-[#0f172a]">
      <HeaderContainer />
      <main className="mx-auto w-full max-w-[860px] px-5 pt-[112px] pb-20 sm:px-8 sm:pt-[140px]">
        <header className="border-b border-[#e2e8f0] pb-8">
          <h1 className="text-[28px] leading-[1.35] font-bold tracking-[-0.5px] sm:text-[34px]">
            {title}
          </h1>
          <p className="mt-3 text-[14px] text-[#64748b]">시행일: {effectiveDate}</p>
          <div className="mt-6 space-y-3 text-[15px] leading-[1.8] text-[#334155]">{intro}</div>
        </header>

        <nav aria-label="목차" className="mt-8 rounded-2xl bg-[#f8fafc] p-5 sm:p-6">
          <h2 className="text-[14px] font-semibold text-[#0f172a]">목차</h2>
          <ol className="mt-3 grid gap-x-6 gap-y-2 text-[14px] text-[#475569] sm:grid-cols-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:text-[#7C3AED] hover:underline">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-[19px] leading-[1.5] font-bold text-[#0f172a] sm:text-[20px]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-[15px] leading-[1.85] text-[#334155]">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        {appendix ? (
          <div className="mt-14 border-t border-[#e2e8f0] pt-8 text-[14px] leading-[1.8] text-[#475569]">
            {appendix}
          </div>
        ) : null}

        <p className="mt-10 text-[14px] text-[#475569]">
          함께 보기:{' '}
          <Link to={related.to} className="font-semibold text-[#7C3AED] hover:underline">
            {related.label}
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

/* ── 본문에서 반복해 쓰는 작은 조각 ──────────────────────────────────────── */

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 marker:text-[#94a3b8]">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function Numbered({ items }: { items: ReactNode[] }) {
  return (
    <ol className="list-decimal space-y-1.5 pl-5 marker:text-[#64748b]">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
}

/**
 * 좁은 화면에서는 가로로 스크롤한다. 표를 줄여 글자를 깨뜨리는 것보다 낫다.
 * 첫 열을 행 머리글(th)로 둬 화면 낭독기가 행 단위로 읽게 한다.
 */
export function LegalTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[560px] border-collapse text-left text-[14px] leading-[1.7]">
        <thead>
          <tr className="border-y border-[#cbd5e1] bg-[#f8fafc]">
            {head.map((cell) => (
              <th key={cell} scope="col" className="px-3 py-2.5 font-semibold text-[#0f172a]">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[#e2e8f0] align-top">
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th
                    key={cellIndex}
                    scope="row"
                    className="px-3 py-2.5 font-medium whitespace-nowrap text-[#0f172a]"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={cellIndex} className="px-3 py-2.5 text-[#334155]">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MailLink({ address }: { address: string }) {
  return (
    <a href={`mailto:${address}`} className="font-medium text-[#7C3AED] hover:underline">
      {address}
    </a>
  );
}
