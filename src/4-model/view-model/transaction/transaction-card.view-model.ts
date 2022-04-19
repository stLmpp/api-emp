export class TransactionCardViewModel {
  constructor(props?: TransactionCardViewModel) {
    Object.assign(this, props);
  }

  idTransaction!: string;
  personName!: string;
  description!: string;
  date!: Date;
  totalToReceive!: number;
  totalReceived!: number;
  total!: number;
}
