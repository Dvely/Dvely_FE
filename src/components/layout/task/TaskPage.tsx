import TaskPrompt from '@/components/layout/task/TaskPrompt';
import TaskTemplate from '@/components/layout/task/TaskTemplate';
import AppHeader from '@/components/common/AppHeader';

function TaskPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <AppHeader />
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <TaskPrompt />
        <TaskTemplate />
      </div>
    </div>
  );
}

export default TaskPage;
