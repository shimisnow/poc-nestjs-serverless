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
  await app.listen(process.env.SERVICE_LOGOUT_PORT ?? 3000);
}
bootstrap();
