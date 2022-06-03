import { IsDefined } from 'class-validator';

import { TransactionParams } from '@model/dto/transaction/transaction.params';
import { IsDefaultId } from '@model/validation/is-default-id';

export class TransactionUpdateParams extends TransactionParams {
  @IsDefined()
  @IsDefaultId()
  idTransaction!: string;
}
