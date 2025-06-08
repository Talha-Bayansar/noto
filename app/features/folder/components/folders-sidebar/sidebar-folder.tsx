import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { Folder } from "../../types/folder";
import { ChevronRightIcon, FolderIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
  folder?: Folder;
};

export const SidebarFolder = ({ folder }: Props) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link to="/notes" search={{ parent: folder?.id }}>
          <FolderIcon />
          {folder?.name}
          <ChevronRightIcon className="ml-auto" />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
