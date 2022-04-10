import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { SoftDeletable } from 'mikro-orm-soft-delete';

import { MapProp } from '../../6-shared/mapper/map-prop.decorator';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@SoftDeletable(() => BaseEntity, 'deletedAt', () => new Date())
@Entity({ abstract: true })
export abstract class BaseEntityNoId {
  @MapProp()
  @Property()
  createdAt: Date = new Date();

  @MapProp()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @MapProp()
  @Property({ nullable: true })
  deletedAt?: Date;
}

@Entity({ abstract: true })
export abstract class BaseEntity extends BaseEntityNoId {
  @MapProp()
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;
}

