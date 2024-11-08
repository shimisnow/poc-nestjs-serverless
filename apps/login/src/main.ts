import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { mkdirSync, writeFileSync } from 'fs';
import { LoginModule } from './login.module';

async function bootstrap() {
  const app = await NestFactory.create(LoginModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Login Function')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  await mkdirSync('apps/login/docs/openapi/', { recursive: true });
  await writeFileSync(
    'apps/login/docs/openapi/openapi-docs.json',
    JSON.stringify(document),
    { encoding: 'utf8' },
  );

  const port = process.env.SERVICE_LOGIN_PORT ?? 3000;
  await app.listen(port);
  console.log(`Application running at port ${port}`);
}
bootstrap();
