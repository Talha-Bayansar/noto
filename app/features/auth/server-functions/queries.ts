import { auth } from "@/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

export const getAuth = createServerFn().handler(async () => {
  const request = getWebRequest();
  if (!request) {
    throw new Error("No request found");
  }

  const authObj = await auth.api.getSession({
    headers: request.headers,
  });

  return authObj;
});
