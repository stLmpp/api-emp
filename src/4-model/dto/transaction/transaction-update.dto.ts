import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

import { TransactionType } from '@model/enum/transaction/transaction-type';
import { IsDate } from '@model/validation/is-date';
import { IsDefaultId } from '@model/validation/is-default-id';

export class TransactionUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  @IsNotEmpty()
  name?: string;

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

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  total?: number;
}
