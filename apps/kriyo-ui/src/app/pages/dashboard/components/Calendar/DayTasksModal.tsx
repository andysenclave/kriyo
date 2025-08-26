import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StatusLabel } from '@/app/components/labels';
import Task from '@/app/providers/MyTasksProvider/models/Task';
import AddNewTaskBtn from '../TaskActionArea/components/AddNewTask';
import { dateUtils } from '@/app/utils';

interface DayTasksModalProps {
  open: boolean;
  onClose: () => void;
  date: Date;
  tasks: Task[];
}

const DayTasksModal: React.FC<DayTasksModalProps> = ({ open, onClose, date, tasks }) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-full p-6">
        <DialogHeader>
          <DialogTitle>Tasks for {date.toLocaleDateString()}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 my-4">
          {tasks.length === 0 ? (
            <div className="text-center text-muted-foreground">No tasks for this day.</div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-background"
              >
                <StatusLabel status={task.status} />
                <span className="flex-1 ml-4 truncate text-sm font-medium">{task.title}</span>
                <span className="text-xs px-2 py-1 bg-muted rounded-lg mx-2">
                  {dateUtils.getRelativeDateToToday(task.dueDate)}
                </span>
                <Button
                  asChild
                  variant="link"
                  className="text-primary px-0 text-xs h-auto cursor-pointer"
                >
                  <a href={`/tasks/${task.id}`}>Go to task</a>
                </Button>
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
