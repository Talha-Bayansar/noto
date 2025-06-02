// import { getFolders } from "@/features/folder/queries";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FoldersSidebar } from "@/features/folder/containers/folders-sidebar";

export const Route = createFileRoute("/_auth/notes")({
  component: RouteComponent,
  // loader: async () => {
  //   return await getFolders();
  // },
});

function RouteComponent() {
  // const folders = Route.useLoaderData();

  // console.log(folders);

  return (
    <SidebarProvider>
      <FoldersSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
