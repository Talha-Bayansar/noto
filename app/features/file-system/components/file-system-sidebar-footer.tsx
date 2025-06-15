import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarProfileButton } from "@/features/auth/containers/sidebar-profile-button";

export const FileSystemSidebarFooter = () => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarProfileButton />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
