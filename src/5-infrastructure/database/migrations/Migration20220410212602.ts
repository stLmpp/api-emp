import { Migration } from '@mikro-orm/migrations';

export class Migration20220410212602 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "person" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(150) not null, "user_id" varchar(30) not null);'
    );
    this.addSql('alter table "person" add constraint "person_pkey" primary key ("id");');

    this.addSql(
      'create table "transaction" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "total" int not null, "description" varchar(500) not null, "date" timestamptz(0) not null, "person_id" uuid not null);'
    );
    this.addSql('alter table "transaction" add constraint "transaction_pkey" primary key ("id");');

    this.addSql(
      'create table "transaction_item" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "value" int not null, "date" timestamptz(0) not null, "transaction_id" uuid not null);'
    );
    this.addSql('alter table "transaction_item" add constraint "transaction_item_pkey" primary key ("id");');

    this.addSql(
      'alter table "person" add constraint "person_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "transaction" add constraint "transaction_person_id_foreign" foreign key ("person_id") references "person" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "transaction_item" add constraint "transaction_item_transaction_id_foreign" foreign key ("transaction_id") references "transaction" ("id") on update cascade;'
    );
  }

  override async down(): Promise<void> {
    this.addSql('alter table "transaction" drop constraint "transaction_person_id_foreign";');

    this.addSql('alter table "transaction_item" drop constraint "transaction_item_transaction_id_foreign";');

    this.addSql('drop table if exists "person" cascade;');

    this.addSql('drop table if exists "transaction" cascade;');

    this.addSql('drop table if exists "transaction_item" cascade;');
  }
}
