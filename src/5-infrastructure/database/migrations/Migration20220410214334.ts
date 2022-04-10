import { Migration } from '@mikro-orm/migrations';

export class Migration20220410214334 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));'
    );
    this.addSql('alter table "user" alter column "updated_at" drop not null;');

    this.addSql(
      'alter table "person" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));'
    );
    this.addSql('alter table "person" alter column "updated_at" drop not null;');

    this.addSql(
      'alter table "transaction" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));'
    );
    this.addSql('alter table "transaction" alter column "updated_at" drop not null;');

    this.addSql(
      'alter table "transaction_item" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));'
    );
    this.addSql('alter table "transaction_item" alter column "updated_at" drop not null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "person" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "person" alter column "updated_at" set not null;');

    this.addSql(
      'alter table "transaction" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);'
    );
    this.addSql('alter table "transaction" alter column "updated_at" set not null;');

    this.addSql(
      'alter table "transaction_item" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);'
    );
    this.addSql('alter table "transaction_item" alter column "updated_at" set not null;');

    this.addSql('alter table "user" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "user" alter column "updated_at" set not null;');
  }
}
