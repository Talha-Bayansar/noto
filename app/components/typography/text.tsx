import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"p">;

export const Text = ({ className, ...rest }: Props) => {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...rest}
    />
  );
};
