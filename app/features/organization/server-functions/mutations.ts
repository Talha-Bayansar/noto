import { z } from "zod";
import { auth } from "@/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";

export const updateActivOrganization = createServerFn({ method: "POST" })
  .validator(
    z.object({
      organizationId: z.string().optional(),
      organizationSlug: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const response = await auth.api.setActiveOrganization({
      body: data,
      headers: getHeaders() as HeadersInit,
    });

    return response;
  });
