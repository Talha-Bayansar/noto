ALTER TABLE "folder" DROP CONSTRAINT "folders_parent_id_fkey";
--> statement-breakpoint
ALTER TABLE "folder" ADD CONSTRAINT "folder_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."folder"("id") ON DELETE no action ON UPDATE no action;