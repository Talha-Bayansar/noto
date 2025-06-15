import MDEditor from "@uiw/react-md-editor";
import type { Note } from "../types/note";
import rehypeSanitize from "node_modules/rehype-sanitize/lib";
import "@uiw/react-markdown-preview/markdown.css";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Edit } from "lucide-react";

type Props = {
  note: Note;
};

export const NotePreview = ({ note }: Props) => {
  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      <Button asChild size={"icon"} variant={"outline"}>
        <Link
          to="/notes/$noteId"
          params={{ noteId: note.id }}
          search={{ edit: true, parent: note.folderId ?? undefined }}
        >
          <Edit />
        </Link>
      </Button>
      <MDEditor.Markdown
        className="prose"
        source={note.content}
        rehypePlugins={[rehypeSanitize]}
      />
    </div>
  );
};
