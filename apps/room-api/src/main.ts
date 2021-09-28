/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { useContainer } from 'class-validator';
import { environment } from './environments/environment';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url: environment.redis
      }
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  await app.listenAsync();
}

bootstrap();
