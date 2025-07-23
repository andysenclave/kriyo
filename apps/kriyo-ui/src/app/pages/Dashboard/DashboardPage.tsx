// import { Calendar } from '@/components/ui/calendar';
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
          <div className="rounded-2xl bg-white shadow w-full max-w-md h-[383px] border-none">
            <Calendar />
            {/* <Calendar mode="single" selected={new Date()} className="rounded-lg h-full w-full" /> */}
          </div>
        </div>
      </div>
      <ProjectList />
    </div>
  );
};

export default DashboardPage;
