import { Injectable } from '@nestjs/common';
import { LogoutSerializer } from './serializers/logout.serializer';

@Injectable()
export class LogoutService {
  async logout(userId: string, loginId: string): Promise<LogoutSerializer> {
    return {
      performed: true,
      performedAt: new Date().getTime(),
    };
  }
}
