import { Test, TestingModule } from '@nestjs/testing';
import { AuthLibraryService } from './auth-library.service';

describe('AuthLibraryService', () => {
  let service: AuthLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthLibraryService],
    }).compile();

    service = module.get<AuthLibraryService>(AuthLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
