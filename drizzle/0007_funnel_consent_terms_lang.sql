ALTER TABLE "funnel_consents" ADD COLUMN IF NOT EXISTS "terms_text" text;--> statement-breakpoint
ALTER TABLE "funnel_consents" ADD COLUMN IF NOT EXISTS "lang" text;
