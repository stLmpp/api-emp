import { Entity, EntityRepositoryType, Property, Unique } from '@mikro-orm/core';

import { UserRepository } from '../repository/user.repository';

import { BaseEntity } from './base-entity';

@Entity({ customRepository: () => UserRepository })
export class UserEntity extends BaseEntity {
  @Property({ length: 150 })
  @Unique()
  name!: string;

  [EntityRepositoryType]?: UserRepository;
}
