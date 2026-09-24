import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import profileFallback from '@/assets/icons/profile.svg';
import { useUserInfoQuery } from '@/api/user';
import {
  MeAccountActionRow,
  MeAccountSettingsSkeleton,
} from '@/components/layout/me/MeAccountSettings.shared';
import { formatDisplayName } from '@/components/layout/me/MeSettingsSidebar';
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
  const username = user?.username?.trim() || 'user';
  const displayName = formatDisplayName(username);
  const avatarUrl = user?.avatarUrl?.trim() || profileFallback;
  const userId = user?.id != null ? String(user.id) : '';
  /*
    서버가 이메일을 안 준다.

    예전에는 GitHub 사용자명에 `@users.noreply.github.com` 을 붙여 **주소를 지어냈다.**
    그건 사용자의 이메일이 아니고, "개인 정보 > 이메일" 자리에 놓이면 사용자는 그게
    자기 주소인 줄 안다. 없는 것을 있는 것처럼 보여주는 쪽이 비어 있는 것보다 나쁘다.

    지금 확실히 아는 것은 GitHub 계정뿐이라 그것을 그 이름으로 보여준다.
  */

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
        <p className="text-[13px] font-medium text-[#334155]">{t('me.account.fullName')}</p>
        <div className="flex items-center gap-3">
          <img src={avatarUrl} alt="" className="size-9 shrink-0 rounded-full object-cover" />
          <div className="flex h-11 min-w-0 flex-1 items-center rounded-xl border border-[#e2e8f0] bg-white px-3.5 text-[14px] text-[#0f172a]">
            {displayName}
          </div>
        </div>
      </section>

      {/*
        요금제·크레딧 블록을 걷어냈다.

        "무료 / 크레딧 1000 중 1000 / 매일 00:00에 300으로 새로고침" 이 전부 화면에
        박아둔 상수였다. 서버에는 그런 값을 주는 API 가 없고(`GET /users/me` 는 GitHub
        정보만 준다), "업그레이드" 버튼에는 onClick 조차 없었다.

        게다가 지금은 **사용량이 사용자 본인 AI 제공자 계정으로 청구된다**(BYOK). 우리가
        세는 크레딧이라는 개념 자체가 없다. "준비 중" 으로 남겨두는 것도 맞지 않는다 —
        준비 중인 기능이 아니라 이 제품에 없는 개념이다.

        사용량을 보여줄 일이 생기면 그때는 서버가 주는 값으로 다시 세운다.
      */}

      <section className="flex flex-col gap-4">
        <h3 className="text-[15px] font-semibold text-[#0f172a]">{t('me.account.personalInfo')}</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] font-medium text-[#64748b]">
              {t('me.account.githubAccount')}
            </p>
            <p className="text-[14px] text-[#0f172a]">{username}</p>
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
        </div>
      </section>
    </div>
  );
}

export default MeAccountSettingsPanel;
