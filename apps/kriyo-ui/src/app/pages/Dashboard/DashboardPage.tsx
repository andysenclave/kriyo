import PlannedTasks from './components/PlannedTasks';
import ProjectList from './components/ProjectList';
import Calendar from './components/Calendar';
import TaskActionArea from './components/TaskActionArea';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <div className="p-6 w-full">
        <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 flex flex-col gap-6">
            <PlannedTasks userName="Andy" />
          </div>
          <div className="md:col-span-1">
            <TaskActionArea />
            <Calendar />
          </div>
        </div>
        <ProjectList />
      </div>
    </div>
  );
};

export default DashboardPage;
