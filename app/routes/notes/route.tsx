import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { NotoSidebar } from "@/components/noto-sidebar";
import { getMyOrganizations } from "@/features/organization/server-functions/queries";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/notes")({
  component: RouteComponent,
  loader: async () => {
    const organizations = await getMyOrganizations();
    return { organizations };
  },
});

function RouteComponent() {
  const { organizations } = Route.useLoaderData();
  const activeOrganization = authClient.useActiveOrganization();

  return (
    <SidebarProvider>
      <NotoSidebar
        activeOrganization={activeOrganization.data}
        organizations={organizations}
      />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
