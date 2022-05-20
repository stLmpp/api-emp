export class TransactionCardViewModel {
  constructor(props?: TransactionCardViewModel) {
    Object.assign(this, props);
  }

  idTransaction!: string;
  idPerson!: string;
  personName!: string;
  name!: string;
  description?: string;
  date!: Date;
  totalToReceive!: number;
  totalReceived!: number;
  total!: number;
}
