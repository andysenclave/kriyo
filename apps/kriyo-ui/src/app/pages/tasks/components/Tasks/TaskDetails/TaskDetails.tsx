'use client';

import { useState } from 'react';
import { useTaskDetail } from '../../../hooks';
import TaskDetailsSkeleton from './components/TaskDetailsSkeleton';
import TaskDetailsHeader from './components/TaskDetailsHeader';
import ViewTaskDetails from './components/ViewTaskDetails';
import EditTaskDetails from './components/EditTaskDetails';

interface TaskDetailProps {
  taskId: string;
}

const TaskDetails = ({ taskId }: TaskDetailProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: task, isLoading, error, refetch } = useTaskDetail(taskId);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
    refetch();
  };


  if (isLoading) return <TaskDetailsSkeleton />;

  return (
    <div className="w-full p-4">
      <TaskDetailsHeader
        isEditing={isEditing}
        onStartEditing={handleStartEditing}
        hasError={!!error}
        errorMessage={error?.message}
      />
      {task && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {isEditing ? (
            <EditTaskDetails taskId={task.id} onStopEditing={handleStopEditing} task={task} />
          ) : (
            <ViewTaskDetails task={task} />
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
