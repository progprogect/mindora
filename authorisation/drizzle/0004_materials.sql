CREATE TABLE IF NOT EXISTS "materials" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL,
  "title_en" text NOT NULL,
  "title_ru" text NOT NULL,
  "description_en" text,
  "description_ru" text,
  "type" text DEFAULT 'guide' NOT NULL,
  "body_en" text,
  "body_ru" text,
  "file_en" text,
  "file_ru" text,
  "sort" integer DEFAULT 0 NOT NULL,
  "is_published" boolean DEFAULT true NOT NULL,
  "published_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "materials_slug_idx" ON "materials" USING btree ("slug");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "materials_published_sort_idx" ON "materials" USING btree ("is_published","sort");
