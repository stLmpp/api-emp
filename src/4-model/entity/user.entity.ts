import { Entity, EntityRepositoryType, Property, Unique } from '@mikro-orm/core';

import { UserRepository } from '../../3-repository/user.repository';
import { MapProp } from '../../6-shared/mapper/map-prop.decorator';

import { BaseEntity } from './base-entity';

@Entity({ customRepository: () => UserRepository })
export class UserEntity extends BaseEntity {
  @MapProp()
  @Property({ length: 150 })
  @Unique()
  name!: string;

  [EntityRepositoryType]?: UserRepository;
}
