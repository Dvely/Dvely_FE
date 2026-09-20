import InfoCard from '@/components/common/InfoCard';

const infoCardClassName =
  'w-full p-4 gap-1.5 sm:p-5 shadow-[0_10px_40px_-8px_rgba(15,23,42,0.12)] xl:w-[330px] xl:h-[172px] xl:p-6 xl:gap-2.5';
const descriptionClassName = 'text-[12px] leading-[1.5] sm:text-[13px] xl:typo-b5-rg';

function ServiceIntro() {
  return (
    <section
      id="intro"
      className="w-full scroll-mt-4 bg-[linear-gradient(180deg,#FDFBFF_0%,#F3EEFF_100%)]"
    >
      <div className="flex flex-col gap-2 items-start justify-center px-5 py-12 md:px-10 md:py-14 xl:px-52 xl:py-16">
        <p className="text-[#7C3AED] text-[13px] font-extrabold tracking-wide md:text-lg md:tracking-normal">
          {' '}
          Qeploy란?
        </p>
        <p className="text-[#111827] typo-h2-bd">아이디어부터 출시까지, AI와 함께하는 웹 제작</p>
        <p className="text-[#64748B] text-[15px] font-medium md:text-lg">
          짧은 주기로 초안을 만들고 검수·배포까지 잇는 도구입니다. 팀 단위 워크스페이스와 에이전트{' '}
          <br className="hidden xl:inline" />
          대화를 기본으로 합니다.
        </p>
        <div className="grid w-full grid-cols-2 items-stretch gap-3 pt-5 sm:gap-4 xl:flex xl:items-center xl:justify-center">
          <InfoCard
            title={
              <div className="flex flex-col gap-2.5">
                <p className="text-[#7C3AED] text-[15px] font-extrabold md:text-lg">Launch</p>
                <p className="text-[#111827] text-[15px] font-extrabold md:text-lg">빠른 첫 화면</p>
              </div>
            }
            description="히어로·기능·후기·CTA까지 한 번에 구성해 바로 미리보기 합니다."
            descriptionClassName={descriptionClassName}
            className={infoCardClassName}
          />
          <InfoCard
            title={
              <div className="flex flex-col gap-2.5">
                <p className="text-[#7C3AED] text-[15px] font-extrabold md:text-lg">Online</p>
                <p className="text-[#111827] text-[15px] font-extrabold md:text-lg">
                  브라우저에서 끝까지
                </p>
              </div>
            }
            description="별도 툴 설치 없이 생성·수정·검수를 같은 탭에서 처리합니다."
            descriptionClassName={descriptionClassName}
            className={infoCardClassName}
          />
          <InfoCard
            title={
              <div className="flex flex-col gap-2.5">
                <p className="text-[#7C3AED] text-[15px] font-extrabold md:text-lg">Flow</p>
                <p className="text-[#111827] text-[15px] font-extrabold md:text-lg">
                  가져오기 {'->'} 빌드
                </p>
              </div>
            }
            description="ZIP 업로드와 GitHub 연결 UI로 기존 소스도 워크스페이스로 끌어올 수 있습니다."
            descriptionClassName={descriptionClassName}
            className={infoCardClassName}
          />
          <InfoCard
            title={
              <div className="flex flex-col gap-2.5">
                <p className="text-[#7C3AED] text-[15px] font-extrabold md:text-lg">Portfolio</p>
                <p className="text-[#111827] text-[15px] font-extrabold md:text-lg">
                  보여줄 결과물
                </p>
              </div>
            }
            description="프로젝트 카드·라이브 URL·배포 상태를 한눈에 정리합니다."
            descriptionClassName={descriptionClassName}
            className={infoCardClassName}
          />
        </div>
        <InfoCard
          title={
            <p className="text-[13px] leading-relaxed font-medium text-[#475569] md:text-[15px] xl:text-lg xl:leading-7">
              <span className="font-semibold">워크플로 예시:</span> 새 프로젝트 생성 {'-> '}
              템플릿(랜딩·포트폴리오 등) 선택 {'-> '}
              세부 테마 지정 {'-> '}
              에이전트에서 문구·섹션 조정 {'-> '}
              미리보기 확정 {'-> '}
              (연동 시) 저장소 푸시 후 파이프라인 {'-> '}
              라이브 URL 연결. 데모 앱에서는 일부 단계가 알림으로 안내됩니다.
            </p>
          }
          className="bg-[#F8FAFC]"
        />
      </div>
    </section>
  );
}

export default ServiceIntro;
