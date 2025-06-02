import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/notes/")({
  component: Notes,
});

function Notes() {
  return <div>Notes Page</div>;
}
