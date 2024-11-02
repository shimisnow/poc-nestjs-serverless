import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { UserPayload } from '@libs/auth/payloads/user.payload';
import { User } from '@libs/auth/decorators/user.decorator';
import { AuthGuard } from '@libs/auth/guards/auth.guard';
import { LogoutSerializer } from './serializers/logout.serializer';

@Controller('logout')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async logout(@User() user: UserPayload): Promise<LogoutSerializer> {
    return await this.logoutService.logout(user.userId, user.loginId);
  }
}
