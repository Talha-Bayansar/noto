import { foreignKey, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organizationTable } from "./auth";

export const folderTable = pgTable(
  "folder",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizationTable.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    parentId: text("parent_id"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    foreignKey({
      name: "folder_parent_id_fk",
      columns: [table.parentId],
      foreignColumns: [table.id],
    }).onDelete("cascade"),
  ]
);
