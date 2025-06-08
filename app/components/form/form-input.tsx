import type { AnyFieldApi } from "@tanstack/react-form";
import { FormField } from "./form-field";
import { Input } from "../ui/input";
import type { ComponentProps } from "react";

type Props = {
  field: AnyFieldApi;
  label: string;
} & ComponentProps<"input">;

export const FormInput = ({ field, label, ...props }: Props) => {
  return (
    <FormField field={field} label={label}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
    </FormField>
  );
};
