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
