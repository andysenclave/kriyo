import { Button } from '@/components/ui/button';
import React from 'react';
import { useMyTasks } from '../../providers/MyTasksProvider';

const statusColor: Record<string, string> = {
  'In progress': 'border-blue-500 text-blue-500',
  'To do': 'border-red-500 text-red-500',
};

const PlannedTaskList: React.FC = () => {
  const { tasks } = useMyTasks();
  return (
    <div className="divide-y divide-muted rounded-xl border bg-background p-4">
      {tasks.map((task, idx) => (
        <div key={idx} className="flex items-center justify-between py-3">
          <span
            className={`px-3 py-1 rounded-full border text-xs font-medium ${statusColor[task.status]}`}
          >
            {task.status}
          </span>
          <span className="flex-1 ml-4 truncate text-sm font-medium">{task.title}</span>
          <span className="text-xs px-2 py-1 bg-muted rounded-lg mx-2">{task.dueDate}</span>
          <Button variant="link" className="text-primary px-0 text-xs h-auto">
            Go to task
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlannedTaskList;
