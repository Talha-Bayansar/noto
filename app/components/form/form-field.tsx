import type { ComponentProps } from "react";
import { Label } from "../ui/label";
import type { AnyFieldApi } from "@tanstack/react-form";

type Props = {
  field: AnyFieldApi;
  label: string;
} & ComponentProps<"div">;

export const FormField = ({ field, label, children, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2" {...props}>
      <Label htmlFor={field.name}>{label}</Label>
      {children}
      <FieldInfo field={field} />
    </div>
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
