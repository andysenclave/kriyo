import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { UsersController } from './users.controller';

@Module({
  imports: [AuthModule.forRoot(auth)],
  controllers: [UsersController],
})
export class AppModule {}
