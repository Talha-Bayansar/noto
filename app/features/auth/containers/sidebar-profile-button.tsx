import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SignOutDialog } from "@/features/auth/components/sign-out-dialog";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { User2, ChevronUp } from "lucide-react";

export const SidebarProfileButton = () => {
  const { data: auth } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <User2 />{" "}
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {auth?.user.email}
          </span>
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <SignOutDialog>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Sign out
          </DropdownMenuItem>
        </SignOutDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
