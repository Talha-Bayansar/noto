import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organizationTable } from "./auth";

export const noteTable = pgTable("note", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").references(
    () => organizationTable.id,
    { onDelete: "cascade" }
  ),
  title: text("title"),
  content: text("content"),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
