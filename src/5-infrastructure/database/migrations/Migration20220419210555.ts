import { Migration } from '@mikro-orm/migrations';

export class Migration20220419210555 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "transaction" add column "name" varchar(40) not null;');
    this.addSql(
      'alter table "transaction" alter column "description" type varchar(500) using ("description"::varchar(500));'
    );
    this.addSql('alter table "transaction" alter column "description" drop not null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "transaction" alter column "description" type varchar using ("description"::varchar);');
    this.addSql('alter table "transaction" alter column "description" set not null;');
    this.addSql('alter table "transaction" drop column "name";');
  }
}
