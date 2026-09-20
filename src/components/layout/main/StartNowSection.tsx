import { Button } from '@/components/ui/button';

function StartNowSection() {
  return (
    <section className="relative py-12 px-5 w-full overflow-hidden bg-[linear-gradient(90deg,#9360E369_41%,#F8FAFC_70%,#FFFFFF_100%)] flex justify-center xl:overflow-visible xl:px-0">
      <div
        className="flex flex-col gap-4 rounded-3xl bg-white py-5 px-5 w-full max-w-[1024px] md:flex-row md:items-center md:justify-between md:py-3.5 md:px-8"
        style={{ boxShadow: '0 20px 50px 0 rgba(124, 58, 237, 0.10)' }}
      >
        <div className="flex flex-col justify-between">
          <p className="typo-h4-bd">지금 바로 워크스페이스에 들어가 보세요</p>
          <p className="typo-b2-md text-[#64748B]">
            데모에서는 대시보드·프로젝트 목록·에이전트 화면까지 연결해
            <br className="hidden xl:inline" />
            두었습니다. 로그인 없이 해시만으로 이동해 볼 수 있어요.
          </p>
        </div>
        <Button className="rounded-xl shrink-0 w-full md:w-auto">
          <p className="typo-b1-eb">무료로 시작하기</p>
        </Button>
      </div>
    </section>
  );
}

export default StartNowSection;
