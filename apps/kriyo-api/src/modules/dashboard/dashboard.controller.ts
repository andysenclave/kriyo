import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/user.decorator';
import type { AuthUser } from '../../auth/user.decorator';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@Controller('my/dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('tasks')
  @Version('1')
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Get dashboard tasks',
    description:
      'Retrieve a summary of tasks for the dashboard view of the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard tasks retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        overdue: { type: 'number', example: 2 },
        highPriority: { type: 'number', example: 8 },
        recentTasks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e6' },
              createdBy: {
                type: 'string',
                example: 'MOxdkX1FLm01F2wnRZDrzd10hcUyi5hs',
              },
              title: {
                type: 'string',
                example: 'Complete project documentation',
              },
              description: {
                type: 'string',
                example: 'Create initial design for the landing page.',
              },
              dueDate: {
                type: 'string',
                example: '2024-12-31T23:59:59Z',
                nullable: true,
              },
              status: { type: 'string', example: 'in-progress' },
              priority: { type: 'string', example: 'high' },
              priorityRank: { type: 'number', example: 1 },
              project: {
                type: 'string',
                example: 'MOxdkX1FLm01F2wnRZDrzd10hcUyi5hs',
              },
              assignedTo: {
                type: 'string',
                example: 'MOxdkX1FLm01F2wnRZDrzd10hcUyi5hs',
              },
              createdAt: {
                type: 'string',
                example: '2024-12-31T23:59:59Z',
                nullable: true,
              },
            },
          },
          example: [
            {
              id: 'cmeiri7zv0000p67r5vgdrqj3',
              createdBy: 'MOxdkX1FLm01F2wnRZDrzd10hcUyi5hs',
              title: 'Design Landing Page',
              description: 'Create initial design for the landing page.',
              dueDate:
                'Wed Aug 20 2025 10:00:00 GMT+0530 (India Standard Time)',
              status: 'todo',
              priority: 'high',
              priorityRank: 1,
              project: null,
              assignedTo: 'MOxdkX1FLm01F2wnRZDrzd10hcUyi5hs',
              createdAt: '2025-08-19T16:32:33.759Z',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  async getDashboardTasks(@CurrentUser() user: AuthUser) {
    return this.dashboardService.getDashboardTasks(user.id);
  }

  @Get('projects')
  @Version('1')
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Get dashboard projects',
    description:
      'Retrieve a summary of projects for the dashboard view of the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Dashboard projects retrieved successfully',
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
  async getDashboardProjects(@CurrentUser() user: AuthUser) {
    return this.dashboardService.getDashboardProjects(user.id);
  }
}
