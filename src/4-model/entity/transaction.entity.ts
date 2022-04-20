import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';

import { TransactionType } from '../enum/transaction/transaction-type';

import { BaseEntityNoId } from './base-entity';
import { PersonEntity } from './person.entity';
import { TransactionItemEntity } from './transaction-item.entity';

import { TransactionRepository } from '@repository/transaction.repository';

export interface TransactionEntityArgs {
  id: string;
  total: number;
  name: string;
  description?: string;
  date: Date;
  person: PersonEntity;
  type: TransactionType;
}

@Entity({ customRepository: () => TransactionRepository })
export class TransactionEntity extends BaseEntityNoId {
  constructor({ id, total, name, description, date, person, type }: TransactionEntityArgs) {
    super();
    this.id = id;
    this.total = total;
    this.name = name;
    this.description = description;
    this.date = date;
    this.person = wrap(person).toReference();
    this.type = type;
  }

  @PrimaryKey({ length: 13 })
  id: string;

  @Property()
  total: number;

  @Property({ length: 40 })
  name: string;

  @Property({ length: 500, nullable: true })
  description?: string;

  @Property()
  date: Date;

  @Enum(() => TransactionType)
  type: TransactionType;

  @ManyToOne({ entity: () => PersonEntity, wrappedReference: true })
  person: IdentifiedReference<PersonEntity>;

  @OneToMany({ entity: () => TransactionItemEntity, mappedBy: 'transaction' })
  transactionItems = new Collection<TransactionItemEntity>(this);

  [EntityRepositoryType]?: TransactionRepository;
}
