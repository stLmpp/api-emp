import { Entity, EntityRepositoryType, PrimaryKey } from '@mikro-orm/core';

import { UserRepository } from '../../3-repository/user.repository';
import { MapProp } from '../../6-shared/mapper/map-prop.decorator';

import { BaseEntityNoId } from './base-entity';

@Entity({ customRepository: () => UserRepository })
export class UserEntity extends BaseEntityNoId {
  @MapProp()
  @PrimaryKey({ length: 30 })
  id!: string;

  [EntityRepositoryType]?: UserRepository;
}
