import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import z from "zod";
import { getAuth } from "@/features/auth/server-functions/queries";
import { FileSystemSidebar } from "@/features/file-system/containers/file-system-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const searchSchema = z.object({
  parent: z.string().optional(),
});

export const Route = createFileRoute("/notes")({
  component: RouteComponent,
  validateSearch: searchSchema,
  beforeLoad: async () => {
    const auth = await getAuth();

    if (!auth?.session) {
      throw redirect({
        to: "/auth",
      });
    }

    return { auth };
  },
});

function RouteComponent() {
  const { parent } = Route.useSearch();
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <FileSystemSidebar parentId={parent} />
      <main className="w-full flex flex-col">
        {isMobile && <SidebarTrigger />}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
