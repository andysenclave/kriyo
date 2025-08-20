import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser | null => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const sessionCookie = request.cookies?.['better-auth.session_token'];

    if (!sessionCookie) {
      return null;
    }

    return {
      id: 'mock-user-id',
      email: 'user@example.com',
      name: 'Mock User',
    };
  },
);
