import { useSuspenseQuery } from "@tanstack/react-query";
import { getFolderById } from "../server-functions/queries";

type Props = {
  id?: string;
};

export const useFolder = ({ id }: Props) => {
  const key = ["folder", id];
  const rootKey = ["folder"];
  const query = useSuspenseQuery({
    queryKey: key,
    queryFn: () =>
      id ? getFolderById({ data: { id } }) : Promise.resolve(null),
  });

  return { ...query, key, rootKey };
};
