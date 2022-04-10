import { MapProp } from '../../6-shared/mapper/map-prop.decorator';

export class UserViewModel {
  @MapProp()
  id!: string;
}
