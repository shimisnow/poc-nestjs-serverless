import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBodyDto {
  @ApiProperty({
    description: 'Username',
    example: 'anderson',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User password in plain text',
    example: 'test@1234',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'If the response should include a refreshToken',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  requestRefreshToken?: boolean = false;
}
