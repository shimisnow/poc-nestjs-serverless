import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { UserPayload } from './payloads/user.payload';
import { User } from './decorators/user.decorator';
import { LogoutSerializer } from './serializers/logout.serializer';
import { AuthGuard } from './guards/auth.guard';

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
