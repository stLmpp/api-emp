import { Migration } from '@mikro-orm/migrations';

export class Migration20220410170433 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint user_id_check;');
    this.addSql('alter table "user" add constraint user_id_check check(id ~ \'^[a-zA-Z][-_a-zA-Z0-9]{3,28}[a-zA-Z0-9]$\');');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint user_id_check;');
    this.addSql('alter table "user" add constraint user_id_check check(id ~ \'^[a-zA-Z0-9-]{3,30}$\');');
  }

}
