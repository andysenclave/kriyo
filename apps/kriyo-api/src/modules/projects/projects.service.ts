import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dtos';
import { HttpClientService } from 'src/services/http-client.service';
import { Project } from 'src/models';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(private readonly httpClientService: HttpClientService) {}
  async getProjectsByUserId(userId: string) {
    try {
      this.logger.log(`Fetching projects for user ${userId}`);

      const projects: Project[] = await this.httpClientService.get(
        'projects',
        `/projects/user/${userId}`,
      );

      this.logger.log(`Fetched projects for user ${userId}`);

      return {
        projects,
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
      } as Project;

      this.logger.log(
        `Creating new project for user ${userId} with content ${JSON.stringify(projectDto)}`,
      );

      const project: Project = await this.httpClientService.post(
        'projects',
        `/projects`,
        projectDto,
      );

      this.logger.log(`Created project for user ${userId}`);

      return {
        project,
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

      const project: Project = await this.httpClientService.put(
        'projects',
        `/projects/${projectId}`,
        updateProjectDto,
      );

      this.logger.log(`Updated project for user ${userId}`);

      return {
        project,
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

      const projects: Project[] = await this.httpClientService.get(
        'projects',
        `/projects/search/${searchTerm}`,
      );

      this.logger.log(`Fetched projects with term "${searchTerm}"`);

      return {
        projects,
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
