import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

type Props = {};

export const CreateFolderButton = (props: Props) => {
  return (
    <SidebarGroupAction title="New folder">
      <Plus /> <span className="sr-only">New folder</span>
    </SidebarGroupAction>
  );
};
