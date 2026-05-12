import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  LayoutGrid,
  MessageSquare,
  Mic,
  Monitor,
  Palette,
  Plus,
  Presentation,
  SendHorizontal,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import githubIcon from '@/assets/icons/github.svg';

/** 데모용 정적 레포 목록 */
const DEMO_GITHUB_REPOS = [
  'vercel/next.js',
  'facebook/react',
  'tanstack/router',
  'vitejs/vite',
  'oven-sh/bun',
  'tailwindlabs/tailwindcss',
  'microsoft/TypeScript',
] as const;

function parseRepo(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  const m = s.match(/github\.com\/(?:repos\/)?([\w.-]+\/[\w.-]+?)(?:\.git)?(?:\/|$|\?|#)/i);
  if (m) return m[1];
  if (/^[\w.-]+\/[\w.-]+$/.test(s)) return s;
  return null;
}

const quickActions = [
  { label: '슬라이드 제작', icon: Presentation },
  { label: '웹사이트 구축', icon: Monitor },
  { label: '데스크톱 앱 개발', icon: LayoutGrid },
  { label: '디자인', icon: Palette },
  { label: '더보기', icon: MoreHorizontal },
] as const;

export default function TaskPrompt() {
  const panelId = useId();
  const githubWrapRef = useRef<HTMLDivElement>(null);
  const [promptText, setPromptText] = useState('');
  const [connectedRepo, setConnectedRepo] = useState<string | null>(null);
  const [repoDraft, setRepoDraft] = useState('');
  const [repoPanelOpen, setRepoPanelOpen] = useState(false);
  const [actionHint, setActionHint] = useState<string | null>(null);

  const selectableRepos = useMemo(() => {
    const set = new Set<string>([...DEMO_GITHUB_REPOS]);
    if (connectedRepo) set.add(connectedRepo);
    return [...set].sort((a, b) => a.localeCompare(b, 'en'));
  }, [connectedRepo]);

  useEffect(() => {
    if (!repoPanelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setRepoPanelOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      const el = githubWrapRef.current;
      if (el && !el.contains(e.target as Node)) setRepoPanelOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onPointer);
    };
  }, [repoPanelOpen]);

  const persistRepo = useCallback((repo: string | null) => {
    setConnectedRepo(repo);
  }, []);

  const connectRepo = useCallback(() => {
    const parsed = parseRepo(repoDraft);
    if (!parsed) {
      setActionHint('owner/repo 형식 또는 GitHub URL을 입력해 주세요.');
      return;
    }
    persistRepo(parsed);
    setRepoDraft('');
    setRepoPanelOpen(false);
    setActionHint(`레포 ${parsed}에 연결되었습니다.`);
  }, [persistRepo, repoDraft]);

  const selectRepoFromList = useCallback(
    (fullName: string) => {
      persistRepo(fullName);
      setRepoPanelOpen(false);
      setActionHint(`레포 ${fullName}에 연결되었습니다.`);
    },
    [persistRepo],
  );

  const disconnectRepo = useCallback(() => {
    persistRepo(null);
    setActionHint('레포 연결이 해제되었습니다.');
  }, [persistRepo]);

  const sendPrompt = useCallback(() => {
    const text = promptText.trim();
    if (!text) return;
    if (!connectedRepo) {
      setActionHint('먼저 GitHub 아이콘에서 레포를 연결해 주세요.');
      setRepoPanelOpen(true);
      return;
    }

    setPromptText('');
    setActionHint('전송 UI만 동작 중입니다. 백엔드 연동 후 실제 전송이 가능합니다.');
  }, [connectedRepo, promptText]);

  const installUrl = import.meta.env.VITE_GITHUB_APP_INSTALL_URL as string | undefined;

  return (
    <section className="shrink-0 px-5 pb-2 pt-6 sm:px-6">
      <div className="mx-auto max-w-[720px] text-center">
        <h1 className="text-[40px] font-bold leading-[1.5] tracking-tight text-[#0f172a]">
          무엇을 도와드릴까요?
        </h1>
      </div>

      <div className="mx-auto mt-8 max-w-[720px]">
        <div className="rounded-[18px] border border-[#e2e8f0] bg-white shadow-[0_1px_1px_rgba(15,23,42,0.04)]">
          <div className="px-[17px] pb-3 pt-4">
            <label htmlFor="dashboard-prompt" className="sr-only">
              프롬프트 입력
            </label>
            <textarea
              id="dashboard-prompt"
              rows={2}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="작업을 할당하거나 무엇이든 질문하세요"
              className="min-h-[44px] w-full resize-none bg-transparent text-[14px] font-semibold leading-normal text-[#0f172a] outline-none placeholder:font-semibold placeholder:text-[#94a3b8]"
            />
            {actionHint ? (
              <p className="mt-2 text-left text-[12px] font-medium text-[#64748b]">{actionHint}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-transparent px-[17px] pb-[13px] pt-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                className="flex size-[30px] items-center justify-center rounded-[9px] text-[#64748b] transition hover:bg-[#f8fafc]"
                aria-label="추가"
              >
                <Plus className="size-[18px]" />
              </button>
              <div ref={githubWrapRef} className="relative">
                <button
                  type="button"
                  onClick={() => setRepoPanelOpen((o) => !o)}
                  className={`flex size-[30px] items-center justify-center rounded-[9px] text-[#64748b] transition hover:bg-[#f8fafc] ${connectedRepo ? 'ring-1 ring-[#0f172a]/15' : ''}`}
                  aria-label="GitHub 레포 연결"
                  aria-expanded={repoPanelOpen}
                  aria-controls={panelId}
                >
                  <img src={githubIcon} alt="" className="size-[18px]" width={18} height={18} />
                </button>
                {repoPanelOpen ? (
                  <div
                    id={panelId}
                    role="dialog"
                    aria-label="GitHub 레포"
                    className="absolute left-0 top-full z-20 mt-2 w-[min(100vw-2.5rem,320px)] rounded-xl border border-[#e2e8f0] bg-white p-3 text-left shadow-lg"
                  >
                    <p className="text-[12px] font-semibold text-[#0f172a]">레포 연결</p>
                    {connectedRepo ? (
                      <p className="mt-1.5 text-[13px] font-medium text-[#475569]">
                        {connectedRepo}
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] leading-snug text-[#64748b]">
                        채팅 컨텍스트로 쓸 GitHub 레포를 지정합니다.
                      </p>
                    )}
                    <p className="mt-3 text-[11px] font-semibold text-[#475569]">레포 선택</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-[#94a3b8]">
                      데모용 고정 목록입니다.
                    </p>
                    <ul
                      className="mt-1.5 max-h-36 overflow-y-auto rounded-lg border border-[#e2e8f0] divide-y divide-[#e2e8f0]"
                      role="listbox"
                      aria-label="연결할 레포 목록"
                    >
                      {selectableRepos.map((r) => (
                        <li key={r}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={connectedRepo === r}
                            onClick={() => selectRepoFromList(r)}
                            className={`flex w-full min-w-0 items-center px-2.5 py-2 text-left text-[12px] font-medium transition hover:bg-[#f8fafc] ${
                              connectedRepo === r ? 'bg-[#f1f5f9] text-[#0f172a]' : 'text-[#334155]'
                            }`}
                          >
                            <span className="truncate">{r}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[11px] font-semibold text-[#475569]">또는 직접 입력</p>
                    <input
                      type="text"
                      value={repoDraft}
                      onChange={(e) => setRepoDraft(e.target.value)}
                      placeholder="owner/repo 또는 GitHub URL"
                      className="mt-2 w-full rounded-lg border border-[#e2e8f0] px-2.5 py-2 text-[13px] font-medium text-[#0f172a] outline-none focus:border-[#cbd5e1]"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={connectRepo}
                        className="rounded-lg bg-[#0f172a] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:opacity-90"
                      >
                        연결
                      </button>
                      {connectedRepo ? (
                        <button
                          type="button"
                          onClick={disconnectRepo}
                          className="rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-[12px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc]"
                        >
                          해제
                        </button>
                      ) : null}
                    </div>
                    {installUrl ? (
                      <a
                        href={installUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-[11px] font-semibold text-[#2563eb] underline-offset-2 hover:underline"
                      >
                        GitHub 앱에서 권한 연동
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-[11px] py-1.5">
                <LayoutGrid className="size-3.5 text-[#475569]" />
                <span
                  className="text-[12px] font-semibold text-[#475569]"
                  style={{ fontFamily: 'system-ui, Roboto, sans-serif' }}
                >
                  {connectedRepo ?? '클라우드 컴퓨터'}
                </span>
                <span className="rounded-full bg-[rgba(91,33,182,0.11)] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-[#7c3aed]">
                  새로운
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="flex size-[30px] items-center justify-center rounded-[9px] text-[#64748b] transition hover:bg-[#f8fafc]"
                aria-label="채팅"
              >
                <MessageSquare className="size-[18px]" />
              </button>
              <button
                type="button"
                className="flex size-[30px] items-center justify-center rounded-[9px] text-[#64748b] transition hover:bg-[#f8fafc]"
                aria-label="음성"
              >
                <Mic className="size-[18px]" />
              </button>
              <button
                type="button"
                onClick={sendPrompt}
                className="flex size-8 items-center justify-center rounded-2xl bg-[#0f172a] text-white transition hover:opacity-90"
                aria-label="전송"
              >
                <SendHorizontal className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {quickActions.map(({ label, icon: Icon }) => (
            <Button
              variant="outline"
              key={label}
              type="button"
              className="inline-flex items-end gap-1.5 rounded-full px-[15px] py-[10.5px] text-[13px] font-semibold text-[#334155]"
            >
              <Icon className="size-4 text-[#475569]" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
