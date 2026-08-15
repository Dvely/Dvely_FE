import { useState } from 'react';
import type { Approval, ApprovalInput } from '@/types/approval.type';
import type { ApprovalType } from '@/types/common.enum';

type AgentApprovalCardProps = {
  approval: Approval;
  isBusy: boolean;
  onApprove: (payload?: Record<string, string>) => void;
  onReject: () => void;
};

/** 승인 유형별 제목과 설명. 무엇을 승인하는지 버튼 바로 옆에서 읽히게 한다 */
const APPROVAL_COPY: Record<ApprovalType, { title: string; description: string }> = {
  CHANGE: {
    title: '변경 사항 승인',
    description: '에이전트가 만든 코드 변경을 적용할지 결정합니다.',
  },
  DEPLOYMENT: {
    title: '배포 승인',
    description: '이 작업물을 배포할지 결정합니다.',
  },
  DOMAIN_BINDING: {
    title: '도메인 연결 승인',
    description: '이 프로젝트에 도메인을 연결할지 결정합니다.',
  },
  INFRA_OPERATION: {
    title: '인프라 작업 승인',
    description: '인프라를 변경하는 작업입니다. 진행할지 결정합니다.',
  },
  REPOSITORY_BINDING: {
    title: 'GitHub 저장소 연결',
    description:
      '작업물이 준비됐는데 이 프로젝트에는 아직 GitHub 저장소가 연결되어 있지 않습니다. 아래 이름으로 새 저장소를 만들어 연결합니다.',
  },
  RESULT: {
    title: '작업 결과 승인',
    description: '에이전트가 낸 결과를 확정할지 결정합니다.',
  },
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

  const copy = APPROVAL_COPY[approval.type];
  const summary = approval.summary?.trim() ?? '';
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

      {summary ? (
        <p className="mt-2 break-all rounded-lg bg-white px-2.5 py-2 text-[12px] text-[#475569]">
          {summary}
        </p>
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
          onClick={onReject}
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
