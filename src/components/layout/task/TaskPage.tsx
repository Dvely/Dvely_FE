import TaskPrompt from './TaskPrompt';
import AppSidebar from '../../common/AppSidebar';
import TaskTemplate from './TaskTemplate';
import TaskPageHeader from './TaskHeader';

function TaskPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] text-[#0f172a]">
      <AppSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
        <TaskPageHeader />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <TaskPrompt />
          <TaskTemplate />
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
