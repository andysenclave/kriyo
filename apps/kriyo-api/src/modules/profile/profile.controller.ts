import { Controller, Get, Put, Body, UseGuards, Version } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/user.decorator';
import type { AuthUser } from '../../auth/user.decorator';
import { ProfileService } from './profile.service';
import { UpdateUserDto } from './dtos';

@ApiTags('Profile')
@Controller('my/profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @Version('1')
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Retrieve the profile information of the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e6' },
        email: { type: 'string', example: 'user@example.com' },
        name: { type: 'string', example: 'John Doe' },
        phone: { type: 'string', example: '+1234567890', nullable: true },
        avatar: {
          type: 'string',
          example: 'https://example.com/avatar.jpg',
          nullable: true,
        },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
        updatedAt: { type: 'string', example: '2024-01-01T12:00:00Z' },
        preferences: {
          type: 'object',
          properties: {
            theme: { type: 'string', example: 'dark' },
            notifications: { type: 'boolean', example: true },
            timezone: { type: 'string', example: 'UTC' },
          },
        },
        statistics: {
          type: 'object',
          properties: {
            totalTasks: { type: 'number', example: 25 },
            completedTasks: { type: 'number', example: 15 },
            totalProjects: { type: 'number', example: 5 },
            completedProjects: { type: 'number', example: 2 },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  async getMyProfile(@CurrentUser() user: AuthUser) {
    return this.profileService.getProfile(user.id);
  }

  @Put()
  @Version('1')
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Update user profile',
    description: 'Update the profile information of the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e6' },
        email: { type: 'string', example: 'user@example.com' },
        name: { type: 'string', example: 'John Doe' },
        phone: { type: 'string', example: '+1234567890', nullable: true },
        avatar: {
          type: 'string',
          example: 'https://example.com/avatar.jpg',
          nullable: true,
        },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
        updatedAt: { type: 'string', example: '2024-01-01T12:00:00Z' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid profile data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  async updateMyProfile(
    @CurrentUser() user: AuthUser,
    @Body() updateProfileDto: UpdateUserDto,
  ) {
    return this.profileService.updateProfile(user.id, updateProfileDto);
  }
}
