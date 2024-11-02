import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginSerializer } from './serializers/login.serializer';
import { AuthRoleEnum } from '@libs/auth/enums/auth-role.enum';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  async login(
    username: string,
    password: string,
    requestRefreshToken: boolean,
  ): Promise<LoginSerializer> {
    const loginId = new Date().getTime().toString();

    const user = {
      userId: 'abc',
      role: AuthRoleEnum.USER,
    };

    if (requestRefreshToken) {
      const [accessToken, refreshToken] = await Promise.all([
        this.generateAccessToken(user.userId, loginId, user.role),
        this.generateRefreshToken(user.userId, loginId, user.role),
      ]);

      return {
        accessToken,
        refreshToken,
      };
    } else {
      return {
        accessToken: await this.generateAccessToken(
          user.userId,
          loginId,
          user.role,
        ),
      };
    }
  }

  /**
   * Generates and signs a JWT token using the JWT_SECRET_KEY.
   *
   * @param userId User id as UUID.
   * @param loginId Defined by each login request.
   * @param role User role.
   * @returns Signed JWT token.
   */
  async generateAccessToken(
    userId: string,
    loginId: string,
    role: AuthRoleEnum,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        userId,
        loginId,
        role,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  }

  /**
   * Generates and signs a JWT token using the JWT_REFRESH_SECRET_KEY.
   *
   * @param userId User id as UUID.
   * @param loginId Defined by each login request.
   * @param role User role.
   * @returns Signed JWT token.
   */
  async generateRefreshToken(
    userId: string,
    loginId: string,
    role: AuthRoleEnum,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        userId,
        loginId,
        role,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn:
          role == AuthRoleEnum.ADMIN
            ? process.env.JWT_REFRESH_EXPIRES_IN_ADMIN || '1d'
            : process.env.JWT_REFRESH_EXPIRES_IN,
      },
    );
  }
}
