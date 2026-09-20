import { Bell } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import profile from '@/assets/icons/profile.svg';
import qeployLogo from '@/assets/images/qeploy-logo-primary.svg';
import { useUserInfoQuery } from '@/api/user';
import MeSettingsDialog from '@/components/layout/me/MeSettingsDialog';
import NotificationsDialog from '@/components/layout/notifications/NotificationsDialog';

function AppHeader() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { data: userResponse } = useUserInfoQuery('app-header');
  const avatarUrl = userResponse?.data?.avatarUrl?.trim();
  const profileImageSrc = avatarUrl || profile;

  return (
    <>
      <header className="flex items-center justify-between px-[18px] py-3.5">
        <Link
          to="/"
          className="flex items-center rounded-lg px-2 py-1.5 transition hover:bg-[#f8fafc]"
          aria-label="Qeploy 홈"
        >
          <img src={qeployLogo} alt="Qeploy" width={81} height={22} className="h-[22px] w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex size-[34px] items-center justify-center rounded-[9px] transition hover:bg-[#f1f5f9] cursor-pointer"
            aria-label="알림"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell className="size-[18px]" />
          </button>

          <button
            type="button"
            className="flex size-[30px] items-center justify-center rounded-[15px] cursor-pointer overflow-hidden"
            aria-label="프로필"
            aria-expanded={settingsOpen}
            onClick={() => setSettingsOpen(true)}
          >
            <img src={profileImageSrc} alt="" className="size-[30px] rounded-[15px] object-cover" />
          </button>
        </div>
      </header>

      <MeSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <NotificationsDialog open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </>
  );
}

export default AppHeader;
