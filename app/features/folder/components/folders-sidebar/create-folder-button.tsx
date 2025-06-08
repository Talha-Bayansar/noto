import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateFolderForm } from "../forms/create-folder-form";

type Props = {
  parentId?: string;
};

export const CreateFolderButton = ({ parentId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction title="New folder">
          <Plus /> <span className="sr-only">New folder</span>
        </SidebarGroupAction>
      </DialogTrigger>
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
