import { authMiddleware } from "@/features/auth/middlewares/auth-middleware";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { FolderService } from "../services/folder.service";

export const createFolder = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(
    z.object({
      name: z.string().min(1, "Name is required"),
      parentId: z.string().optional(),
    })
  )
  .handler(async ({ data, context }) => {
    const { session } = context.auth;

    if (!session.activeOrganizationId) {
      throw new Error("No active organization");
    }

    const folderService = new FolderService();

    const folder = await folderService.createFolder(
      session.activeOrganizationId,
      data.name,
      data.parentId
    );

    return folder;
  });

export const deleteFolder = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data, context }) => {
    const { session } = context.auth;

    if (!session.activeOrganizationId) {
      throw new Error("No active organization");
    }

    const folderService = new FolderService();

    const folder = await folderService.deleteFolder(
      session.activeOrganizationId,
      data.id
    );

    return folder;
  });
