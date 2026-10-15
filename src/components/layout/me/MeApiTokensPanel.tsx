import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Terminal } from 'lucide-react';
import { deleteApiToken, postApiToken, useApiTokenListQuery } from '@/api/apiTokens';
import ApiTokenRevealDialog from '@/components/layout/me/ApiTokenRevealDialog';
import {
  API_TOKEN_EXPIRY_LIMITS,
  API_TOKEN_SCOPES,
  isApiTokenExpired,
  type ApiTokenScope,
} from '@/types/apiToken.type';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import { cn } from '@/lib/utils';

const API_TOKENS_QUERY_KEY = 'me-api-tokens';

const SCOPE_COPY: Record<ApiTokenScope, { title: string; detail: string }> = {
  READ: {
    title: '조회만',
    detail: '배포 상태·로그·환경변수 목록을 읽습니다. 배포하거나 설정을 바꿀 수 없습니다.',
  },
  WRITE: {
    title: '조회 + 변경',
    detail: '배포 실행, 환경변수 수정, 도메인 연결까지 할 수 있습니다.',
  },
};

function formatDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return null;
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function MeApiTokensPanel() {
  const queryClient = useQueryClient();
  const { data: tokens = [], isLoading } = useApiTokenListQuery(API_TOKENS_QUERY_KEY);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scope, setScope] = useState<ApiTokenScope>('READ');
  const [label, setLabel] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(String(API_TOKEN_EXPIRY_LIMITS.READ.default));
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  /**
   * 발급 직후 평문. **여기 말고 어디에도 두지 않는다** — 저장소에 넣지 않고,
   * 목록에 다시 그리지 않고, 모달을 닫는 순간 null 로 비운다.
   */
  const [issuedToken, setIssuedToken] = useState<{ token: string; label: string | null } | null>(
    null,
  );

  const limits = API_TOKEN_EXPIRY_LIMITS[scope];

  const invalidate = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ['api-token-list'] });
  }, [queryClient]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setLabel('');
    setFormError(null);
  }, []);

  const handleScopeChange = (next: ApiTokenScope) => {
    setScope(next);
    // 한도가 스코프마다 다르다. 바꾸면 기본값으로 되돌려 400 이 날 조합을 만들지 않는다
    setExpiresInDays(String(API_TOKEN_EXPIRY_LIMITS[next].default));
    setFormError(null);
  };

  const issueMutation = useMutation({
    mutationFn: () =>
      postApiToken({
        scope,
        label: label.trim() || null,
        expiresInDays: Number(expiresInDays),
      }),
    onSuccess: (result) => {
      invalidate();
      closeForm();
      setNotice(null);
      setIssuedToken({ token: result.token, label: result.info.label });
    },
    onError: (error) => {
      setFormError(composeApiErrorMessage(error, '토큰을 발급하지 못했습니다.'));
    },
  });

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

  const handleSubmit = () => {
    setFormError(null);
    const days = Number(expiresInDays);
    if (!Number.isInteger(days) || days < 1 || days > limits.max) {
      setFormError(`만료일은 1일 이상 ${limits.max}일 이하여야 합니다(${scope} 스코프).`);
      return;
    }
    issueMutation.mutate();
  };

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
            setFormError(null);
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
        <form
          className="flex flex-col gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-5"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <fieldset className="flex flex-col gap-2">
            <legend className="text-[12px] font-semibold text-[#334155]">권한 범위</legend>
            {/*
              기본은 READ 다. 에이전트가 실수하면 결과가 틀린 답이 아니라 진짜 배포다 —
              WRITE 를 고를 때는 그 차이를 읽고 고르게 한다.
            */}
            {API_TOKEN_SCOPES.map((value) => {
              const isActive = scope === value;
              const copy = SCOPE_COPY[value];

              return (
                <label
                  key={value}
                  className={cn(
                    'flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2.5 transition',
                    isActive
                      ? 'border-[#7c3aed] bg-[#faf5ff]'
                      : 'border-[#e2e8f0] hover:bg-[#f8fafc]',
                  )}
                >
                  <input
                    type="radio"
                    name="api-token-scope"
                    value={value}
                    checked={isActive}
                    onChange={() => handleScopeChange(value)}
                    className="mt-0.5 size-4 shrink-0 accent-[#7c3aed]"
                  />
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-[#0f172a]">
                      {value} · {copy.title}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-relaxed text-[#64748b]">
                      {copy.detail}
                    </span>
                  </span>
                </label>
              );
            })}
          </fieldset>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#334155]">
                이름 <span className="font-normal text-[#94a3b8]">(선택)</span>
              </span>
              <input
                value={label}
                maxLength={64}
                onChange={(event) => setLabel(event.target.value)}
                placeholder="내 노트북 Claude Code"
                className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px] outline-none focus:border-[#7c3aed]"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold text-[#334155]">
                만료 <span className="font-normal text-[#94a3b8]">(1~{limits.max}일)</span>
              </span>
              <input
                type="number"
                min={1}
                max={limits.max}
                value={expiresInDays}
                onChange={(event) => setExpiresInDays(event.target.value)}
                className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px] outline-none focus:border-[#7c3aed]"
              />
            </label>
          </div>

          {formError ? (
            <p role="alert" className="text-[12px] whitespace-pre-line text-[#dc2626]">
              {formError}
            </p>
          ) : null}

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={issueMutation.isPending}
              className="h-9 rounded-lg bg-[#7c3aed] px-4 text-[13px] font-semibold text-white transition hover:bg-[#6d28d9] disabled:opacity-50"
            >
              {issueMutation.isPending ? '발급 중…' : '발급'}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="h-9 rounded-lg border border-[#e2e8f0] px-4 text-[13px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc]"
            >
              취소
            </button>
          </div>
        </form>
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
        연결 명령을 적지 않는다. **아직 npm 에 우리 패키지가 없다.**

        스코프가 비어 있는 동안 화면이 설치 명령을 그대로 보여주면, 남이 그 이름을 먼저
        올렸을 때 **우리 화면이 남의 코드를 설치하라고 안내하는** 셈이 된다. 설치 명령은
        확인을 묻지 않고 받은 것을 그대로 실행한다.

        흐리게 덮는 것으로는 부족하다 — 선택·복사·검색·스크래핑으로 그대로 새어나간다.
        그래서 덮인 동안에는 명령 문자열을 **DOM 에 두지 않는다**(아래에 코드 블록이 없는
        이유다). 주석에도 적지 않는다. 순서만 글로 남겨 둔다.

        걷는 조건: 패키지가 npm 에 **우리 것으로** 공개된 뒤. 그때 이 자리에 들어갈
        내용의 순서는 고정이다 —
          1. 로그인으로 토큰을 기기에 저장한다
          2. 에이전트에 MCP 서버를 등록한다 (토큰을 명령 인자로 끼우지 않는다)
          3. 환경변수는 CI·덮어쓰기용 보조 수단으로만 안내한다
        실제 명령은 agent-tools 쪽 패키지가 기준이다.
      */}
      <section className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5">
        <h3 className="flex flex-wrap items-center gap-2 text-[14px] font-bold text-[#0f172a]">
          <Terminal className="size-4 text-[#64748b]" aria-hidden />
          에이전트에 연결하기
          <span className="rounded-full bg-[#e2e8f0] px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
            준비 중
          </span>
        </h3>
        <p className="mt-2 text-[12px] leading-relaxed text-[#64748b]">
          연결에 쓰는 패키지가 아직 공개 전입니다. 공개되면 이 자리에 명령을 올립니다. 그때 거치게
          되는 순서는 이렇습니다.
        </p>
        <ol className="mt-3 flex flex-col gap-2 text-[12px] leading-relaxed text-[#64748b]">
          {[
            'Qeploy 에 로그인해 토큰을 기기에 저장합니다.',
            '에이전트에 Qeploy 를 MCP 서버로 등록합니다. 토큰은 명령에 직접 적지 않습니다.',
            '환경변수는 CI 처럼 로그인을 못 하는 환경에서만 보조로 씁니다.',
          ].map((step, index) => (
            <li key={step} className="flex gap-2">
              <span className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#e2e8f0] text-[11px] font-semibold text-[#475569]">
                {index + 1}
              </span>
              <span className="min-w-0">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[12px] leading-relaxed text-[#94a3b8]">
          토큰은 지금 발급해 둘 수 있습니다. 쓰기 도구는 공개 뒤에도 기본으로 꺼져 있고, 켜려면
          WRITE 스코프 토큰과 별도 설정이 함께 필요합니다 — 두 가지는 별개의 층입니다.
        </p>
      </section>

      {issuedToken ? (
        <ApiTokenRevealDialog
          token={issuedToken.token}
          label={issuedToken.label}
          /*
            닫는 순간 평문을 버린다. 언마운트되므로 트리에도 남지 않는다.

            `reset()` 도 같이 부른다 — 화면이 `issueMutation.data` 를 읽지 않아 다시
            보이지는 않지만, 그 안에 평문이 담긴 채로 mutation 캐시에 몇 분 남는다.
            한 번만 보여주기로 한 값이라 안 읽는 것으로는 부족하고, 들고 있지 않아야 한다.
          */
          onClose={() => {
            setIssuedToken(null);
            issueMutation.reset();
          }}
        />
      ) : null}
    </div>
  );
}

export default MeApiTokensPanel;
