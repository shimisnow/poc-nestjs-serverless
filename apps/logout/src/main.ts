import { NestFactory } from '@nestjs/core';
import { LogoutModule } from './logout.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(LogoutModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
