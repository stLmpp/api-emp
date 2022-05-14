import { IsDefined } from 'class-validator';

import { IsUserId } from '@model/validation/is-user-id';

export class TransactionParams {
  @IsDefined()
  @IsUserId()
  idUser!: string;
}
