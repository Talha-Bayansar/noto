import { db } from "@/db";
import { noteTable } from "@/db/schemas/note";
import { and, eq, isNull } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export class NoteService {
  async getRootNotes(organizationId: string) {
    const notes = await db
      .select({
        id: noteTable.id,
        name: noteTable.name,
        folderId: noteTable.folderId,
      })
      .from(noteTable)
      .where(
        and(
          eq(noteTable.organizationId, organizationId),
          isNull(noteTable.folderId)
        )
      );

    return notes;
  }

  async getNotesByFolderId(organizationId: string, folderId?: string) {
    const whereClause = folderId
      ? and(
          eq(noteTable.folderId, folderId),
          eq(noteTable.organizationId, organizationId)
        )
      : eq(noteTable.organizationId, organizationId);

    const notes = await db
      .select({
        id: noteTable.id,
        name: noteTable.name,
        folderId: noteTable.folderId,
      })
      .from(noteTable)
      .where(whereClause);

    return notes;
  }

  async getNoteById(organizationId: string, noteId: string) {
    const note = await db
      .select()
      .from(noteTable)
      .where(
        and(
          eq(noteTable.id, noteId),
          eq(noteTable.organizationId, organizationId)
        )
      );

    if (note.length > 0) {
      return note[0];
    }

    return null;
  }

  async createNote(organizationId: string, name: string, folderId?: string) {
    const note = await db.insert(noteTable).values({
      id: uuidv4(),
      organizationId,
      folderId,
      name,
    });

    return note;
  }

  async updateNote(
    organizationId: string,
    noteId: string,
    name: string,
    folderId?: string
  ) {
    const note = await db
      .update(noteTable)
      .set({
        name,
        folderId,
      })
      .where(
        and(
          eq(noteTable.id, noteId),
          eq(noteTable.organizationId, organizationId)
        )
      );

    return note;
  }

  async deleteNote(organizationId: string, noteId: string) {
    const note = await db
      .delete(noteTable)
      .where(
        and(
          eq(noteTable.id, noteId),
          eq(noteTable.organizationId, organizationId)
        )
      );

    return note;
  }
}
