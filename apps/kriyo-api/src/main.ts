import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import 'dotenv/config';
import { VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Kriyo API')
    .setDescription(
      'The Kriyo API provides endpoints for managing tasks, projects, dashboard, and user profiles in the Kriyo application.',
    )
    .setVersion('1.0')
    .addTag('Health', 'Health check endpoints')
    .addTag('Dashboard', 'Dashboard related endpoints')
    .addTag('Tasks', 'Task management endpoints')
    .addTag('Projects', 'Project management endpoints')
    .addTag('Profile', 'User profile management endpoints')
    .addCookieAuth('better-auth.session_token', {
      type: 'http',
      in: 'cookie',
      scheme: 'bearer',
      description: 'Session token stored in cookie for authentication',
    })
    .addServer(`http://localhost:${port}`, 'Development server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      requestInterceptor: (req) => {
        req.headers['CLIENT_ID'] = 'KRIYO_UI';
        return req;
      },
    },
  });

  await app.listen(port);
}
bootstrap();
