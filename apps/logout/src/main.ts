import { NestFactory } from '@nestjs/core';
import { LogoutModule } from './logout.module';

async function bootstrap() {
  const app = await NestFactory.create(LogoutModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
