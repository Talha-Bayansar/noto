import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyOrganizations } from "../server-functions/queries";

export const useOrganizations = () => {
  const key = ["organizations"];
  const query = useSuspenseQuery({
    queryKey: key,
    queryFn: getMyOrganizations,
  });

  return {
    ...query,
    key,
  };
};
