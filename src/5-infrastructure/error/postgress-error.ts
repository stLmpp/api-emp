export class PostgresQueryError {
  length!: number;
  severity!: string;
  code!: string;
  position!: string;
  file!: string;
  line!: string;
  routine!: string;
  // TODO missing properties
}
