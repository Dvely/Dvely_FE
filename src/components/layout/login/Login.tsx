import { Button } from '@/components/ui/button'


function LoginPage() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-6xl gap-8 px-6 py-14 text-left">
      <header className="grid gap-4">
        <p className="w-fit rounded-full border border-slate-300 px-3 py-1 text-xs font-bold tracking-[0.08em] text-slate-700">
          DVELY
        </p>
        <h1 className="text-3xl font-bold text-slate-900">AI 웹서비스 수정·배포 에이전트</h1>
        <p className="max-w-3xl text-slate-600">
          자연어 요청만으로 웹서비스를 만들고 수정하고 배포까지 이어지는 경험을
          제공합니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" size="lg" onClick={void 0}>
            GitHub로 로그인
          </Button>
        </div>

        <p className="mt-3 text-sm text-slate-600">
          현재는 콜백 파라미터 수신 단계입니다. 사용자 프로필은 서버에서 access
          token 교환 후 가져옵니다.
        </p>
      </header>
    </main>
  )
}

export default LoginPage
