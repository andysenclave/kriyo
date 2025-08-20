import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ServicesModule } from './services/services.module';
import { ClientIdValidatorMiddleware } from '@kriyo/middlewares';
import 'dotenv/config';

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
export class AppModule implements NestModule {
  ALLOWED_CLIENT_IDS = process.env.ALLOWED_CLIENT_IDS?.split(',') || [];
  configure(consumer: MiddlewareConsumer) {
    const clientIdMiddleware = new ClientIdValidatorMiddleware();
    clientIdMiddleware.setAllowedClientIds(this.ALLOWED_CLIENT_IDS);

    consumer
      .apply(clientIdMiddleware.use.bind(clientIdMiddleware))
      .forRoutes('*');
  }
}
