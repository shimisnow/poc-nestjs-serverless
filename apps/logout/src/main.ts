import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { mkdirSync, writeFileSync } from 'fs';
import { LogoutModule } from './logout.module';

async function bootstrap() {
  const app = await NestFactory.create(LogoutModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Logout Function')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'accessToken provided by the login endpoint',
        in: 'header',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'AccessToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  await mkdirSync('apps/logout/docs/openapi/', { recursive: true });
  await writeFileSync(
    'apps/logout/docs/openapi/openapi-docs.json',
    JSON.stringify(document),
    { encoding: 'utf8' },
  );

  const port = process.env.SERVICE_LOGOUT_PORT ?? 3000;
  await app.listen(port);
  console.log(`Application running at port ${port}`);
}
bootstrap();
