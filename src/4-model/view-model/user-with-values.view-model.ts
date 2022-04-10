import { MapProp } from '../../6-shared/mapper/map-prop.decorator';

export class UserWithValuesViewModel {
  @MapProp()
  id!: string;

  @MapProp()
  totalToReceive!: number;

  @MapProp()
  totalReceived!: number;

  @MapProp()
  total!: number;

  @MapProp()
  lastDateReceived!: Date;
}
