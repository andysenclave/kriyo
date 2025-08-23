import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Project, Task } from 'src/models';
import { HttpClientService } from 'src/services/http-client.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private readonly httpClientService: HttpClientService) {}

  async getDashboardTasks(userId: string) {
    try {
      this.logger.log(`Fetching dashboard tasks for user ${userId}`);

      const tasks: Task[] = await this.httpClientService.get(
        'tasks',
        `/tasks/user/${userId}`,
      );

      this.logger.log(`Fetched ${tasks.length} tasks for user ${userId}`);

      const overdueTasksCount = tasks.filter(
        (task) => new Date(task.dueDate) < new Date(),
      ).length;
      const highPriorityTasksCount = tasks.filter(
        (task) => task.priorityRank === 1,
      ).length;
      const mostImportantPendingTasks = tasks
        .sort((a, b) => {
          if (a.priorityRank === b.priorityRank) {
            return (
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );
          }
          return a.priorityRank - b.priorityRank;
        })
        .slice(0, 5);

      this.logger.log('Dashboard Task model ready to use');

      return {
        overdue: overdueTasksCount,
        highPriority: highPriorityTasksCount,
        tasks: mostImportantPendingTasks,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch dashboard tasks for user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(`Failed to fetch dashboard tasks`);
    }
  }

  async getDashboardProjects(userId: string) {
    try {
      this.logger.log(`Fetching dashboard projects for user ${userId}`);

      const projects: Project[] = await this.httpClientService.get(
        'projects',
        `/projects/user/${userId}`,
      );

      this.logger.log(`Fetched ${projects.length} projects for user ${userId}`);

      return {
        projects,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch dashboard projects for user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch dashboard projects`,
      );
    }
  }
}
