import { foreignKey, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organizationTable } from "./auth";

export const folderTable = pgTable(
  "folder",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").references(
      () => organizationTable.id,
      { onDelete: "cascade" }
    ),
    name: text("name"),
    parentId: text("parent_id"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return [
      foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: "folder_parent_id_fkey",
      }).onDelete("cascade"),
    ];
  }
);
