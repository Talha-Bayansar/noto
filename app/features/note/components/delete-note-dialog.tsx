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
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";
import { useNotes } from "../hooks/use-notes";
import { deleteNote } from "../server-functions/mutations";

type Props = {
  noteId: string;
  folderId?: string;
  children: React.ReactNode;
};

export const DeleteNoteDialog = ({ noteId, folderId, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refetch } = useNotes({
    folderId,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      refetch();
      setIsOpen(false);
    },
  });

  const handleDelete = async () => {
    deleteMutation.mutate({ data: { id: noteId } });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete the note and all its
            contents.
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
