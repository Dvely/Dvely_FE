import { useTranslation } from 'react-i18next';
import MeAccountSettingsPanel from '@/components/layout/me/MeAccountSettingsPanel';
import MeAiCredentialsPanel from '@/components/layout/me/MeAiCredentialsPanel';
import MeApiTokensPanel from '@/components/layout/me/MeApiTokensPanel';
import MeCloudConnectionsPanel from '@/components/layout/me/MeCloudConnectionsPanel';
import MeGeneralSettingsPanel from '@/components/layout/me/MeGeneralSettingsPanel';
import MeSettingsPlaceholderPanel from '@/components/layout/me/MeSettingsPlaceholderPanel';
import type { MeSettingsSectionId } from '@/components/layout/me/meSettingsNav';

type MeSettingsContentPanelProps = {
  activeSection: MeSettingsSectionId;
  /** 등록을 마쳤을 때. 돌아간 자리에서 보여줄 한 줄을 함께 넘긴다 */
  onSetupComplete?: (notice: string) => void;
};

function MeSettingsContentPanel({ activeSection, onSetupComplete }: MeSettingsContentPanelProps) {
  const { t } = useTranslation();
  const title = t(`me.nav.items.${activeSection}`);

  let panel = <MeSettingsPlaceholderPanel title={title} />;

  if (activeSection === 'account') {
    panel = <MeAccountSettingsPanel />;
  } else if (activeSection === 'general') {
    panel = <MeGeneralSettingsPanel />;
  } else if (activeSection === 'cloud-browser') {
    panel = (
      <MeCloudConnectionsPanel
        onConnected={
          onSetupComplete
            ? () => onSetupComplete('클라우드 연결을 마쳤습니다 — 이 프로젝트에 쓸 연결을 고르세요')
            : undefined
        }
      />
    );
  } else if (activeSection === 'ai-credentials') {
    panel = (
      <MeAiCredentialsPanel
        onSaved={
          onSetupComplete
            ? (vendorLabel) =>
                onSetupComplete(`${vendorLabel} 키를 등록했습니다 — 이어서 진행하세요`)
            : undefined
        }
      />
    );
  } else if (activeSection === 'api-tokens') {
    panel = <MeApiTokensPanel />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[22px] font-bold tracking-tight text-[#0f172a]">{title}</h2>
      {panel}
    </div>
  );
}

export default MeSettingsContentPanel;
