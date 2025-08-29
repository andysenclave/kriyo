'use client';

import { useParams } from 'next/navigation';
import { TaskDetails } from '../components/Tasks';

const TaskDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  return <TaskDetails taskId={params.id} />;
};

export default TaskDetailPage;
