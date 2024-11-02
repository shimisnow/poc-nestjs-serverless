import { Injectable } from '@nestjs/common';
import { LoginSerializer } from './serializers/login.serializer';

@Injectable()
export class LoginService {
  async login(
    username: string,
    password: string,
    requestRefreshToken: boolean,
  ): Promise<LoginSerializer> {
    return {
      accessToken: `${username}:${password}:${requestRefreshToken}`,
      refreshToken: '5678',
    };
  }
}
