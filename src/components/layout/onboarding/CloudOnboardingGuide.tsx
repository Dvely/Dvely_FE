/**
 * 자기 AWS 계정을 처음 연결하는 사용자를 위한 안내.
 *
 * 순수 정적 콘텐츠다 — API 를 부르지 않는다. 백엔드가 준 확정 카피를 이 저장소의
 * 색·타이포로 옮겼다.
 *
 * 비용 숫자와 보안 문구는 백엔드가 C2 구현 코드로 하나씩 검증한 값이다(SSH 키 미생성 ·
 * SSM SecureString 암호화 · t3.micro 기준 비용 · EIP 미할당이라 terminate 로 청구 정지).
 * 사용자가 이 안내를 읽고 자기 카드로 AWS 계정을 만드므로, 구현이 바뀌면 여기도 함께
 * 고쳐야 한다.
 */

const COST_ROWS = [
  { label: '서버(EC2)', sub: '가장 작은 기본형 · 24시간 가동', amount: '월 ~$8–19' },
  { label: '공인 IP 주소', sub: '인터넷에서 접속되게', amount: '월 ~$3.6' },
  { label: '저장소·비밀보관', sub: '빌드 결과물·환경변수', amount: '거의 $0' },
];

const STEPS = [
  {
    num: '1',
    title: 'AWS 계정 만들기',
    body: 'AWS는 아마존이 운영하는 클라우드 서비스입니다. aws.amazon.com에서 "계정 만들기"로 가입합니다. 준비물은 이메일, 신용/체크카드(본인 확인용), 휴대폰입니다.',
    points: [
      '이메일과 비밀번호로 가입 → 카드 등록 → 문자로 전화 인증',
      '지원 플랜은 무료(Basic)를 고르면 됩니다',
      '가입만으로는 요금이 나오지 않습니다 — 서버를 켤 때부터입니다',
    ],
    tags: ['약 15분', '카드 필요', '한 번만'],
  },
  {
    num: '2',
    title: 'Qeploy에 계정 연결하기',
    body: '설정 → 클라우드 연결에서 AWS 액세스 키를 입력하면 연결이 끝납니다. AWS 콘솔에서 키를 발급받아 Access Key ID와 Secret Access Key 두 값을 붙여넣으면 됩니다.',
    points: [
      '입력하면 Qeploy가 자격을 확인합니다 — 상태가 "연결됨"이 되면 준비 완료입니다',
      '서버에 부여되는 권한은 Qeploy가 최소한으로만, 자동으로 준비합니다',
    ],
    tags: ['약 5분', '한 번만'],
  },
  {
    num: '3',
    title: '배포 요청하고 승인하기',
    body: '이제 준비 끝. 채팅으로 "백엔드 서버로 띄워줘"라고 요청하면, Qeploy가 예상 비용과 함께 확인을 요청합니다. 승인을 누르면 몇 분 뒤 접속 주소가 나옵니다.',
    points: [
      '승인하기 전에는 아무것도 만들어지지 않습니다 — 비용도 발생하지 않습니다',
      '더 이상 필요 없으면 서버 종료로 언제든 멈추고 청구를 끊을 수 있습니다 — 되돌릴 수 없고 서버 안 데이터는 사라지지만, 데이터베이스는 별개라 남습니다',
    ],
    tags: ['몇 분', '매번 승인'],
  },
];

const SAFETY_POINTS = [
  'Qeploy가 띄운 서버는 그 프로젝트에 필요한 자원만 읽도록 최소 권한으로 만들어집니다. 연결에 쓰는 액세스 키는 당신이 정하는 것이므로, 필요한 만큼만 권한을 준 키를 쓰시길 권합니다.',
  '데이터베이스 비밀번호 같은 비밀값은 암호화되어 보관되고, 화면·기록 어디에도 그대로 드러나지 않습니다.',
  '서버에 접속하는 열쇠(SSH)는 아예 만들지 않습니다 — 그만큼 위험도 사라집니다.',
  '언제든 연결을 해제하거나 서버를 종료할 수 있고, 그 순간 우리 접근도 함께 끝납니다.',
];

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#4c1d95]">
      {children}
    </p>
  );
}

function CloudOnboardingGuide() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#f8fafc]">
      <div className="mx-auto w-full max-w-[720px] px-6 py-10">
        <header>
          <Eyebrow>Qeploy 시작하기</Eyebrow>
          <h1 className="mt-3 text-[32px] font-bold leading-[1.15] tracking-tight text-[#0f172a]">
            내 클라우드에 백엔드를 올리기 위한 딱 한 번의 준비
          </h1>
          <p className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-[#64748b]">
            Qeploy가 당신의 백엔드 서버를 직접 띄우려면, 당신 소유의 AWS 계정 한 개가
            필요합니다. AWS를 처음 써봐도 괜찮습니다 — 순서대로만 따라오면 됩니다.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f5f3ff] px-3.5 py-1.5 text-[13px] font-medium text-[#4c1d95]">
            <span className="size-2 rounded-full bg-[#16a34a]" aria-hidden />
            IAM·서버 설정을 직접 만질 일은 없습니다
          </p>
        </header>

        <section className="mt-10">
          <Eyebrow>먼저, 왜 필요한가요</Eyebrow>
          <h2 className="mt-2 text-[22px] font-bold tracking-tight text-[#0f172a]">
            서버는 &lsquo;당신 것&rsquo;으로 뜹니다
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#64748b]">
            Qeploy는 당신의 서버를 우리 소유가 아니라{' '}
            <strong className="font-semibold text-[#0f172a]">당신 소유의 AWS 계정</strong>에
            띄웁니다. 그래야 서버·데이터·비용이 온전히 당신의 통제 아래 있고, 나중에 Qeploy를
            떠나더라도 당신 것이 그대로 남습니다.
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#64748b]">
            그 대신 딱 한 번,{' '}
            <strong className="font-semibold text-[#0f172a]">당신의 AWS 계정을 Qeploy에 연결</strong>
            해 주면 됩니다. 그다음부터는 &ldquo;백엔드 올려줘&rdquo;라고 요청하면 Qeploy가 알아서
            빌드하고 서버를 띄웁니다.
          </p>
        </section>

        <div className="mt-8 rounded-2xl border border-[#fcd34d] bg-[#fffbeb] p-5">
          <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#b45309]">
            💳 비용 — 정직하게
          </p>
          <h3 className="mt-1 text-[18px] font-bold tracking-tight text-[#0f172a]">
            매달 커피 몇 잔 값, 그리고 끄면 멈춥니다
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-[#0f172a]">
            서버가 켜져 있는 동안만 AWS가 당신에게 청구합니다. 코드를{' '}
            <strong className="font-semibold">빌드하는 무거운 작업은 Qeploy가 대신</strong>{' '}
            처리하므로 당신 계정엔 안 찍힙니다.
          </p>

          <dl className="mt-4 border-t border-[#fcd34d]">
            {COST_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-[#fde68a] py-2.5"
              >
                <dt className="text-[13px] font-medium text-[#0f172a]">
                  {row.label}
                  <span className="block text-[12px] font-normal text-[#92400e]">{row.sub}</span>
                </dt>
                <dd className="whitespace-nowrap text-[13px] font-semibold tabular-nums text-[#0f172a]">
                  {row.amount}
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 pt-3">
              <dt className="text-[15px] font-bold text-[#0f172a]">대략</dt>
              <dd className="whitespace-nowrap text-[16px] font-bold tabular-nums text-[#b45309]">
                월 $12–23
              </dd>
            </div>
          </dl>

          <p className="mt-4 text-[13px] leading-relaxed text-[#0f172a]">
            첫 12개월은 AWS 프리티어로 더 저렴할 수 있고,{' '}
            <strong className="font-semibold">
              서버를 종료하면 그 순간부터 청구가 멈춥니다.
            </strong>{' '}
            만들기 전에 Qeploy가 예상 비용을 보여주고, 당신이 승인해야만 진행합니다.
          </p>
        </div>

        <section className="mt-10">
          <Eyebrow>순서대로</Eyebrow>
          <h2 className="mt-2 text-[22px] font-bold tracking-tight text-[#0f172a]">
            세 단계면 끝납니다
          </h2>

          <ol className="mt-5 flex flex-col gap-4">
            {STEPS.map((step) => (
              <li
                key={step.num}
                className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f5f3ff] text-[18px] font-bold tabular-nums text-[#7c3aed]">
                    {step.num}
                  </span>
                  <h3 className="text-[16px] font-bold text-[#0f172a]">{step.title}</h3>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-[#64748b]">{step.body}</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-5 text-[13px] leading-relaxed text-[#64748b] before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-[2px] before:bg-[#c4b5fd]"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {step.tags.map((tag, index) => (
                    <span
                      key={tag}
                      className={`rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-0.5 text-[12px] font-semibold ${
                        index === 0 ? 'text-[#4c1d95]' : 'text-[#64748b]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-8 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-5">
          <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#15803d]">
            🔒 안심하세요 — 우리가 못 하는 것
          </p>
          <h3 className="mt-1 text-[18px] font-bold tracking-tight text-[#0f172a]">
            연결해도 당신 계정은 당신 것
          </h3>
          <ul className="mt-3 flex flex-col gap-2">
            {SAFETY_POINTS.map((point) => (
              <li
                key={point}
                className="relative pl-6 text-[14px] leading-relaxed text-[#0f172a] before:absolute before:left-0 before:font-bold before:text-[#15803d] before:content-['✓']"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <footer className="mt-10 border-t border-[#e2e8f0] pt-8 pb-4">
          <Eyebrow>막히면</Eyebrow>
          <h2 className="mt-2 text-[22px] font-bold tracking-tight text-[#0f172a]">
            한 곳에서 멈춰도 괜찮습니다
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#64748b]">
            어느 단계든 화면 안내를 그대로 따르면 됩니다. 계정을 만드는 1단계가 가장 낯설 수
            있는데, 그건 당신 명의의 계정이라 우리가 대신 만들어 드릴 수는 없는 부분입니다 — 대신
            준비물(이메일·카드·휴대폰)만 있으면 화면을 따라 충분히 하실 수 있습니다.
          </p>
          <p className="mt-5 text-[13px] leading-relaxed text-[#94a3b8]">
            이 안내는 백엔드(서버형) 배포를 위한 것입니다. 정적 사이트만 올릴 때는 AWS 연결
            없이도 배포됩니다.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default CloudOnboardingGuide;
