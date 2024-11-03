import { NestFactory } from '@nestjs/core';
import { LoginModule } from './login.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(LoginModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.SERVICE_LOGIN_PORT ?? 3000);
}
bootstrap();
