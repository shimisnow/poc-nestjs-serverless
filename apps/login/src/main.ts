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
  const port = process.env.SERVICE_LOGIN_PORT ?? 3000;
  await app.listen(port);
  console.log(`Application running at port ${port}`);
}
bootstrap();
