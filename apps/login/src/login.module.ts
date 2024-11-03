import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserAuthsRepositoryModule } from '@libs/database/repositories/user-auths/user-auths-repository.module';
import { DatabaseLibraryModule } from '@libs/database/database-library.module';

@Module({
  imports: [
    DatabaseLibraryModule,
    UserAuthsRepositoryModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
