import { Entity, IdentifiedReference, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './base-entity';
import { TransactionEntity } from './transaction.entity';

@Entity()
export class TransactionItemEntity extends BaseEntity {
  @Property()
  value!: number;

  @Property()
  date!: Date;

  @Property()
  transactionId!: string;

  @ManyToOne({ entity: () => TransactionEntity, wrappedReference: true })
  transaction!: IdentifiedReference<TransactionEntity>;
}
