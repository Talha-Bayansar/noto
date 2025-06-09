import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { FoldersSidebarHeader } from "./folders-sidebar-header";
import { FoldersSidebarFooter } from "./folders-sidebar-footer";
import { SidebarFolders } from "./sidebar-folders";
import { Suspense } from "react";
import { useActiveOrganization } from "@/features/organization/hooks/use-active-organization";

type Props = {
  parentId?: string;
};

export function FoldersSidebar({ parentId }: Props) {
  const { data: activeOrganization } = useActiveOrganization();

  return (
    <Sidebar>
      <FoldersSidebarHeader />
      <SidebarContent>
        {activeOrganization && (
          <Suspense>
            <SidebarFolders parentId={parentId} />
          </Suspense>
        )}
      </SidebarContent>
      <FoldersSidebarFooter />
    </Sidebar>
  );
}
