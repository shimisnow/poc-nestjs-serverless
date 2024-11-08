import { Controller, HttpCode, Post, UseGuards, Version } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { UserPayload } from '@libs/auth/payloads/user.payload';
import { User } from '@libs/auth/decorators/user.decorator';
import { AuthGuard } from '@libs/auth/guards/auth.guard';
import { LogoutSerializer } from './serializers/logout.serializer';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { DefaultError500Serializer } from './serializers/default-error-500.serializer';
import { DefaultError502Serializer } from './serializers/default-error-502.serializer';

@Controller('logout')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Version('1')
  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiBearerAuth('AccessToken')
  @ApiHeader({
    name: 'X-Api-Version',
    description: 'Sets the API version',
    required: true,
  })
  @ApiOperation({
    summary: 'Invalidates all tokens issued for a give login request',
  })
  @ApiOkResponse({
    description: 'Information if the logout process was performed',
    type: LogoutSerializer,
  })
  @ApiInternalServerErrorResponse({
    description:
      'The server has encountered a situation it does not know how to handle. See server logs for details',
    type: DefaultError500Serializer,
  })
  @ApiBadGatewayResponse({
    description: 'Internal data processing error. Probably a database error',
    type: DefaultError502Serializer,
  })
  async logout(@User() user: UserPayload): Promise<LogoutSerializer> {
    return await this.logoutService.logout(user.userId, user.loginId);
  }
}
