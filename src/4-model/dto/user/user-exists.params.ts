import { IsDefined } from 'class-validator';

import { UserIdValidator } from './user-id.validator';

export class UserExistsParams {
  @IsDefined()
  @UserIdValidator()
  idUser!: string;
}
