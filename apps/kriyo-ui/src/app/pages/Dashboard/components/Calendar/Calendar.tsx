'use client';

import React, { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import DayTasksModal from './DayTasksModal';
import { useMyTasks } from '@/app/providers/MyTasksProvider';

interface TaskCalendarState {
  selectedDate: Date;
  showAddTaskModal: boolean;
  showDayTasksModal: boolean;
}

const initialState: TaskCalendarState = {
  selectedDate: new Date(),
  showAddTaskModal: false,
  showDayTasksModal: false,
};

const TaskCalendar: React.FC = () => {
  const { tasks } = useMyTasks();
  const [{ selectedDate, showDayTasksModal }, setTaskCalendarState] =
    useState<TaskCalendarState>(initialState);

  const handleDayClick = (date: Date) => {
    setTaskCalendarState((prev) => ({
      ...prev,
      selectedDate: date,
      showDayTasksModal: true,
    }));
  };

  const handleDayTasksModalClose = () => {
    setTaskCalendarState((prev) => ({
      ...prev,
      showDayTasksModal: false,
    }));
  };

  const dayTasks = useMemo(() => {
    if (!selectedDate) return [];
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [selectedDate, tasks]);

  return (
    <div className="rounded-2xl bg-white shadow w-full max-w-md h-[366px] border-none">
      <Calendar
        fixedWeeks={true}
        mode="single"
        selected={new Date()}
        className="rounded-lg h-100% w-full"
        onDayClick={handleDayClick}
      />
      <DayTasksModal
        open={showDayTasksModal}
        onClose={handleDayTasksModalClose}
        date={selectedDate}
        tasks={dayTasks}
      />
    </div>
  );
};

export default TaskCalendar;
