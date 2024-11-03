import { Module } from '@nestjs/common';
import { AuthLibraryService } from './auth-library.service';
import { CacheLibraryModule } from '@libs/cache-library';

@Module({
  imports: [CacheLibraryModule],
  providers: [AuthLibraryService],
  exports: [AuthLibraryService],
})
export class AuthLibraryModule {}
