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
  const auth = authClient.useSession();
  const organization = authClient.useActiveOrganization();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut();
    setIsSigningOut(false);
  };

  if (auth.isPending || organization.isPending) return <div>Loading...</div>;

  return (
    <div>
      {auth.data?.user ? (
        <div>
          <p>Welcome {auth.data.user.email}</p>
          {organization?.data && (
            <p>Your organization is {organization.data.name}</p>
          )}
          <LoadingButton
            variant={"destructive"}
            onClick={handleSignOut}
            loading={isSigningOut}
          >
            Sign Out
          </LoadingButton>
          <Button asChild>
            <Link to="/notes">Notes</Link>
          </Button>
        </div>
      ) : (
        <Button asChild>
          <Link to="/auth">Auth</Link>
        </Button>
      )}
    </div>
  );
}
