import { Migration } from '@mikro-orm/migrations';

export class Migration20220531020549 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transaction" alter column "total" type double precision using ("total"::double precision);'
    );
  }

  override async down(): Promise<void> {
    this.addSql('alter table "transaction" alter column "total" type int4 using ("total"::int4);');
  }
}
