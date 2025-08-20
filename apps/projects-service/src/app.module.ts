import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from './prisma/prisma.service';
import { ClientIdValidatorMiddleware } from '@kriyo/middlewares';
import 'dotenv/config';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
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
