import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginSerializer } from './serializers/login.serializer';
import { LoginBodyDto } from './dtos/login-body.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() body: LoginBodyDto): Promise<LoginSerializer> {
    return await this.loginService.login(
      body.username,
      body.password,
      body.requestRefreshToken,
    );
  }
}
