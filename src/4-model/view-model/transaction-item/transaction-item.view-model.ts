export class TransactionItemViewModel {
  constructor(id: string, value: number, date: Date) {
    this.id = id;
    this.value = value;
    this.date = date;
  }

  id: string;
  value: number;
  date: Date;
}
