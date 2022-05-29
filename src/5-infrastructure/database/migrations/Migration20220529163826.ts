import { Migration } from '@mikro-orm/migrations';

export class Migration20220529163826 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transaction_item" alter column "value" type double precision using ("value"::double precision);'
    );
  }

  override async down(): Promise<void> {
    this.addSql('alter table "transaction_item" alter column "value" type int4 using ("value"::int4);');
  }
}
