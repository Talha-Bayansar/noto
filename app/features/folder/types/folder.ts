import type { folderTable } from "@/db/schemas/note";

export type Folder = typeof folderTable.$inferSelect;
