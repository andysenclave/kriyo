'use client';

import { StatusLabel } from '@/app/components/labels';
import { useDashboardTasks } from '../../../../hooks';
import { dateUtils } from '@/app/utils';
import { useRouter } from 'next/navigation';
import { FaTasks } from 'react-icons/fa';

const PlannedTaskList: React.FC = () => {
  const { data } = useDashboardTasks();
  const router = useRouter();

  const handleGoToTaskClick = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  if (!data || data.tasks.length === 0) {
    return (
      <div className="divide-y divide-muted rounded-xl border bg-background p-2">
        <div className="text-center py-12">
          <div className="text-gray-600 mb-2 flex justify-center text-2xl">
            <FaTasks />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No tasks found</h3>
          <p className="text-gray-400">{`You don't have any tasks yet.`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-muted rounded-xl border bg-background p-2">
      {data?.tasks.map((task, idx) => (
        <div key={idx} className="flex items-center justify-between px-2 py-3">
          <div className="w-2/21">
            <StatusLabel status={task.status} />
          </div>
          <div className="w-3/7">
            <span
              className="flex-1 truncate text-sm font-medium cursor-pointer hover:underline underline-offset-2"
              onClick={() => handleGoToTaskClick(task.id)}
            >
              {task.title}
            </span>
          </div>
          <div className="w-4/21 flex items-center">
            <span className="flex-1 truncate text-sm font-medium">
              {task.assignedTo ? task.assignedTo.name : 'Unassigned'}
            </span>
          </div>
          <div className="w-1/9">
            <span className="text-xs px-2 py-1 bg-muted rounded-lg mx-2">
              {dateUtils.getRelativeDateToToday(task.dueDate)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlannedTaskList;
