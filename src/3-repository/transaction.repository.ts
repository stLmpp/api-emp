import { BaseRepository } from './base-repository';

import { TransactionEntity } from '@model/entity/transaction.entity';
import { IdGenerator } from '@shared/util/id-generator';

export class TransactionRepository extends BaseRepository<TransactionEntity> {
  async generateId(idUser: string, name: string): Promise<string> {
    return new IdGenerator(`${name}-${idUser}`, id => this.exists(id)).generate();
  }
}
