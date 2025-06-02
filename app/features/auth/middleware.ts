import { authClient } from "@/lib/auth-client";
import { createMiddleware } from "@tanstack/react-start";
import { getHeaders, setResponseStatus } from "@tanstack/react-start/server";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: getHeaders() as HeadersInit,
    },
  });

  if (!data) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }

  return await next({
    context: {
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      activeOrganizationId: data.session.activeOrganizationId,
    },
  });
});

export const organizationMiddleware = createMiddleware().server(
  async ({ next }) => {
    const { data } = await authClient.getSession({
      fetchOptions: {
        headers: getHeaders() as HeadersInit,
      },
    });

    if (!data) {
      setResponseStatus(401);
      throw new Error("Unauthorized");
    }

    if (!data.session.activeOrganizationId) {
      setResponseStatus(401);
      throw new Error("No active organization");
    }

    return await next({
      context: {
        user: {
          id: data.user.id,
          email: data.user.email,
        },
        activeOrganizationId: data.session.activeOrganizationId,
      },
    });
  }
);
