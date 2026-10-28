CREATE TABLE IF NOT EXISTS "funnel_consents" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "sid" text NOT NULL,
  "plan" text NOT NULL,
  "consent_text" text NOT NULL,
  "ip" text,
  "user_agent" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "funnel_trial_reminders" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "stripe_subscription_id" text NOT NULL,
  "email" text NOT NULL,
  "amount_cents" integer NOT NULL,
  "send_at" timestamp with time zone NOT NULL,
  "sent_at" timestamp with time zone,
  "locale" text DEFAULT 'en' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "funnel_consents" ADD CONSTRAINT "funnel_consents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null;
END $$;--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "funnel_trial_reminders" ADD CONSTRAINT "funnel_trial_reminders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null;
END $$;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "funnel_consents_user_idx" ON "funnel_consents" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "funnel_consents_sid_idx" ON "funnel_consents" USING btree ("sid");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "funnel_trial_reminders_sub_idx" ON "funnel_trial_reminders" USING btree ("stripe_subscription_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "funnel_trial_reminders_send_idx" ON "funnel_trial_reminders" USING btree ("send_at");
