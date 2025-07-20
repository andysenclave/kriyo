import React from 'react';

const Calendar: React.FC = () => {
  // Dummy data for a week
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [20, 21, 22, 23, 24, 25, 26];

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-md">
      <div className="flex justify-between mb-2">
        {days.map(day => (
          <span key={day} className="font-semibold text-gray-600 w-8 text-center">{day}</span>
        ))}
      </div>
      <div className="flex justify-between">
        {dates.map(date => (
          <span key={date} className="w-8 h-8 flex items-center justify-center rounded bg-blue-100 text-blue-700">
            {date}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
