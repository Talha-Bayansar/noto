import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = {
  submitComponent: React.ReactNode;
} & ComponentProps<"form">;

export const Form = ({
  children,
  submitComponent,
  onSubmit,
  className,
  ...props
}: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit?.(e);
      }}
      className="flex flex-col gap-3 justify-between"
      {...props}
    >
      <div className={cn("flex flex-col gap-3", className)}>{children}</div>
      {submitComponent}
    </form>
  );
};
