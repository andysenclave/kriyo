/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  async getProjectsByUserId(userId: string) {
    // TODO: Call projects-service to get user's projects
    return {
      projects: [
        {
          id: '1',
          title: 'Kriyo Development',
          description: 'Main development project for Kriyo app',
          status: 'active',
          tasks: ['task-1', 'task-2'],
          targetDate: '2025-09-01',
          priority: 'high',
          owner: userId,
          createdAt: '2025-08-15T10:00:00.000Z',
        },
        {
          id: '2',
          title: 'Documentation',
          description: 'Create comprehensive documentation',
          status: 'planning',
          tasks: ['task-3'],
          targetDate: '2025-08-30',
          priority: 'medium',
          owner: userId,
          createdAt: '2025-08-18T15:30:00.000Z',
        },
      ],
    };
  }

  async createProject(userId: string, createProjectDto: CreateProjectDto) {
    // TODO: Call projects-service to create new project
    return {
      id: 'new-project-id',
      ...createProjectDto,
      owner: userId,
      tasks: [],
      createdAt: new Date().toISOString(),
    };
  }

  async updateProject(
    userId: string,
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ) {
    return {
      id: projectId,
      ...updateProjectDto,
      updatedAt: new Date().toISOString(),
    };
  }

  async deleteProject(userId: string, projectId: string) {
    return {
      success: true,
      message: `Project ${projectId} deleted successfully`,
    };
  }

  async searchProjects(searchTerm: string) {
    return {
      searchTerm,
      projects: [
        {
          id: '1',
          title: 'Kriyo Development',
          description: 'Main development project for Kriyo app',
          status: 'active',
          tasks: ['task-1', 'task-2'],
          targetDate: '2025-09-01',
          priority: 'high',
          owner: 'some-user-id',
          createdAt: '2025-08-15T10:00:00.000Z',
        },
      ],
    };
  }
}
