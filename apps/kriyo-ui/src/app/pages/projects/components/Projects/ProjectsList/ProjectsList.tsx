'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule,
  IRowNode,
} from 'ag-grid-community';
import { ProjectsListSkeleton } from './ProjectsListSkeleton';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ProjectFilter, useGetMyProjects } from '../../../hooks';
import { PriorityLabel, StatusLabel } from '@/app/components/labels';
import { UserInfo } from '@/app/hooks/tasks/models/Task';
import { Project } from '@/app/hooks/projects/models';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ProjectsListProps {
  filter: ProjectFilter;
}

const StatusRenderer = ({ value }: { value: Project['status'] }) => {
  return <StatusLabel status={value} />;
};

const PriorityRenderer = ({ value }: { value: Project['priority'] }) => {
  return <PriorityLabel priority={value || 'none'} />;
};

const DateRenderer = ({ value }: { value: string }) => {
  if (!value) return <span className="text-gray-400">-</span>;
  return new Date(value).toLocaleDateString();
};

const ProjectsList: React.FC<ProjectsListProps> = ({ filter }) => {
  const router = useRouter();
  const { data, isLoading, error } = useGetMyProjects(filter);

  const columnDefs: ColDef<Project>[] = useMemo(
    () => [
      {
        field: 'title',
        headerName: 'Title',
        flex: 2,
        minWidth: 200,
        cellStyle: { cursor: 'pointer', fontWeight: '500' },
        onCellClicked: (params) => {
          router.push(`/projects/${params.data?.id}`);
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
        comparator: (valA, valB, rowA: IRowNode<Project>, rowB: IRowNode<Project>) => {
          const priorityRankA = rowA?.data?.priorityRank ?? 0;
          const priorityRankB = rowB?.data?.priorityRank ?? 0;
          return priorityRankA - priorityRankB;
        },
        filter: true,
      },
      {
        field: 'targetDate',
        headerName: 'Target Date',
        width: 120,
        cellRenderer: DateRenderer,
        sort: 'asc',
        comparator: (dateA: string, dateB: string) => {
          if (!dateA && !dateB) return 0;
          if (!dateA) return 1;
          if (!dateB) return -1;
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        },
        filter: 'agDateColumnFilter',
      },
      {
        field: 'assignedTo',
        headerName: 'Assigned To',
        width: 120,
        cellRenderer: ({ value }: { value: UserInfo | null }) => {
          if (!value) return <span className="text-gray-400">-</span>;
          return <span className="text-gray-800">{value.name}</span>;
        },
      },
    ],
    [router],
  );

  const defaultColDef: ColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    [],
  );

  if (isLoading) {
    return <ProjectsListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading tasks: {error.message}</p>
      </div>
    );
  }

  if ((!data || data.length === 0) && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
        <p className="text-gray-500">
          {filter === 'all'
            ? "You don't have any projects yet."
            : `No projects match the "${filter}" filter.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        {data?.length} projects{data?.length !== 1 ? 's' : ''} found
      </div>
      <div className="ag-theme-alpine w-full h-139 projects-grid">
        <style>{`
          .projects-grid .ag-cell {
            justify-content: center;
          }
          .projects-grid .ag-cell-wrapper {
            height: 100%;
          }
          .projects-grid .ag-cell-value {
            display: flex;
          }
        `}</style>
        <AgGridReact<Project>
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          theme="legacy"
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

export default ProjectsList;
