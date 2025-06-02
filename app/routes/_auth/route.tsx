import { auth } from "@/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getWebRequest } from "@tanstack/react-start/server";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const request = getWebRequest();
    if (!request?.headers) {
      return null;
    }
    const data = await auth.api.getSession({
      headers: request.headers,
    });

    if (!data?.session) {
      throw redirect({
        to: "/auth",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
