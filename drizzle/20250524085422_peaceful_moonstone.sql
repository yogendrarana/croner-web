CREATE TYPE "public"."http_method" AS ENUM('GET', 'POST', 'PUT', 'PATCH', 'DELETE');--> statement-breakpoint
CREATE TYPE "public"."last_run_status" AS ENUM('success', 'failed');--> statement-breakpoint
CREATE TYPE "public"."job_status" AS ENUM('enabled', 'disabled', 'paused');--> statement-breakpoint
CREATE TYPE "public"."execution_status" AS ENUM('success', 'failed', 'timeout', 'error');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('super_admin', 'admin', 'customer', 'staff', 'guest');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'inactive', 'banned');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"serial_id" serial NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"user_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cronjob" (
	"id" text PRIMARY KEY NOT NULL,
	"serial_id" serial NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"schedule" text NOT NULL,
	"timezone" text DEFAULT 'UTC',
	"active" boolean DEFAULT true NOT NULL,
	"status" "job_status",
	"last_run" timestamp with time zone,
	"last_run_status" "last_run_status",
	"next_run" timestamp with time zone,
	"max_retries" integer DEFAULT 3,
	"timeout_seconds" integer DEFAULT 30,
	"notify_on_failure" boolean DEFAULT true,
	"notify_on_success_after_failure" boolean DEFAULT false,
	"http_method" "http_method" DEFAULT 'POST',
	"http_headers" jsonb,
	"http_body" jsonb,
	"http_auth_username" text,
	"http_auth_password" text,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "job_execution" (
	"id" text PRIMARY KEY NOT NULL,
	"serial_id" serial NOT NULL,
	"cron_job_id" text NOT NULL,
	"status" "execution_status" NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"response_time" integer,
	"duration" integer,
	"status_code" integer,
	"response_body" text,
	"error_message" text,
	"retry_count" integer DEFAULT 0,
	"is_retry" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"serial_id" serial NOT NULL,
	"name" varchar(100),
	"email" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'customer' NOT NULL,
	"status" "user_status" DEFAULT 'active',
	"email_verified" boolean DEFAULT false,
	"avatar" varchar(1000),
	"phone" varchar(20),
	"is_deleted" boolean DEFAULT false,
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"serial_id" serial NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"serial_id" serial NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cronjob" ADD CONSTRAINT "cronjob_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_execution" ADD CONSTRAINT "job_execution_cron_job_id_cronjob_id_fk" FOREIGN KEY ("cron_job_id") REFERENCES "public"."cronjob"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;