import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

interface TaskSummaryCardProps {
  title: string;
  count: number;
  color: "primary" | "danger";
  icon: React.ReactNode;
}

const colorStyles = {
  primary: "bg-gradient-to-br from-[#6D5DF6] to-[#4B3DF6] text-white",
  danger: "bg-gradient-to-br from-[#FF6A6A] to-[#FF3D3D] text-white",
};

const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({
  title,
  count,
  color,
  icon,
}) => {
  return (
    <Card className={`flex flex-col justify-between p-6 rounded-xl shadow-md min-w-[180px] min-h-[120px] ${colorStyles[color]}`}>
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm opacity-80">{count} tasks</div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="ghost" className="text-white/80 hover:text-white">
          <span className="mr-2">→</span>
        </Button>
      </div>
    </Card>
  );
};

export default TaskSummaryCard;
