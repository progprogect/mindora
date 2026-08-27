CREATE UNIQUE INDEX "lesson_progress_user_course_lesson_idx" ON "lesson_progress" USING btree ("user_id","course_slug","lesson_slug");
--> statement-breakpoint
CREATE INDEX "lesson_progress_user_idx" ON "lesson_progress" USING btree ("user_id");
--> statement-breakpoint
CREATE TABLE "badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"badge_id" text NOT NULL,
	"earned_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"sku" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wise_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"day" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wise_threads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text DEFAULT 'Chat' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wise_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"thread_id" uuid NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "badges" ADD CONSTRAINT "badges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "wise_usage" ADD CONSTRAINT "wise_usage_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "wise_threads" ADD CONSTRAINT "wise_threads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "wise_messages" ADD CONSTRAINT "wise_messages_thread_id_wise_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."wise_threads"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE UNIQUE INDEX "badges_user_badge_idx" ON "badges" USING btree ("user_id","badge_id");
--> statement-breakpoint
CREATE INDEX "badges_user_idx" ON "badges" USING btree ("user_id");
--> statement-breakpoint
CREATE UNIQUE INDEX "purchases_user_sku_idx" ON "purchases" USING btree ("user_id","sku");
--> statement-breakpoint
CREATE INDEX "purchases_user_idx" ON "purchases" USING btree ("user_id");
--> statement-breakpoint
CREATE UNIQUE INDEX "wise_usage_user_day_idx" ON "wise_usage" USING btree ("user_id","day");
--> statement-breakpoint
CREATE INDEX "wise_threads_user_idx" ON "wise_threads" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "wise_messages_thread_idx" ON "wise_messages" USING btree ("thread_id");
