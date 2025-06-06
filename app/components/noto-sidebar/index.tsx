import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { APP_NAME } from "@/lib/constants";
import type { Organization } from "better-auth/plugins";
import { NotoSidebarHeader } from "./noto-sidebar-header";

type Props = {
  activeOrganization?: Organization | null;
  organizations: Organization[];
};

export function NotoSidebar({ activeOrganization, organizations }: Props) {
  return (
    <Sidebar>
      <NotoSidebarHeader
        activeOrganization={activeOrganization}
        organizations={organizations}
      />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{APP_NAME}</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
