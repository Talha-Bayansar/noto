import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

type Props = VariantProps<typeof headingVariants> & React.ComponentProps<"h1">;

const headingVariants = cva("", {
  variants: {
    variant: {
      h1: "text-center text-4xl font-extrabold tracking-tight",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

export const Heading = ({ variant, className, ...rest }: Props) => {
  const Comp = variant ?? "h1";

  return (
    <Comp className={cn(headingVariants({ variant }), className)} {...rest} />
  );
};
