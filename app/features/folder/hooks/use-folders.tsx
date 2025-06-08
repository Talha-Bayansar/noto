import { useSuspenseQuery } from "@tanstack/react-query";
import { getFolders } from "../server-functions/queries";

type Props = {
  parentId?: string;
};

export const useFolders = ({ parentId }: Props) => {
  const key = ["folders", parentId];
  const params = parentId ? { data: { parentId } } : undefined;

  const query = useSuspenseQuery({
    queryKey: key,
    queryFn: () => getFolders(params),
  });

  return { ...query, key };
};
