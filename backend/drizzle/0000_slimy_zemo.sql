CREATE TABLE "menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"items" text NOT NULL,
	"total" integer NOT NULL,
	"status" text DEFAULT 'pending'
);
