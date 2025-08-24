import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {
  ClientIdValidatorMiddleware,
  OriginValidatorMiddleware,
} from '@kriyo/middlewares';
import 'dotenv/config';

@Module({
  providers: [PrismaService, TasksService],
  controllers: [TasksController],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);
  ALLOWED_CLIENT_IDS = process.env.ALLOWED_CLIENT_IDS?.split(',') || [];
  ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [];

  configure(consumer: MiddlewareConsumer) {
    const clientIdMiddleware = new ClientIdValidatorMiddleware();
    const originValidatorMiddleware = new OriginValidatorMiddleware();
    clientIdMiddleware.setAllowedClientIds(this.ALLOWED_CLIENT_IDS);
    originValidatorMiddleware.setAllowedOrigins(this.ALLOWED_ORIGINS);

    consumer
      .apply(
        clientIdMiddleware.use.bind(clientIdMiddleware),
        originValidatorMiddleware.use.bind(originValidatorMiddleware),
      )
      .forRoutes('*');
  }
}
