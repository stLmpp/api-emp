import { normalizeString, random, sample } from 'st-utils';

export class IdNormalizer {
  constructor(private id: string) {}

  private readonly _idOrigin = this.id;
  private readonly _capAt = 13;
  private readonly _validCharRegex = /^[-_A-Za-z\d]$/;
  private readonly _possibleReplacements = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789-_',
  ].map(chunk => chunk.split(''));

  private _invalidCharacters = '';
  private _invalidBeginning = '';
  private _capCharacters = '';

  private _normalize(): this {
    this.id = normalizeString(this.id);
    return this;
  }

  private _removeInvalid(): this {
    const characters = this.id.split('');
    let newId = '';
    for (const character of characters) {
      if (this._validCharRegex.test(character)) {
        newId += character;
      } else {
        this._invalidCharacters += character;
      }
    }
    this.id = newId;
    return this;
  }

  private _clearBeginning(): this {
    while (/^[-_\d]/.test(this.id)) {
      this._invalidBeginning += this.id[0];
      this.id = this.id.slice(1);
    }
    return this;
  }

  private _cap(): this {
    this._capCharacters = this.id.slice(this._capAt);
    this.id = this.id.slice(0, this._capAt);
    return this;
  }

  private _pad(): this {
    if (this._capCharacters) {
      return this;
    }
    const remaining = this._capAt - this.id.length;
    for (let index = 0; index < remaining; index++) {
      this.id += this._getNextCharacter();
    }
    return this;
  }

  private _getNextCharacter(): string {
    if (this._capCharacters) {
      const char = this._capCharacters.slice(-1);
      this._capCharacters = this._capCharacters.slice(0, -1);
      return char;
    }
    if (this._invalidBeginning) {
      const char = this._invalidBeginning.slice(-1);
      this._invalidBeginning = this._invalidBeginning.slice(0, -1);
      return char;
    }
    return this._getRandomCharacter();
  }

  private _getRandomCharacter(): string {
    return sample(sample(this._possibleReplacements));
  }

  start(): this {
    return this._normalize()._removeInvalid()._clearBeginning()._cap()._pad();
  }

  replaceRandomChar(): this {
    const array = this.id.split('');
    const randomIndex = random(0, array.length - 1);
    array[randomIndex] = this._getNextCharacter();
    this.id = array.join('');
    return this;
  }

  toString(): string {
    return this.id;
  }

  getInvalidCharacters(): string {
    return this._invalidCharacters;
  }

  getOrigin(): string {
    return this._idOrigin;
  }
}
