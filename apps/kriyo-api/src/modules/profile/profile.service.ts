/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto';

@Injectable()
export class ProfileService {
  async getProfile(userId: string) {
    // TODO: Call user-service to get user profile
    return {
      id: userId,
      email: 'user@example.com',
      name: 'John Doe',
      phone: '+1234567890',
      emailVerified: true,
      phoneVerified: false,
      createdAt: '2025-08-15T10:00:00.000Z',
      updatedAt: '2025-08-20T14:30:00.000Z',
      preferences: {
        theme: 'light',
        notifications: {
          email: true,
          push: false,
          taskReminders: true,
        },
      },
    };
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    // TODO: Call user-service to update user profile
    return {
      id: userId,
      ...updateProfileDto,
      updatedAt: new Date().toISOString(),
    };
  }
}
