import { Test, TestingModule } from '@nestjs/testing';
import { LogoutService } from './logout.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserPayload } from '@libs/auth/payloads/user.payload';

describe('logout.service', () => {
  let service: LogoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogoutService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            set: (key, value) => {},
          },
        },
      ],
    }).compile();

    service = module.get<LogoutService>(LogoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('logout()', () => {
    test('ACTIVE user', async () => {
      const user = {
        userId: '4b3c74ae-57aa-4752-9452-ed083b6d4bfa',
        loginId: new Date().getTime().toString(),
      } as UserPayload;

      const result = await service.logout(user.userId, user.loginId);

      expect(result.performed).toBeTruthy();
      expect(result).toHaveProperty('performedAt');
    });
  });
});
