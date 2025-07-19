import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/shadnc-utils";

export type MyButtonProps = React.ComponentProps<typeof Button>;

export function MyButton(props: MyButtonProps) {
   return (
      <Button
         {...props}
         className={cn(
            "focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer",
            props.className
         )}
      />
   );
}
