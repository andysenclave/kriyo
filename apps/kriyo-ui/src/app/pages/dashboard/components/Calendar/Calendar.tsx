'use client';

import React, { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import DayTasksModal from './DayTasksModal';
import { useDashboardTasks } from '../../hooks';

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
  const { data } = useDashboardTasks();
  const { tasks } = data || { tasks: [] };
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
    <div
      className="rounded-2xl bg-white shadow w-full max-w-md h-[426px] border-none"
      data-testid="task-calendar-root"
    >
      <Calendar
        fixedWeeks={true}
        mode="single"
        selected={new Date()}
        className="rounded-lg h-100% w-full"
        onDayClick={handleDayClick}
        data-testid="calendar"
      />
      <DayTasksModal
        open={showDayTasksModal}
        onClose={handleDayTasksModalClose}
        date={selectedDate}
        tasks={dayTasks}
        data-testid="day-tasks-modal"
      />
    </div>
  );
};

export default TaskCalendar;
