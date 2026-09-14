ALTER TABLE "profiles" ADD COLUMN "trial_welcome_email_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "cancel_email_sent_at" timestamp with time zone;
