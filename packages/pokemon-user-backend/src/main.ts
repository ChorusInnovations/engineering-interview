/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { startDatabase } from './modules/database/db';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit();
  });

  await startDatabase();
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = 3000;
  // const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
