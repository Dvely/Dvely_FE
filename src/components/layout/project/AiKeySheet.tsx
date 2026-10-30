import SideSheet from '@/components/common/SideSheet';
import MeAiCredentialsPanel from '@/components/layout/me/MeAiCredentialsPanel';
import { useLeaveForSetup } from '@/hooks/useLeaveForSetup';

type AiKeySheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 설정 화면으로 넘어갈 때 돌아올 자리 */
  returnPath: string;
  /** 키를 저장했을 때. 어느 벤더의 키인지 함께 온다 */
  onSaved: (vendorLabel: string) => void;
};

/**
 * 대화를 떠나지 않고 AI 키를 넣는 시트.
 *
 * 예전에는 설정 화면으로 통째로 넘어갔다가 돌아왔다. 화면이 두 번 바뀌어서, 보는 사람에게는
 * 맥락이 끊긴 것처럼 읽혔다. 시트는 대화를 왼쪽에 둔 채로 열리고, 저장하면 닫히면서 그
 * 자리의 제공자 선택에 바로 반영된다. 등록 폼은 설정과 같은 것을 쓴다 — 두 벌로 두면
 * 한쪽만 고쳐진다.
 */
function AiKeySheet({ open, onOpenChange, returnPath, onSaved }: AiKeySheetProps) {
  const leaveForSetup = useLeaveForSetup(returnPath);

  return (
    <SideSheet
      open={open}
      onOpenChange={onOpenChange}
      title="AI API 키 등록"
      description="저장하면 이 대화에서 바로 그 키로 실행됩니다. 하던 대화는 그대로 남아 있습니다."
      footer={
        <button
          type="button"
          onClick={() => leaveForSetup({ to: '/settings', search: { section: 'ai-credentials' } })}
          className="cursor-pointer font-semibold text-[#334155] underline underline-offset-2"
        >
          설정에서 키 관리하기
        </button>
      }
    >
      <MeAiCredentialsPanel
        onSaved={(vendorLabel) => {
          onSaved(vendorLabel);
          onOpenChange(false);
        }}
      />
    </SideSheet>
  );
}

export default AiKeySheet;
