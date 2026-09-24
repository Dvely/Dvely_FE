import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import profileFallback from '@/assets/icons/profile.svg';
import { useUserInfoQuery } from '@/api/user';
import {
  MeAccountActionRow,
  MeAccountSettingsSkeleton,
} from '@/components/layout/me/MeAccountSettings.shared';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { logoutSession } from '@/lib/logout';

function MeAccountSettingsPanel() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [, syncAuthState] = useIsLoggedIn();
  const { data: userResponse, isLoading } = useUserInfoQuery('me-account-settings');

  const user = userResponse?.data;
  /*
    서버가 준 것만 보여준다. 못 받았으면 빈 값으로 두고 아래에서 '—' 로 그린다.

    예전에는 `|| 'user'` 로 채워서, 조회가 실패하면 화면에 `user` 라는 이름이 떴다.
    이메일을 사용자명으로 지어내던 것과 같은 종류다 — 서버가 모른다고 답한 자리에 우리가
    만든 값을 놓으면 사용자는 그게 자기 것인 줄 안다.
  */
  const username = user?.username?.trim() ?? '';
  const avatarUrl = user?.avatarUrl?.trim() || profileFallback;
  const userId = user?.id != null ? String(user.id) : '';

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
        {/*
          "전체 이름" 이 아니라 GitHub 계정이다.

          서버는 이름을 안 준다(`userSchema` 에 그런 필드가 없다). 예전에는 사용자명을
          `formatDisplayName` 으로 다듬어 `john-doe` → `John Doe` 로 만들고 그것을
          "전체 이름" 이라고 불렀다. 사용자가 적은 적 없는 이름이 진짜처럼 보인다 —
          이메일을 지어내던 것과 같은 패턴이다.
        */}
        <p className="text-[13px] font-medium text-[#334155]">{t('me.account.githubAccount')}</p>
        <div className="flex items-center gap-3">
          <img src={avatarUrl} alt="" className="size-9 shrink-0 rounded-full object-cover" />
          <div className="flex h-11 min-w-0 flex-1 items-center rounded-xl border border-[#e2e8f0] bg-white px-3.5 text-[14px] break-all text-[#0f172a]">
            {username || '—'}
          </div>
        </div>
      </section>


      <section className="flex flex-col gap-4">
        <h3 className="text-[15px] font-semibold text-[#0f172a]">{t('me.account.personalInfo')}</h3>
        <div className="flex flex-col gap-4">
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
        </div>
      </section>
    </div>
  );
}

export default MeAccountSettingsPanel;
