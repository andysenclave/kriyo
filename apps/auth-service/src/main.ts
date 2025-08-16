import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const port = process.env.PUBLIC_API_PORT ?? 3000;
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  Logger.log(`Application is running on: http://localhost:${port}`);

  await app.listen(port);
}
bootstrap();
