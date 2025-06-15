import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { UpdateNoteForm } from "./forms/update-note-form";
import type { Note } from "../types/note";

type Props = {
  note: Partial<Note>;
  children: React.ReactNode;
};

export const UpdateNoteDialog = ({ note, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update note</DialogTitle>
        </DialogHeader>
        <UpdateNoteForm onSuccess={() => setIsOpen(false)} note={note} />
      </DialogContent>
    </Dialog>
  );
};
