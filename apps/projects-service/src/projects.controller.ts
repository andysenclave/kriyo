import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Controller,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project as ProjectModel } from 'generated/prisma';
import { CreateProjectDto } from './dtos';
import { Logger } from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(private readonly projectsService: ProjectsService) {}

  @Get('/:id')
  async getProjectById(@Param('id') id: string): Promise<ProjectModel | null> {
    return await this.projectsService.findProject({ id });
  }

  @Get('/user/:userId')
  async getProjectsByUserId(
    @Param('userId') userId: string,
  ): Promise<ProjectModel[]> {
    this.logger.log(`Fetching my projects for user ${userId}`);
    return await this.projectsService.getAllProjects({
      where: {
        OR: [{ owner: userId }, { assignedTo: userId }],
      },
    });
  }

  @Get('/search/:searchTerm')
  async searchProjects(
    @Param('searchTerm') searchTerm: string,
  ): Promise<ProjectModel[]> {
    this.logger.log(`Searching my projects with term "${searchTerm}"`);

    return await this.projectsService.getAllProjects({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  @Get('/')
  async getAllProjects(): Promise<ProjectModel[]> {
    this.logger.log('Fetching all projects');
    return this.projectsService.getAllProjects({
      skip: 0,
      take: 10,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post('/')
  async createProject(
    @Body()
    projectData: CreateProjectDto,
  ): Promise<ProjectModel> {
    return this.projectsService.createProject(projectData);
  }

  @Put('/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() projectData: Partial<ProjectModel>,
  ): Promise<ProjectModel> {
    return await this.projectsService.updateProject({
      where: { id },
      data: projectData,
    });
  }

  @Delete('/:id')
  async deleteProject(@Param('id') id: string): Promise<ProjectModel> {
    return await this.projectsService.deleteProject({ id });
  }
}
