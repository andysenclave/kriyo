import { Controller, Get, Put, Body, UseGuards, Version } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/user.decorator';
import type { AuthUser } from '../../auth/user.decorator';
import { ProfileService } from './profile.service';
import { User } from 'src/models';

@Controller('my/profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @Version('1')
  async getMyProfile(@CurrentUser() user: AuthUser) {
    return this.profileService.getProfile(user.id);
  }

  @Put()
  @Version('1')
  async updateMyProfile(
    @CurrentUser() user: AuthUser,
    @Body() updateProfileDto: Partial<User>,
  ) {
    return this.profileService.updateProfile(user.id, updateProfileDto);
  }
}
