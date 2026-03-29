import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';

import { TransformInterceptor } from './interceptors/transform.interceptor';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new PrismaExceptionFilter(),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
