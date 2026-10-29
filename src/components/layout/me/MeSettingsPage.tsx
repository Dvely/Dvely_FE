import { useCallback, useEffect, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import SetupReturnBar from '@/components/common/SetupReturnBar';
import MeSettingsShell from '@/components/layout/me/MeSettingsShell';
import {
  meSettingsNavGroups,
  type MeSettingsSectionId,
} from '@/components/layout/me/meSettingsNav';
import { SETUP_RETURN_DELAY_MS } from '@/lib/setupReturn';

type MeSettingsPageProps = {
  /** ?section= 으로 들어온 값. 모르는 값이면 무시하고 기본 절을 연다 */
  initialSection?: string;
  /** 프로젝트에서 왔을 때 돌아갈 자리. toSafeReturnPath 를 거친 값만 온다 */
  returnTo?: string | null;
};

const KNOWN_SECTIONS = new Set<string>(
  meSettingsNavGroups.flatMap((group) => group.items.map((item) => item.id)),
);

function MeSettingsPage({ initialSection, returnTo }: MeSettingsPageProps) {
  const router = useRouter();
  const section =
    initialSection && KNOWN_SECTIONS.has(initialSection)
      ? (initialSection as MeSettingsSectionId)
      : undefined;

  /*
    등록을 마치면 하던 자리로 돌려보낸다. 바로 옮기지 않고 잠깐 둔다 — 저장됐다는 말을
    읽지도 못하고 화면이 바뀌면 됐는지 안 됐는지 모른 채 돌아가게 된다.

    돌아가기 전에 이 화면을 떠나면 타이머도 같이 걷힌다. 다른 곳으로 간 사람을 뒤늦게
    끌고 가지 않는다.
  */
  const [isReturning, setIsReturning] = useState(false);
  const handleSetupComplete = useCallback(() => setIsReturning(true), []);
  useEffect(() => {
    if (!isReturning || !returnTo) return;
    const timer = window.setTimeout(() => router.history.push(returnTo), SETUP_RETURN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [isReturning, returnTo, router]);

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 py-6 sm:px-6">
      {returnTo ? (
        <SetupReturnBar
          returnTo={returnTo}
          message={
            isReturning
              ? '등록을 마쳤습니다. 하던 곳으로 돌아갑니다…'
              : '등록을 마치면 하던 곳으로 자동으로 돌아갑니다.'
          }
        />
      ) : null}
      <MeSettingsShell
        variant="page"
        initialSection={section}
        onSetupComplete={returnTo ? handleSetupComplete : undefined}
      />
    </div>
  );
}

export default MeSettingsPage;
