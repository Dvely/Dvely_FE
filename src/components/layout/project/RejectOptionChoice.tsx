import type { RejectOption } from '@/types/resultScope.type';

/**
 * 거절할 때 "어떻게 거절할지" 를 고르게 한다.
 *
 * 지금까지 거절은 하나였는데 사용자가 기대하는 것은 둘이었다. preview 에 남겨 두고
 * 이어서 고치려는 것과, 이번 변경을 없던 걸로 하려는 것. 하나로 묶어 두니 **거절해 둔
 * 변경이 다음 승인 때 main 에 묻어 들어갔다.**
 *
 * 라벨과 설명은 **서버가 준 문장 그대로** 쓴다. 각 선택이 어떤 결과를 낳는지는 서버가
 * 가장 정확히 알고, 화면이 따로 쓰면 두 벌이 되어 어긋난다.
 */

type RejectOptionChoiceProps = {
  approvalId: number;
  options: RejectOption[];
  selected: RejectOption['option'];
  disabled: boolean;
  onSelect: (option: RejectOption['option']) => void;
};

function RejectOptionChoice({
  approvalId,
  options,
  selected,
  disabled,
  onSelect,
}: RejectOptionChoiceProps) {
  if (options.length === 0) return null;

  return (
    <fieldset className="mt-3 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-2">
      <legend className="px-1 text-[11px] font-semibold text-[#475569]">거절 방식</legend>

      <div className="flex flex-col gap-1.5">
        {options.map((option) => {
          const id = `reject-option-${approvalId}-${option.option}`;
          // 쓸 수 없는 선택지도 지우지 않고 남긴다. 왜 못 쓰는지가 정보다
          const unavailable = !option.available;

          return (
            <div key={option.option} className="flex gap-2">
              <input
                type="radio"
                id={id}
                name={`reject-option-${approvalId}`}
                value={option.option}
                checked={selected === option.option}
                disabled={disabled || unavailable}
                onChange={() => onSelect(option.option)}
                className="mt-0.5 size-3.5 shrink-0 accent-[#0f172a] disabled:cursor-not-allowed"
              />
              <label
                htmlFor={id}
                className={`min-w-0 text-[12px] leading-relaxed ${
                  unavailable ? 'cursor-not-allowed text-[#94a3b8]' : 'text-[#334155]'
                }`}
              >
                <span className="font-medium">{option.label}</span>
                <span className="block text-[11px] leading-relaxed text-[#64748b]">
                  {option.description}
                </span>
                {unavailable && option.unavailableReason ? (
                  <span className="block text-[11px] leading-relaxed text-[#92400e]">
                    {option.unavailableReason}
                  </span>
                ) : null}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export default RejectOptionChoice;
