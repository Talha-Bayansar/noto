import { auth } from "@/lib/auth";
import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const request = getWebRequest();
  if (request) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (session?.session) {
      return next({
        context: {
          auth: session,
        },
      });
    } else {
      throw new Error("Unauthorized");
    }
  } else {
    throw new Error("Request is not a web request");
  }
});
