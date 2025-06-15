import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronsUpDown } from "lucide-react";
import { useActiveOrganization } from "../hooks/use-active-organization";
import { useOrganizations } from "../hooks/use-organizations";
import { updateActivOrganization } from "../server-functions/mutations";
import type { Organization } from "better-auth/plugins/organization";

export const SidebarOrganizationSwitcher = () => {
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
  );
};
