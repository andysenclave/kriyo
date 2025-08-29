import React from 'react';
import SearchTasksField from './components/SearchTasks';
import AddNewTaskBtn from './components/AddNewTask';

const TaskActions: React.FC = () => {
  return (
    <div
      data-testid="task-action-area"
      className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6"
    >
      <SearchTasksField />
      <AddNewTaskBtn />
    </div>
  );
};

export default TaskActions;
