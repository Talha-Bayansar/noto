import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Folder } from "../types/folder";
import { useState } from "react";
import { UpdateFolderForm } from "./forms/update-folder-form";

type Props = {
  folder: Folder;
  children: React.ReactNode;
};

export const UpdateFolder = ({ folder, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename folder</DialogTitle>
        </DialogHeader>
        <UpdateFolderForm folder={folder} onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
