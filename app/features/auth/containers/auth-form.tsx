import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { SuccessContext } from "better-auth/react";
import { z } from "zod";

type Props = {
  onSuccess: (context: SuccessContext<any>) => void;
};

const authSchema = z.object({
  email: z.string().email().min(1),
});

export const AuthForm = ({ onSuccess }: Props) => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.magicLink(
        {
          email: value.email,
        },
        {
          onSuccess,
        }
      );
    },
    validators: {
      onChange: authSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-3 justify-between"
    >
      <div className="flex flex-col gap-3">
        <form.Field
          name="email"
          children={(field) => {
            return (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Email:</Label>
                <Input
                  id={field.name}
                  type="email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            );
          }}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <LoadingButton
            type="submit"
            disabled={!canSubmit}
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        )}
      />
    </form>
  );
};

function FieldInfo({ field }: { field: AnyFieldApi }) {
  const errors: string[] = field.state.meta.errors.map(
    (error) => error.message
  );
  return field.state.meta.isTouched && !field.state.meta.isValid ? (
    <em className="text-red-500">{errors.join(", ")}</em>
  ) : null;
}
