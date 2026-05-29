import { Check } from 'lucide-react';

const steps = [
  { id: 1, label: '템플릿 선택' },
  { id: 2, label: '프로젝트 생성' },
  { id: 3, label: '깃허브 연결' },
] as const;

type HomeStepProgressProps = {
  currentStep: 1 | 2 | 3;
};

function HomeStepProgress({ currentStep }: HomeStepProgressProps) {
  return (
    <nav aria-label="진행 단계" className="flex items-center justify-center h-[70px]">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold ${
                    isCompleted || isActive ? 'bg-[#1d9bf0] text-white' : 'bg-[#d1d5db] text-white'
                  }`}
                >
                  {isCompleted ? <Check className="size-4" strokeWidth={3} /> : step.id}
                </span>
                <span
                  className={`whitespace-nowrap text-[15px] ${
                    isActive || isCompleted
                      ? 'font-bold text-[#0f172a]'
                      : 'font-medium text-[#9ca3af]'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast ? (
                <span
                  className="mx-5 h-px w-[72px] shrink-0 bg-[#e5e7eb] sm:w-[96px]"
                  aria-hidden
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default HomeStepProgress;
