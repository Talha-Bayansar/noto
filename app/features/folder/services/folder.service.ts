import { db } from "@/db";
import { folderTable } from "@/db/schemas/note";
import { and, eq, isNull } from "drizzle-orm";

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
}
