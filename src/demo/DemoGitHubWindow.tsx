/**
 * 시연에서 띄우는 GitHub 팝업의 재현 화면.
 *
 * 실제 화면을 베끼지 않는다 — 무엇을 승인하는지(계정 정보 읽기, 저장소 범위와 권한)만
 * 읽히는 수준으로 단순하게 그린다. 문구는 GitHub 화면처럼 영어로 두되, 내용은 우리가
 * 실제로 요청하는 값이다.
 *
 * - OAuth 범위: `user:email read:user` (BE `github.oauth.scope`)
 * - App: 운영 등록 `dvely-github-app` 의 Repository 권한 (BE `docs/github-app-permissions.md`)
 *   Organization·Account 권한은 없다
 *
 * 비밀번호·OTP 칸은 없다. GitHub 에 이미 로그인된 사람이 승인 버튼만 누르는 장면이다.
 */
import { useEffect, useState } from 'react';
import { Check, Lock, UserRound } from 'lucide-react';
import githubIcon from '@/assets/icons/github.svg';
import qeploySymbol from '@/assets/images/qeploy-symbol-violet.svg';
import {
  approveDemoGitHubWindow,
  cancelDemoGitHubWindow,
  subscribeDemoGitHubWindow,
  type DemoGitHubWindowState,
} from '@/demo/githubWindow';
import { DEMO } from '@/demo/scenario';

const ADDRESS = {
  oauth: { github: 'github.com/login/oauth/authorize', callback: 'qeploy.com/auth/callback' },
  install: {
    github: 'github.com/apps/dvely-github-app/installations/new',
    callback: 'qeploy.com/auth/app-callback',
  },
} as const;

/**
 * 팝업 크기. 화면 아래 자막과 겹치지 않도록 높이를 정해 두고 위에 붙인다. 승인 뒤 콜백
 * 주소로 바뀌어도 창 크기는 그대로다 — 실제 팝업도 주소만 바뀐다.
 */
const WINDOW_WIDTH = 460;
const BODY_HEIGHT = { oauth: 400, install: 448 } as const;

function DemoGitHubWindow() {
  const [state, setState] = useState<DemoGitHubWindowState | null>(null);
  useEffect(() => subscribeDemoGitHubWindow(setState), []);

  if (!state) return null;

  return (
    <div
      data-demo="github-window"
      className="fixed left-1/2 top-11 z-[150] overflow-hidden rounded-xl border border-[#c9cdd2] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.28),0_2px_8px_rgba(15,23,42,0.12)] animate-in fade-in-0 zoom-in-95 duration-200"
      style={{ width: WINDOW_WIDTH, marginLeft: -WINDOW_WIDTH / 2 }}
    >
      <div className="flex h-9 items-center gap-3 border-b border-[#dadce0] bg-[#f1f3f4] px-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <p className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11.5px] text-[#3c4043]">
          <Lock className="size-3 shrink-0 text-[#5f6368]" aria-hidden />
          <span className="truncate">{ADDRESS[state.kind][state.phase]}</span>
        </p>
      </div>

      <div style={{ height: BODY_HEIGHT[state.kind] }}>
        {state.phase === 'callback' ? (
          <CallbackPage kind={state.kind} />
        ) : state.kind === 'oauth' ? (
          <AuthorizePage />
        ) : (
          <InstallPage />
        )}
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[#ddf4ff] text-[11px] font-semibold uppercase text-[#0969da]">
      {DEMO.username.slice(0, 1)}
    </span>
  );
}

function AuthorizePage() {
  return (
    <div
      data-demo="github-page"
      className="flex h-full flex-col items-center bg-[#f6f8fa] px-8 pt-8 text-[#1f2328]"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-white ring-1 ring-[#d0d7de]">
          <img src={qeploySymbol} alt="" className="size-7" />
        </span>
        <span className="flex gap-1" aria-hidden>
          <span className="size-1 rounded-full bg-[#8c959f]" />
          <span className="size-1 rounded-full bg-[#8c959f]" />
          <span className="size-1 rounded-full bg-[#8c959f]" />
        </span>
        <span className="flex size-12 items-center justify-center rounded-full bg-white ring-1 ring-[#d0d7de]">
          <img src={githubIcon} alt="" className="size-8" />
        </span>
      </div>
      <h1 className="mt-5 text-[22px] font-normal">Authorize Qeploy</h1>

      <div className="mt-5 w-full rounded-md border border-[#d0d7de] bg-white text-[13px]">
        <div className="flex items-center gap-3 border-b border-[#d8dee4] px-4 py-3.5">
          <Avatar />
          <p>
            <b>Qeploy</b> wants to access your <b>{DEMO.username}</b> account
          </p>
        </div>
        <div className="flex items-start gap-3 border-b border-[#d8dee4] px-4 py-3.5">
          <UserRound className="mt-0.5 size-4 shrink-0 text-[#59636e]" aria-hidden />
          <div>
            <p className="font-semibold">Personal user data</p>
            <p className="mt-0.5 text-[12px] text-[#59636e]">
              Email addresses (read-only), profile information (read-only)
            </p>
          </div>
        </div>
        <div className="flex gap-2 px-4 pt-4">
          <button
            type="button"
            onClick={cancelDemoGitHubWindow}
            className="flex-1 rounded-md border border-[#d0d7de] bg-[#f6f8fa] py-[7px] font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            data-demo="github-authorize"
            onClick={approveDemoGitHubWindow}
            className="flex-1 rounded-md bg-[#1f883d] py-[7px] font-semibold text-white"
          >
            Authorize Qeploy
          </button>
        </div>
        <p className="px-4 pt-3 pb-4 text-center text-[11.5px] text-[#59636e]">
          Authorizing will redirect to <b className="text-[#1f2328]">https://qeploy.com</b>
        </p>
      </div>
    </div>
  );
}

const REPOSITORY_SCOPES = [
  {
    value: 'all',
    label: 'All repositories',
    description: 'This applies to all current and future repositories.',
  },
  {
    value: 'selected',
    label: 'Only select repositories',
    description: 'Select at least one repository.',
  },
] as const;

function InstallPage() {
  // GitHub 화면의 기본 선택이다. 시연은 바꾸지 않고 그대로 설치한다
  const [scope, setScope] = useState<'all' | 'selected'>('all');

  return (
    <div data-demo="github-page" className="h-full bg-white px-7 pt-5 text-[13px] text-[#1f2328]">
      <img src={githubIcon} alt="" className="size-6" />
      <h1 className="mt-2 text-[20px] font-normal">Install dvely-github-app</h1>
      <p className="mt-1.5 flex items-center gap-1.5 text-[#59636e]">
        Install on your personal account
        <Avatar />
        <b className="text-[#1f2328]">{DEMO.username}</b>
      </p>

      <div className="mt-3 rounded-md border border-[#d0d7de] px-4 py-3">
        <p className="font-semibold">for these repositories:</p>
        <div className="mt-2 space-y-2">
          {REPOSITORY_SCOPES.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-start gap-2.5">
              <input
                type="radio"
                name="demo-github-repository-scope"
                checked={scope === option.value}
                onChange={() => setScope(option.value)}
                className="mt-[3px] accent-[#0969da]"
              />
              <span>
                <span className="font-semibold">{option.label}</span>
                <span className="mt-0.5 block text-[12px] text-[#59636e]">
                  {option.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div
        data-demo="github-permissions"
        className="mt-2.5 rounded-md border border-[#d0d7de] px-4 py-3"
      >
        <p className="font-semibold">with these permissions:</p>
        <ul className="mt-2 space-y-2">
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-[#1a7f37]" aria-hidden />
            Read access to metadata
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-[#1a7f37]" aria-hidden />
            Read and write access to actions, administration, contents, pages, pull requests, and
            workflows
          </li>
        </ul>
      </div>

      <div className="mt-3.5 flex gap-2">
        <button
          type="button"
          data-demo="github-install"
          onClick={approveDemoGitHubWindow}
          className="rounded-md bg-[#1f883d] px-5 py-[7px] font-semibold text-white"
        >
          Install
        </button>
        <button
          type="button"
          onClick={cancelDemoGitHubWindow}
          className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-4 py-[7px] font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/** 승인 뒤 잠깐 거치는 우리 콜백 화면. 실제 `/auth/callback`·`/auth/app-callback` 과 같은 문구다 */
function CallbackPage({ kind }: { kind: DemoGitHubWindowState['kind'] }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {kind === 'oauth' ? (
        <>
          <div className="size-10 animate-spin rounded-full border-4 border-[#7C3AED]/20 border-t-[#7C3AED]" />
          <p className="text-base font-medium">로그인 처리 중입니다...</p>
          <p className="text-sm text-gray-500">잠시만 기다려 주세요</p>
        </>
      ) : (
        <>
          <div className="size-10 animate-spin rounded-full border-4 border-[#A8B88C]/20 border-t-[#A8B88C]" />
          <p className="text-base font-medium">완료 중입니다...</p>
        </>
      )}
    </div>
  );
}

export default DemoGitHubWindow;
