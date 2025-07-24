import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';
import { ChevronRightIcon } from 'lucide-react';

interface TaskSummaryCardProps {
  title: string;
  count: number;
  color: 'primary' | 'danger';
  icon: React.ReactNode;
}

const colorStyles = {
  primary: 'bg-gradient-to-br from-[#6D5DF6] to-[#4B3DF6] text-white',
  danger: 'bg-gradient-to-br from-[#FF6A6A] to-[#FF3D3D] text-white',
};

const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({ title, count, color, icon }) => {
  return (
    <Card
      className={`flex gap-0 flex-col justify-between p-4 rounded-md shadow-md w-[245px] h-[110px] ${colorStyles[color]}`}
    >
      <div className="flex items-center gap-3">{icon}</div>
      <div className="flex items-center gap-3 justify-between w-full">
        <span className="text-md font-semibold">{title}</span>
        <Button variant="ghost" size="icon" className="size-8 cursor-pointer :hover:bg-white/10">
          <ChevronRightIcon />
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm opacity-80">{count} tasks</span>
      </div>
      <div className="flex justify-end"></div>
    </Card>
  );
};

export default TaskSummaryCard;
