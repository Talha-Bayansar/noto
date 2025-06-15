import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useFolders } from "@/features/folder/hooks/use-folders";
import { SidebarFolder } from "@/features/folder/components/sidebar-folder";
import { useFolder } from "@/features/folder/hooks/use-folder";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useNotes } from "@/features/note/hooks/use-notes";
import { FileSystemSidebarCreateButton } from "../components/file-system-sidebar-create-button";
import type { Note } from "@/features/note/types/note";
import type { Folder } from "@/features/folder/types/folder";
import { SidebarNote } from "@/features/note/components/sidebar-note";

type Props = {
  parentId?: string;
};

type Item = Partial<Note> | Folder;

export const FileSystemSidebarItems = ({ parentId }: Props) => {
  const { data: folder, error: folderError } = useFolder({ id: parentId });
  const { data: folders, error: foldersError } = useFolders({ parentId });
  const { data: notes, error: notesError } = useNotes({ folderId: parentId });

  if (folderError || foldersError || notesError) {
    return (
      <em className="text-destructive text-center">
        {folderError?.message ?? foldersError?.message ?? notesError?.message}
      </em>
    );
  }

  const items: Item[] = [...folders, ...notes];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {folder?.id && (
          <Link
            className="mr-2"
            to="/notes"
            search={{ parent: folder?.parentId ?? undefined }}
          >
            <ArrowLeftIcon size={16} />
          </Link>
        )}

        {folder?.name ?? "Root"}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items
          .sort((a, b) => {
            const aName = a.name?.toLowerCase();
            const bName = b.name?.toLowerCase();

            if (aName && bName) {
              if (aName < bName) return -1;
              if (aName > bName) return 1;
            }
            return 0;
          })
          .map((item) =>
            "parentId" in item ? (
              <SidebarFolder key={item.id} folder={item as Folder} />
            ) : (
              <SidebarNote key={item.id} note={item as Note} />
            )
          )}
      </SidebarMenu>
      <FileSystemSidebarCreateButton parentId={parentId} />
    </SidebarGroup>
  );
};
