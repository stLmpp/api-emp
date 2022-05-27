import { IsDefined } from 'class-validator';

import { IsDefaultId } from '@model/validation/is-default-id';

export class TransactionWithItemsParams {
  @IsDefaultId()
  @IsDefined()
  idTransaction!: string;
}
