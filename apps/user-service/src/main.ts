import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PUBLIC_API_PORT ?? 4000;

  app.enableCors({
    origin: [process.env.KRIYO_UI_BASE_URL || 'http://localhost:3000'],
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
