CREATE TABLE IF NOT EXISTS "funnel_access_email_log" (
	"email" text PRIMARY KEY NOT NULL,
	"last_sent_at" timestamp with time zone DEFAULT now() NOT NULL
);
