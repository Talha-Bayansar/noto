import { db } from "@/db";
import { folderTable } from "@/db/schemas/note";
import { and, eq, isNull, or } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export class FolderService {
  async getRootFolders(organizationId: string) {
    const folders = await db
      .select()
      .from(folderTable)
      .where(
        and(
          eq(folderTable.organizationId, organizationId),
          isNull(folderTable.parentId)
        )
      );
    return folders;
  }

  async getFoldersByParentId(organizationId: string, parentId: string) {
    const folders = await db
      .select()
      .from(folderTable)
      .where(
        and(
          eq(folderTable.organizationId, organizationId),
          eq(folderTable.parentId, parentId)
        )
      );
    return folders;
  }

  async getFolderById(organizationId: string, folderId: string) {
    const folders = await db
      .select()
      .from(folderTable)
      .where(
        and(
          eq(folderTable.organizationId, organizationId),
          eq(folderTable.id, folderId)
        )
      );

    if (folders.length === 0) {
      return null;
    }

    return folders[0];
  }

  async createFolder(organizationId: string, name: string, parentId?: string) {
    const folder = await db.insert(folderTable).values({
      id: uuidv4(),
      name,
      organizationId,
      parentId,
    });

    return folder;
  }

  async deleteFolder(organizationId: string, folderId: string) {
    const folder = await db
      .delete(folderTable)
      .where(
        or(
          and(
            eq(folderTable.organizationId, organizationId),
            eq(folderTable.id, folderId)
          ),
          and(
            eq(folderTable.organizationId, organizationId),
            eq(folderTable.parentId, folderId)
          )
        )
      );

    return folder;
  }

  async updateFolder(organizationId: string, folderId: string, name: string) {
    const folder = await db
      .update(folderTable)
      .set({
        name,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(folderTable.organizationId, organizationId),
          eq(folderTable.id, folderId)
        )
      )
      .returning();

    if (folder.length === 0) {
      return null;
    }

    return folder[0];
  }
}
