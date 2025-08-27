'use client';

import { useSearchParams } from 'next/navigation';
import { TasksList } from './components/TasksList';
import { TasksHeader } from './components/TasksHeader';

const Tasks: React.FC = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

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
