import type { noteTable } from "@/db/schemas/note";

export type Note = typeof noteTable.$inferSelect;
