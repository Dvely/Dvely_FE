import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Terminal } from 'lucide-react';
import { deleteApiToken, useApiTokenListQuery } from '@/api/apiTokens';
import AgentConnectSteps, {
  WritesToggle,
} from '@/components/layout/agentConnect/AgentConnectSteps';
import ApiTokenIssueForm from '@/components/layout/me/ApiTokenIssueForm';
import ApiTokenRevealDialog from '@/components/layout/me/ApiTokenRevealDialog';
import { isApiTokenExpired, type ApiTokenScope } from '@/types/apiToken.type';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import { formatInSeoul } from '@/lib/seoulTime';

const API_TOKENS_QUERY_KEY = 'me-api-tokens';

function formatDate(value: string | null) {
  if (!value) return null;
  // 만료일은 날짜 단위라 경계에서만 어긋나지만, 어긋나면 **하루 통째로** 틀린다
  return formatInSeoul(value, { year: 'numeric', month: 'long', day: 'numeric' }) || null;
}

function MeApiTokensPanel() {
  const queryClient = useQueryClient();
  const { data: tokens = [], isLoading } = useApiTokenListQuery(API_TOKENS_QUERY_KEY);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scope, setScope] = useState<ApiTokenScope>('READ');
  /** 아래 연결 안내의 명령에 쓰기 도구를 켜는 환경변수를 붙일지 */
  const [enableWrites, setEnableWrites] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  /**
   * 발급 직후 평문. **여기 말고 어디에도 두지 않는다** — 저장소에 넣지 않고,
   * 목록에 다시 그리지 않고, 모달을 닫는 순간 null 로 비운다.
   */
  const [issuedToken, setIssuedToken] = useState<{ token: string; label: string | null } | null>(
    null,
  );

  const invalidate = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ['api-token-list'] });
  }, [queryClient]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const revokeMutation = useMutation({
    mutationFn: (apiTokenId: number) => deleteApiToken(apiTokenId),
    onSuccess: () => {
      invalidate();
      setNotice('토큰을 폐기했습니다. 그 토큰을 쓰던 클라이언트는 더 이상 연결되지 않습니다.');
    },
    onError: (error) => {
      // 404(이미 없음)도 여기로 온다. 목록을 다시 읽어 화면과 서버를 맞춘다
      invalidate();
      setNotice(composeApiErrorMessage(error, '토큰을 폐기하지 못했습니다.'));
    },
  });

  const rows = useMemo(
    () => tokens.map((token) => ({ token, expired: isApiTokenExpired(token) })),
    [tokens],
  );

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <p className="text-[13px] leading-relaxed text-[#64748b]">
          Claude Code·Codex 가 Qeploy 를 MCP 도구로 불러 배포 상태·로그를 직접 읽고, 배포까지 실행할
          수 있게 하는 토큰입니다. 브라우저 로그인과 달리 수명이 길어 헤드리스 클라이언트에서 쓸 수
          있습니다.
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-[#94a3b8]">
          발급 직후 한 번만 평문이 표시됩니다. 서버는 해시만 저장하므로 다시 확인할 수 없고, 놓치면
          폐기하고 새로 발급해야 합니다.
        </p>
      </section>

      {notice ? (
        <p role="status" className="text-[12px] whitespace-pre-line text-[#475569]">
          {notice}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-bold text-[#0f172a]">발급한 토큰</h3>
        <button
          type="button"
          onClick={() => {
            setNotice(null);
            setIsFormOpen((open) => !open);
          }}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#7c3aed] px-3 text-[13px] font-semibold text-white transition hover:bg-[#6d28d9]"
        >
          {isFormOpen ? (
            '취소'
          ) : (
            <>
              <Plus className="size-4" strokeWidth={2.25} aria-hidden />새 토큰
            </>
          )}
        </button>
      </div>

      {isFormOpen ? (
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
          <ApiTokenIssueForm
            scope={scope}
            onScopeChange={setScope}
            onIssued={(issued) => {
              closeForm();
              setNotice(null);
              setIssuedToken(issued);
            }}
            onCancel={closeForm}
          />
        </div>
      ) : null}

      <ul className="flex flex-col gap-2">
        {isLoading ? (
          Array.from({ length: 2 }, (_, index) => (
            <li
              key={`token-skeleton-${index}`}
              className="h-20 animate-pulse rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]"
            />
          ))
        ) : rows.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-[#cbd5e1] px-4 py-8 text-center text-[13px] text-[#94a3b8]">
            발급한 토큰이 없습니다.
          </li>
        ) : (
          rows.map(({ token, expired }) => (
            <li
              key={token.apiTokenId}
              className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <code className="rounded bg-[#f8fafc] px-2 py-0.5 font-mono text-[12px] text-[#334155]">
                    {token.tokenPrefix}…
                  </code>
                  <span className="rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
                    {token.scope}
                  </span>
                  {expired ? (
                    <span className="rounded-full bg-[#fef2f2] px-2 py-0.5 text-[11px] font-semibold text-[#b91c1c]">
                      만료됨
                    </span>
                  ) : null}
                </div>
                {token.label ? (
                  <p className="mt-1 text-[13px] text-[#0f172a]">{token.label}</p>
                ) : null}
                <p className="mt-0.5 text-[11px] text-[#94a3b8]">
                  {formatDate(token.expiresAt)
                    ? `${expired ? '만료' : '만료 예정'} ${formatDate(token.expiresAt)}`
                    : '만료 없음'}
                  {/* 1시간 스로틀이라 실시간이 아니다. "최근"이라고만 적는다 */}
                  {token.lastUsedAt
                    ? ` · 최근 사용 ${formatDate(token.lastUsedAt)}`
                    : ' · 사용 기록 없음'}
                </p>
              </div>

              <button
                type="button"
                disabled={revokeMutation.isPending}
                onClick={() => {
                  setNotice(null);
                  revokeMutation.mutate(token.apiTokenId);
                }}
                className="h-9 shrink-0 rounded-lg border border-[#fecaca] px-3 text-[12px] font-semibold text-[#dc2626] transition hover:bg-[#fef2f2] disabled:opacity-50"
              >
                폐기
              </button>
            </li>
          ))
        )}
      </ul>

      {/*
        덮개를 걷었다. 패키지가 **우리 스코프로** 공개됐다 — @qeploy/mcp · @qeploy/cli ·
        @qeploy/client(BE #451). 레지스트리에서 직접 본 것: 세 패키지 모두 maintainer 가
        우리 쪽 한 명이고 repository 가 Dvely 저장소를 가리키며, **설치 스크립트(postinstall
        따위)가 없다.** 스코프 없는 `qeploy` 는 남의 패키지라 안내에 쓰지 않는다.

        단계와 명령은 프로젝트의 연결 안내 시트와 같은 컴포넌트다(AgentConnectSteps).
      */}
      <section className="flex flex-col gap-3 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5">
        <h3 className="flex items-center gap-2 text-[14px] font-bold text-[#0f172a]">
          <Terminal className="size-4 text-[#64748b]" aria-hidden />
          에이전트에 연결하기
        </h3>
        <p className="text-[12px] leading-relaxed text-[#64748b]">
          발급한 토큰으로 Claude Code·Codex 가 Qeploy 를 도구로 씁니다.
        </p>
        <WritesToggle checked={enableWrites} onChange={setEnableWrites} />
        <AgentConnectSteps enableWrites={enableWrites} showCi />
      </section>

      {issuedToken ? (
        <ApiTokenRevealDialog
          token={issuedToken.token}
          label={issuedToken.label}
          /*
            닫는 순간 평문을 버린다. 언마운트되므로 트리에도 남지 않는다. mutation 캐시에
            남는 평문은 발급 폼이 넘겨준 직후에 지운다(ApiTokenIssueForm).
          */
          onClose={() => setIssuedToken(null)}
        />
      ) : null}
    </div>
  );
}

export default MeApiTokensPanel;
