import { isArray } from 'st-utils';

import { PersonEntity } from '@model/entity/person.entity';
import { PersonViewModel } from '@model/view-model/person/person.view-model';

export class PersonEntityToPersonViewModelMapper {
  private static _mapOne(person: PersonEntity): PersonViewModel {
    const personViewModel = new PersonViewModel();
    personViewModel.id = person.id;
    personViewModel.name = person.name;
    return personViewModel;
  }

  static map(people: PersonEntity[]): PersonViewModel[];
  static map(person: PersonEntity): PersonViewModel;
  static map(personOrPeople: PersonEntity | PersonEntity[]): PersonViewModel | PersonViewModel[] {
    if (isArray(personOrPeople)) {
      return personOrPeople.map(this._mapOne);
    }
    return this._mapOne(personOrPeople);
  }
}
