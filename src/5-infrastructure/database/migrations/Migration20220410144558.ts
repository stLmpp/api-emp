import { Migration } from '@mikro-orm/migrations';

export class Migration20220410144558 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "user" drop constraint if exists "user_id_check";');
    this.addSql('alter table "user" alter column "id" drop default;');
    this.addSql('alter table "user" alter column "id" type varchar(30) using ("id"::varchar(30));');
    this.addSql('alter table "user" drop constraint "user_name_unique";');
    this.addSql('alter table "user" drop column "name";');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "user" add column "name" varchar(150) not null;');
    this.addSql('alter table "user" drop constraint if exists "user_id_check";');
    this.addSql('alter table "user" alter column "id" drop default;');
    this.addSql('alter table "user" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "user" alter column "id" set default uuid_generate_v4();');
    this.addSql('alter table "user" add constraint "user_name_unique" unique ("name");');
  }

}
