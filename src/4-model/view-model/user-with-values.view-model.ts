export class UserWithValuesViewModel {
  constructor(props?: UserWithValuesViewModel) {
    Object.assign(this, props);
  }

  id!: string;

  totalToReceive!: number;

  totalReceived!: number;

  total!: number;

  lastDateReceived!: Date;
}
