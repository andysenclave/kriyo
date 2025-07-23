'use client';
import React from 'react';
import { Calendar } from '@/components/ui/calendar';

const TaskCalendar: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white shadow w-full max-w-md h-[366px] border-none">
      <Calendar
        fixedWeeks={true}
        mode="single"
        selected={new Date()}
        className="rounded-lg h-100% w-full"
      />
    </div>
  );
};

export default TaskCalendar;
