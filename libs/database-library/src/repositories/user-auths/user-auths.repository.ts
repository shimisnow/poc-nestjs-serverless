import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthEntity } from '../../entities/user-auth.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class UserAuthsRepository {
  constructor(
    @InjectRepository(UserAuthEntity)
    private repository: Repository<UserAuthEntity>,
  ) {}

  /**
   * Finds a entity (user) by its username.
   *
   * @param username Username to be found.
   * @returns Found entity or null.
   */
  async findByUsername(username: string): Promise<UserAuthEntity | null> {
    return await this.repository.findOne({
      where: {
        username,
      },
    });
  }
}
