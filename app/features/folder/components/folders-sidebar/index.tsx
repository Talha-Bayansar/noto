import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import type { Organization } from "better-auth/plugins";
import { FoldersSidebarHeader } from "./folders-sidebar-header";
import { FoldersSidebarFooter } from "./folders-sidebar-footer";
import { SidebarFolders } from "./sidebar-folders";
import { Suspense } from "react";

type Props = {
  activeOrganization?: Organization | null;
  organizations: Organization[];
  parentId?: string;
};

export function FoldersSidebar({
  activeOrganization,
  organizations,
  parentId,
}: Props) {
  return (
    <Sidebar>
      <FoldersSidebarHeader
        activeOrganization={activeOrganization}
        organizations={organizations}
      />
      <SidebarContent>
        <Suspense>
          <SidebarFolders parentId={parentId} />
        </Suspense>
      </SidebarContent>
      <FoldersSidebarFooter />
    </Sidebar>
  );
}
