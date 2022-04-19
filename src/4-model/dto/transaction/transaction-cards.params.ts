import { IsDefined } from 'class-validator';

import { UserIdValidator } from '@model/dto/user/user-id.validator';

export class TransactionCardsParams {
  @IsDefined()
  @UserIdValidator()
  idUser!: string;
}
