import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dtos';
import { HttpClientService } from '../../services/http-client.service';
import { FlatProject, Project, UserInfo } from '../../models';
import { UserSyncService } from '../user-sync/user-sync.service';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly userSyncService: UserSyncService,
  ) {}

  private getUserById = async (
    userId: string,
  ): Promise<UserInfo | undefined> => {
    this.logger.log(`Fetching user info for user ID ${userId}`);
    return await this.userSyncService.getUserById(userId);
  };

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
    const accumulatedUserIds = new Set<string>();

    projects.forEach((project) => {
      this.getAllRelatedUserIdsInProject(project).forEach((userId) =>
        accumulatedUserIds.add(userId),
      );
    });

    this.logger.log(
      `Related user IDs for projects(${projects.length}): ${Array.from(accumulatedUserIds).join(', ')}`,
    );

    const accumulatedUserInfos = await Promise.all(
      Array.from(accumulatedUserIds).map((userId) => this.getUserById(userId)),
    );

    this.logger.log(
      `Related user infos fetched successfully accumulatedUserInfos: ${JSON.stringify(accumulatedUserInfos)}`,
    );

    return projects.map((project) => {
      const owner = accumulatedUserInfos.find(
        (userInfo) => userInfo?.betterAuthId === project.owner,
      ) as UserInfo;
      const assignedTo =
        accumulatedUserInfos.find(
          (userInfo) => userInfo?.betterAuthId === project.assignedTo,
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

  async getProjectById(id: string) {
    try {
      this.logger.log(`Fetching project for id ${id}`);

      const project: FlatProject = await this.httpClientService.get(
        'projects',
        `/projects/${id}`,
      );

      this.logger.log(`Fetched project for id ${id}`);
      this.logger.log(
        `Fetching user details for project with project id ${id}`,
      );

      const updatedProject = await this.updateUserInfoInProjects([project]);

      this.logger.log(
        `Fetched user details for project with project id ${id}, projectDetail: ${JSON.stringify(updatedProject[0])}`,
      );

      return updatedProject[0];
    } catch (error) {
      this.logger.error(
        `Failed to fetch project detail for ${id} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch project detail for project ${id}`,
      );
    }
  }

  async getProjectsByUserId(userId: string) {
    try {
      this.logger.log(`Fetching projects for user ${userId}`);

      const projects: FlatProject[] = await this.httpClientService.get(
        'projects',
        `/projects/user/${userId}`,
      );

      this.logger.log(`Fetched projects for user ${userId}`);
      this.logger.log(
        `Fetching user details for projects with project ids ${projects.map((project) => project.id).join(', ')}`,
      );

      const updatedProjects = await this.updateUserInfoInProjects(projects);
      return {
        projects: updatedProjects,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch projects for user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch projects for user ${userId}`,
      );
    }
  }

  async createProject(userId: string, createProjectDto: CreateProjectDto) {
    try {
      const projectDto = {
        ...createProjectDto,
        owner: userId,
      } as Partial<CreateProjectDto>;

      this.logger.log(
        `Creating new project for user ${userId} with content ${JSON.stringify(projectDto)}`,
      );

      const project: FlatProject = await this.httpClientService.post(
        'projects',
        `/projects`,
        projectDto,
      );

      this.logger.log(`Created project for user ${userId}`);
      this.logger.log(`Fetching user details with project id ${project.id}`);

      const updatedProject = await this.updateUserInfoInProjects([project]);

      this.logger.log(
        `Fetched user details for projects with project id ${project.id}, projectDetail: ${JSON.stringify(updatedProject[0])}`,
      );

      return {
        project: updatedProject[0],
      };
    } catch (error) {
      this.logger.error(
        `Failed to create project for user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to create project for user ${userId}`,
      );
    }
  }

  async updateProject(
    userId: string,
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ) {
    try {
      this.logger.log(
        `Updating project for user ${userId} with content ${JSON.stringify(updateProjectDto)}`,
      );

      const project: FlatProject = await this.httpClientService.put(
        'projects',
        `/projects/${projectId}`,
        updateProjectDto,
      );

      this.logger.log(`Updated project for user ${userId}`);
      this.logger.log(`Fetching user details with project id ${project.id}`);

      const updatedProject = await this.updateUserInfoInProjects([project]);

      this.logger.log(
        `Fetched user details for projects with project id ${project.id}, projectDetail: ${JSON.stringify(updatedProject[0])}`,
      );

      return {
        project: updatedProject[0],
      };
    } catch (error) {
      this.logger.error(
        `Failed to update project for user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to update project for user ${userId}`,
      );
    }
  }

  async deleteProject(userId: string, projectId: string) {
    try {
      this.logger.log(`Deleting project ${projectId} by user ${userId}`);

      await this.httpClientService.delete('projects', `/projects/${projectId}`);

      this.logger.log(`Deleted project ${projectId} by user ${userId}`);

      return {
        success: true,
      };
    } catch (error) {
      this.logger.error(
        `Failed to delete project ${projectId} by user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to delete project ${projectId} by user ${userId}`,
      );
    }
  }

  async searchProjects(searchTerm: string) {
    try {
      this.logger.log(`Searching projects with term "${searchTerm}"`);

      const projects: FlatProject[] = await this.httpClientService.get(
        'projects',
        `/projects/search/${searchTerm}`,
      );

      this.logger.log(`Fetched projects with term "${searchTerm}"`);
      this.logger.log(
        `Fetching user details for projects with project ids ${projects.map((project) => project.id).join(', ')}`,
      );

      const updatedProjects = await this.updateUserInfoInProjects(projects);

      return {
        projects: updatedProjects,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch projects with term "${searchTerm}" from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch projects with term "${searchTerm}"`,
      );
    }
  }
}
