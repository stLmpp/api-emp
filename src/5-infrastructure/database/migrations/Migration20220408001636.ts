import { Migration } from '@mikro-orm/migrations';

export class Migration20220408001636 extends Migration {
  async up(): Promise<void> {
    this.addSql('create extension "uuid-ossp";');
    this.addSql(
      'create table "user" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(150) not null);'
    );
    this.addSql('alter table "user" add constraint "user_name_unique" unique ("name");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }
}
