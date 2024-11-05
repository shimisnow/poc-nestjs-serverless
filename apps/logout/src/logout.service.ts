import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { LogoutSerializer } from './serializers/logout.serializer';
import { CacheKeyPrefix } from '@libs/cache/enums/cache-key-prefix.enum';

@Injectable()
export class LogoutService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async logout(userId: string, loginId: string): Promise<LogoutSerializer> {
    const performedAt = new Date().getTime();

    await this.cacheService.set(
      [CacheKeyPrefix.AUTH_SESSION_LOGOUT, userId, loginId].join(':'),
      {
        performedAt,
      },
      {
        // the refreshToken is the one with the greater expire time
        ttl: this.convertStringToSeconds(process.env.JWT_REFRESH_EXPIRES_IN),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    );

    return {
      performed: true,
      performedAt,
    };
  }

  /**
   * Convertes a string to seconds
   *
   * @param timeString Time to be converted. Ex: 3m, 1h, 2d
   * @returns Time converted to seconds
   */
  convertStringToSeconds(timeString: string): number {
    const [value, type] = timeString.split(/(\d+)/).filter(Boolean);

    let multiply = 1;

    switch (type) {
      case 'd':
        multiply = 86400; // 24 * 60 * 60;
        break;
      case 'h':
        multiply = 3600; // 60 * 60;
        break;
      case 'm':
        multiply = 60;
        break;
    }

    return parseInt(value) * multiply;
  }
}
