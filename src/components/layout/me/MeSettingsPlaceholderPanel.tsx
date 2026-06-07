type MeSettingsPlaceholderPanelProps = {
  title: string;
};

function MeSettingsPlaceholderPanel({ title }: MeSettingsPlaceholderPanelProps) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#e2e8f0] bg-[#f8fafc] px-6 py-12 text-center">
      <p className="text-[15px] font-semibold text-[#0f172a]">{title}</p>
      <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[#64748b]">
        이 설정 화면은 준비 중입니다. 곧 더 많은 옵션을 제공할 예정이에요.
      </p>
    </div>
  );
}

export default MeSettingsPlaceholderPanel;
