import { useState } from 'react';
import { Moon, Sun, SunMoon } from 'lucide-react';
import MeSettingsToggle from '@/components/layout/me/MeSettingsToggle';
import { cn } from '@/lib/utils';

type ThemeOption = 'light' | 'dark' | 'auto';

const themeOptions: { value: ThemeOption; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: '라이트', icon: Sun },
  { value: 'dark', label: '다크', icon: Moon },
  { value: 'auto', label: '자동', icon: SunMoon },
];

function MeGeneralSettingsPanel() {
  const [language, setLanguage] = useState('ko');
  const [theme, setTheme] = useState<ThemeOption>('light');
  const [productUpdates, setProductUpdates] = useState(true);
  const [pendingTaskEmail, setPendingTaskEmail] = useState(true);
  const [marketingAds, setMarketingAds] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-5">
        <h3 className="text-[15px] font-semibold text-[#0f172a]">외관</h3>

        <div className="flex flex-col gap-2">
          <label htmlFor="me-settings-language" className="text-[13px] font-medium text-[#334155]">
            언어
          </label>
          <div className="relative">
            <select
              id="me-settings-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white px-3.5 text-[14px] text-[#0f172a] outline-none transition focus-visible:border-[#c4b5fd] focus-visible:ring-2 focus-visible:ring-[#7c3aed]/20"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]">
              ▾
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-[13px] font-medium text-[#334155]">테마</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {themeOptions.map(({ value, label, icon: Icon }) => {
              const isSelected = theme === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border bg-white px-4 py-4 transition',
                    isSelected
                      ? 'border-[#0f172a] ring-1 ring-[#0f172a]'
                      : 'border-[#e2e8f0] hover:border-[#cbd5e1]',
                  )}
                >
                  <Icon className="size-5 text-[#64748b]" strokeWidth={1.75} />
                  <span className="text-[13px] font-medium text-[#334155]">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px bg-[#e2e8f0]" role="separator" />

      <section className="flex flex-col gap-4">
        <h3 className="text-[15px] font-semibold text-[#0f172a]">통신 설정</h3>

        <div className="flex flex-col divide-y divide-[#f1f5f9]">
          <div className="flex items-start justify-between gap-4 py-4 first:pt-0">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium text-[#0f172a]">제품 업데이트 받기</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#64748b]">
                새로운 기능과 개선 사항을 가장 먼저 확인하세요.
              </p>
            </div>
            <MeSettingsToggle
              label="제품 업데이트 받기"
              checked={productUpdates}
              onChange={setProductUpdates}
            />
          </div>

          <div className="flex items-start justify-between gap-4 py-4">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium text-[#0f172a]">
                내 대기 중인 작업이 시작되면 이메일을 보내주세요
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#64748b]">
                작업이 시작될 때 이메일로 알려드립니다.
              </p>
            </div>
            <MeSettingsToggle
              label="대기 작업 시작 이메일 알림"
              checked={pendingTaskEmail}
              onChange={setPendingTaskEmail}
            />
          </div>

          <div className="flex items-start justify-between gap-4 py-4 last:pb-0">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium text-[#0f172a]">Devely에 대한 광고</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#64748b]">
                마케팅 목적으로 데이터를 수집·공유하는 데 동의합니다.
              </p>
            </div>
            <MeSettingsToggle
              label="Devely 광고 수신"
              checked={marketingAds}
              onChange={setMarketingAds}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default MeGeneralSettingsPanel;
