import { Body, Controller, HttpCode, Post, Version } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginSerializer } from './serializers/login.serializer';
import { LoginBodyDto } from './dtos/login-body.dto';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginError400Serializer } from './serializers/login-error-400.serializer';
import { LoginError401Serializer } from './serializers/login-error-401.serializer';
import { LoginError500Serializer } from './serializers/login-error-500.serializer';
import { LoginError502Serializer } from './serializers/login-error-502.serializer';

@Controller('login')
@ApiTags('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Version('1')
  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Uses username and password to get a JWT token to use in future API calls',
  })
  @ApiHeader({
    name: 'X-Api-Version',
    description: 'Sets the API version',
    required: true,
  })
  @ApiOkResponse({
    description: 'JWT Access Token to use in future API calls',
    type: LoginSerializer,
  })
  @ApiBadRequestResponse({
    description: 'Error validating request input data',
    type: LoginError400Serializer,
  })
  @ApiUnauthorizedResponse({
    description:
      'User does not exists, exists and is inactive or the password is wrong',
    type: LoginError401Serializer,
  })
  @ApiInternalServerErrorResponse({
    description:
      'The server has encountered a situation it does not know how to handle. See server logs for details',
    type: LoginError500Serializer,
  })
  @ApiBadGatewayResponse({
    description: 'Internal data processing error. Probably a database error',
    type: LoginError502Serializer,
  })
  async login(@Body() body: LoginBodyDto): Promise<LoginSerializer> {
    return await this.loginService.login(
      body.username,
      body.password,
      body.requestRefreshToken,
    );
  }
}
