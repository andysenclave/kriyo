import { Logger } from '@nestjs/common';
import { HookEndpointContext } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/api';
import preSignup from './pre-signup.pipeline';
import preSignin from './pre-signin.pipeline';

const logger = new Logger('AuthMiddleware');

const beforeAuthPipeline = createAuthMiddleware(
  async (ctx: HookEndpointContext) => {
    logger.log(`Before Auth Middlewares activated`);
    await preSignup(ctx);
    await preSignin(ctx);
    logger.log(`Before Auth Middlewares completed`);
  },
);
export default beforeAuthPipeline;
