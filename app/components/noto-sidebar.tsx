import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { APP_NAME } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import type { Organization } from "better-auth/plugins";
import { authClient } from "@/lib/auth-client";

type Props = {
  activeOrganization?: Organization | null;
  organizations: Organization[];
};

export function NotoSidebar({ activeOrganization, organizations }: Props) {
  const handleActiveOrganization = (organization: Organization) => {
    authClient.organization.setActive({
      organizationId: organization.id,
    });
  };

  return (
    <Sidebar>
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{APP_NAME}</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
