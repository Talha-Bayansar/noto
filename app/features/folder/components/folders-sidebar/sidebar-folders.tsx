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

type Props = {
  parentId?: string;
};

export const SidebarFolders = ({ parentId }: Props) => {
  const { data: folder } = useFolder({ id: parentId });
  const { data: folders } = useFolders({ parentId });

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
    </SidebarGroup>
  );
};
