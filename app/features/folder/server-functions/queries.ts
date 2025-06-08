import { authMiddleware } from "@/features/auth/middlewares/auth-middleware";
import { createServerFn } from "@tanstack/react-start";
import { FolderService } from "../services/folder.service";
import { z } from "zod";
import type { Folder } from "../types/folder";

export const getFolders = createServerFn()
  .middleware([authMiddleware])
  .validator(
    z
      .object({
        parentId: z.string(),
      })
      .optional()
  )
  .handler(async ({ context, data }) => {
    const organizationId = context.auth.session.activeOrganizationId;

    if (!organizationId) {
      throw new Error("Active organization not found");
    }

    const folderService = new FolderService();

    let folders: Folder[] = [];

    if (data?.parentId) {
      folders = await folderService.getFoldersByParentId(
        organizationId,
        data.parentId
      );
    } else {
      folders = await folderService.getRootFolders(organizationId);
    }

    return folders;
  });

export const getFolderById = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ context, data }) => {
    const organizationId = context.auth.session.activeOrganizationId;

    if (!organizationId) {
      throw new Error("Active organization not found");
    }

    const folderService = new FolderService();

    const folder = await folderService.getFolderById(organizationId, data.id);

    return folder;
  });
