import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

type AuthPayload = {
  code?: string
  state?: string
  error?: string
}

function App() {
  const isHandledRef = useRef(false)
  const [authMessage, setAuthMessage] = useState<string>('')
  const [authPayload, setAuthPayload] = useState<AuthPayload | null>(null)
  const [queryParams, setQueryParams] = useState<Array<[string, string]>>([])

  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID as string | undefined
  const redirectUri =
    (import.meta.env.VITE_GITHUB_REDIRECT_URI as string | undefined) ||
    `${window.location.origin}/`
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

    setAuthMessage(
      'GitHub 인증 코드 수신 완료.',
    )
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
    <main className="home">
      <header className="home-header">
        <p className="eyebrow">DVELY</p>
        <h1>AI 웹서비스 수정·배포 에이전트</h1>
        <p className="description">
          자연어 요청만으로 웹서비스를 만들고 수정하고 배포까지 이어지는 경험을
          제공합니다.
        </p>
        <div className="actions">
          <button type="button" className="btn primary" onClick={handleGithubLogin}>
            GitHub로 로그인
          </button>
          <button type="button" className="btn ghost">
            데모 보기
          </button>
        </div>
        <p className="auth-note">
          {clientId
            ? 'GitHub OAuth 연동 준비 완료'
            : '환경변수 VITE_GITHUB_CLIENT_ID를 설정하면 로그인 버튼이 활성 동작합니다.'}
        </p>
        {authMessage && <p className="auth-result">{authMessage}</p>}
        {queryParams.length > 0 && (
          <div className="auth-payload">
            <p className="auth-payload-title">URL 파라미터</p>
            <table className="auth-table">
              <tbody>
                {queryParams.map(([key, value]) => (
                  <tr key={`${key}-${value}`}>
                    <th scope="row">{key}</th>
                    <td>{maskValue(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {authPayload && (authPayload.code || authPayload.error) && (
          <div className="auth-payload">
            <p className="auth-payload-title">수신된 인증 정보</p>
            <table className="auth-table">
              <tbody>
                <tr>
                  <th scope="row">code</th>
                  <td>{maskValue(authPayload.code)}</td>
                </tr>
                <tr>
                  <th scope="row">state</th>
                  <td>{maskValue(authPayload.state)}</td>
                </tr>
                <tr>
                  <th scope="row">error</th>
                  <td>{authPayload.error ?? '-'}</td>
                </tr>
              </tbody>
            </table>
            <p className="auth-payload-desc">
              현재는 콜백 파라미터 수신 단계입니다. 사용자 프로필은 서버에서 access
              token 교환 후 가져옵니다.
            </p>
          </div>
        )}
      </header>

      <section className="feature-grid" aria-label="핵심 기능">
        <article className="feature-card">
          <h2>프로젝트 생성</h2>
          <p>새 프로젝트, ZIP 업로드, GitHub 저장소 불러오기를 지원합니다.</p>
        </article>
        <article className="feature-card">
          <h2>AI 수정</h2>
          <p>자연어로 UI/기능/오류 수정을 요청하고 즉시 미리보기를 확인합니다.</p>
        </article>
        <article className="feature-card">
          <h2>승인 기반 배포</h2>
          <p>변경사항, 배포, 도메인 연결을 안전한 승인 흐름으로 제어합니다.</p>
        </article>
      </section>
    </main>
  )
}

export default App
