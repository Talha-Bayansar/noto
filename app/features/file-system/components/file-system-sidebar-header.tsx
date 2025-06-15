import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarOrganizationSwitcher } from "@/features/organization/containers/sidebar-organization-switcher";

export const FileSystemSidebarHeader = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarOrganizationSwitcher />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
