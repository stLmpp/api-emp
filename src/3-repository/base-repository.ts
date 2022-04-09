import { FilterQuery } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';

import { BaseEntity } from '../4-model/entity/base-entity';

export class BaseRepository<T extends BaseEntity> extends EntityRepository<T> {
  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const entity = await this.findOne(filter, { fields: ['id'], filters: false });
    return !!entity;
  }
}
