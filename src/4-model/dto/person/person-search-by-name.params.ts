import { IsDefined } from 'class-validator';

import { UserIdValidator } from '@model/dto/user/user-id.validator';

export class PersonSearchByNameParams {
  @IsDefined()
  @UserIdValidator()
  idUser!: string;
}
