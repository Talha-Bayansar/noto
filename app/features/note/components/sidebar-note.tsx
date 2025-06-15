import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ChevronRightIcon, Edit, FolderIcon, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Note } from "../types/note";

type Props = {
  note: Omit<Note, "content">;
};

export const SidebarNote = ({ note }: Props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/notes" search={{ parent: note?.id }}>
              <FolderIcon />
              {note?.name}
              <ChevronRightIcon className="ml-auto" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {/* <UpdateFolder folder={folder}>
          <ContextMenuItem onSelect={(e) => e.preventDefault()}>
            <Edit /> Rename
          </ContextMenuItem>
        </UpdateFolder>
        <DeleteFolder
          folderId={folder.id}
          parentId={folder.parentId ?? undefined}
        >
          <ContextMenuItem
            className="text-destructive"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash2 className="text-destructive" /> Delete
          </ContextMenuItem>
        </DeleteFolder> */}
      </ContextMenuContent>
    </ContextMenu>
  );
};
