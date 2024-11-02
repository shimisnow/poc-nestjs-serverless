import { Test, TestingModule } from '@nestjs/testing';
import { LogoutController } from './logout.controller';
import { LogoutService } from './logout.service';

describe('LogoutController', () => {
  let logoutController: LogoutController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogoutController],
      providers: [LogoutService],
    }).compile();

    logoutController = app.get<LogoutController>(LogoutController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(logoutController.getHello()).toBe('Hello World!');
    });
  });
});
