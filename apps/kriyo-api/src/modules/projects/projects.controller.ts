import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/user.decorator';
import type { AuthUser } from '../../auth/user.decorator';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dtos';

@ApiTags('Projects')
@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('my/projects')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Get user projects',
    description: 'Retrieve all projects belonging to the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'List of user projects retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e6' },
          title: { type: 'string', example: 'Kriyo Mobile App Development' },
          description: {
            type: 'string',
            example: 'Development of mobile application for Kriyo platform',
          },
          status: { type: 'string', example: 'active' },
          targetDate: {
            type: 'string',
            example: '2024-12-31T23:59:59Z',
            nullable: true,
          },
          priority: { type: 'string', example: 'high' },
          priorityRank: { type: 'number', example: 1 },
          owner: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e7' },
          assignedTo: {
            type: 'string',
            example: '60f1b2b3c1d4f1a2b3c4d5e8',
            nullable: true,
          },
          tasks: {
            type: 'array',
            items: { type: 'string' },
            example: ['60f1b2b3c1d4f1a2b3c4d5e9'],
          },
          createdAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
          updatedAt: { type: 'string', example: '2024-01-01T12:00:00Z' },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  async getMyProjects(@CurrentUser() user: AuthUser) {
    return await this.projectsService.getProjectsByUserId(user.id);
  }

  @Get('my/projects/:id')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Get project details',
    description: 'Retrieve detailed information about a specific project',
  })
  @ApiParam({
    name: 'id',
    description: 'Project ID to retrieve',
    example: '60f1b2b3c1d4f1a2b3c4d5e6',
  })
  @ApiResponse({
    status: 200,
    description: 'Project Details retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Project not found with id',
  })
  async getProjectDetails(@Param('id') projectId: string) {
    return await this.projectsService.getProjectById(projectId);
  }

  @Post('my/projects')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Create a new project',
    description: 'Create a new project for the authenticated user',
  })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e6' },
        title: { type: 'string', example: 'Kriyo Mobile App Development' },
        description: {
          type: 'string',
          example: 'Development of mobile application for Kriyo platform',
        },
        status: { type: 'string', example: 'planning' },
        targetDate: {
          type: 'string',
          example: '2024-12-31T23:59:59Z',
          nullable: true,
        },
        priority: { type: 'string', example: 'high' },
        priorityRank: { type: 'number', example: 1 },
        owner: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e7' },
        assignedTo: {
          type: 'string',
          example: '60f1b2b3c1d4f1a2b3c4d5e8',
          nullable: true,
        },
        tasks: { type: 'array', items: { type: 'string' }, example: [] },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
        updatedAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid project data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  async createMyProject(
    @CurrentUser() user: AuthUser,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.createProject(user.id, createProjectDto);
  }

  @Put('my/projects/:id')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Update a project',
    description:
      'Update an existing project belonging to the authenticated user',
  })
  @ApiParam({
    name: 'id',
    description: 'Project ID to update',
    example: '60f1b2b3c1d4f1a2b3c4d5e6',
  })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid project data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Project not found or does not belong to user',
  })
  async updateMyProject(
    @CurrentUser() user: AuthUser,
    @Param('id') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(
      user.id,
      projectId,
      updateProjectDto,
    );
  }

  @Delete('my/projects/:id')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Delete a project',
    description:
      'Delete an existing project belonging to the authenticated user',
  })
  @ApiParam({
    name: 'id',
    description: 'Project ID to delete',
    example: '60f1b2b3c1d4f1a2b3c4d5e6',
  })
  @ApiResponse({
    status: 200,
    description: 'Project deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Project deleted successfully' },
        deletedProjectId: {
          type: 'string',
          example: '60f1b2b3c1d4f1a2b3c4d5e6',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Project not found or does not belong to user',
  })
  async deleteMyProject(
    @CurrentUser() user: AuthUser,
    @Param('id') projectId: string,
  ) {
    return this.projectsService.deleteProject(user.id, projectId);
  }

  @Get('protected/projects/search/:search')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Search projects',
    description: 'Search for projects by title or description across all users',
  })
  @ApiParam({
    name: 'search',
    description: 'Search term to find projects',
    example: 'mobile',
  })
  @ApiResponse({
    status: 200,
    description: 'Search results retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e6' },
          title: { type: 'string', example: 'Kriyo Mobile App Development' },
          description: {
            type: 'string',
            example: 'Development of mobile application for Kriyo platform',
          },
          status: { type: 'string', example: 'active' },
          targetDate: {
            type: 'string',
            example: '2024-12-31T23:59:59Z',
            nullable: true,
          },
          priority: { type: 'string', example: 'high' },
          priorityRank: { type: 'number', example: 1 },
          owner: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e7' },
          assignedTo: {
            type: 'string',
            example: '60f1b2b3c1d4f1a2b3c4d5e8',
            nullable: true,
          },
          tasks: {
            type: 'array',
            items: { type: 'string' },
            example: ['60f1b2b3c1d4f1a2b3c4d5e9'],
          },
          createdAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
          updatedAt: { type: 'string', example: '2024-01-01T12:00:00Z' },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  async searchProjects(@Param('search') searchTerm: string) {
    return this.projectsService.searchProjects(searchTerm);
  }
}
