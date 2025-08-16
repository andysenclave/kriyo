import { Logger } from '@nestjs/common';
import { createAuthMiddleware } from 'better-auth/api';

const logger = new Logger('AuthMiddleware');

const afterAuthPipeline = createAuthMiddleware(
  // @ts-expect-error
  () => {
    logger.log(`After Auth Middlewares activated`);
    logger.log(`After Auth Middlewares completed`);
  },
);
export default afterAuthPipeline;
