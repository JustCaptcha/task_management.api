import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './environments';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(SERVER_PORT);

  console.log(`Server is running on ${SERVER_PORT}`)
  console.log('API Playground! https://studio.apollographql.com/sandbox/explorer')
}
bootstrap();
