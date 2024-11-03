import { Test, TestingModule } from '@nestjs/testing';
import { CacheLibraryService } from './cache-library.service';

describe('CacheLibraryService', () => {
  let service: CacheLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheLibraryService],
    }).compile();

    service = module.get<CacheLibraryService>(CacheLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
