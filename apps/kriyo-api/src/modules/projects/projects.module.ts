import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ServicesModule } from '../../services/services.module';
import { UserSyncService } from '../user-sync/user-sync.service';

@Module({
  imports: [ServicesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, UserSyncService],
})
export class ProjectsModule {}
