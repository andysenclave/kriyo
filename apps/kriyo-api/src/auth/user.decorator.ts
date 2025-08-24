import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export const CurrentUser = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext): Promise<AuthUser | null> => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const sessionToken = request.cookies?.['better-auth.session_token'];

    if (!sessionToken) {
      return null;
    }

    try {
      const authServiceUrl = process.env.AUTH_SERVICE_URL;

      const response = await axios.get(
        `${authServiceUrl}/api/auth/get-session`,
        {
          headers: {
            Cookie: `better-auth.session_token=${sessionToken}`,
          },
        },
      );

      if (response.data?.user) {
        return {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name || response.data.user.email,
        };
      }

      return null;
    } catch (error) {
      console.error('Session verification failed:', error);
      return null;
    }
  },
);
