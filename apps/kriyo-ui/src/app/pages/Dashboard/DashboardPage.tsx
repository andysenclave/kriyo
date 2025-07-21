import PlannedTasks from "./components/PlannedTasks";
import ProjectList from "./components/ProjectList";
import Calendar from "./components/Calendar";
import TaskActionArea from "./components/TaskActionArea";

const plannedTasks: { status: "In progress" | "To do"; title: string; date: string }[] = [
  { status: "In progress", title: "Copy review", date: "Today" },
  { status: "In progress", title: "Plan the meetings for next week", date: "Today" },
  { status: "To do", title: "Review all the tasks completed", date: "Today" },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <TaskActionArea />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          <PlannedTasks userName="Andy" plannedTasks={plannedTasks} />
        </div>
        <div className="md:col-span-1">
          <Calendar />
        </div>
      </div>
      <ProjectList />
    </div>
  );
};

export default DashboardPage;
