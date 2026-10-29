/**
 * 자기 AWS 계정을 처음 연결하는 사용자를 위한 안내.
 *
 * 글은 정적이지만 **권한 정책만은 서버에서 받아 온다.** 그 하나가 낡으면 사용자가
 * 모자란 권한을 자기 계정에 등록하고, 그 사실을 한참 뒤 배포가 막힐 때 알게 된다.
 *
 * 비용 숫자와 보안 문구는 백엔드가 C2 구현 코드로 하나씩 검증한 값이다(SSH 키 미생성 ·
 * SSM SecureString 암호화 · t3.micro 기준 비용 · EIP 미할당이라 terminate 로 청구 정지).
 * 사용자가 이 안내를 읽고 자기 카드로 AWS 계정을 만드므로, 구현이 바뀌면 여기도 함께
 * 고쳐야 한다.
 */

import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useCloudRequirementsQuery } from '@/api/cloudConnections';
import SetupReturnBar from '@/components/common/SetupReturnBar';
import { stringifyPolicy } from '@/lib/cloudPolicyModules';
import { extractApiErrorMessage } from '@/utils/response';

/*
  서버가 실제로 띄우는 것은 **t3.micro** 다(BE ServerProvisioningCommandService 기본값).
  서울 리전 온디맨드 $0.013/시간 × 730 = 월 ~$9.5 이고, 여기에 EBS 8GB 가 붙는다.

  전에는 서버가 `월 ~$8–19`, 합계가 `월 $12–23` 이었다. 상한이 t3.small 수준이라
  기본값으로는 나올 수 없는 숫자였다 — 사용자가 이 화면을 보고 자기 카드로 결제하므로,
  실제보다 크게 적어 겁주는 것도 작게 적어 속이는 것만큼 나쁘다.

  **고칠 때는 합계도 같이 본다.** 지난번에 줄 숫자만 고치고 합계를 두면 둘이 어긋난다.
*/
const COST_ROWS = [
  { label: '서버(EC2)', sub: '가장 작은 기본형 · 24시간 가동', amount: '월 ~$9–11' },
  { label: '공인 IP 주소', sub: '인터넷에서 접속되게', amount: '월 ~$3.6' },
  { label: '저장소·비밀보관', sub: '빌드 결과물·환경변수', amount: '거의 $0' },
];

/** COST_ROWS 를 더한 값. 줄 숫자를 고치면 여기도 같이 고친다 */
const COST_TOTAL = '월 ~$13–15';

/*
  **정책을 여기에 적지 않는다.**

  예전에는 이 자리에 IAM 정책 전문이 문자열로 박혀 있었다. "구현이 바뀌면 여기도 함께
  고쳐야 한다" 고 적어 두었지만 그 일은 일어나지 않았고, 2026-10-26 에 대조해 보니
  서버가 쓰는 Action 48개 중 **17개가 이 화면에 없었다** — CloudFront·ACM 전부,
  ssm:SendCommand, s3:PutBucketPolicy·DeleteBucket 같은 것들이다.

  그래서 사용자는 "연결됨" 을 보고도 정적 사이트 배포에서 403 을 만나고, 자원을 지우려
  할 때 실패해 AWS 에 과금 자원이 남았다. 검증 단계에서 안 걸린 이유는 서버의 연결
  검증이 sts:GetCallerIdentity 하나인데 그건 IAM 권한이 필요 없는 호출이기 때문이다.

  정책이 왜 그렇게 생겼는지(역할을 경로가 아니라 이름 접두사로 좁히는 이유, 공개 AMI
  파라미터 ARN, RDS 서비스 연결 역할 등)는 BE 의 aws/qeploy-aws-deploy-policy.json 과
  docs/aws-byoc-permissions.md 에 있다. 그 지식은 정책과 같은 곳에 있어야 한다.
*/

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
    title: '전용 사용자와 키 만들기',
    body: 'AWS 콘솔의 IAM에서 Qeploy 전용 사용자를 하나 만들고, 아래 권한을 붙인 뒤 액세스 키를 발급받습니다. 계정의 주 로그인 정보를 쓰지 않고 이 키만 넘기기 때문에, 언제든 이 키만 지우면 접근이 끊깁니다.',
    points: [
      'IAM → 사용자 → 사용자 생성 → 정책을 직접 연결 → JSON으로 아래 내용을 붙여넣기',
      '만든 사용자에서 "액세스 키 만들기" → 용도는 "AWS 외부에서 실행되는 애플리케이션"을 고릅니다',
      'Secret Access Key는 그 화면을 벗어나면 다시 볼 수 없습니다 — 그 자리에서 복사하세요',
    ],
    tags: ['약 10분', '한 번만', 'IAM 사용'],
    showPolicy: true,
  },
  {
    num: '3',
    title: 'Qeploy에 계정 연결하기',
    body: '설정 → 클라우드 연결에서 방금 만든 값을 입력하면 연결이 끝납니다.',
    points: [
      '표시 이름, 리전, Access Key ID, Secret Access Key를 넣습니다',
      'AWS 계정 ID(12자리)도 함께 넣어야 합니다 — 빌드 결과물을 담을 저장소 이름에 쓰입니다. 콘솔 오른쪽 위 계정 메뉴에서 확인할 수 있습니다',
      '입력하면 Qeploy가 자격을 확인합니다 — 상태가 "연결됨"이 되면 준비 완료입니다',
    ],
    tags: ['약 5분', '한 번만'],
    linksToSettings: true,
  },
  {
    num: '4',
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
  '위 2단계 권한이 Qeploy가 요구하는 전부입니다 — 관리자 권한은 필요 없습니다. 서버를 만들고 끄는 일, 그리고 이름이 qeploy로 시작하는 자원만 다룰 수 있습니다. 당신 계정의 다른 자원에는 닿지 않습니다.',
  '데이터베이스 비밀번호 같은 비밀값은 암호화되어 보관되고, 화면·기록 어디에도 그대로 드러나지 않습니다.',
  '서버에 접속하는 열쇠(SSH)는 아예 만들지 않습니다 — 그만큼 위험도 사라집니다.',
  '언제든 연결을 해제하거나 서버를 종료할 수 있고, 그 순간 우리 접근도 함께 끝납니다.',
];

/**
 * 정책 JSON 을 통째로 보여주고 복사시킨다.
 *
 * 손으로 옮겨 적게 하면 반드시 틀린다 — 그리고 IAM 정책은 한 글자만 틀려도 배포가
 * `IAM_PERMISSION` 으로 막히는데, 사용자는 그게 오타 때문인지 알 방법이 없다.
 */
function PolicyBlock() {
  const [isCopied, setIsCopied] = useState(false);
  const { data, isLoading, error } = useCloudRequirementsQuery(
    'cloud-onboarding',
    'AWS',
    null,
    true,
  );
  const policy = stringifyPolicy(data?.recommendedPolicy);

  /*
    "RDS 까지 포함했다" 는 안내는 **정책을 보고 말한다.** 예전에는 문장으로 적혀 있었는데,
    정책이 서버에서 오는 지금 그렇게 두면 서버가 RDS 를 빼는 날 화면만 거짓말을 한다.
  */
  const includesRds = policy.includes('rds:');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(policy);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // 클립보드를 막아둔 브라우저도 있다. 그때는 아래 본문을 직접 긁어 가면 된다
      setIsCopied(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-3 h-40 animate-pulse rounded-xl border border-[#e2e8f0] bg-[#f8fafc]" />
    );
  }

  /*
    못 받으면 **아무 정책도 보여주지 않는다.** 이 화면이 하는 일이 정책을 건네주는
    것이라서 비워 두는 게 뼈아프지만, 낡은 값을 들고 있다가 건네주는 것이 바로 지금
    고치고 있는 사고다. 틀린 정책을 주느니 못 준다고 말하는 쪽이 낫다.
  */
  if (error || !policy) {
    return (
      <p className="mt-3 rounded-xl bg-[#fef2f2] px-4 py-3 text-[12px] leading-relaxed text-[#b91c1c]">
        {extractApiErrorMessage(error) ?? '권한 정책을 불러오지 못했습니다.'} 잠시 뒤 새로고침해
        주세요. 정책은 서버가 주는 값이라, 예전에 받아 둔 것을 쓰면 권한이 모자랄 수 있습니다.
      </p>
    );
  }

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-[#e2e8f0]">
      <div className="flex items-center justify-between gap-2 border-b border-[#e2e8f0] bg-[#f8fafc] px-3 py-2">
        <p className="text-[12px] font-semibold text-[#334155]">
          붙여넣을 권한(JSON){data?.policyName ? ` · ${data.policyName}` : ''}
        </p>
        <button
          type="button"
          onClick={() => void handleCopy()}
          className="h-7 cursor-pointer rounded-lg border border-[#e2e8f0] bg-white px-2.5 text-[12px] font-semibold text-[#334155] hover:bg-[#f1f5f9]"
        >
          {isCopied ? '복사했습니다' : '복사'}
        </button>
      </div>
      <pre className="max-h-72 overflow-auto bg-white px-3 py-2.5 font-mono text-[11px] leading-relaxed text-[#334155]">
        {policy}
      </pre>
      {includesRds ? (
        <p className="border-t border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-[12px] leading-relaxed text-[#64748b]">
          데이터베이스(RDS)까지 미리 포함했습니다. 지금 안 쓰더라도 나중에 쓰게 되면 키를 다시
          만들어야 하는데, 한 번에 넣어두면 그 일이 없습니다.
        </p>
      ) : null}
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#4c1d95]">
      {children}
    </p>
  );
}

type CloudOnboardingGuideProps = {
  /** 프로젝트에서 왔을 때 돌아갈 자리. toSafeReturnPath 를 거친 값만 온다 */
  returnTo?: string | null;
};

function CloudOnboardingGuide({ returnTo }: CloudOnboardingGuideProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#f8fafc]">
      <div className="mx-auto w-full max-w-[720px] px-5 py-8 sm:px-6 sm:py-10">
        {returnTo ? (
          <SetupReturnBar
            returnTo={returnTo}
            message="연결을 등록하면 하던 곳으로 자동으로 돌아갑니다. 지금 돌아가도 됩니다."
          />
        ) : null}
        <header>
          <Eyebrow>Qeploy 시작하기</Eyebrow>
          <h1 className="mt-3 text-[26px] font-bold leading-[1.15] tracking-tight text-[#0f172a] sm:text-[32px]">
            내 클라우드에 백엔드를 올리기 위한 딱 한 번의 준비
          </h1>
          <p className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-[#64748b]">
            Qeploy가 당신의 백엔드 서버를 직접 띄우려면, 당신 소유의 AWS 계정 한 개가 필요합니다.
            AWS를 처음 써봐도 괜찮습니다 — 순서대로만 따라오면 됩니다.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f5f3ff] px-3.5 py-1.5 text-[13px] font-medium text-[#4c1d95]">
            <span className="size-2 rounded-full bg-[#16a34a]" aria-hidden />
            IAM·서버 설정을 직접 만질 일은 없습니다
          </p>
        </header>

        <section className="mt-10">
          <Eyebrow>먼저, 왜 필요한가요</Eyebrow>
          <h2 className="mt-2 text-[19px] font-bold tracking-tight text-[#0f172a] sm:text-[22px]">
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
            <strong className="font-semibold text-[#0f172a]">
              당신의 AWS 계정을 Qeploy에 연결
            </strong>
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
                {COST_TOTAL}
              </dd>
            </div>
          </dl>

          {/*
            프리티어 안내는 **지금 계정을 만드는 사람** 기준이다.

            전에는 "첫 12개월은 AWS 프리티어로 더 저렴할 수 있고" 였는데, AWS 가
            2025-07-15 부터 신규 계정의 12개월 프리티어를 없애고 크레딧 방식으로
            바꿨다($100 가입 + 사용에 따라 최대 $100, 6개월 또는 크레딧 소진 중 먼저
            오는 쪽까지). 그 전에 만든 계정은 기존 12개월 혜택이 그대로여서, 문장을
            "새로 만들면" 으로 한정해 둘 다 틀리지 않게 했다.

            이 안내를 읽는 사람은 바로 다음 단계에서 계정을 만든다. "첫 해는 거의
            공짜" 로 읽고 넘어가면 넉 달 뒤 청구서에서 알게 된다.

            2026-10-26 확인. 숫자(6개월·$200)가 박혀 있으니, 프리티어가 또 바뀌었다는
            말을 들으면 여기부터 본다.
          */}
          <p className="mt-4 text-[13px] leading-relaxed text-[#0f172a]">
            AWS 계정을 새로 만들면 가입 크레딧(최대 $200)으로 시작해 한동안은 청구가 없을 수
            있습니다. 크레딧을 다 쓰거나 6개월이 지나면 위 금액이 청구됩니다.{' '}
            <strong className="font-semibold">서버를 종료하면 그 순간부터 청구가 멈춥니다.</strong>{' '}
            만들기 전에 Qeploy가 예상 비용을 보여주고, 당신이 승인해야만 진행합니다.
          </p>
        </div>

        <section className="mt-10">
          <Eyebrow>순서대로</Eyebrow>
          <h2 className="mt-2 text-[22px] font-bold tracking-tight text-[#0f172a]">
            네 단계면 끝납니다
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
                {'showPolicy' in step && step.showPolicy ? <PolicyBlock /> : null}
                {/*
                  "설정 → 클라우드 연결" 이라고 글로만 적혀 있었다. 이 화면까지 온 사람은
                  바로 다음 할 일이 그것인데, 설정을 다시 찾아가야 했다. 프로젝트에서 왔다면
                  돌아갈 자리도 함께 넘긴다 — 등록을 마치면 그 프로젝트로 돌아간다.
                */}
                {'linksToSettings' in step && step.linksToSettings ? (
                  <Link
                    to="/settings"
                    search={{ section: 'cloud-browser', returnTo: returnTo ?? undefined }}
                    className="mt-3 inline-flex h-9 items-center rounded-lg bg-[#0f172a] px-4 text-[13px] font-semibold text-white"
                  >
                    클라우드 연결 등록하러 가기
                  </Link>
                ) : null}
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
            어느 단계든 화면 안내를 그대로 따르면 됩니다. 계정을 만드는 1단계가 가장 낯설 수 있는데,
            그건 당신 명의의 계정이라 우리가 대신 만들어 드릴 수는 없는 부분입니다 — 대신
            준비물(이메일·카드·휴대폰)만 있으면 화면을 따라 충분히 하실 수 있습니다.
          </p>
          <p className="mt-5 text-[13px] leading-relaxed text-[#94a3b8]">
            이 안내는 백엔드(서버형) 배포를 위한 것입니다. 정적 사이트만 올릴 때는 AWS 연결 없이도
            배포됩니다.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default CloudOnboardingGuide;
