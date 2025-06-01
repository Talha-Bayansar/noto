ALTER TABLE "notes" RENAME TO "note";--> statement-breakpoint
ALTER TABLE "note" DROP CONSTRAINT "notes_organization_id_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "note" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "note" ADD CONSTRAINT "note_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;