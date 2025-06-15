import { useState } from "react";
import type { Note } from "../types/note";
import MDEditor, { commands } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { updateNoteContent } from "../server-functions/mutations";
import { useMutation } from "@tanstack/react-query";
import { BanIcon, Loader2, SaveIcon } from "lucide-react";
import "@uiw/react-md-editor/markdown-editor.css";
import { useRouter } from "@tanstack/react-router";

type Props = {
  note: Note;
};

export const NoteEditor = ({ note }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState(note.content);
  const updateContentMutation = useMutation({
    mutationFn: updateNoteContent,
  });

  const handleMutation = (value: string) => {
    updateContentMutation.mutate({
      data: { id: note.id, content: value },
    });
  };

  return (
    <MDEditor
      className="flex-grow"
      value={value}
      onChange={(value) => setValue(value ?? "")}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      draggable={false}
      visibleDragbar={false}
      extraCommands={[
        commands.codeEdit,
        commands.codeLive,
        commands.codePreview,
        commands.divider,
        {
          name: "Save",
          keyCommand: "save",
          buttonProps: { "aria-label": "Save", title: "Save" },
          icon: updateContentMutation.isPending ? (
            <Loader2 className="animate-spin" size={12} />
          ) : (
            <SaveIcon size={12} />
          ),
          execute: () => {
            handleMutation(value);
          },
        },
        {
          name: "Cancel",
          keyCommand: "cancel",
          buttonProps: { "aria-label": "Cancel", title: "Cancel" },
          icon: <BanIcon size={12} />,
          execute: () => {
            router.navigate({
              to: "/notes/$noteId",
              params: { noteId: note.id },
              search: { parent: note.folderId ?? undefined },
            });
          },
        },
      ]}
    />
  );
};
