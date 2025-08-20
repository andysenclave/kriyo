import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const sessionCookie = request.cookies?.['better-auth.session_token'];

    if (!sessionCookie) {
      throw new UnauthorizedException('Authentication required');
    }

    return true;
  }
}
