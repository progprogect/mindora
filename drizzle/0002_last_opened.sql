ALTER TABLE "lesson_progress" ADD COLUMN "opened_at" timestamp with time zone;--> statement-breakpoint
UPDATE "lesson_progress" SET "opened_at" = "completed_at" WHERE "opened_at" IS NULL AND "completed_at" IS NOT NULL;
