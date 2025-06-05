import { auth } from "@/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { getHeaders, getWebRequest } from "@tanstack/react-start/server";

export const getMyOrganizations = createServerFn().handler(async () => {
  const organizations = await auth.api.listOrganizations({
    headers: getHeaders() as HeadersInit,
  });
  return organizations;
});

export const getActiveOrganization = createServerFn().handler(async () => {
  const request = getWebRequest();

  const session = await auth.api.getSession({
    headers: request!.headers,
  });

  if (session?.session.activeOrganizationId) {
    const organization = await auth.api.getFullOrganization({
      headers: getHeaders() as HeadersInit,
      query: {
        organizationId: session!.session.activeOrganizationId!,
      },
    });
    return organization;
  } else {
    return null;
  }
});
