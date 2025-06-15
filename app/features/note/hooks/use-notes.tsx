import { useSuspenseQuery } from "@tanstack/react-query";
import { getNotes } from "../server-functions/queries";

type Props = {
  folderId?: string;
};

export const useNotes = ({ folderId }: Props) => {
  const key = ["notes", folderId];
  const query = useSuspenseQuery({
    queryKey: key,
    queryFn: () => getNotes({ data: { folderId } }),
  });

  return { ...query, key };
};
