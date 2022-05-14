import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PersonSearchByNameQuery {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;
}
