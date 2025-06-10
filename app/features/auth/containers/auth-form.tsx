import { Form } from "@/components/form";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
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
    <Form
      onSubmit={form.handleSubmit}
      submitComponent={
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
      }
    >
      <form.Field
        name="email"
        children={(field) => {
          return (
            <FormField field={field} label="Email">
              <Input
                id={field.name}
                type="email"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormField>
          );
        }}
      />
    </Form>
  );
};
