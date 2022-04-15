import { Entity, EntityRepositoryType, IdentifiedReference, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './base-entity';
import { TransactionEntity } from './transaction.entity';

import { TransactionItemRepository } from '@repository/transaction-item.repository';

@Entity({ customRepository: () => TransactionItemRepository })
export class TransactionItemEntity extends BaseEntity {
  @Property()
  value!: number;

  @Property()
  date!: Date;

  @Property()
  transactionId!: string;

  @ManyToOne({ entity: () => TransactionEntity, wrappedReference: true })
  transaction!: IdentifiedReference<TransactionEntity>;

  [EntityRepositoryType]?: TransactionItemRepository;
}
