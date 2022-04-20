import { IsDefined } from 'class-validator';

import { UserIdValidator } from '@model/dto/user/user-id.validator';

export class TransactionParams {
  @IsDefined()
  @UserIdValidator()
  idUser!: string;
}
