CREATE TABLE IF NOT EXISTS "funnel_activation_emails" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"email" text NOT NULL,
	"sid" text NOT NULL,
	"kit" text NOT NULL,
	"flow" text,
	"locale" text DEFAULT 'en' NOT NULL,
	"send_at" timestamp with time zone NOT NULL,
	"sent_at" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	"attempts" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "funnel_activation_emails" ADD CONSTRAINT "funnel_activation_emails_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "funnel_activation_emails_sid_idx" ON "funnel_activation_emails" USING btree ("sid");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "funnel_activation_emails_send_idx" ON "funnel_activation_emails" USING btree ("send_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "funnel_activation_emails_user_idx" ON "funnel_activation_emails" USING btree ("user_id");
