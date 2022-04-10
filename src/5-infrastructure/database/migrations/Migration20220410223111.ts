import { Migration } from '@mikro-orm/migrations';

export class Migration20220410223111 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" drop column "deleted_at";');

    this.addSql('alter table "person" drop column "deleted_at";');

    this.addSql('alter table "transaction" drop column "deleted_at";');

    this.addSql('alter table "transaction_item" drop column "deleted_at";');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "person" add column "deleted_at" timestamptz null default null;');

    this.addSql('alter table "transaction" add column "deleted_at" timestamptz null default null;');

    this.addSql('alter table "transaction_item" add column "deleted_at" timestamptz null default null;');

    this.addSql('alter table "user" add column "deleted_at" timestamptz null default null;');
  }
}
