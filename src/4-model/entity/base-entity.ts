import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntityNoId {
  @Property({ type: 'timestamp' })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true, type: 'timestamp' })
  updatedAt?: Date;
}

export abstract class BaseEntity extends BaseEntityNoId {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;
}
