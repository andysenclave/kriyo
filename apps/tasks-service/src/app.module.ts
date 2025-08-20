import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ClientIdValidatorMiddleware } from '@kriyo/middlewares';
import 'dotenv/config';

@Module({
  providers: [PrismaService, TasksService],
  controllers: [TasksController],
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
