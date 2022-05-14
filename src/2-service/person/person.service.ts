import { Injectable } from '@nestjs/common';

import { PersonEntity } from '@model/entity/person.entity';
import { PersonRepository } from '@repository/person.repository';

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}

  searchByName(idUser: string, name: string): Promise<PersonEntity[]> {
    return this.personRepository.find({ user: { id: idUser }, name: { $ilike: `%${name}%` } }, { limit: 15 });
  }
}
