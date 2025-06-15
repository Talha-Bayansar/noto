import { auth } from "@/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { NoteService } from "../services/note.service";
import { authMiddleware } from "@/features/auth/middlewares/auth-middleware";

export const getNotes = createServerFn()
  .validator(
    z.object({
      folderId: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const request = getWebRequest();
    const authObj = await auth.api.getSession({
      headers: request!.headers,
    });

    const organizationId = authObj?.session.activeOrganizationId;

    if (!organizationId) {
      throw new Error("No active organization");
    }

    const { folderId } = data;

    const noteService = new NoteService();

    let notes = [];
    if (folderId) {
      notes = await noteService.getNotesByFolderId(organizationId, folderId);
    } else {
      notes = await noteService.getRootNotes(organizationId);
    }

    return notes;
  });

export const getNote = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data, context }) => {
    const auth = context.auth;

    const organizationId = auth.session.activeOrganizationId;

    if (!organizationId) {
      throw new Error("No active organization");
    }

    const noteService = new NoteService();

    const note = await noteService.getNoteById(organizationId, data.id);

    return note;
  });
