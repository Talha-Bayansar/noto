import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut();
    setIsSigningOut(false);
  };

  if (isPending) return null;

  return (
    <div>
      {data?.user ? (
        <LoadingButton
          variant={"destructive"}
          onClick={handleSignOut}
          loading={isSigningOut}
        >
          Sign Out
        </LoadingButton>
      ) : (
        <Button asChild>
          <Link to="/auth">Auth</Link>
        </Button>
      )}
    </div>
  );
}
