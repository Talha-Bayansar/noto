import { useSuspenseQuery } from "@tanstack/react-query";
import { getAuth } from "../server-functions/queries";

export const useAuth = () => {
  const key = ["auth"];
  const query = useSuspenseQuery({
    queryKey: key,
    queryFn: async () => {
      const auth = await getAuth();
      return auth;
    },
  });
  return { ...query, key };
};
