/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async getDashboardTasks(userId: string) {
    // TODO: Call tasks-service to get dashboard data
    // This should return: { overdue: #count, highPriority: #count, tasks: #tasks[5] }

    return {
      overdue: 3,
      highPriority: 2,
      tasks: [
        {
          id: '1',
          title: 'Complete API Gateway',
          description: 'Implement routing for all API endpoints',
          dueDate: '2025-08-21',
          status: 'pending',
          priority: 'high',
        },
        {
          id: '2',
          title: 'Review pull request',
          description: 'Review the new feature implementation',
          dueDate: '2025-08-22',
          status: 'pending',
          priority: 'medium',
        },
      ],
    };
  }

  async getDashboardProjects(userId: string) {
    // TODO: Call projects-service to get dashboard projects

    return {
      projects: [
        {
          id: '1',
          title: 'Kriyo Development',
          description: 'Main development project',
          status: 'active',
          tasksCount: 12,
        },
      ],
    };
  }
}
