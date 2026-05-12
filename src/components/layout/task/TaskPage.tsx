import { Bell } from 'lucide-react';
import TaskPrompt from './TaskPrompt';
import AppSidebar from '../../common/AppSidebar';
import profile from '@/assets/icons/profile.svg';

export default function TaskPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] text-[#0f172a]">
      <AppSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
        <header className="flex items-center justify-between  px-[18px] py-3.5">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[14px] font-bold tracking-[-0.14px] text-[#0f172a] transition hover:bg-[#f8fafc]"
            style={{ fontFamily: 'system-ui, Roboto, sans-serif' }}
          >
            Devely 1.0 Lite
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex size-[34px] items-center justify-center rounded-[9px] transition  cursor-pointer"
              aria-label="알림"
            >
              <Bell className="size-[18px]" />
            </button>

            <button className="flex size-[30px] items-center justify-center rounded-[15px]">
              <img src={profile} alt="profile" className="size-[30px]" />
            </button>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <TaskPrompt />
        </div>
      </div>
    </div>
  );
}
