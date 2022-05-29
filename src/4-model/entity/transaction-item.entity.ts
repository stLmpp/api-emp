import { Entity, EntityRepositoryType, IdentifiedReference, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './base-entity';
import { TransactionEntity } from './transaction.entity';

import { DefaultPrimaryKey } from '@model/decorator/default-primary-key';
import { TransactionItemRepository } from '@repository/transaction-item.repository';

@Entity({ customRepository: () => TransactionItemRepository })
export class TransactionItemEntity extends BaseEntity {
  constructor(id: string, value: number, date: Date) {
    super();
    this.id = id;
    this.value = value;
    this.date = date;
  }

  @DefaultPrimaryKey()
  id!: string;

  @Property({ type: 'double' })
  value!: number;

  @Property()
  date!: Date;

  @ManyToOne({ entity: () => TransactionEntity, wrappedReference: true })
  transaction!: IdentifiedReference<TransactionEntity>;

  [EntityRepositoryType]?: TransactionItemRepository;
}
