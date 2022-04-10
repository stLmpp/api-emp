import {
  Collection,
  Entity,
  EntityRepositoryType,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';

import { PersonRepository } from '../../3-repository/person.repository';

import { BaseEntity } from './base-entity';
import { TransactionEntity } from './transaction.entity';
import { UserEntity } from './user.entity';

@Entity({ customRepository: () => PersonRepository })
export class PersonEntity extends BaseEntity {
  @Property({ length: 150 })
  name!: string;

  @Property()
  userId!: string;

  @ManyToOne({ entity: () => UserEntity, wrappedReference: true })
  user!: IdentifiedReference<UserEntity>;

  @OneToMany({ entity: () => TransactionEntity, mappedBy: 'person' })
  transactions = new Collection<TransactionEntity>(this);

  [EntityRepositoryType]?: PersonRepository;
}
