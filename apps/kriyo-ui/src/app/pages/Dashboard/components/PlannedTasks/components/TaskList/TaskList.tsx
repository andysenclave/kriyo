import { Button } from '@/components/ui/button';
import React from 'react';
import { sortBy } from 'lodash';
import { useMyTasks } from '../../providers/MyTasksProvider';
import { StatusLabel } from '@/app/components/labels';
import { isToday, formatDistanceToNow } from 'date-fns';

const getRelativeDateToToday = (date?: string): string => {
  return date
    ? isToday(new Date(date))
      ? 'Today'
      : formatDistanceToNow(new Date(date), { addSuffix: true })
    : '';
};

const PlannedTaskList: React.FC = () => {
  const { scopedTasks } = useMyTasks();
  const { pending } = scopedTasks || {};
  const displayTasks = sortBy(pending, ['priorityRank', 'dueDate']).slice(0, 3);

  return (
    <div className="divide-y divide-muted rounded-xl border bg-background p-4">
      {displayTasks.map((task, idx) => (
        <div key={idx} className="flex items-center justify-between py-3">
          <StatusLabel status={task.status} />
          <span className="flex-1 ml-4 truncate text-sm font-medium">{task.title}</span>
          <span className="text-xs px-2 py-1 bg-muted rounded-lg mx-2">
            {getRelativeDateToToday(task.dueDate)}
          </span>
          <Button variant="link" className="text-primary px-0 text-xs h-auto">
            Go to task
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlannedTaskList;
