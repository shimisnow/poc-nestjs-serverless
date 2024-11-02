import {
  BadGatewayException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginSerializer } from './serializers/login.serializer';
import { AuthRoleEnum } from '@libs/auth/enums/auth-role.enum';
import { UserAuthEntity } from '@libs/database/entities/user-auth.entity';
import { UserAuthsRepository } from '@libs/database/repositories/user-auths/user-auths.repository';
import { UserAuthStatusEnum } from '@libs/database/enums/user-auth-status.enum';
import { AuthErrorNames } from '@libs/auth/enums/auth-error-names.enum';
import { AuthErrorMessages } from '@libs/auth/enums/auth-error-messages.enum';

@Injectable()
export class LoginService {
  constructor(
    private userAuthsRepository: UserAuthsRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * Gets token to be used at API requests.
   *
   * @param username Username
   * @param password Password in plain text
   * @param requestRefreshToken If a refreshToken should be generated
   * @returns Data with token to be used at the private endpoints
   * @throws BadGatewayException Database error
   * @throws UnauthorizedException User do not exists, is inactive or password is incorrect
   */
  async login(
    username: string,
    password: string,
    requestRefreshToken: boolean,
  ): Promise<LoginSerializer> {
    let user: UserAuthEntity = null;

    try {
      user = await this.userAuthsRepository.findByUsername(username);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }

    // if the user does not exists, will throw this if error
    if (user?.status !== UserAuthStatusEnum.ACTIVE) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        data: {
          name: AuthErrorNames.CREDENTIAL_ERROR,
          errors: [AuthErrorMessages.WRONG_USER_PASSWORD],
        },
      });
    }

    if ((await bcrypt.compare(password, user?.password)) === false) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        data: {
          name: AuthErrorNames.CREDENTIAL_ERROR,
          errors: [AuthErrorMessages.WRONG_USER_PASSWORD],
        },
      });
    }

    const loginId = new Date().getTime().toString();

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
