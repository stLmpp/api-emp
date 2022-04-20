import { Entity, EntityRepositoryType, IdentifiedReference, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseEntityNoId } from './base-entity';
import { TransactionEntity } from './transaction.entity';

import { TransactionItemRepository } from '@repository/transaction-item.repository';

@Entity({ customRepository: () => TransactionItemRepository })
export class TransactionItemEntity extends BaseEntityNoId {
  @PrimaryKey({ length: 13 })
  id!: string;

  @Property()
  value!: number;

  @Property()
  date!: Date;

  @ManyToOne({ entity: () => TransactionEntity, wrappedReference: true })
  transaction!: IdentifiedReference<TransactionEntity>;

  [EntityRepositoryType]?: TransactionItemRepository;
}
