import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApiToken } from '@/api/apiTokens';
import {
  API_TOKEN_EXPIRY_LIMITS,
  API_TOKEN_SCOPES,
  type ApiTokenScope,
} from '@/types/apiToken.type';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import { cn } from '@/lib/utils';

const API_TOKEN_SCOPE_COPY: Record<ApiTokenScope, { title: string; detail: string }> = {
  READ: {
    title: '조회만',
    detail: '배포 상태·로그·환경변수 목록을 읽습니다. 배포하거나 설정을 바꿀 수 없습니다.',
  },
  WRITE: {
    title: '조회 + 변경',
    detail: '배포 실행, 환경변수 수정, 도메인 연결까지 할 수 있습니다.',
  },
};

type ApiTokenIssueFormProps = {
  /** 스코프는 바깥이 정한다 — 연결 안내의 "배포까지 맡기기" 가 WRITE 로 바꾼다 */
  scope: ApiTokenScope;
  onScopeChange: (scope: ApiTokenScope) => void;
  /** 발급되면 평문을 넘긴다. 받은 쪽이 한 번 보여 주고 버린다 */
  onIssued: (issued: { token: string; label: string | null }) => void;
  onCancel?: () => void;
  labelPlaceholder?: string;
};

/**
 * 개인 액세스 토큰 발급 폼. 설정의 토큰 패널과 연결 안내 시트가 같이 쓴다.
 *
 * 만료일은 **스코프마다 따로** 들고 있다. 한도가 스코프마다 달라서(READ 365일 · WRITE 90일)
 * 한 칸을 같이 쓰면 스코프를 바꿨을 때 400 이 날 조합이 남는다.
 */
function ApiTokenIssueForm({
  scope,
  onScopeChange,
  onIssued,
  onCancel,
  labelPlaceholder = '내 노트북 Claude Code',
}: ApiTokenIssueFormProps) {
  const queryClient = useQueryClient();
  const [label, setLabel] = useState('');
  const [expiresByScope, setExpiresByScope] = useState<Record<ApiTokenScope, string>>({
    READ: String(API_TOKEN_EXPIRY_LIMITS.READ.default),
    WRITE: String(API_TOKEN_EXPIRY_LIMITS.WRITE.default),
  });
  const [formError, setFormError] = useState<string | null>(null);

  const limits = API_TOKEN_EXPIRY_LIMITS[scope];
  const expiresInDays = expiresByScope[scope];

  const issueMutation = useMutation({
    mutationFn: () =>
      postApiToken({
        scope,
        label: label.trim() || null,
        expiresInDays: Number(expiresInDays),
      }),
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: ['api-token-list'] });
      setLabel('');
      setFormError(null);
      /*
        평문은 넘기고 나서 mutation 캐시에서도 지운다. 화면이 `issueMutation.data` 를 읽지
        않아도 그 안에 평문이 담긴 채로 몇 분 남는다 — 한 번만 보여주기로 한 값이다.
      */
      onIssued({ token: result.token, label: result.info.label });
      issueMutation.reset();
    },
    onError: (error) => {
      setFormError(composeApiErrorMessage(error, '토큰을 발급하지 못했습니다.'));
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

  return (
    <form
      className="flex flex-col gap-4"
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
          const copy = API_TOKEN_SCOPE_COPY[value];

          return (
            <label
              key={value}
              className={cn(
                'flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2.5 transition',
                isActive ? 'border-[#7c3aed] bg-[#faf5ff]' : 'border-[#e2e8f0] hover:bg-[#f8fafc]',
              )}
            >
              <input
                type="radio"
                name="api-token-scope"
                value={value}
                checked={isActive}
                onChange={() => {
                  onScopeChange(value);
                  setFormError(null);
                }}
                data-demo={`api-token-scope-${value}`}
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
            placeholder={labelPlaceholder}
            data-demo="api-token-label"
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
            onChange={(event) =>
              setExpiresByScope((prev) => ({ ...prev, [scope]: event.target.value }))
            }
            data-demo="api-token-expiry"
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
          data-demo="api-token-issue"
          className="h-9 rounded-lg bg-[#7c3aed] px-4 text-[13px] font-semibold text-white transition hover:bg-[#6d28d9] disabled:opacity-50"
        >
          {issueMutation.isPending ? '발급 중…' : '발급'}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="h-9 rounded-lg border border-[#e2e8f0] px-4 text-[13px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc]"
          >
            취소
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default ApiTokenIssueForm;
