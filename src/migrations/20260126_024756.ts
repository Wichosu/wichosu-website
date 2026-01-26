import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "blog_entry_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"category_id" integer
  );
  
  ALTER TABLE "blog_entry" DROP CONSTRAINT "blog_entry_category_id_category_id_fk";
  
  DROP INDEX "blog_entry_category_idx";
  ALTER TABLE "blog_entry_rels" ADD CONSTRAINT "blog_entry_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_entry"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_entry_rels" ADD CONSTRAINT "blog_entry_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blog_entry_rels_order_idx" ON "blog_entry_rels" USING btree ("order");
  CREATE INDEX "blog_entry_rels_parent_idx" ON "blog_entry_rels" USING btree ("parent_id");
  CREATE INDEX "blog_entry_rels_path_idx" ON "blog_entry_rels" USING btree ("path");
  CREATE INDEX "blog_entry_rels_category_id_idx" ON "blog_entry_rels" USING btree ("category_id");
  ALTER TABLE "blog_entry" DROP COLUMN "category_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_entry_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "blog_entry_rels" CASCADE;
  ALTER TABLE "blog_entry" ADD COLUMN "category_id" integer;
  ALTER TABLE "blog_entry" ADD CONSTRAINT "blog_entry_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "blog_entry_category_idx" ON "blog_entry" USING btree ("category_id");`)
}
