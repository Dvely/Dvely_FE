import { useState } from 'react';
import { useApprovalResultScopeQuery } from '@/api/approvals';
import RejectOptionChoice from '@/components/layout/project/RejectOptionChoice';
import ResultScopePanel from '@/components/layout/project/ResultScopePanel';
import { APPROVAL_COPY, FALLBACK_APPROVAL_COPY } from '@/lib/approvalCopy';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';
import type { Approval, ApprovalInput } from '@/types/approval.type';
import type { RejectOption } from '@/types/resultScope.type';

type AgentApprovalCardProps = {
  approval: Approval;
  isBusy: boolean;
  onApprove: (payload?: Record<string, string>) => void;
  onReject: (rejectOption?: RejectOption['option']) => void;
};

const INPUT_LABEL: Record<string, string> = {
  repositoryName: '저장소 이름',
};

/** 서버가 내려준 명세로 입력값을 검증한다. 서버도 같은 규칙을 다시 적용한다 */
function validateInputValue(input: ApprovalInput, raw: string): string | null {
  const value = raw.trim();

  // 비워 보내면 서버가 defaultValue를 쓴다 — required가 아니면 빈 값도 유효하다
  if (!value) return input.required ? '값을 입력해주세요.' : null;

  if (input.maxLength != null && value.length > input.maxLength) {
    return `${input.maxLength}자 이하로 입력해주세요.`;
  }

  if (input.pattern) {
    try {
      if (!new RegExp(input.pattern).test(value)) return '형식이 올바르지 않습니다.';
    } catch {
      // 서버 정규식을 브라우저가 해석하지 못하면 검증은 서버에 맡긴다
    }
  }

  return null;
}

function AgentApprovalCard({ approval, isBusy, onApprove, onReject }: AgentApprovalCardProps) {
  const { input } = approval;
  const [value, setValue] = useState(input?.defaultValue ?? '');
  const [touched, setTouched] = useState(false);

  /*
    결과 승인만 반영 범위를 묻는다. 다른 유형(저장소 연결·배포 등)은 preview 를 main 에
    합치는 일이 아니라 물어볼 것이 없다. 서버도 RESULT 가 아니면 400 으로 거절한다.
  */
  const isResultApproval = approval.type === 'RESULT';
  const { data: scope, error: scopeError } = useApprovalResultScopeQuery(
    isResultApproval ? approval.approvalId : null,
  );

  const rejectOptions = scope?.rejectOptions ?? [];

  /*
    고른 적이 없으면 null 이고, 그때는 서버가 정한 기본값을 쓴다(`default: true`).
    지금 기본은 KEEP 이고 그게 예전 동작이다.

    effect 로 state 를 채우지 않는다. 그러면 응답이 다시 올 때마다 **사용자가 골라 둔
    것을 되돌릴** 위험이 있고, 누르려던 순간에 선택이 바뀌는 건 승인 화면에서 가장
    하면 안 되는 일이다. 파생값으로 두면 그 틈이 아예 없다.
  */
  const [chosenOption, setChosenOption] = useState<RejectOption['option'] | null>(null);
  const defaultOption =
    rejectOptions.find((option) => option.default && option.available)?.option ?? 'KEEP';
  const selectedOption = chosenOption ?? defaultOption;

  const copy = APPROVAL_COPY[approval.type] ?? FALLBACK_APPROVAL_COPY;
  const summary = approval.summary?.trim() ?? '';
  // summary가 입력 기본값을 되풀이할 뿐이면(예: "[저장소 연결] my-repo") 아래 입력 필드와
  // 같은 값이 두 번 보인다. 그럴 때는 입력 필드만 남긴다
  const showSummary =
    summary !== '' && !(input?.defaultValue && summary.includes(input.defaultValue));
  const error = input ? validateInputValue(input, value) : null;
  const showError = touched && error !== null;

  const handleApprove = () => {
    if (!input) {
      onApprove();
      return;
    }

    setTouched(true);
    if (error) return;

    const trimmed = value.trim();
    // 빈 값이면 본문을 생략해 서버가 defaultValue를 쓰게 둔다
    onApprove(trimmed ? { [input.field]: trimmed } : undefined);
  };

  return (
    <div className="rounded-xl border border-[#c4b5fd] bg-[#faf5ff] px-3.5 py-3">
      <p className="text-[13px] font-semibold text-[#4c1d95]">{copy.title}</p>
      <p className="mt-1 text-[12px] leading-relaxed text-[#6d28d9]">{copy.description}</p>

      {showSummary ? (
        <div className="mt-2 border-l-2 border-[#ddd6fe] pl-2.5">
          {/*
            에이전트의 자기 보고와 실제 반영 범위를 갈라 놓는다.

            둘이 섞여 있으면 "다른 파일은 전혀 건드리지 않았습니다" 를 읽고 승인했는데
            main 에는 네 파일이 들어가는 일이 생긴다. 자기 보고는 **이번 작업**에 대해
            맞는 말이고, 반영 범위는 그보다 넓을 수 있다. 같은 자리에 두면 그 차이가
            보이지 않는다.
          */}
          {isResultApproval ? (
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#a78bfa]">
              이번 작업 내용
            </p>
          ) : null}
          <p className="break-words text-[12px] leading-relaxed text-[#6d28d9]/80">{summary}</p>
        </div>
      ) : null}

      {scope ? <ResultScopePanel scope={scope} /> : null}

      {/*
        범위를 못 가져왔다. 이 호출은 전역 재인증 모달을 띄우지 않도록 막아 뒀으므로
        (닫기가 없어 사용자가 갇힌다) 여기서 직접 말해야 한다. 승인·거절은 막지 않는다 —
        막으면 범위를 못 본다는 이유로 아무것도 못 하게 된다.
      */}
      {isResultApproval && scopeError ? (
        <div className="mt-3 rounded-lg border border-[#fcd34d] bg-[#fffbeb] px-2.5 py-2">
          <p className="text-[11px] font-semibold text-[#92400e]">
            반영 범위를 불러오지 못했습니다
          </p>
          <p className="mt-1 whitespace-pre-line text-[11px] leading-relaxed text-[#92400e]/90">
            {composeApiErrorMessage(scopeError)}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#92400e]/80">
            지금 승인하면 이번 작업 외의 변경이 함께 반영되는지 확인하지 못한 채 반영됩니다.
          </p>
        </div>
      ) : null}

      {isResultApproval ? (
        <RejectOptionChoice
          approvalId={approval.approvalId}
          options={rejectOptions}
          selected={selectedOption}
          disabled={isBusy}
          onSelect={setChosenOption}
        />
      ) : null}

      {input ? (
        <div className="mt-3">
          <label
            htmlFor={`approval-input-${approval.approvalId}`}
            className="block text-[12px] font-medium text-[#4c1d95]"
          >
            {INPUT_LABEL[input.field] ?? input.field}
          </label>
          <input
            id={`approval-input-${approval.approvalId}`}
            value={value}
            disabled={isBusy}
            maxLength={input.maxLength ?? undefined}
            onChange={(event) => setValue(event.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={showError}
            aria-describedby={`approval-input-hint-${approval.approvalId}`}
            className={`mt-1 h-9 w-full rounded-lg border bg-white px-2.5 text-[13px] text-[#0f172a] outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
              showError ? 'border-[#dc2626]' : 'border-[#ddd6fe] focus:border-[#7c3aed]'
            }`}
          />
          <p
            id={`approval-input-hint-${approval.approvalId}`}
            className={`mt-1 text-[11px] leading-relaxed ${
              showError ? 'text-[#dc2626]' : 'text-[#7c3aed]'
            }`}
          >
            {showError
              ? error
              : input.required
                ? '필수 입력입니다.'
                : '비워 두면 위 이름 그대로 사용합니다.'}
          </p>
        </div>
      ) : null}

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={isBusy}
          onClick={() => onReject(isResultApproval ? selectedOption : undefined)}
          className="h-8 rounded-lg border border-[#ddd6fe] bg-white px-3 text-[12px] font-semibold text-[#64748b] disabled:cursor-not-allowed disabled:opacity-50"
        >
          거절
        </button>
        <button
          type="button"
          disabled={isBusy}
          onClick={handleApprove}
          className="h-8 rounded-lg bg-[#0f172a] px-3 text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isBusy ? '처리 중' : '승인'}
        </button>
      </div>
    </div>
  );
}

export default AgentApprovalCard;
