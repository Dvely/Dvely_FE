import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

/*
  경로마다 canonical·og:url·제목을 맞춘다.

  SPA 라 어느 경로로 들어오든 index.html 하나를 받는다. 그래서 canonical 을 index.html 에
  고정하면 /template 까지 "/ 의 사본" 이라고 선언하게 되고, 검색엔진은 그 페이지를 색인에서
  뺀다. canonical 은 지금 경로를 보고 여기서 단다 — Google 은 렌더링한 DOM 의 canonical 을
  읽는다.

  제목은 공개 페이지만 바꾼다. 로그인 뒤 화면은 robots.txt 로 수집을 막아 두었으므로
  기본 제목을 그대로 둔다.
*/

const ORIGIN = 'https://qeploy.com';
const DEFAULT_TITLE = 'Qeploy — 대화형 AI 웹서비스 빌드·배포 자동화 플랫폼';

function titleFor(pathname: string): string {
  if (pathname === '/template') return '템플릿 갤러리 | Qeploy';

  // 템플릿 본문 컴포넌트를 여기서 import 하면 세 템플릿이 통째로 첫 번들에 실린다.
  // 상세 제목까지 맞추는 값어치가 그만 못해 공통 제목으로 둔다.
  if (pathname.startsWith('/template/')) return '템플릿 미리보기 | Qeploy';

  return DEFAULT_TITLE;
}

function upsertHead(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export default function SeoHead() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    // 끝의 / 는 하나로 맞춘다. "/template/" 와 "/template" 가 따로 색인되지 않게 한다.
    const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const url = `${ORIGIN}${normalized}`;

    upsertHead(
      'link[rel="canonical"]',
      () => {
        const link = document.createElement('link');
        link.rel = 'canonical';
        return link;
      },
      'href',
      url,
    );
    upsertHead(
      'meta[property="og:url"]',
      () => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:url');
        return meta;
      },
      'content',
      url,
    );

    document.title = titleFor(normalized);
  }, [pathname]);

  return null;
}
