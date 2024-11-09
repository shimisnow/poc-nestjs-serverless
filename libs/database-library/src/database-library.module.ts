import { Module } from '@nestjs/common';
import { DatabaseLibraryService } from './database-library.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import fs from 'fs';
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
      synchronize: false,
      ssl:
        process.env.DATABASE_USE_SSL === 'true'
          ? {
              rejectUnauthorized: true,
              requestCert: true,
              ca: fs
                .readFileSync(
                  `${process.env.DATABASE_CERTIFICATE_PATH}/${process.env.AWS_REGION}-bundle.pem`,
                )
                .toString(),
            }
          : false,
    }),
  ],
  providers: [DatabaseLibraryService],
  exports: [DatabaseLibraryService],
})
export class DatabaseLibraryModule {}
