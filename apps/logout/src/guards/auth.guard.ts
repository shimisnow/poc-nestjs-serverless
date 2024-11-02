import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../payloads/user.payload';
import { AuthErrorNames } from '../enums/auth-error-names.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    request['user'] = await this.extractPayloadFromJwtToken(token);

    return true;
  }

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  protected async extractPayloadFromJwtToken(
    token: string,
  ): Promise<UserPayload> {
    if (!token) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        data: {
          name: AuthErrorNames.JWT_EMPTY_ERROR,
        },
      });
    }

    let payload: UserPayload;

    // JWT verification
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
        maxAge: process.env.JWT_MAX_AGE ?? '1h',
      });
    } catch (error) {
      const exceptionBody = {
        statusCode: HttpStatus.UNAUTHORIZED,
        data: error,
      };

      // if there is a message at the body, change it to the errors key
      // done for the sake of pattern
      if (exceptionBody.data?.message) {
        exceptionBody.data.errors = [exceptionBody.data?.message];

        delete exceptionBody.data['message'];
      }

      throw new UnauthorizedException(exceptionBody);
    }

    // verifies if the payload has the correct structure
    try {
      payload = plainToClass(UserPayload, payload);
      await validateOrReject(payload);
    } catch (errors) {
      const messages = [];

      errors.forEach((error) => {
        Object.keys(error.constraints).forEach((key) => {
          messages.push(error.constraints[key]);
        });
      });

      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        data: {
          name: AuthErrorNames.JWT_PAYLOAD_STRUCTURE_ERROR,
          errors: messages,
        },
      });
    }

    return payload;
  }
}
