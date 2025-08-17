import { Logger } from '@nestjs/common';
import { createAuthMiddleware } from 'better-auth/api';
import postSignup from './post-signup.pipeline';
import { HookEndpointContext } from 'better-auth';

const logger = new Logger('AuthMiddleware');

const afterAuthPipeline = createAuthMiddleware(
  async (ctx: HookEndpointContext) => {
    logger.log(`After Auth Middlewares activated`);
    await postSignup(ctx);
    logger.log(`After Auth Middlewares completed`);
  },
);
export default afterAuthPipeline;
