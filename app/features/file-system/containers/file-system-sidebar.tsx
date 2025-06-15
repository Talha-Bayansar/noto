import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { useActiveOrganization } from "@/features/organization/hooks/use-active-organization";
import { FileSystemSidebarHeader } from "../components/file-system-sidebar-header";
import { FileSystemSidebarFooter } from "../components/file-system-sidebar-footer";
import { FileSystemSidebarItems } from "./file-system-sidebar-items";

type Props = {
  parentId?: string;
};

export function FileSystemSidebar({ parentId }: Props) {
  const { data: activeOrganization } = useActiveOrganization();

  return (
    <Sidebar>
      <FileSystemSidebarHeader />
      <SidebarContent>
        {activeOrganization && (
          <Suspense>
            <FileSystemSidebarItems parentId={parentId} />
          </Suspense>
        )}
      </SidebarContent>
      <FileSystemSidebarFooter />
    </Sidebar>
  );
}
