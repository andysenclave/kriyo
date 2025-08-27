'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StatusLabel } from '@/app/components/labels';
import AddNewTaskBtn from '../TaskActionArea/components/AddNewTask';
import { useTasksByDate } from '../../hooks';
import { useRouter } from 'next/navigation';
import { ViewAllBtn } from '@/app/components/buttons';

interface DayTasksModalProps {
  open: boolean;
  onClose: () => void;
  date: Date;
}

const DayTasksModal: React.FC<DayTasksModalProps> = ({ open, onClose, date }) => {
  const { data } = useTasksByDate(date.toISOString());
  const router = useRouter();

  const handleTaskClick = (id: string) => {
    router.push(`/tasks/${id}`);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle>Tasks for {date.toLocaleDateString()}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 my-4">
          {data?.tasks.length === 0 ? (
            <div className="text-center text-muted-foreground">No tasks for this day.</div>
          ) : (
            data?.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-background"
              >
                <StatusLabel status={task.status} />
                <span className="flex-1 ml-4 truncate text-sm font-medium">{task.title}</span>
                <ViewAllBtn onClick={() => handleTaskClick(task.id)} text="Go to task" />
              </div>
            ))
          )}
        </div>
        <div className="flex justify-end gap-2 items-center">
          <AddNewTaskBtn selectedDate={date} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DayTasksModal;
