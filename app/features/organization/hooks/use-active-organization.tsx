import { useSuspenseQuery } from "@tanstack/react-query";
import { getActiveOrganization } from "../server-functions/queries";

export const useActiveOrganization = () => {
  const key = ["active-organization"];
  const query = useSuspenseQuery({
    queryKey: key,
    queryFn: getActiveOrganization,
  });

  return {
    ...query,
    key,
  };
};
