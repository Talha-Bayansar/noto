import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ChevronRightIcon, Edit, StickyNoteIcon, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Note } from "../types/note";
import { UpdateNoteDialog } from "./update-note-dialog";
import { DeleteNoteDialog } from "./delete-note-dialog";

type Props = {
  note: Omit<Note, "content">;
};

export const SidebarNote = ({ note }: Props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              to="/notes/$noteId"
              search={{ parent: note?.folderId ?? undefined }}
              params={{ noteId: note.id }}
            >
              <StickyNoteIcon />
              {note?.name}
              <ChevronRightIcon className="ml-auto" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <UpdateNoteDialog note={note}>
          <ContextMenuItem onSelect={(e) => e.preventDefault()}>
            <Edit /> Rename
          </ContextMenuItem>
        </UpdateNoteDialog>
        <DeleteNoteDialog
          noteId={note.id}
          folderId={note.folderId ?? undefined}
        >
          <ContextMenuItem
            className="text-destructive"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash2 className="text-destructive" /> Delete
          </ContextMenuItem>
        </DeleteNoteDialog>
      </ContextMenuContent>
    </ContextMenu>
  );
};
