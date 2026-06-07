import { useCallback, useEffect, useId, useState } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import profileFallback from '@/assets/icons/profile.svg';
import { useUserInfoQuery } from '@/api/user';
import {
  MeAccountActionRow,
  MeAccountCreditRow,
  MeAccountSettingsSkeleton,
} from '@/components/layout/me/MeAccountSettings.shared';
import { formatDisplayName } from '@/components/layout/me/MeSettingsSidebar';
import { Input } from '@/components/ui/input';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { logoutSession } from '@/lib/logout';
import { cn } from '@/lib/utils';

const DEMO_CREDIT_TOTAL = 1000;
const DEMO_CREDIT_USED = 1000;
const DEMO_DAILY_REFRESH = 300;

function MeAccountSettingsPanel() {
  const [fullName, setFullName] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);

  const fullNameFieldId = useId();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [, syncAuthState] = useIsLoggedIn();
  const { data: userResponse, isLoading } = useUserInfoQuery('me-account-settings');

  const user = userResponse?.data;
  const username = user?.username?.trim() || 'user';
  const displayName = formatDisplayName(username);
  const avatarUrl = user?.avatarUrl?.trim() || profileFallback;
  const userId = user?.id != null ? String(user.id) : '';
  const email = username.includes('@') ? username : `${username}@users.noreply.github.com`;

  const handleCopyUserId = useCallback(async () => {
    if (!userId) return;

    try {
      await navigator.clipboard.writeText(userId);
      setCopyState('copied');
    } catch {
      setCopyState('idle');
    }
  }, [userId]);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logoutSession();
    } finally {
      setIsLoggingOut(false);
      syncAuthState();
      void navigate({ to: '/', replace: true });
    }
  }, [isLoggingOut, navigate, syncAuthState]);

  const handleDeleteAccount = () => {
    if (!isDeleteConfirming) {
      setIsDeleteConfirming(true);
      return;
    }

    setIsDeleteConfirming(false);
  };

  useEffect(() => {
    setFullName(displayName);
  }, [displayName]);

  useEffect(() => {
    if (copyState !== 'copied') return;

    const timer = window.setTimeout(() => setCopyState('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  if (isLoading) {
    return <MeAccountSettingsSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <label htmlFor={fullNameFieldId} className="text-[13px] font-medium text-[#334155]">
          {t('me.account.fullName')}
        </label>
        <div className="flex items-center gap-3">
          <img src={avatarUrl} alt="" className="size-9 shrink-0 rounded-full object-cover" />
          <Input
            id={fullNameFieldId}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="h-11 rounded-xl border-[#e2e8f0] bg-white text-[14px] text-[#0f172a]"
          />
        </div>
      </section>

      <section className="rounded-2xl bg-[#f8fafc] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-semibold text-[#0f172a]">{t('me.account.plan.free')}</p>
          <button
            type="button"
            className="inline-flex h-8 items-center rounded-lg bg-[#0f172a] px-3.5 text-[12px] font-semibold text-white transition hover:bg-[#1e293b]"
          >
            {t('me.account.plan.upgrade')}
          </button>
        </div>

        <div className="mt-4 divide-y divide-[#e2e8f0] border-t border-[#e2e8f0] pt-2">
          <MeAccountCreditRow
            icon={Sparkles}
            label={t('me.account.credits.title')}
            value={t('me.account.credits.value', {
              used: DEMO_CREDIT_USED,
              total: DEMO_CREDIT_TOTAL,
            })}
            helpLabel={t('me.account.credits.help')}
          />
          <MeAccountCreditRow
            icon={Calendar}
            label={t('me.account.dailyRefresh.title')}
            value={String(DEMO_DAILY_REFRESH)}
            description={t('me.account.dailyRefresh.description')}
            helpLabel={t('me.account.dailyRefresh.help')}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-[15px] font-semibold text-[#0f172a]">{t('me.account.personalInfo')}</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] font-medium text-[#64748b]">{t('me.account.email')}</p>
            <p className="text-[14px] text-[#0f172a]">{email}</p>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-[#64748b]">{t('me.account.userId')}</p>
              <p className="mt-1 break-all text-[14px] text-[#0f172a]">{userId || '—'}</p>
            </div>
            <button
              type="button"
              onClick={() => void handleCopyUserId()}
              disabled={!userId}
              className="inline-flex h-8 shrink-0 items-center rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copyState === 'copied' ? t('me.account.copied') : t('me.account.copy')}
            </button>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#e2e8f0]" role="separator" />

      <section className="flex flex-col gap-1">
        <h3 className="text-[15px] font-semibold text-[#0f172a]">{t('me.account.management')}</h3>
        <div className="flex flex-col divide-y divide-[#f1f5f9]">
          <MeAccountActionRow
            title={t('me.account.logout.title')}
            action={
              <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={isLoggingOut}
                className="inline-flex h-8 items-center rounded-lg border border-[#e2e8f0] bg-white px-3 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoggingOut ? t('me.account.logout.pending') : t('me.account.logout.action')}
              </button>
            }
          />
          <MeAccountActionRow
            title={t('me.account.delete.title')}
            description={
              isDeleteConfirming
                ? t('me.account.delete.confirmDescription')
                : t('me.account.delete.description')
            }
            danger
            action={
              <button
                type="button"
                onClick={handleDeleteAccount}
                className={cn(
                  'inline-flex h-8 items-center rounded-lg px-3 text-[12px] font-semibold transition',
                  isDeleteConfirming
                    ? 'bg-[#ef4444] text-white hover:bg-[#dc2626]'
                    : 'border border-[#fecaca] bg-white text-[#ef4444] hover:bg-[#fef2f2]',
                )}
              >
                {isDeleteConfirming
                  ? t('me.account.delete.confirmAction')
                  : t('me.account.delete.action')}
              </button>
            }
          />
        </div>
      </section>
    </div>
  );
}

export default MeAccountSettingsPanel;
