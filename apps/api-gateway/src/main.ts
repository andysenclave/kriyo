import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PUBLIC_API_PORT ?? 4004;

  app.enableCors({
    origin: [process.env.KRIYO_UI_BASE_URL || 'http://localhost:3000'],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });

  await app.listen(port);
}
bootstrap();
