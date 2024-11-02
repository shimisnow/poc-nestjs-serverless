import { Controller, Get } from '@nestjs/common';
import { LogoutService } from './logout.service';

@Controller()
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Get()
  getHello(): string {
    return this.logoutService.getHello();
  }
}
