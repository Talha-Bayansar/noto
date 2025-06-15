import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CreateNoteForm } from "./forms/create-note-form";

type Props = {
  folderId?: string;
  children: React.ReactNode;
};

export const CreateNoteDialog = ({ folderId, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New note</DialogTitle>
        </DialogHeader>
        <CreateNoteForm
          onSuccess={() => setIsOpen(false)}
          folderId={folderId}
        />
      </DialogContent>
    </Dialog>
  );
};
