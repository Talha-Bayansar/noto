import { auth } from "@/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { NoteService } from "../services/note.service";

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
    const notes = await noteService.getNotes(organizationId, folderId);

    return notes;
  });
