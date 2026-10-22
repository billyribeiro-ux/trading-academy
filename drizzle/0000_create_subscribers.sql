CREATE TYPE "public"."subscriber_source" AS ENUM('hero', 'free-guide');--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"source" "subscriber_source" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");