import React from 'react';

export interface TaskItemProps {
  task: string;
  completed?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, completed = false }) => (
  <div className={`flex items-center p-2 border-b ${completed ? 'bg-green-100' : ''}`}>
    <input type="checkbox" checked={completed} readOnly className="mr-2" />
    <span className={completed ? 'line-through text-gray-400' : ''}>{task}</span>
  </div>
);

export default TaskItem;

