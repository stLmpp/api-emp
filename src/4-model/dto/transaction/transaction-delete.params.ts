import { IsDefined } from 'class-validator';

import { IsDefaultId } from '@model/validation/is-default-id';
import { IsUserId } from '@model/validation/is-user-id';

export class TransactionDeleteParams {
  @IsDefined()
  @IsDefaultId()
  idTransaction!: string;

  @IsDefined()
  @IsUserId()
  idUser!: string;
}
