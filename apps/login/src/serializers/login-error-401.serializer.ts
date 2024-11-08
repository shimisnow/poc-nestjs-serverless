import { ApiProperty } from '@nestjs/swagger';
import { LoginError401DataSerializer } from './login-error-401-data.serializer';

export class LoginError401Serializer {
  @ApiProperty({
    description: 'HTTP status code',
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    description: 'HTTP error message',
    example: 'Unauthorized',
  })
  error: string;

  @ApiProperty({
    description: 'Information about the error',
    required: false,
  })
  data?: LoginError401DataSerializer;
}
