import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import SideSheet from '@/components/common/SideSheet';
import CloudConnectionCreateForm from '@/components/layout/me/CloudConnectionCreateForm';
import { useLeaveForSetup } from '@/hooks/useLeaveForSetup';
import { useProjectCloudConnection } from '@/hooks/useProjectCloudConnection';
import { composeApiErrorMessage } from '@/lib/apiErrorGuide';

type CloudConnectSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
  /** 설정·처음 쓰는 사람용 안내로 넘어갈 때 돌아올 자리 */
  returnPath: string;
};

/**
 * 프로젝트를 떠나지 않고 클라우드 연결을 등록하고 이 프로젝트에 붙이는 시트.
 *
 * 등록 → 권한 검증 → 이 프로젝트에 쓰기까지 한 자리에서 이어진다. 예전에는 설정으로
 * 넘어가 등록하고, 돌아와서 인프라 탭에서 다시 골라야 했다.
 *
 * "이 프로젝트에 쓰기" 는 사용자가 누른다. 검증이 끝났다고 대신 고르지 않는다 — 어느 AWS
 * 계정에서 과금될지 정하는 일이다.
 */
function CloudConnectSheet({ open, onOpenChange, projectId, returnPath }: CloudConnectSheetProps) {
  const leaveForSetup = useLeaveForSetup(returnPath);
  const { select } = useProjectCloudConnection(projectId);
  /** 이 시트에서 등록하고 검증까지 마친 연결 */
  const [verifiedId, setVerifiedId] = useState<number | null>(null);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setVerifiedId(null);
      select.reset();
    }
    onOpenChange(next);
  };

  return (
    <SideSheet
      open={open}
      onOpenChange={handleOpenChange}
      title="클라우드 연결 등록"
      description="IAM 사용자의 액세스 키를 넣으면 권한을 확인한 뒤 이 프로젝트에 붙일 수 있습니다. 하던 대화는 그대로 남아 있습니다."
      footer={
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <button
            type="button"
            onClick={() => leaveForSetup({ to: '/onboarding/cloud' })}
            className="cursor-pointer font-semibold text-[#7c3aed] underline underline-offset-2"
          >
            AWS 계정·키가 아직 없나요?
          </button>
          <button
            type="button"
            onClick={() => leaveForSetup({ to: '/settings', search: { section: 'cloud-browser' } })}
            className="cursor-pointer font-semibold text-[#334155] underline underline-offset-2"
          >
            설정에서 연결 관리하기
          </button>
        </div>
      }
    >
      <CloudConnectionCreateForm layout="stacked" onVerified={setVerifiedId} />

      {verifiedId != null ? (
        <div className="mt-4 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#15803d]">
            <CheckCircle2 className="size-4" aria-hidden />이 연결을 이 프로젝트에 쓸까요?
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-[#166534]">
            이 프로젝트의 DB·서버·배포 자원이 이 계정에 만들어지고, 그 계정으로 청구됩니다.
          </p>
          <button
            type="button"
            disabled={select.isPending}
            onClick={() => select.mutate(verifiedId, { onSuccess: () => handleOpenChange(false) })}
            className="mt-3 inline-flex h-9 cursor-pointer items-center rounded-lg bg-[#15803d] px-4 text-[13px] font-semibold text-white transition hover:bg-[#166534] disabled:opacity-50"
          >
            {select.isPending ? '연결하는 중' : '이 프로젝트에 쓰기'}
          </button>
          {select.error ? (
            <p className="mt-2 text-[12px] leading-relaxed whitespace-pre-line text-[#b91c1c]">
              {composeApiErrorMessage(select.error, '연결을 고르지 못했습니다.')}
            </p>
          ) : null}
        </div>
      ) : null}
    </SideSheet>
  );
}

export default CloudConnectSheet;
