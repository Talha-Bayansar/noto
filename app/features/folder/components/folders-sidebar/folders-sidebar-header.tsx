import type { Organization } from "better-auth/plugins";
import { ChevronsUpDown } from "lucide-react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { updateActivOrganization } from "@/features/organization/server-functions/mutations";
import { useActiveOrganization } from "@/features/organization/hooks/use-active-organization";
import { useOrganizations } from "@/features/organization/hooks/use-organizations";

export const FoldersSidebarHeader = () => {
  const { data: activeOrganization, refetch } = useActiveOrganization();
  const { data: organizations } = useOrganizations();

  const handleActiveOrganization = async (organization: Organization) => {
    await updateActivOrganization({
      data: {
        organizationId: organization.id,
      },
    });

    await refetch();
  };

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                {activeOrganization?.name ?? "Select Organization"}
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {organizations.map((organization) => (
                <DropdownMenuItem
                  key={organization.slug}
                  onClick={() => handleActiveOrganization(organization)}
                >
                  <span>{organization.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
