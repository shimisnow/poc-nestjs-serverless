import { Module } from '@nestjs/common';
import { AuthLibraryService } from './auth-library.service';
import { CacheLibraryModule } from '@libs/cache/cache-library.module';

@Module({
  imports: [CacheLibraryModule],
  providers: [AuthLibraryService],
  exports: [AuthLibraryService],
})
export class AuthLibraryModule {}
