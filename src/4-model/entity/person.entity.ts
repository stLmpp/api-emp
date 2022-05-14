import {
  Collection,
  Entity,
  EntityRepositoryType,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  Property,
  wrap,
} from '@mikro-orm/core';

import { BaseEntity } from './base-entity';
import { TransactionEntity } from './transaction.entity';
import { UserEntity } from './user.entity';

import { DefaultPrimaryKey } from '@model/decorator/default-primary-key';
import { PersonRepository } from '@repository/person.repository';

export interface PersonEntityArgs {
  id: string;
  name: string;
  user: UserEntity;
}

@Entity({ customRepository: () => PersonRepository })
export class PersonEntity extends BaseEntity {
  constructor({ id, name, user }: PersonEntityArgs) {
    super();
    this.id = id;
    this.name = name;
    this.user = wrap(user).toReference();
  }

  @DefaultPrimaryKey()
  id!: string;

  @Property({ length: 150 })
  name!: string;

  @ManyToOne({ entity: () => UserEntity, wrappedReference: true })
  user!: IdentifiedReference<UserEntity>;

  @OneToMany({ entity: () => TransactionEntity, mappedBy: 'person' })
  transactions = new Collection<TransactionEntity>(this);

  [EntityRepositoryType]?: PersonRepository;
}
