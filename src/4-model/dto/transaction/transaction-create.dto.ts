import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

import { TransactionType } from '@model/enum/transaction/transaction-type';
import { IsDate } from '@shared/validation/is-date';

export class TransactionCreateDto {
  @IsDefined()
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  idPerson?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
