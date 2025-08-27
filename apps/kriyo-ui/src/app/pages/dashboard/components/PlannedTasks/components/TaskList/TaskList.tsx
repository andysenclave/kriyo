'use client';

import { Button } from '@/components/ui/button';
import { StatusLabel } from '@/app/components/labels';
import { useDashboardTasks } from '../../../../hooks';
import { dateUtils } from '@/app/utils';
import { useRouter } from 'next/navigation';

const PlannedTaskList: React.FC = () => {
  const { data } = useDashboardTasks();
  const router = useRouter();

  const handleGoToTaskClick = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  return (
    <div className="divide-y divide-muted rounded-xl border bg-background p-4">
      {data?.tasks.map((task, idx) => (
        <div key={idx} className="flex items-center justify-between py-3">
          <StatusLabel status={task.status} />
          <span className="flex-1 ml-4 truncate text-sm font-medium">{task.title}</span>
          <span className="text-xs px-2 py-1 bg-muted rounded-lg mx-2">
            {dateUtils.getRelativeDateToToday(task.dueDate)}
          </span>
          <Button
            variant="link"
            className="text-primary px-0 text-xs h-auto cursor-pointer"
            onClick={() => handleGoToTaskClick(task.id)}
          >
            Go to task
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlannedTaskList;
