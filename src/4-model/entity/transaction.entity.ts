import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';

import { TransactionType } from '../enum/transaction/transaction-type';

import { BaseEntity } from './base-entity';
import { PersonEntity } from './person.entity';
import { TransactionItemEntity } from './transaction-item.entity';

import { TransactionRepository } from '@repository/transaction.repository';

@Entity({ customRepository: () => TransactionRepository })
export class TransactionEntity extends BaseEntity {
  @Property()
  total!: number;

  @Property({ length: 500 })
  description!: string;

  @Property()
  date!: Date;

  @Property()
  personId!: string;

  @Enum(() => TransactionType)
  type!: TransactionType;

  @ManyToOne({ entity: () => PersonEntity, wrappedReference: true })
  person!: IdentifiedReference<PersonEntity>;

  @OneToMany({ entity: () => TransactionItemEntity, mappedBy: 'transaction' })
  transactionItems = new Collection<TransactionItemEntity>(this);

  [EntityRepositoryType]?: TransactionRepository;
}
