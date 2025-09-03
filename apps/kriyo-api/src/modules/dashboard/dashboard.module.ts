import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ServicesModule } from '../../services/services.module';
import { UserSyncService } from '../user-sync/user-sync.service';

@Module({
  imports: [ServicesModule],
  controllers: [DashboardController],
  providers: [DashboardService, UserSyncService],
})
export class DashboardModule {}
