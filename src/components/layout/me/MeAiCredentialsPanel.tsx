import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExternalLink, KeyRound } from 'lucide-react';
import { deleteAiCredential, putAiCredential, useAiCredentialListQuery } from '@/api/aiCredentials';
import { AI_CREDENTIAL_VENDORS, type AiCredentialVendor } from '@/types/aiCredential.type';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import { cn } from '@/lib/utils';

const AI_CREDENTIALS_QUERY_KEY = 'me-ai-credentials';

/** 화면에 세우는 순서 */
const VENDOR_ORDER = AI_CREDENTIAL_VENDORS;

type VendorMeta = {
  label: string;
  /** 이 벤더 키로 무엇이 도는지. 사용자가 왜 넣는지 알아야 넣는다 */
  runs: string;
  issueUrl?: string;
  placeholder: string;
};

/**
 * 벤더 단위로만 둔다.
 *
 * "Claude Code 용 키" / "Codex 용 키" 로 나누지 않는다 — Claude Code 는 Anthropic
 * 키를, Codex 는 OpenAI 키를 쓰므로 사용자는 벤더당 한 번만 넣으면 된다. 실행
 * 모드로 등록을 시도하면 서버가 400 을 낸다.
 */
const VENDOR_META: Record<AiCredentialVendor, VendorMeta> = {
  ANTHROPIC: {
    label: 'Anthropic',
    runs: 'Claude Code 코딩 에이전트가 이 키로 실행됩니다.',
    issueUrl: 'https://platform.claude.com',
    placeholder: 'sk-ant-api03-...',
  },
  OPENAI: {
    label: 'OpenAI',
    runs: 'Codex 코딩 에이전트가 이 키로 실행됩니다.',
    issueUrl: 'https://platform.openai.com/account/api-keys',
    placeholder: 'sk-...',
  },
  GLM: {
    label: 'GLM',
    runs: 'GLM 모델 요청이 이 키로 나갑니다.',
    placeholder: 'API 키를 붙여넣으세요',
  },
};

function MeAiCredentialsPanel() {
  const queryClient = useQueryClient();
  const { data: credentials = [], isLoading } = useAiCredentialListQuery(AI_CREDENTIALS_QUERY_KEY);

  /** 지금 입력 폼이 열려 있는 벤더. 하나만 연다 */
  const [editingVendor, setEditingVendor] = useState<AiCredentialVendor | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [label, setLabel] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const invalidate = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ['ai-credential-list'] });
    // 등록·삭제로 쓸 수 있는 코딩 에이전트가 바뀐다. 제공자 목록도 다시 읽는다
    void queryClient.invalidateQueries({ queryKey: ['ai-provider-list'] });
  }, [queryClient]);

  const closeForm = useCallback(() => {
    setEditingVendor(null);
    setApiKey('');
    setLabel('');
    setFormError(null);
  }, []);

  const saveMutation = useMutation({
    mutationFn: ({
      vendor,
      key,
      name,
    }: {
      vendor: AiCredentialVendor;
      key: string;
      name: string;
    }) => putAiCredential(vendor, { apiKey: key, label: name || null }),
    onSuccess: (_result, variables) => {
      invalidate();
      setNotice(`${VENDOR_META[variables.vendor].label} 키를 저장했습니다.`);
      closeForm();
    },
    onError: (error) => {
      // 붙여넣기에 개행이 섞이면 400 이 온다. trim 은 이미 했으므로 서버 문구를 그대로 보인다
      setFormError(composeApiErrorMessage(error, '키를 저장하지 못했습니다.'));
    },
  });

  const removeMutation = useMutation({
    mutationFn: (vendor: AiCredentialVendor) => deleteAiCredential(vendor),
    onSuccess: (_result, vendor) => {
      invalidate();
      setNotice(`${VENDOR_META[vendor].label} 키를 삭제했습니다.`);
    },
    onError: (error) => {
      // 404(이미 없음)도 여기로 온다. 목록을 다시 읽어 화면과 서버를 맞춘다
      invalidate();
      setNotice(composeApiErrorMessage(error, '키를 삭제하지 못했습니다.'));
    },
  });

  const handleSubmit = (vendor: AiCredentialVendor) => {
    setFormError(null);
    setNotice(null);

    const trimmedKey = apiKey.trim();
    if (!trimmedKey) {
      setFormError('API 키를 입력해주세요.');
      return;
    }

    saveMutation.mutate({ vendor, key: trimmedKey, name: label.trim() });
  };

  const isBusy = saveMutation.isPending || removeMutation.isPending;

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
        <p className="text-[13px] leading-relaxed text-[#64748b]">
          본인 AI API 키를 등록하면 코딩 에이전트가 그 키로 실행됩니다.{' '}
          <b className="font-semibold text-[#0f172a]">
            사용량은 등록한 본인 계정으로 직접 청구됩니다.
          </b>{' '}
          Qeploy 가 대신 결제하거나 중개하지 않습니다.
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-[#94a3b8]">
          저장된 키는 어떤 응답에도 평문으로 오지 않습니다. 등록 직후에도 마스킹된 값만 표시되므로
          다시 확인할 수 없고, 잊었다면 새 키로 교체하면 됩니다.
        </p>
      </section>

      {notice ? (
        <p role="status" className="text-[12px] whitespace-pre-line text-[#475569]">
          {notice}
        </p>
      ) : null}

      <ul className="flex flex-col gap-3">
        {VENDOR_ORDER.map((vendor) => {
          const meta = VENDOR_META[vendor];
          const registered = credentials.find((item) => item.provider === vendor);
          const isEditing = editingVendor === vendor;

          return (
            <li
              key={vendor}
              className="rounded-2xl border border-[#e2e8f0] bg-white p-5"
              data-testid={`ai-credential-${vendor}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[15px] font-bold text-[#0f172a]">{meta.label}</h3>
                    {registered ? (
                      <span className="rounded-full bg-[#f0fdf4] px-2 py-0.5 text-[11px] font-semibold text-[#15803d]">
                        등록됨
                      </span>
                    ) : (
                      <span className="rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-semibold text-[#64748b]">
                        미등록
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#64748b]">{meta.runs}</p>

                  {isLoading ? (
                    <div className="mt-2 h-4 w-32 animate-pulse rounded bg-[#e2e8f0]" />
                  ) : registered ? (
                    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                      {/* 서버가 앞 6자만 남겨 보낸다. 화면에서 다시 자르지 않는다 */}
                      <code className="rounded bg-[#f8fafc] px-2 py-0.5 font-mono text-[12px] text-[#334155]">
                        {registered.maskedApiKey}
                      </code>
                      {registered.label ? (
                        <span className="text-[12px] text-[#94a3b8]">{registered.label}</span>
                      ) : null}
                    </p>
                  ) : null}
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {meta.issueUrl ? (
                    <a
                      href={meta.issueUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-[12px] font-medium text-[#64748b] transition hover:text-[#0f172a]"
                    >
                      키 발급
                      <ExternalLink className="size-3.5" aria-hidden />
                    </a>
                  ) : null}
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => {
                      setNotice(null);
                      setFormError(null);
                      setApiKey('');
                      setLabel(registered?.label ?? '');
                      setEditingVendor(isEditing ? null : vendor);
                    }}
                    className="h-9 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:opacity-50"
                  >
                    {isEditing ? '취소' : registered ? '키 교체' : '키 등록'}
                  </button>
                  {registered ? (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => {
                        setNotice(null);
                        removeMutation.mutate(vendor);
                      }}
                      className="h-9 rounded-lg border border-[#fecaca] px-3 text-[12px] font-semibold text-[#dc2626] transition hover:bg-[#fef2f2] disabled:opacity-50"
                    >
                      삭제
                    </button>
                  ) : null}
                </div>
              </div>

              {isEditing ? (
                <form
                  className="mt-4 flex flex-col gap-2 border-t border-[#f1f5f9] pt-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(vendor);
                  }}
                >
                  <label className="flex flex-col gap-1">
                    <span className="text-[12px] font-semibold text-[#334155]">API 키</span>
                    <input
                      value={apiKey}
                      onChange={(event) => setApiKey(event.target.value)}
                      placeholder={meta.placeholder}
                      autoComplete="off"
                      spellCheck={false}
                      // 입력 중에도 평문이 남지 않도록 비밀번호 필드로 둔다
                      type="password"
                      className="h-9 rounded-lg border border-[#e5e7eb] px-3 font-mono text-[13px] text-[#0f172a] outline-none focus:border-[#7c3aed]"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[12px] font-semibold text-[#334155]">
                      이름 <span className="font-normal text-[#94a3b8]">(선택, 최대 64자)</span>
                    </span>
                    <input
                      value={label}
                      maxLength={64}
                      onChange={(event) => setLabel(event.target.value)}
                      placeholder="개인 계정"
                      className="h-9 rounded-lg border border-[#e5e7eb] px-3 text-[13px] text-[#0f172a] outline-none focus:border-[#7c3aed]"
                    />
                  </label>

                  {formError ? (
                    <p role="alert" className="text-[12px] whitespace-pre-line text-[#dc2626]">
                      {formError}
                    </p>
                  ) : null}

                  <div className="mt-1 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={saveMutation.isPending}
                      className={cn(
                        'h-9 rounded-lg bg-[#7c3aed] px-4 text-[13px] font-semibold text-white transition',
                        'hover:bg-[#6d28d9] disabled:opacity-50',
                      )}
                    >
                      {saveMutation.isPending ? '저장 중…' : registered ? '교체' : '등록'}
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
            </li>
          );
        })}
      </ul>

      <p className="flex items-start gap-2 text-[12px] leading-relaxed text-[#94a3b8]">
        <KeyRound className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        키를 등록하면 에이전트 화면의 AI 제공자 목록에 해당 코딩 에이전트가 나타납니다. 등록하지
        않은 채로 고르면 요청이 거절됩니다.
      </p>
    </div>
  );
}

export default MeAiCredentialsPanel;
