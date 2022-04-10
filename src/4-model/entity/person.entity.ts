import { Entity, IdentifiedReference, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './base-entity';
import { UserEntity } from './user.entity';

@Entity()
export class PersonEntity extends BaseEntity {
  @Property({ length: 150 })
  name!: string;

  @Property()
  userId!: string;

  @ManyToOne({ entity: () => UserEntity, wrappedReference: true })
  user!: IdentifiedReference<UserEntity>;
}
