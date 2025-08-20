import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/user.decorator';
import type { AuthUser } from '../../auth/user.decorator';
import { DashboardService } from './dashboard.service';

@Controller('my/dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('tasks')
  @Version('1')
  async getDashboardTasks(@CurrentUser() user: AuthUser) {
    return this.dashboardService.getDashboardTasks(user.id);
  }

  @Get('projects')
  @Version('1')
  async getDashboardProjects(@CurrentUser() user: AuthUser) {
    return this.dashboardService.getDashboardProjects(user.id);
  }
}
