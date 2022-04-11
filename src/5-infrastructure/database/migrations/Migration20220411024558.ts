import { Migration } from '@mikro-orm/migrations';

export class Migration20220411024558 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "transaction" add column "type" text check ("type" in (\'Loan\', \'Sale\')) null;');
    this.addSql('update "transaction" set "type" = \'Loan\';');
    this.addSql('alter table "transaction" alter column "type" set not null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "transaction" drop column "type";');
  }
}
