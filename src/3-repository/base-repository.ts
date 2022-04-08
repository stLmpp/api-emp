import { QBFilterQuery } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';

import { BaseEntity } from '../4-model/entity/base-entity';

export class BaseRepository<T extends BaseEntity> extends EntityRepository<T> {
  
  async exists(filter: QBFilterQuery<T>): Promise<boolean> {
    const entity = await this.createQueryBuilder().select('id').andWhere(filter).limit(1);
    return !!entity;
  }
  
}
