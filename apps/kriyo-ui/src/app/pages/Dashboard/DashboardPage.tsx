import PlannedTasks from './components/PlannedTasks';
import ProjectList from './components/ProjectList';
import Calendar from './components/Calendar';
import TaskActionArea from './components/TaskActionArea';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          <PlannedTasks userName="Andy" />
        </div>
        <div className="md:col-span-1">
          <TaskActionArea />
          <Calendar />
        </div>
      </div>
      <ProjectList />
    </div>
  );
};

export default DashboardPage;
