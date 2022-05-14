import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class PersonSearchByNameQuery {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name!: string;
}
