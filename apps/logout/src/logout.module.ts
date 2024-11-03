import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LogoutController } from './logout.controller';
import { LogoutService } from './logout.service';
import { CacheLibraryModule } from '@libs/cache-library/cache-library.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    CacheLibraryModule,
  ],
  controllers: [LogoutController],
  providers: [LogoutService],
})
export class LogoutModule {}
