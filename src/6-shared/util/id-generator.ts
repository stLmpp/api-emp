import { IdNormalizer } from '@shared/util/id-normalizer';

export class IdGenerator {
  constructor(private readonly id: string, private readonly checkId: (id: string) => Promise<boolean>) {}

  private readonly _uniqueId = new Set<string>();
  private readonly _idNormalizer = new IdNormalizer(this.id).start();

  async generate(): Promise<string> {
    const id = this._idNormalizer.toString();
    const idExists = await this.checkId(id);
    if (!idExists) {
      return id;
    }
    this._idNormalizer.replaceRandomChar();
    while (this._uniqueId.has(this._idNormalizer.toString())) {
      this._idNormalizer.replaceRandomChar();
    }
    this._uniqueId.add(this._idNormalizer.toString());
    return this.generate();
  }
}
