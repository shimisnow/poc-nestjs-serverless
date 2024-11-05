import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { JwtService } from '@nestjs/jwt';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAuthEntity } from '@libs/database/entities/user-auth.entity';
import { UserAuthsRepositoryMock } from '@libs/database/mocks/user-auths-repository.mock';
import { UserAuthsRepository } from '@libs/database/repositories/user-auths/user-auths.repository';
import { BadGatewayException, UnauthorizedException } from '@nestjs/common';

describe('login.service', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        JwtService,
        UserAuthsRepository,
        {
          provide: getRepositoryToken(UserAuthEntity),
          useClass: UserAuthsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login()', () => {
    test('correct login data with ACTIVE user (with refresh)', async () => {
      const result = await service.login('anderson', 'test@1234', true);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');

      const accessToken = jsonwebtoken.verify(
        result.accessToken,
        process.env.JWT_SECRET_KEY,
      ) as JwtPayload;
      expect(accessToken).toHaveProperty('userId');
      expect(accessToken.userId).toBe('4b3c74ae-57aa-4752-9452-ed083b6d4bfa');
      expect(accessToken).toHaveProperty('loginId');
      expect(parseInt(accessToken.loginId)).toBeLessThan(new Date().getTime());

      const refreshToken = jsonwebtoken.verify(
        result.refreshToken,
        process.env.JWT_REFRESH_SECRET_KEY,
      ) as JwtPayload;
      expect(refreshToken).toHaveProperty('userId');
      expect(refreshToken.userId).toBe('4b3c74ae-57aa-4752-9452-ed083b6d4bfa');
      expect(refreshToken).toHaveProperty('loginId');
      expect(parseInt(refreshToken.loginId)).toBeLessThan(new Date().getTime());
    });

    test('correct login data with ACTIVE user (without refresh)', async () => {
      const result = await service.login('anderson', 'test@1234', false);

      expect(result).toHaveProperty('accessToken');
      expect(result).not.toHaveProperty('refreshToken');

      const accessToken = jsonwebtoken.verify(
        result.accessToken,
        process.env.JWT_SECRET_KEY,
      ) as JwtPayload;
      expect(accessToken).toHaveProperty('userId');
      expect(accessToken.userId).toBe('4b3c74ae-57aa-4752-9452-ed083b6d4bfa');
      expect(accessToken).toHaveProperty('loginId');
      expect(parseInt(accessToken.loginId)).toBeLessThan(new Date().getTime());
    });

    test('correct login data with INACTIVE user', async () => {
      try {
        await service.login('thomas', 'test@1234', true);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    test('incorrect login data (user exists)', async () => {
      try {
        await service.login('anderson', 'test@5678', true);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    test('incorrect login data (user does not exists)', async () => {
      try {
        await service.login('beatrice', 'test@1234', true);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    test('some database error', async () => {
      try {
        await service.login('anything', 'test@1234', true);
      } catch (error) {
        expect(error).toBeInstanceOf(BadGatewayException);
      }
    });
  });
});
