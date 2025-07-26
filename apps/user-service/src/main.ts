import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
