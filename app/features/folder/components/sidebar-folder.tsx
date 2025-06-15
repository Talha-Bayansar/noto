import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { Folder } from "../types/folder";
import { ChevronRightIcon, Edit, FolderIcon, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DeleteFolderDialog } from "./delete-folder-dialog";
import { UpdateFolderDialog } from "./update-folder-dialog";

type Props = {
  folder: Folder;
};

export const SidebarFolder = ({ folder }: Props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/notes" search={{ parent: folder?.id }}>
              <FolderIcon />
              {folder?.name}
              <ChevronRightIcon className="ml-auto" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <UpdateFolderDialog folder={folder}>
          <ContextMenuItem onSelect={(e) => e.preventDefault()}>
            <Edit /> Rename
          </ContextMenuItem>
        </UpdateFolderDialog>
        <DeleteFolderDialog
          folderId={folder.id}
          parentId={folder.parentId ?? undefined}
        >
          <ContextMenuItem
            className="text-destructive"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash2 className="text-destructive" /> Delete
          </ContextMenuItem>
        </DeleteFolderDialog>
      </ContextMenuContent>
    </ContextMenu>
  );
};
