import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { TransactionType } from '@model/enum/transaction/transaction-type';
import { IsDate } from '@model/validation/is-date';
import { IsDefaultId } from '@model/validation/is-default-id';

export class TransactionCreateDto {
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsDefaultId()
  idPerson?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  personName?: string;

  @IsDefined()
  @IsDate()
  date!: Date;

  @IsDefined()
  @IsEnum(TransactionType)
  type!: TransactionType;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  total!: number;
}
