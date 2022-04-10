import { Collection, Entity, IdentifiedReference, ManyToOne, OneToMany, Property } from '@mikro-orm/core';

import { BaseEntity } from './base-entity';
import { PersonEntity } from './person.entity';
import { TransactionItemEntity } from './transaction-item.entity';

@Entity()
export class TransactionEntity extends BaseEntity {
  @Property()
  total!: number;

  @Property({ length: 500 })
  description!: string;

  @Property()
  date!: Date;

  @Property()
  personId!: string;

  @ManyToOne({ entity: () => PersonEntity, wrappedReference: true })
  person!: IdentifiedReference<PersonEntity>;

  @OneToMany({ entity: () => TransactionItemEntity, mappedBy: 'transaction' })
  transactionItems = new Collection<TransactionItemEntity>(this);
}
