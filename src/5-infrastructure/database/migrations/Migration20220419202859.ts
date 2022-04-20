import { Migration } from '@mikro-orm/migrations';

export class Migration20220419202859 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" varchar(30) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null);'
    );
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');

    this.addSql(
      'create table "person" ("id" varchar(13) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "name" varchar(150) not null, "user_id" varchar(30) not null);'
    );
    this.addSql('alter table "person" add constraint "person_pkey" primary key ("id");');

    this.addSql(
      'create table "transaction" ("id" varchar(13) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "total" int not null, "description" varchar(500) not null, "date" timestamptz(0) not null, "person_id" varchar(13) not null, "type" text check ("type" in (\'Loan\', \'Sale\')) not null);'
    );
    this.addSql('alter table "transaction" add constraint "transaction_pkey" primary key ("id");');

    this.addSql(
      'create table "transaction_item" ("id" varchar(13) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "value" int not null, "date" timestamptz(0) not null, "transaction_id" varchar(13) not null);'
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
    this.addSql('alter table "person" drop constraint "person_user_id_foreign";');

    this.addSql('alter table "transaction" drop constraint "transaction_person_id_foreign";');

    this.addSql('alter table "transaction_item" drop constraint "transaction_item_transaction_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "person" cascade;');

    this.addSql('drop table if exists "transaction" cascade;');

    this.addSql('drop table if exists "transaction_item" cascade;');
  }
}
