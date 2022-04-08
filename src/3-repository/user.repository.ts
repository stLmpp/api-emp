import { UserEntity } from '../4-model/entity/user.entity';

import { BaseRepository } from './base-repository';

export class UserRepository extends BaseRepository<UserEntity> {
  async getAllWithValues(): Promise<UserEntity[]> {
    return this.findAll(); // TODO add relationships
  }
}
