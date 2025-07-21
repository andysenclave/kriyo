import React from 'react';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = Array.from({ length: 30 }, (_, i) => i + 1);

const Calendar: React.FC = () => {
  return (
    <div className="rounded-2xl bg-white shadow p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <button className="text-xl font-bold">&#60;</button>
        <div className="font-semibold text-lg">April 2024</div>
        <button className="text-xl font-bold">&#62;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {dates.map((date) => (
          <div
            key={date}
            className={`rounded-full h-8 w-8 flex items-center justify-center mx-auto ${date === 5 ? 'bg-primary text-white font-bold' : 'hover:bg-muted'}`}
          >
            {date < 10 ? `0${date}` : date}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4 justify-center text-xs">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-primary inline-block" /> Personal
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-purple-400 inline-block" /> Projects
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-gray-400 inline-block" /> Other
        </span>
      </div>
    </div>
  );
};

export default Calendar;
