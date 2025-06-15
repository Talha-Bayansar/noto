import { createServerFn } from "@tanstack/react-start";
import { NoteService } from "../services/note.service";
import { authMiddleware } from "@/features/auth/middlewares/auth-middleware";
import { z } from "zod";

export const createNote = createServerFn()
  .middleware([authMiddleware])
  .validator(
    z.object({
      folderId: z.string().optional(),
      name: z.string().min(1, "Name is required"),
    })
  )
  .handler(async ({ context, data }) => {
    const auth = context.auth;
    const organizationId = auth.session.activeOrganizationId;

    if (!organizationId) {
      throw new Error("No active organization");
    }

    const noteService = new NoteService();
    const note = await noteService.createNote(
      organizationId,
      data.name,
      data.folderId
    );
    return note;
  });

export const updateNote = createServerFn()
  .middleware([authMiddleware])
  .validator(
    z.object({
      id: z.string().min(1, "Id is required"),
      name: z.string().min(1, "Name is required"),
      folderId: z.string().optional(),
    })
  )
  .handler(async ({ context, data }) => {
    const auth = context.auth;
    const organizationId = auth.session.activeOrganizationId;

    if (!organizationId) {
      throw new Error("No active organization");
    }

    const noteService = new NoteService();
    const note = await noteService.updateNote(
      organizationId,
      data.id,
      data.name,
      data.folderId
    );
    return note;
  });
