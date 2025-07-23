import React from 'react';
import SearchTasksField from './components/SearchTasks';
import AddNewTaskBtn from './components/AddNewTask';

const TaskActionArea: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <SearchTasksField />
      <AddNewTaskBtn />
    </div>
  );
};

export default TaskActionArea;
