import { useTranslation } from 'react-i18next';
import MeGeneralSettingsPanel from '@/components/layout/me/MeGeneralSettingsPanel';
import MeSettingsPlaceholderPanel from '@/components/layout/me/MeSettingsPlaceholderPanel';
import type { MeSettingsSectionId } from '@/components/layout/me/meSettingsNav';

type MeSettingsContentPanelProps = {
  activeSection: MeSettingsSectionId;
};

function MeSettingsContentPanel({ activeSection }: MeSettingsContentPanelProps) {
  const { t } = useTranslation();
  const title = t(`me.nav.items.${activeSection}`);

  if (activeSection === 'general') {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-[22px] font-bold tracking-tight text-[#0f172a]">{title}</h2>
        <MeGeneralSettingsPanel />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] font-bold tracking-tight text-[#0f172a]">{title}</h2>
      <MeSettingsPlaceholderPanel title={title} />
    </div>
  );
}

export default MeSettingsContentPanel;
