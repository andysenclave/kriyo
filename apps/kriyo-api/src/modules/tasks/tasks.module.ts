import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ServicesModule } from '../../services/services.module';
import { UserSyncService } from '../user-sync/user-sync.service';

@Module({
  imports: [ServicesModule],
  controllers: [TasksController],
  providers: [TasksService, UserSyncService],
})
export class TasksModule {}
