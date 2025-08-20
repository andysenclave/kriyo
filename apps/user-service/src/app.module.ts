import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from './prisma/prisma.service';
import { PasswordService } from './password/password.service';
import { ClientIdValidatorMiddleware } from '@kriyo/middlewares';
import 'dotenv/config';
@Module({
  providers: [PrismaService, UserService, PasswordService],
  controllers: [UserController],
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
