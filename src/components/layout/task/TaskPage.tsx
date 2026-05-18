import TaskPrompt from './TaskPrompt';
import AppSidebar from '../../common/AppSidebar';
import DashboardTemplateGallery from './DashboardTemplateGallery';
import TaskPageHeader from './TaskHeader';

function TaskPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] text-[#0f172a]">
      <AppSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
        <TaskPageHeader />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <TaskPrompt />
          <DashboardTemplateGallery />
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
