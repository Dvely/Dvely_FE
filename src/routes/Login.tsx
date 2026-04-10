import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

type AuthPayload = {
  code?: string
  state?: string
  error?: string
}

function LoginPage() {
  const isHandledRef = useRef(false)
  const [authMessage, setAuthMessage] = useState<string>('')
  const [authPayload, setAuthPayload] = useState<AuthPayload | null>(null)
  const [queryParams, setQueryParams] = useState<Array<[string, string]>>([])

  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID as string | undefined
  const redirectUri =
    (import.meta.env.VITE_GITHUB_REDIRECT_URI as string | undefined) ||
    `${window.location.origin}/callback`
  const scope =
    (import.meta.env.VITE_GITHUB_SCOPE as string | undefined) ||
    'read:user user:email'
  const githubAuthorizeUrl = useMemo(() => {
    if (!clientId) return ''
    return new URL('https://github.com/login/oauth/authorize')
  }, [clientId])

  const maskValue = (value?: string) => {
    if (!value) return '-'
    if (value.length <= 10) return `${value.slice(0, 3)}...`
    return `${value.slice(0, 6)}...${value.slice(-4)}`
  }

  useEffect(() => {
    if (isHandledRef.current) return
    isHandledRef.current = true

    const params = new URLSearchParams(window.location.search)
    const entries = Array.from(params.entries())
    if (entries.length > 0) {
      setQueryParams(entries)
    } else {
      const cached = sessionStorage.getItem('github_last_query_params')
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as Array<[string, string]>
          setQueryParams(parsed)
        } catch {
          setQueryParams([])
        }
      }
    }

    const code = params.get('code')
    const state = params.get('state')
    const error = params.get('error')
    setAuthPayload({
      code: code || undefined,
      state: state || undefined,
      error: error || undefined,
    })

    if (error) {
      setAuthMessage('GitHub 로그인에 실패했어요. 다시 시도해주세요.')
      return
    }

    if (!code) return

    const savedState = sessionStorage.getItem('github_oauth_state')
    if (!state || savedState !== state) {
      setAuthMessage('보안 검증(state)에 실패했습니다. 다시 로그인해주세요.')
      return
    }

    setAuthMessage('GitHub 인증 코드 수신 완료.')
    sessionStorage.setItem('github_last_query_params', JSON.stringify(entries))
    window.history.replaceState({}, document.title, window.location.pathname)
  }, [])

  const handleGithubLogin = () => {
    if (!githubAuthorizeUrl || !clientId) {
      setAuthMessage(
        'VITE_GITHUB_CLIENT_ID가 없어 로그인 버튼을 실행할 수 없어요. .env 설정을 확인해주세요.',
      )
      return
    }

    const state = crypto.randomUUID()
    sessionStorage.setItem('github_oauth_state', state)

    githubAuthorizeUrl.searchParams.set('client_id', clientId)
    githubAuthorizeUrl.searchParams.set('redirect_uri', redirectUri)
    githubAuthorizeUrl.searchParams.set('response_type', 'code')
    githubAuthorizeUrl.searchParams.set('scope', scope)
    githubAuthorizeUrl.searchParams.set('state', state)
    window.location.href = githubAuthorizeUrl.toString()
  }

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
          <Button type="button" size="lg" onClick={handleGithubLogin}>
            GitHub로 로그인
          </Button>
          <Button type="button" variant="outline" size="lg">
            데모 보기
          </Button>
        </div>
        <p className="text-sm text-slate-600">
          {clientId
            ? 'GitHub OAuth 연동 준비 완료'
            : '환경변수 VITE_GITHUB_CLIENT_ID를 설정하면 로그인 버튼이 활성 동작합니다.'}
        </p>
        {authMessage && (
          <p className="border-l-2 border-slate-400 pl-3 text-sm font-medium text-slate-800">
            {authMessage}
          </p>
        )}

        {queryParams.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-800">URL 파라미터</p>
            <table className="w-full border-collapse text-sm">
              <tbody>
                {queryParams.map(([key, value]) => (
                  <tr key={`${key}-${value}`} className="border-b border-dashed border-slate-300">
                    <th className="w-24 py-1 text-left font-semibold text-slate-700">{key}</th>
                    <td className="py-1 font-mono text-slate-700">{maskValue(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {authPayload && (authPayload.code || authPayload.error) && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-800">수신된 인증 정보</p>
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="border-b border-dashed border-slate-300">
                  <th className="w-24 py-1 text-left font-semibold text-slate-700">code</th>
                  <td className="py-1 font-mono text-slate-700">{maskValue(authPayload.code)}</td>
                </tr>
                <tr className="border-b border-dashed border-slate-300">
                  <th className="w-24 py-1 text-left font-semibold text-slate-700">state</th>
                  <td className="py-1 font-mono text-slate-700">{maskValue(authPayload.state)}</td>
                </tr>
                <tr>
                  <th className="w-24 py-1 text-left font-semibold text-slate-700">error</th>
                  <td className="py-1 font-mono text-slate-700">{authPayload.error ?? '-'}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-sm text-slate-600">
              현재는 콜백 파라미터 수신 단계입니다. 사용자 프로필은 서버에서 access
              token 교환 후 가져옵니다.
            </p>
          </div>
        )}
      </header>
    </main>
  )
}

export default LoginPage
