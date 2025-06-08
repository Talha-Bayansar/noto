import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FoldersSidebar } from "@/features/folder/components/folders-sidebar";
import {
  getActiveOrganization,
  getMyOrganizations,
} from "@/features/organization/server-functions/queries";
import z from "zod";

const searchSchema = z.object({
  parent: z.string().optional(),
});

export const Route = createFileRoute("/notes")({
  component: RouteComponent,
  validateSearch: searchSchema,
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
  const { parent } = Route.useSearch();

  return (
    <SidebarProvider>
      <FoldersSidebar
        activeOrganization={activeOrganization}
        organizations={organizations}
        parentId={parent}
      />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
