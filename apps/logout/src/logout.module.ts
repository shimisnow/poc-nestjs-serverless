import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LogoutController } from './logout.controller';
import { LogoutService } from './logout.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [LogoutController],
  providers: [LogoutService],
})
export class LogoutModule {}
