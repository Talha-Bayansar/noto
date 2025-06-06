import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { NotoSidebar } from "@/components/noto-sidebar";
import {
  getActiveOrganization,
  getMyOrganizations,
} from "@/features/organization/server-functions/queries";

export const Route = createFileRoute("/notes")({
  component: RouteComponent,
  loader: async () => {
    const [organizations, activeOrganization] = await Promise.all([
      getMyOrganizations(),
      getActiveOrganization(),
    ]);

    return { organizations, activeOrganization };
  },
});

function RouteComponent() {
  const { organizations, activeOrganization } = Route.useLoaderData();

  return (
    <SidebarProvider>
      <NotoSidebar
        activeOrganization={activeOrganization}
        organizations={organizations}
      />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
