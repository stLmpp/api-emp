import { Check, Entity, EntityRepositoryType, PrimaryKey } from '@mikro-orm/core';

import { UserRepository } from '../../3-repository/user.repository';
import { MapProp } from '../../6-shared/mapper/map-prop.decorator';

import { BaseEntityNoId } from './base-entity';

@Entity({ customRepository: () => UserRepository })
export class UserEntity extends BaseEntityNoId {
  @MapProp()
  @PrimaryKey({ length: 30 })
  @Check({ expression: `id ~ '${UserEntity.idCheckRegexp.source}'` })
  id!: string;

  [EntityRepositoryType]?: UserRepository;

  static idCheckRegexp = /^[a-zA-Z][-_a-zA-Z0-9]{1,28}[a-zA-Z0-9]$/;
}
