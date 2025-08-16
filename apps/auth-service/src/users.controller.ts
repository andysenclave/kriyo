import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get('me')
  me(@Session() session: UserSession) {
    return { user: session.user };
  }
}
