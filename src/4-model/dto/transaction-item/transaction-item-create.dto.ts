import { IsDefined, IsNumber } from 'class-validator';

import { IsDate } from '@model/validation/is-date';

export class TransactionItemCreateDto {
  @IsDefined()
  @IsNumber()
  value!: number;
  
  @IsDefined()
  @IsDate()
  date!: Date;
}
