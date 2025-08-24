import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ServicesModule } from './services/services.module';
import { ClientIdValidatorMiddleware } from '@kriyo/middlewares';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';
import 'dotenv/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: parseInt(process.env.CACHE_TTL || '300') * 1000,
      max: parseInt(process.env.CACHE_MAX || '1000'),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
        limit: parseInt(process.env.RATE_LIMIT_MAX || '100'),
      },
    ]),
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
      .apply(
        clientIdMiddleware.use.bind(clientIdMiddleware),
        RateLimitMiddleware,
      )
      .exclude('/api/docs/*')
      .forRoutes('*');
  }
}
