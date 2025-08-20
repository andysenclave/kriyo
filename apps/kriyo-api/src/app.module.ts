import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ServicesModule,
    DashboardModule,
    TasksModule,
    ProjectsModule,
    ProfileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
