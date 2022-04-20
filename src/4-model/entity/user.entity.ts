import { Collection, Entity, EntityRepositoryType, OneToMany, PrimaryKey } from '@mikro-orm/core';

import { BaseEntityNoId } from './base-entity';
import { PersonEntity } from './person.entity';

import { UserRepository } from '@repository/user.repository';

export interface UserEntityArgs {
  id: string;
}

@Entity({ customRepository: () => UserRepository })
export class UserEntity extends BaseEntityNoId {
  constructor({ id }: UserEntityArgs) {
    super();
    this.id = id;
  }

  @PrimaryKey({ length: 30 })
  id: string;

  @OneToMany({ entity: () => PersonEntity, mappedBy: 'user' })
  people = new Collection<PersonEntity>(this);

  [EntityRepositoryType]?: UserRepository;

  static idCheckRegexp = /^[a-zA-Z][-_a-zA-Z\d]{1,28}[a-zA-Z\d]$/;
}
