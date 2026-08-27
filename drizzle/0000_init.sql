CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "otp_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"code_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"email" text,
	"onboarding_complete" boolean DEFAULT false NOT NULL,
	"pace_preference" text,
	"focus_category" text,
	"funnel_source" text,
	"join_date" timestamp with time zone DEFAULT now() NOT NULL,
	"plan_tier" text,
	"quiz_answers" jsonb,
	"quiz_role" text,
	"stripe_customer_id" text
);
--> statement-breakpoint
CREATE TABLE "login_rate_limits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"failed_count" integer DEFAULT 0 NOT NULL,
	"window_started_at" timestamp with time zone NOT NULL,
	"locked_until" timestamp with time zone,
	"last_failed_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"funnel" text NOT NULL,
	"consent" boolean NOT NULL,
	"name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_survey_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"funnel" text NOT NULL,
	"answers" text NOT NULL,
	"role" text NOT NULL,
	"profile_score" integer NOT NULL,
	"score_label" text NOT NULL,
	"archetype" text NOT NULL,
	"checkout_initiated" boolean,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"stripe_price_id" text NOT NULL,
	"price" integer NOT NULL,
	"interval_months" integer NOT NULL,
	"badge" text,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "checkout_offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_key" text NOT NULL,
	"percent_off" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "processed_stripe_payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payment_intent_id" text NOT NULL,
	"customer_id" text NOT NULL,
	"subscription_id" text,
	"email" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "upsell_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"offer_slug" text NOT NULL,
	"action" text NOT NULL,
	"reason" text,
	"source" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"status" text NOT NULL,
	"plan" text,
	"renews_at" timestamp with time zone,
	"stripe_subscription_id" text,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"course_slug" text NOT NULL,
	"lesson_slug" text NOT NULL,
	"status" text NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "daily_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"streak" integer DEFAULT 0 NOT NULL,
	"last_lesson_date" text,
	"xp_total" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "upsell_events" ADD CONSTRAINT "upsell_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "daily_stats" ADD CONSTRAINT "daily_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_hash_idx" ON "sessions" USING btree ("token_hash");
--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");
--> statement-breakpoint
CREATE UNIQUE INDEX "otp_codes_email_idx" ON "otp_codes" USING btree ("email");
--> statement-breakpoint
CREATE UNIQUE INDEX "profiles_user_id_idx" ON "profiles" USING btree ("user_id");
--> statement-breakpoint
CREATE UNIQUE INDEX "login_rate_limits_email_idx" ON "login_rate_limits" USING btree ("email");
--> statement-breakpoint
CREATE UNIQUE INDEX "leads_email_idx" ON "leads" USING btree ("email");
--> statement-breakpoint
CREATE UNIQUE INDEX "lead_survey_data_email_idx" ON "lead_survey_data" USING btree ("email");
--> statement-breakpoint
CREATE INDEX "products_active_idx" ON "products" USING btree ("active");
--> statement-breakpoint
CREATE UNIQUE INDEX "checkout_offers_session_key_idx" ON "checkout_offers" USING btree ("session_key");
--> statement-breakpoint
CREATE UNIQUE INDEX "processed_stripe_payments_pi_idx" ON "processed_stripe_payments" USING btree ("payment_intent_id");
--> statement-breakpoint
CREATE INDEX "upsell_events_user_offer_idx" ON "upsell_events" USING btree ("user_id","offer_slug");
--> statement-breakpoint
CREATE INDEX "upsell_events_user_idx" ON "upsell_events" USING btree ("user_id");
--> statement-breakpoint
CREATE UNIQUE INDEX "daily_stats_user_id_idx" ON "daily_stats" USING btree ("user_id");
