import { Check, Collection, Entity, EntityRepositoryType, OneToMany, PrimaryKey } from '@mikro-orm/core';

import { BaseEntityNoId } from './base-entity';
import { PersonEntity } from './person.entity';

import { UserRepository } from '@repository/user.repository';

@Entity({ customRepository: () => UserRepository })
export class UserEntity extends BaseEntityNoId {
  @PrimaryKey({ length: 30 })
  @Check({ expression: `id ~ '${UserEntity.idCheckRegexp.source}'` })
  id!: string;

  @OneToMany({ entity: () => PersonEntity, mappedBy: 'user' })
  people = new Collection<PersonEntity>(this);

  [EntityRepositoryType]?: UserRepository;

  static idCheckRegexp = /^[a-zA-Z][-_a-zA-Z0-9]{1,28}[a-zA-Z0-9]$/;
}
