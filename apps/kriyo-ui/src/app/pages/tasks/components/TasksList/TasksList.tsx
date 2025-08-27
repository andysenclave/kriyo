'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { useTasksFiltered } from '../../hooks/useTasksFiltered';
import { TasksListSkeleton } from './TasksListSkeleton';
import Task from '@/app/pages/dashboard/hooks/tasks/models/Task';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface TasksListProps {
  filter: string;
}

const StatusRenderer = ({ value }: { value: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'in-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(value)}`}>
      {value}
    </span>
  );
};

const PriorityRenderer = ({ value }: { value: string }) => {
  if (!value) return <span className="text-gray-400">-</span>;
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(value)}`}>
      {value}
    </span>
  );
};

const DateRenderer = ({ value }: { value: string }) => {
  if (!value) return <span className="text-gray-400">-</span>;
  return new Date(value).toLocaleDateString();
};

export const TasksList: React.FC<TasksListProps> = ({ filter }) => {
  const router = useRouter();
  const { data, isLoading, error } = useTasksFiltered(filter);

  const columnDefs: ColDef<Task>[] = useMemo(() => [
    {
      field: 'title',
      headerName: 'Title',
      flex: 2,
      minWidth: 200,
      cellStyle: { cursor: 'pointer', fontWeight: '500' },
      onCellClicked: (params) => {
        router.push(`/tasks/${params.data?.id}`);
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      cellRenderer: StatusRenderer,
      filter: true,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 100,
      cellRenderer: PriorityRenderer,
      filter: true,
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 120,
      cellRenderer: DateRenderer,
      sort: 'asc',
      comparator: (dateA: string, dateB: string) => {
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      },
    },
    {
      field: 'createdBy.name',
      headerName: 'Created By',
      width: 120,
      filter: true,
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 120,
      cellRenderer: DateRenderer,
      sort: 'desc',
    },
  ], [router]);

  const defaultColDef: ColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  if (isLoading) {
    return <TasksListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading tasks: {error.message}</p>
      </div>
    );
  }

  if (!data?.tasks || data.tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500">
          {filter === 'all' 
            ? "You don't have any tasks yet."
            : `No tasks match the "${filter}" filter.`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        {data.tasks.length} task{data.tasks.length !== 1 ? 's' : ''} found
      </div>
      
      <div className="ag-theme-alpine w-full" style={{ height: 600 }}>
        <AgGridReact<Task>
          rowData={data.tasks}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          animateRows={true}
          enableCellTextSelection={true}
          onGridReady={(params: GridReadyEvent) => {
            params.api.sizeColumnsToFit();
          }}
        />
      </div>
    </div>
  );
};