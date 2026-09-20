import MeSettingsShell from '@/components/layout/me/MeSettingsShell';
import {
  meSettingsNavGroups,
  type MeSettingsSectionId,
} from '@/components/layout/me/meSettingsNav';

type MeSettingsPageProps = {
  /** ?section= 으로 들어온 값. 모르는 값이면 무시하고 기본 절을 연다 */
  initialSection?: string;
};

const KNOWN_SECTIONS = new Set<string>(
  meSettingsNavGroups.flatMap((group) => group.items.map((item) => item.id)),
);

function MeSettingsPage({ initialSection }: MeSettingsPageProps) {
  const section =
    initialSection && KNOWN_SECTIONS.has(initialSection)
      ? (initialSection as MeSettingsSectionId)
      : undefined;

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 py-6 sm:px-6">
      <MeSettingsShell variant="page" initialSection={section} />
    </div>
  );
}

export default MeSettingsPage;
