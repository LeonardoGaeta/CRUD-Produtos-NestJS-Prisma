import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';

import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new GlobalExceptionFilter(),
  )

  app.useGlobalInterceptors(
    new TransformInterceptor(),
  )

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();