import { InsertResult, QueryFailedError } from 'typeorm';
import { UserAuthEntity } from '../entities/user-auth.entity';
import { UserAuthStatusEnum } from '../enums/user-auth-status.enum';

export class UserAuthsRepositoryMock {
  async findOne(options): Promise<UserAuthEntity | null> {
    const username = options.where.username;
    switch (username) {
      case 'anderson':
        return {
          userId: '4b3c74ae-57aa-4752-9452-ed083b6d4bfa',
          username,
          password:
            // test@1234
            '$2b$10$C8.WgVhIpd5NY81.b1GH1uCI53mggPdxrrIvyLyMjvZ68WOgOBQBW',
          status: UserAuthStatusEnum.ACTIVE,
        } as UserAuthEntity;
      case 'thomas':
        return {
          userId: 'fcf5cccf-c217-4502-8cc3-cc24270ae0b7',
          username,
          password:
            // test@1234
            '$2b$10$C8.WgVhIpd5NY81.b1GH1uCI53mggPdxrrIvyLyMjvZ68WOgOBQBW',
          status: UserAuthStatusEnum.INACTIVE,
        } as UserAuthEntity;
      // simulate user that does not exists
      case 'beatrice':
      case 'eleonor':
        return null;
      // simulate database error
      default:
        throw new QueryFailedError('', null, new Error('some error'));
    }
  }
}
