import ReactMarkdown, { type Components } from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

/**
 * 에이전트 답변을 마크다운으로 그린다.
 *
 * 모델은 굵게·목록·코드블록을 마크다운으로 적어 보낸다. 예전에는 그것을 그대로 글자로
 * 찍어서 `**2**` 같은 별표가 본문에 노출됐다.
 *
 * **원문 HTML 은 그리지 않는다.** react-markdown 은 `rehype-raw` 를 붙이지 않는 한 태그를
 * 글자로 이스케이프한다 — 그 플러그인을 붙이지 않는 것이 여기서는 취향이 아니라 방어선이다.
 * 본문은 모델이 만들고, 모델은 사용자가 넣은 말을 그대로 옮길 수 있다. 링크 주소도
 * react-markdown 의 기본 변환이 `javascript:` 같은 스킴을 떨군다.
 */

/**
 * remark-breaks 를 함께 쓰는 이유.
 *
 * 예전 렌더링은 `whitespace-pre-wrap` 이라 줄바꿈이 전부 보였다. 마크다운 표준은 홑
 * 줄바꿈을 공백으로 합치므로, 그대로 바꾸면 줄을 나눠 적은 답변이 한 문단으로 뭉친다 —
 * 고치려던 것과 다른 곳이 망가진다.
 */
const REMARK_PLUGINS = [remarkGfm, remarkBreaks];

/*
  타이포는 래퍼의 선택자로 준다.

  Tailwind 의 프리플라이트가 제목·목록의 기본 모양을 지워서 무엇이든 한 번은 되살려야
  한다. 태그마다 컴포넌트를 갈아끼우는 대신 여기 모아 두면 모양이 어긋났을 때 고칠 자리가
  한 군데다.

  색을 박지 않고 `currentColor` 에 기대는 것이 중요하다 — 같은 본문이 기본·흐림·실패 세
  가지 색으로 그려지고, 여기서 색을 고정하면 실패 줄의 빨간 글씨만 검게 남는다.
*/
const MARKDOWN_CLASS = [
  // 첫 줄과 마지막 줄의 바깥 여백은 말풍선 패딩이 이미 준다
  '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
  '[&_p]:my-2',
  '[&_strong]:font-semibold',
  '[&_em]:italic',
  '[&_del]:line-through',
  // 목록
  '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5',
  '[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5',
  '[&_li]:my-0.5',
  '[&_li_ul]:my-1 [&_li_ol]:my-1',
  // 제목 — 채팅 한 줄이라 크기를 크게 벌리지 않고 무게로 구분한다
  '[&_h1]:mt-3 [&_h1]:mb-1.5 [&_h1]:text-[15px] [&_h1]:font-bold',
  '[&_h2]:mt-3 [&_h2]:mb-1.5 [&_h2]:text-[14px] [&_h2]:font-bold',
  '[&_h3]:mt-2.5 [&_h3]:mb-1 [&_h3]:font-bold',
  '[&_h4]:mt-2.5 [&_h4]:mb-1 [&_h4]:font-semibold',
  '[&_h5]:mt-2 [&_h5]:mb-1 [&_h5]:font-semibold',
  '[&_h6]:mt-2 [&_h6]:mb-1 [&_h6]:font-semibold',
  // 인라인 코드. `pre` 안쪽은 코드블록이 따로 칠하므로 제외한다
  '[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-black/6 [&_:not(pre)>code]:px-1',
  '[&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[12px]',
  // 코드블록. 좁은 화면에서 말풍선을 밀지 않도록 가로 스크롤을 스스로 갖는다
  '[&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-[#0f172a] [&_pre]:px-3 [&_pre]:py-2.5',
  '[&_pre_code]:font-mono [&_pre_code]:text-[12px] [&_pre_code]:leading-relaxed [&_pre_code]:text-[#e2e8f0]',
  // 인용·구분선
  '[&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-black/15 [&_blockquote]:pl-3',
  '[&_blockquote]:opacity-80',
  '[&_hr]:my-3 [&_hr]:border-black/10',
  // 표
  '[&_table]:w-full [&_table]:border-collapse [&_table]:text-[12px]',
  '[&_th]:border [&_th]:border-black/10 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_th]:font-semibold',
  '[&_td]:border [&_td]:border-black/10 [&_td]:px-2 [&_td]:py-1',
].join(' ');

function buildComponents(linkClassName: string): Components {
  return {
    /*
      링크는 컴포넌트로 받는다 — 클래스보다 `rel` 때문이다.

      본문이 모델이 만든 것이라 주소를 미리 알 수 없다. 새 탭으로 열면서 `noopener` 를
      빠뜨리면 열린 쪽이 `window.opener` 로 이 창을 돌릴 수 있다.
    */
    a: ({ children, href }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {children}
      </a>
    ),
    /*
      표는 스스로 스크롤 상자를 두른다.

      대화 패널은 좁고 모바일에서는 더 좁다. 두르지 않으면 열이 많은 표 하나가 패널
      전체를 늘려 페이지가 가로로 밀린다.
    */
    table: ({ children }) => (
      <div className="my-2 overflow-x-auto">
        <table>{children}</table>
      </div>
    ),
  };
}

type MessageMarkdownProps = {
  content: string;
  linkClassName: string;
};

function MessageMarkdown({ content, linkClassName }: MessageMarkdownProps) {
  return (
    <div className={MARKDOWN_CLASS}>
      <ReactMarkdown remarkPlugins={REMARK_PLUGINS} components={buildComponents(linkClassName)}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MessageMarkdown;
