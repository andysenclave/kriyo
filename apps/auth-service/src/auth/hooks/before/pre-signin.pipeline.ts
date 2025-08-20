/* eslint-disable @typescript-eslint/require-await */
import { createAuthMiddleware, APIError } from 'better-auth/api';
import { Logger } from '@nestjs/common';
import { HookEndpointContext } from 'better-auth';
import 'dotenv/config';

const logger = new Logger('PreSignin');

function validateClientId(ctx: HookEndpointContext): void {
  logger.log('Validating client id in header');
  const headers = ctx?.headers;

  const allowedClientIds = process.env.ALLOWED_CLIENT_IDS?.split(',') || [];

  if (!headers) {
    throw new APIError('UNAUTHORIZED', {
      message: 'Invalid or missing CLIENT_ID',
    });
  }

  const clientId = headers?.get('CLIENT_ID');

  if (!clientId) {
    throw new APIError('UNAUTHORIZED', {
      message: 'Invalid or missing CLIENT_ID',
    });
  }

  if (clientId && !allowedClientIds.includes(clientId)) {
    throw new APIError('UNAUTHORIZED', {
      message: 'Invalid or missing CLIENT_ID',
    });
  }
}

const preSignin = createAuthMiddleware(async (ctx: HookEndpointContext) => {
  if (ctx.path !== '/sign-in/email' || ctx.method !== 'POST') {
    return;
  }

  logger.log(`Pre-signin start: ${ctx.method} ${ctx.path}`);
  validateClientId(ctx);
  logger.log('Pre-signin complete');
});

export default preSignin;
