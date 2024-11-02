import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginBodyDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  requestRefreshToken?: boolean = false;
}
