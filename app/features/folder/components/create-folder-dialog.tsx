import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CreateFolderForm } from "./forms/create-folder-form";

type Props = {
  parentId?: string;
  children: React.ReactNode;
};

export const CreateFolderDialog = ({ parentId, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New folder</DialogTitle>
        </DialogHeader>
        <CreateFolderForm
          onSuccess={() => setIsOpen(false)}
          parentId={parentId}
        />
      </DialogContent>
    </Dialog>
  );
};
