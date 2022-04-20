import {
  Collection,
  Entity,
  EntityRepositoryType,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';

import { BaseEntityNoId } from './base-entity';
import { TransactionEntity } from './transaction.entity';
import { UserEntity } from './user.entity';

import { PersonRepository } from '@repository/person.repository';

export interface PersonEntityArgs {
  id: string;
  name: string;
  user: UserEntity;
}

@Entity({ customRepository: () => PersonRepository })
export class PersonEntity extends BaseEntityNoId {
  constructor({ id, name, user }: PersonEntityArgs) {
    super();
    this.id = id;
    this.name = name;
    this.user = wrap(user).toReference();
  }

  @PrimaryKey({ length: 13 })
  id!: string;

  @Property({ length: 150 })
  name!: string;

  @ManyToOne({ entity: () => UserEntity, wrappedReference: true })
  user!: IdentifiedReference<UserEntity>;

  @OneToMany({ entity: () => TransactionEntity, mappedBy: 'person' })
  transactions = new Collection<TransactionEntity>(this);

  [EntityRepositoryType]?: PersonRepository;
}
