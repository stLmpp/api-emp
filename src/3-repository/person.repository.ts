import { BaseRepository } from './base-repository';

import { PersonEntity } from '@model/entity/person.entity';
import { IdGenerator } from '@shared/util/id-generator';

export class PersonRepository extends BaseRepository<PersonEntity> {
  async generateId(idUser: string, name: string): Promise<string> {
    return new IdGenerator(`${name}-${idUser}`, id => this.exists(id)).generate();
  }
}
