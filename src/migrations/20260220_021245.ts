import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "book_review" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"slug" varchar NOT NULL,
  	"image" varchar,
  	"author" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"rating" numeric NOT NULL,
  	"amazon_link" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "book_review_id" integer;
  CREATE UNIQUE INDEX "book_review_slug_idx" ON "book_review" USING btree ("slug");
  CREATE INDEX "book_review_updated_at_idx" ON "book_review" USING btree ("updated_at");
  CREATE INDEX "book_review_created_at_idx" ON "book_review" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_book_review_fk" FOREIGN KEY ("book_review_id") REFERENCES "public"."book_review"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_book_review_id_idx" ON "payload_locked_documents_rels" USING btree ("book_review_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "book_review" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "book_review" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_book_review_fk";
  
  DROP INDEX "payload_locked_documents_rels_book_review_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "book_review_id";`)
}
