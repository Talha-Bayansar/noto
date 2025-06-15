import { createFileRoute, notFound } from "@tanstack/react-router";
import { getNote } from "@/features/note/server-functions/queries";

export const Route = createFileRoute("/notes/$noteId/")({
  component: RouteComponent,
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

  return <div>{note.name}</div>;
}
