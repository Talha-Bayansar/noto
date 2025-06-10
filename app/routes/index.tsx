import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to {APP_NAME}
        </h1>
        <p className="max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
          Your personal space for capturing thoughts, ideas, and inspirations.
          Simple, fast, and beautiful note-taking application that helps you
          stay organized.
        </p>
        <Button asChild size="lg">
          <Link to="/notes">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
