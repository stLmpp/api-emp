import { Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true, type: 'timestamp' })
  updatedAt?: Date;
}
