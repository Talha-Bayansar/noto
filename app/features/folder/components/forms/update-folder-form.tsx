import { Form } from "@/components/form";
import { FormField } from "@/components/form/form-field";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { updateFolder } from "../../server-functions/mutations";
import { useFolders } from "../../hooks/use-folders";
import type { Folder } from "../../types/folder";

const folderSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type Props = {
  folder: Folder;
  onSuccess?: () => void;
};

export const UpdateFolderForm = ({ folder, onSuccess }: Props) => {
  const { refetch } = useFolders({
    parentId: folder.parentId ?? undefined,
  });

  const form = useForm({
    defaultValues: {
      name: folder.name,
    },
    onSubmit: async ({ value }) => {
      await updateFolder({
        data: {
          id: folder.id,
          name: value.name,
        },
      });

      await refetch();
      onSuccess?.();
    },
    validators: {
      onChange: folderSchema,
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
