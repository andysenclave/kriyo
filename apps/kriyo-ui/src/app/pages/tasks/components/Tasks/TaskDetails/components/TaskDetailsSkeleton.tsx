'use client';

const TaskDetailsSkeleton = () => (
  <div className="max-w-4xl mx-auto p-6">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-20 mb-6"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

export default TaskDetailsSkeleton;
