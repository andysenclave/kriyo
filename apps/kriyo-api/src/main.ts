import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import 'dotenv/config';
import { VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PUBLIC_API_PORT ?? 8000;

  app.use(cookieParser());

  app.enableCors({
    origin: [process.env.KRIYO_UI_BASE_URL || 'http://localhost:3000'],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });

  await app.listen(port);
}
bootstrap();
