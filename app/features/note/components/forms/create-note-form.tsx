import { Form } from "@/components/form";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useNotes } from "../../hooks/use-notes";
import { createNote } from "../../server-functions/mutations";

const noteSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type Props = {
  folderId?: string;
  onSuccess?: () => void;
};

export const CreateNoteForm = ({ folderId, onSuccess }: Props) => {
  const { refetch } = useNotes({ folderId });

  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      await createNote({
        data: {
          name: value.name,
          folderId,
        },
      });

      await refetch();
      onSuccess?.();
    },
    validators: {
      onChange: noteSchema,
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
              Create
            </LoadingButton>
          )}
        />
      }
    >
      <form.Field
        name="name"
        children={(field) => {
          return (
            <FormField field={field} label="Name">
              <Input
                id={field.name}
                type="text"
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
