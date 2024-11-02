import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseLibraryService } from './database-library.service';

describe('DatabaseLibraryService', () => {
  let service: DatabaseLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseLibraryService],
    }).compile();

    service = module.get<DatabaseLibraryService>(DatabaseLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
