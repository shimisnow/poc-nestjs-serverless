import { Module } from '@nestjs/common';
import { DatabaseLibraryService } from './database-library.service';

@Module({
  providers: [DatabaseLibraryService],
  exports: [DatabaseLibraryService],
})
export class DatabaseLibraryModule {}
