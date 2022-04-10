import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(30)
  id?: string;
}
