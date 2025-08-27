'use client';

import TaskDetail from './TaskDetail';

interface TaskDetailPageProps {
  params: {
    id: string;
  };
}

const TaskDetailPage: React.FC<TaskDetailPageProps> = ({ params }) => {
  return <TaskDetail taskId={params.id} />;
};

export default TaskDetailPage;