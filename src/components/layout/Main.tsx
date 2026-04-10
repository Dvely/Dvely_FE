import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

function MainPage() {
  const navigate = useNavigate()

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 py-16">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold tracking-[0.12em] text-slate-500">DVELY</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">메인 페이지</h1>
        <p className="mt-3 text-sm text-slate-600">
          로그인은 아래 버튼으로 이동해서 진행할 수 있습니다.
        </p>
        <Button
          onClick={() => {
            navigate({ to: '/auth/login' })
          }}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          로그인 페이지로 이동
        </Button>
      </div>
    </main>
  )
}

export default MainPage
