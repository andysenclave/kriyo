import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FlatProject, FlatTask, Project, Task, UserInfo } from '../../models';
import { HttpClientService } from '../../services/http-client.service';
import { CacheService } from '../../services/cache.service';
import { Logger } from '@nestjs/common';
import { UserSyncService } from '../user-sync/user-sync.service';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly cacheService: CacheService,
    private readonly userSyncService: UserSyncService,
  ) {}

  private getAllRelatedUserIdsInTask = (task: FlatTask): string[] => {
    const userIds = [task.createdBy, task?.assignedTo] as string[];
    this.logger.log(
      `Fetching related user IDs ${userIds.join(', ')} for task ${task.id}`,
    );
    return [...new Set([...userIds])];
  };

  private async updateUserInfoInTasks(tasks: FlatTask[]): Promise<Task[]> {
    if (tasks.length === 0) {
      return [];
    }

    const accumulatedUserIds = new Set<string>();

    tasks.forEach((task) => {
      this.getAllRelatedUserIdsInTask(task).forEach((userId) =>
        accumulatedUserIds.add(userId),
      );
    });

    this.logger.log(
      `Related user IDs for tasks(${tasks.length}): ${Array.from(accumulatedUserIds).join(', ')}`,
    );

    const accumulatedUserInfos = await this.userSyncService.getUsersByIds(
      Array.from(accumulatedUserIds),
    );

    this.logger.log(
      `Related user infos fetched successfully accumulatedUserInfos: ${JSON.stringify(accumulatedUserInfos)}`,
    );

    return tasks.map((task) => {
      const createdBy = accumulatedUserInfos.find(
        (userInfo) => userInfo.betterAuthId === task.createdBy,
      ) as UserInfo;
      const assignedTo =
        accumulatedUserInfos.find(
          (userInfo) => userInfo.betterAuthId === task.assignedTo,
        ) || null;

      this.logger.log(
        `User infos updated for task ${JSON.stringify(task)}, createdBy: ${JSON.stringify(createdBy)}, assignedTo: ${JSON.stringify(assignedTo)}`,
      );

      return {
        ...task,
        createdBy,
        assignedTo,
      };
    });
  }

  private getAllRelatedUserIdsInProject = (project: FlatProject): string[] => {
    const userIds = [project.owner, project?.assignedTo] as string[];
    this.logger.log(
      `Fetching related user IDs ${userIds.join(', ')} for project ${project.id}`,
    );
    return [...new Set([...userIds])];
  };

  private async updateUserInfoInProjects(
    projects: FlatProject[],
  ): Promise<Project[]> {
    if (projects.length === 0) {
      return [];
    }

    const accumulatedUserIds = new Set<string>();

    projects.forEach((project) => {
      this.getAllRelatedUserIdsInProject(project).forEach((userId) =>
        accumulatedUserIds.add(userId),
      );
    });

    this.logger.log(
      `Related user IDs for projects(${projects.length}): ${Array.from(accumulatedUserIds).join(', ')}`,
    );

    const accumulatedUserInfos = await this.userSyncService.getUsersByIds(
      Array.from(accumulatedUserIds),
    );

    this.logger.log(
      `Related user infos fetched successfully accumulatedUserInfos: ${JSON.stringify(accumulatedUserInfos)}`,
    );

    return projects.map((project) => {
      const owner = accumulatedUserInfos.find(
        (userInfo) => userInfo.betterAuthId === project.owner,
      ) as UserInfo;
      const assignedTo =
        accumulatedUserInfos.find(
          (userInfo) => userInfo.betterAuthId === project.assignedTo,
        ) || null;

      this.logger.log(
        `User infos updated for project ${JSON.stringify(project)}, owner: ${JSON.stringify(owner)}, assignedTo: ${JSON.stringify(assignedTo)}`,
      );

      return {
        ...project,
        owner,
        assignedTo,
      };
    });
  }

  async getDashboardTasks(userId: string) {
    try {
      const cacheKey = this.cacheService.generateCacheKey(
        'dashboard_tasks',
        userId,
      );

      const cachedTasks = await this.cacheService.get(cacheKey);
      if (cachedTasks) {
        this.logger.log(`Returning cached dashboard tasks for user ${userId}`);
        return cachedTasks;
      }

      this.logger.log(`Fetching dashboard tasks for user ${userId}`);

      const tasks: FlatTask[] = await this.httpClientService.get(
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
      const mostImportantPendingTasks = (
        await this.updateUserInfoInTasks(tasks)
      )
        .sort((a, b) => {
          if (a.priorityRank === b.priorityRank) {
            return (
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );
          }
          return a.priorityRank - b.priorityRank;
        })
        .slice(0, 5);

      this.logger.log(
        `Dashboard Task model ready to use mostImportantPendingTasks: ${JSON.stringify(mostImportantPendingTasks)}`,
      );

      const result = {
        overdue: overdueTasksCount,
        highPriority: highPriorityTasksCount,
        tasks: mostImportantPendingTasks,
      };

      this.logger.log(`Dashboard result: ${JSON.stringify(result)}`);

      await this.cacheService.set(cacheKey, result, 300);

      return result;
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
      const cacheKey = this.cacheService.generateCacheKey(
        'dashboard_projects',
        userId,
      );

      const cachedProjects = await this.cacheService.get(cacheKey);
      if (cachedProjects) {
        this.logger.log(
          `Returning cached dashboard projects for user ${userId}`,
        );
        return cachedProjects;
      }

      this.logger.log(`Fetching dashboard projects for user ${userId}`);

      const projects: FlatProject[] = await this.httpClientService.get(
        'projects',
        `/projects/user/${userId}`,
      );

      this.logger.log(`Fetched ${projects.length} projects for user ${userId}`);

      const result = {
        projects: await this.updateUserInfoInProjects(projects),
      };

      await this.cacheService.set(cacheKey, result, 300);

      return result;
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
