import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteFolder } from "../server-functions/mutations";
import { LoadingButton } from "@/components/ui/loading-button";
import { useFolders } from "../hooks/use-folders";
import { useState } from "react";

type Props = {
  folderId: string;
  parentId?: string;
  children: React.ReactNode;
};

export const DeleteFolderDialog = ({ folderId, parentId, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refetch } = useFolders({
    parentId,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      refetch();
      setIsOpen(false);
    },
  });

  const handleDelete = async () => {
    deleteMutation.mutate({ data: { id: folderId } });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete the folder and all
            its contents.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={deleteMutation.isPending}
            disabled={deleteMutation.isPending}
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
