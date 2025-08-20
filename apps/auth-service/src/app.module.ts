import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { BetterAuthService } from './auth/better-auth.service';
import 'dotenv/config';

const betterAuthService = new BetterAuthService();

@Module({
  imports: [AuthModule.forRoot(betterAuthService.auth)],
})
export class AppModule {}
