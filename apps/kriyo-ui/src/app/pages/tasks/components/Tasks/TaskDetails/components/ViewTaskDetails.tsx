'use client';

import { PriorityLabel, StatusLabel } from '@/app/components/labels';
import { Task } from '@/app/hooks/tasks/models';
import { Calendar, Clock, User } from 'lucide-react';

interface ViewTaskDetailsProps {
  task: Task;
}

const ViewTaskDetails = ({ task }: ViewTaskDetailsProps) => {
  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
          <div className="flex flex-row space-x-4">
            <PriorityLabel priority={task.priority} />
            <StatusLabel status={task.status} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span className="text-sm">Created by: {task.createdBy?.name as string}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {task.dueDate && (
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}

          {task.assignedTo && (
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">Assigned to: {task.assignedTo?.name}</span>
            </div>
          )}
        </div>
      </div>

      {task.description && (
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
          <div className="text-gray-700 whitespace-pre-wrap">{task.description}</div>
        </div>
      )}
    </div>
  );
};

export default ViewTaskDetails;
