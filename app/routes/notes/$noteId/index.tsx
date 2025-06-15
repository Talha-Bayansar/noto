import { createFileRoute, notFound } from "@tanstack/react-router";
import { getNote } from "@/features/note/server-functions/queries";
import { NoteEditor } from "@/features/note/containers/note-editor";
import z from "zod";
import { NotePreview } from "@/features/note/containers/note-preview";

const searchSchema = z.object({
  parent: z.string().optional(),
  edit: z.boolean().optional(),
});

export const Route = createFileRoute("/notes/$noteId/")({
  component: RouteComponent,
  validateSearch: searchSchema,
  loader: async ({ params }) => {
    const note = await getNote({ data: { id: params.noteId } });

    if (!note) {
      throw notFound();
    }

    return { note };
  },
  notFoundComponent: () => <div>Note not found</div>,
});

function RouteComponent() {
  const { note } = Route.useLoaderData();
  const { edit } = Route.useSearch();

  return (
    <div className="flex flex-col flex-grow">
      {edit ? <NoteEditor note={note} /> : <NotePreview note={note} />}
    </div>
  );
}
