import { AuthForm } from "@/features/auth/containers/auth-form";
import { createFileRoute } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [hasSentEmail, setHasSentEmail] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Auth</h1>
      {hasSentEmail ? (
        <>
          <p className="text-sm text-gray-500">
            Please check your email for a link to sign in
          </p>
          <MailCheck size={60} className="text-green-500 mt-2" />
        </>
      ) : (
        <>
          <p className="text-sm text-gray-500">
            Please enter your email to sign in
          </p>
          <div className="w-full max-w-md">
            <AuthForm onSuccess={() => setHasSentEmail(true)} />
          </div>
        </>
      )}
    </div>
  );
}
