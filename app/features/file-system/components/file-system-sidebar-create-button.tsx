import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

type Props = {
  parentId?: string;
};

export const FileSystemSidebarCreateButton = ({ parentId }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SidebarGroupAction title="New item">
          <Plus /> <span className="sr-only">New item</span>
        </SidebarGroupAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuItem>New note</DropdownMenuItem>
        <DropdownMenuItem>New folder</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
