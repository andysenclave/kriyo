import { createAuthMiddleware } from 'better-auth/api';
import { Logger } from '@nestjs/common';
import { HookEndpointContext } from 'better-auth';

const logger = new Logger('PreSignin');

// @ts-expect-error
const preSignin = createAuthMiddleware((ctx: HookEndpointContext) => {
  if (ctx.path !== '/sign-in/email' || ctx.method !== 'POST') {
    return;
  }

  logger.log(`Pre-signin start: ${ctx.method} ${ctx.path}`);
  logger.log('Pre-signin complete');
});

export default preSignin;
