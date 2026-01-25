import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_entry" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "blog_entry" ADD COLUMN "image" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_entry" DROP COLUMN "meta_description";
  ALTER TABLE "blog_entry" DROP COLUMN "image";`)
}
