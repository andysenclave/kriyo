import { TaskSummaryCard } from "./components/TaskSummaryCard";
import { PlannedTaskList } from "./components/PlannedTaskList";
import { FaRegClock, FaRegFlag } from "react-icons/fa";

const plannedTasks: { status: "In progress" | "To do"; title: string; date: string }[] = [
  { status: "In progress", title: "Copy review", date: "Today" },
  { status: "In progress", title: "Plan the meetings for next week", date: "Today" },
  { status: "To do", title: "Review all the tasks completed", date: "Today" },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-[320px]">
          <div className="text-lg font-semibold mb-1">
            Hello, <span className="text-primary font-bold">Suzanne</span>
          </div>
          <div className="text-muted-foreground mb-6 text-sm">
            You have <span className="font-semibold text-primary">3 tasks</span> to complete today.
          </div>
          <div className="flex gap-4 mb-6">
            <TaskSummaryCard
              title="Overdue tasks"
              count={12}
              color="primary"
              icon={<FaRegClock size={28} />}
            />
            <TaskSummaryCard
              title="High priority tasks"
              count={5}
              color="danger"
              icon={<FaRegFlag size={28} />}
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-base">Planned tasks</div>
            <button className="text-primary text-xs font-medium flex items-center gap-1 hover:underline">
              View all <span>→</span>
            </button>
          </div>
          <PlannedTaskList tasks={plannedTasks} />
        </div>
        {/* Calendar and other sections would go here */}
      </div>
    </div>
  );
};

export default DashboardPage;
