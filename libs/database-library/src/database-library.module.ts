import { Module } from '@nestjs/common';
import { DatabaseLibraryService } from './database-library.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_AUTH_HOST,
      port: parseInt(process.env.DATABASE_AUTH_PORT),
      username: process.env.DATABASE_AUTH_USERNAME,
      password: process.env.DATABASE_AUTH_PASSWORD,
      database: process.env.DATABASE_AUTH_DBNAME,
      entities,
      synchronize: true,
    }),
  ],
  providers: [DatabaseLibraryService],
  exports: [DatabaseLibraryService],
})
export class DatabaseLibraryModule {}
