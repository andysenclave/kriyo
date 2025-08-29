'use client';

import { ArrowLeft, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TaskDetailsHeaderProps {
  isEditing: boolean;
  onStartEditing: () => void;
  hasError?: boolean;
  errorMessage?: string;
}

const TaskDetailsHeader = ({
  isEditing,
  onStartEditing,
  hasError,
  errorMessage,
}: TaskDetailsHeaderProps) => {
  const router = useRouter();
  const showEditButton = !isEditing && !hasError;

  return (
    <div className="flex flex-row justify-between items-center">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Tasks
      </button>
      {showEditButton && (
        <button
          onClick={onStartEditing}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors cursor-pointer"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit Task
        </button>
      )}
      {hasError && (
        <div className="text-center py-12">
          <p className="text-red-600">{errorMessage || 'Task not found'}</p>
        </div>
      )}
    </div>
  );
};

export default TaskDetailsHeader;
