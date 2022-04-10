import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserCreateDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  id!: string;
}
