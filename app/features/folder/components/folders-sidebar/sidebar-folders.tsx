import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useFolders } from "../../hooks/use-folders";
import { SidebarFolder } from "./sidebar-folder";
import { useFolder } from "../../hooks/use-folder";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CreateFolderButton } from "./create-folder-button";

type Props = {
  parentId?: string;
};

export const SidebarFolders = ({ parentId }: Props) => {
  const { data: folder, error: folderError } = useFolder({ id: parentId });
  const { data: folders, error: foldersError } = useFolders({ parentId });

  if (folderError || foldersError) {
    return (
      <em className="text-destructive text-center">
        {folderError?.message ?? foldersError?.message}
      </em>
    );
  }

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
        {folders.map((folder) => (
          <SidebarFolder key={folder.id} folder={folder} />
        ))}
      </SidebarMenu>
      <CreateFolderButton parentId={parentId} />
    </SidebarGroup>
  );
};
