import { Form } from "@/components/form";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import type { Note } from "../../types/note";
import { useNotes } from "../../hooks/use-notes";
import { updateNote } from "../../server-functions/mutations";

const noteSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type Props = {
  note: Note;
  onSuccess?: () => void;
};

export const UpdateNoteForm = ({ note, onSuccess }: Props) => {
  const { refetch } = useNotes({
    folderId: note.folderId ?? undefined,
  });

  const form = useForm({
    defaultValues: {
      name: note.name,
    },
    onSubmit: async ({ value }) => {
      await updateNote({
        data: {
          id: note.id,
          name: value.name,
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
              Update
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
