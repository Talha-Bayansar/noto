import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { FolderIcon, Plus, StickyNoteIcon } from "lucide-react";
import { CreateNoteDialog } from "@/features/note/components/create-note-dialog";
import { CreateFolderDialog } from "@/features/folder/components/create-folder-dialog";

type Props = {
  parentId?: string;
};

export const FileSystemSidebarCreateButton = ({ parentId }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarGroupAction title="New item">
          <Plus /> <span className="sr-only">New item</span>
        </SidebarGroupAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <CreateNoteDialog folderId={parentId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <StickyNoteIcon /> New note
          </DropdownMenuItem>
        </CreateNoteDialog>
        <CreateFolderDialog parentId={parentId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <FolderIcon /> New folder
          </DropdownMenuItem>
        </CreateFolderDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
