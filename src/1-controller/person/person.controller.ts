import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PersonSearchByNameParams } from '@model/dto/person/person-search-by-name.params';
import { PersonSearchByNameQuery } from '@model/dto/person/person-search-by-name.query';
import { PersonEntityToPersonViewModelMapper } from '@model/mapping/person/person.entity-to-person.view-model.mapper';
import { PersonViewModel } from '@model/view-model/person/person.view-model';
import { PersonService } from '@service/person/person.service';

@ApiTags('Person')
@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('search/name')
  async searchByName(
    @Param() { idUser }: PersonSearchByNameParams,
    @Query() { name }: PersonSearchByNameQuery
  ): Promise<PersonViewModel[]> {
    return PersonEntityToPersonViewModelMapper.map(await this.personService.searchByName(idUser, name));
  }
}
