'use client';

import { usePathname } from 'next/navigation';
import { TasksList } from './components/TasksList';
import { TasksHeader } from './components/TasksHeader';

interface TasksProps {
  filter?: string;
}

const Tasks: React.FC<TasksProps> = ({ filter: propFilter }) => {
  const pathname = usePathname();
  
  // Determine filter based on pathname or prop
  let filter = propFilter || 'all';
  if (!propFilter) {
    if (pathname.includes('/overdue')) {
      filter = 'overdue';
    } else if (pathname.includes('/high-priority')) {
      filter = 'high-priority';
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 w-full">
        <TasksHeader currentFilter={filter} />
        <TasksList filter={filter} />
      </div>
    </div>
  );
};

export default Tasks;
