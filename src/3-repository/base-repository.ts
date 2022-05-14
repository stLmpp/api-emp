import { FilterQuery } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';

export class BaseRepository<T extends { id: string }> extends EntityRepository<T> {
  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const entity = await this.findOne(filter, { fields: ['id'], filters: false });
    return !!entity;
  }
}
