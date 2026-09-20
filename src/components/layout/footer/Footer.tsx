import { Link } from '@tanstack/react-router';
import instagramIcon from '@/assets/icons/instagram.svg';
import youtubeIcon from '@/assets/icons/youtube.svg';
import companyIcon from '@/assets/icons/company.svg';
import qeployLogo from '@/assets/images/qeploy-logo-primary.svg';

/*
  푸터의 링크는 대부분 목적지가 없는 상태였다.

  없는 곳으로 데려가는 대신, 있는 것과 없는 것을 구분해서 보여준다 — 실제로 갈 수
  있는 곳만 누를 수 있게 두고(섹션 앵커·템플릿 페이지), 나머지는 버튼이 아니라
  흐린 글씨로 두어 커서도 손가락으로 바뀌지 않는다.
*/

function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  const header = document.querySelector('header');
  const offset = header instanceof HTMLElement ? header.offsetHeight + 12 : 84;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

/** 랜딩에 실제로 있는 섹션만 건다 */
const quickLinks = [
  { label: '서비스 소개', section: 'intro' },
  { label: '직군별 활용', section: 'roles' },
  { label: '제작 사례', section: 'showcase' },
  { label: '이용 후기', section: 'reviews' },
  { label: '진행 과정', section: 'process' },
  { label: '요금제', section: 'pricing' },
] as const;

type FooterItem =
  | { label: string; section: string }
  | { label: string; to: string }
  | { label: string };

const footerColumns: { title: string; items: FooterItem[] }[] = [
  {
    title: '제품',
    items: [
      { label: '서비스 소개', section: 'intro' },
      { label: '템플릿', to: '/template' },
      { label: '제작 사례', section: 'showcase' },
      { label: '요금제', section: 'pricing' },
    ],
  },
  {
    title: '리소스',
    items: [
      { label: '가이드' },
      { label: '블로그' },
      { label: '업데이트' },
      { label: '활용 사례' },
    ],
  },
  {
    title: '회사',
    items: [{ label: '채용' }, { label: '문의' }, { label: '보안' }, { label: '제휴' }],
  },
  {
    title: '약관',
    items: [{ label: '이용약관' }, { label: '개인정보처리방침' }, { label: '쿠키 정책' }],
  },
];

/** 아직 만들지 않은 항목. 버튼이 아니라 글씨로 둔다 */
function PendingItem({ label, className }: { label: string; className?: string }) {
  return (
    <span
      title="준비 중입니다"
      aria-disabled="true"
      className={`cursor-default text-[#9A94A6] ${className ?? ''}`}
    >
      {label}
    </span>
  );
}

function ColumnItem({ item }: { item: FooterItem }) {
  if ('to' in item) {
    return (
      <Link to={item.to} className="cursor-pointer text-left hover:text-[#0B0C12]">
        {item.label}
      </Link>
    );
  }

  if ('section' in item) {
    return (
      <button
        type="button"
        onClick={() => scrollToSection(item.section)}
        className="cursor-pointer text-left hover:text-[#0B0C12]"
      >
        {item.label}
      </button>
    );
  }

  return <PendingItem label={item.label} />;
}

export default function Footer() {
  return (
    <footer id="footer" className="w-full border-t border-[#0B0C12]/8 bg-white">
      <div className="mx-auto w-full max-w-[1120px] px-5 pt-10 pb-8 xl:px-0 xl:pt-[52px] xl:pb-[34px]">
        <div className="flex flex-col items-start gap-5 pb-[30px] lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <Link to="/" className="flex items-center" aria-label="Qeploy 홈">
            <img src={qeployLogo} alt="Qeploy" width={147} height={40} className="h-10 w-auto" />
          </Link>

          <ul className="flex flex-wrap items-center gap-x-[14px] gap-y-2">
            {quickLinks.map((link, index) => (
              <li key={link.label} className="flex items-center gap-[12px]">
                <button
                  type="button"
                  onClick={() => scrollToSection(link.section)}
                  className="typo-b5-rg cursor-pointer text-[#5C576F] hover:text-[#0B0C12]"
                >
                  {link.label}
                </button>
                {index < quickLinks.length - 1 ? (
                  <span className="h-[10px] w-px bg-[#0B0C12]/12" />
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-x-7 gap-y-6 pb-7 md:grid-cols-4 md:gap-y-0">
          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-[11px]">
              <h3 className="typo-b5-sb text-[#0B0C12]">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={item.label} className="typo-b5-rg text-[#3D3A47]">
                    <ColumnItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/*
          사업자 정보 자리에 상호·대표자·고객센터·주소가 모두 지어낸 값으로 들어가
          있었다. 운영 중인 회사처럼 읽히는 값이라, 실제 값이 생기기 전까지는
          무엇이 아직 없는지를 말하는 쪽이 맞다.
        */}
        <div className="border-t border-[#0B0C12]/10 pt-7">
          <p className="typo-b5-rg text-[#6B6578]">
            Qeploy는 현재 데모 단계의 서비스입니다. 사업자 정보·고객센터·약관은 정식 출시에 맞춰
            공개될 예정이며, 지금 화면의 요금제와 이용 후기는 실제 데이터가 아닌 예시입니다.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <PendingItem label="이용약관" className="typo-b5-rg" />
            <PendingItem label="개인정보처리방침" className="typo-b5-rg" />
            <PendingItem label="쿠키 정책" className="typo-b5-rg" />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-4 border-t border-[#0B0C12]/10 pt-[21px] sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <p className="typo-b5-rg text-[#6B6578]">© Qeploy Demo. All rights reserved.</p>
          {/*
            아직 운영하는 채널이 없다. 아이콘은 남기되 버튼이 아니라 이미지로 두어
            누를 수 있는 것처럼 보이지 않게 한다.
          */}
          <div
            title="채널 준비 중입니다"
            aria-label="소셜 채널 준비 중"
            className="flex cursor-default items-center gap-[18px] opacity-40"
          >
            <img src={companyIcon} alt="" aria-hidden />
            <img src={youtubeIcon} alt="" aria-hidden />
            <img src={instagramIcon} alt="" aria-hidden />
          </div>
        </div>
      </div>
    </footer>
  );
}
