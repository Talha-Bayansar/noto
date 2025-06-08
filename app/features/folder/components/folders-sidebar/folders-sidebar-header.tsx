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
import { useRouter } from "@tanstack/react-router";

export const FoldersSidebarHeader = ({
  activeOrganization,
  organizations,
}: {
  activeOrganization?: Organization | null;
  organizations: Organization[];
}) => {
  const router = useRouter();
  const handleActiveOrganization = async (organization: Organization) => {
    await updateActivOrganization({
      data: {
        organizationId: organization.id,
      },
    });
    router.invalidate();
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
